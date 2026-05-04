import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import {
  EVAL_ROOT,
  readTextFile,
  readProfile,
  writeLog,
  writeFileSafe,
  truncate,
  timestamp,
} from "./io.js";
import { runAssignmentAlignment } from "./metrics/assignmentAlignment.js";
import { runGoalAlignment } from "./metrics/goalAlignment.js";
import { runProfessorAcceptance } from "./metrics/professorAcceptance.js";
import { defaultModel } from "./client.js";
import { renderStudyReport, renderSummaryTable } from "./report/markdown.js";
import type { PersonaResult, ProposalMetrics, StudyReport } from "./types.js";

const DEFAULT_PERSONAS = ["freshman-big-dreams", "junior-jaded", "senior-expert"];

interface CliArgs {
  version: string;
  personas: string[];
  model?: string;
  help: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { version: "current", personas: DEFAULT_PERSONAS, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    switch (a) {
      case "--version":
        args.version = next();
        break;
      case "--personas":
        args.personas = next().split(",").map((s) => s.trim()).filter(Boolean);
        break;
      case "--model":
        args.model = next();
        break;
      case "-h":
      case "--help":
        args.help = true;
        break;
      default:
        throw new Error(`Unknown argument: ${a}`);
    }
  }
  return args;
}

const USAGE = `Usage: tsx src/study.ts \\
  --version current|old|<label> \\
  [--personas freshman-big-dreams,junior-jaded,senior-expert] \\
  [--model <id>]

Runs the three proposal metrics across the configured personas for a given project version.
Each persona must have a saved proposal at:
  evaluation/personas/<id>/proposals/proposal.<version>.md

Generate the proposal by feeding the persona's profile.json + assignment.md into the
AssignmentAlly UI for that project version, then save the resulting proposal text.

Outputs:
  - markdown report -> evaluation/reports/study-<version>-<timestamp>.md
  - per-persona logs -> evaluation/logs/study-<persona>-<timestamp>.log
  - compact summary table -> stdout`;

interface PersonaMeta {
  id: string;
  year: string;
  primaryGoal: string;
  summary: string;
  assignmentTitle: string;
}

async function readPersonaMeta(id: string): Promise<PersonaMeta> {
  const profilePath = resolve(EVAL_ROOT, "personas", id, "profile.json");
  const assignmentPath = resolve(EVAL_ROOT, "personas", id, "assignment.md");
  const profileRaw = await readFile(profilePath, "utf8");
  let year = "—";
  let primaryGoal = "—";
  let summary = id;
  try {
    const profile = JSON.parse(profileRaw) as {
      year?: string;
      name?: string;
      major?: string;
      career_goals?: { primary?: string };
    };
    year = profile.year ?? year;
    primaryGoal = profile.career_goals?.primary ?? primaryGoal;
    const namePart = profile.name ? `${profile.name}` : id;
    const majorPart = profile.major ? ` — ${profile.major}` : "";
    summary = `${namePart}${majorPart}`;
  } catch {
    // fall through with defaults
  }
  let assignmentTitle = id;
  if (existsSync(assignmentPath)) {
    const text = await readFile(assignmentPath, "utf8");
    const m = text.match(/^#\s+(.+)$/m);
    if (m) assignmentTitle = m[1].trim();
  }
  return { id, year, primaryGoal, summary, assignmentTitle };
}

async function runPersona(
  id: string,
  version: string,
  model: string
): Promise<PersonaResult> {
  const profilePath = resolve(EVAL_ROOT, "personas", id, "profile.json");
  const assignmentPath = resolve(EVAL_ROOT, "personas", id, "assignment.md");
  const proposalPath = resolve(
    EVAL_ROOT,
    "personas",
    id,
    "proposals",
    `proposal.${version}.md`
  );
  if (!existsSync(proposalPath)) {
    throw new Error(
      `Missing proposal for persona "${id}" at ${proposalPath}.\n` +
        `Generate it by running the persona's profile + assignment through the AssignmentAlly UI ` +
        `(project version "${version}") and saving the final proposal there.`
    );
  }

  const [assignment, profile, proposal] = await Promise.all([
    readTextFile(assignmentPath),
    readProfile(profilePath),
    readTextFile(proposalPath),
  ]);

  const [aa, ga, pa] = await Promise.all([
    runAssignmentAlignment(assignment, proposal, model),
    runGoalAlignment(profile, proposal, model),
    runProfessorAcceptance(assignment, proposal, model),
  ]);

  const metrics: ProposalMetrics = {
    assignmentAlignment: aa.metric,
    goalAlignment: ga.metric,
    professorAcceptance: pa.metric,
    updatedAt: new Date().toISOString(),
  };

  await writeLog(
    `study-${id}-${version}`,
    [
      {
        metric: "assignmentAlignment",
        prompt: aa.prompt,
        rawResponse: aa.rawResponse,
        parsed: aa.metric,
        durationMs: aa.durationMs,
      },
      {
        metric: "goalAlignment",
        prompt: ga.prompt,
        rawResponse: ga.rawResponse,
        parsed: ga.metric,
        durationMs: ga.durationMs,
      },
      {
        metric: "professorAcceptance",
        prompt: pa.prompt,
        rawResponse: pa.rawResponse,
        parsed: pa.metric,
        durationMs: pa.durationMs,
      },
    ],
    {
      persona: id,
      version,
      model,
      assignmentPath,
      profilePath,
      proposalPath,
      assignmentPreview: truncate(assignment),
      profilePreview: truncate(profile),
      proposalPreview: truncate(proposal),
    }
  );

  const meta = await readPersonaMeta(id);
  return {
    personaId: id,
    personaSummary: meta.summary,
    primaryGoal: meta.primaryGoal,
    year: meta.year,
    assignmentTitle: meta.assignmentTitle,
    metrics,
    proposalPath,
  };
}

async function main() {
  let args: CliArgs;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error((err as Error).message);
    console.error(USAGE);
    process.exit(2);
  }
  if (args.help) {
    console.log(USAGE);
    return;
  }

  const model = args.model ?? defaultModel();
  const personas: PersonaResult[] = [];
  for (const id of args.personas) {
    process.stderr.write(`running persona: ${id} ... `);
    try {
      const result = await runPersona(id, args.version, model);
      personas.push(result);
      process.stderr.write(
        `aa=${result.metrics.assignmentAlignment.score} ` +
          `ga=${result.metrics.goalAlignment.score} ` +
          `concerns=${result.metrics.professorAcceptance.concerns.length}\n`
      );
    } catch (err) {
      process.stderr.write(`FAILED\n`);
      console.error((err as Error).message);
      process.exit(1);
    }
  }

  const report: StudyReport = {
    version: args.version,
    model,
    generatedAt: new Date().toISOString(),
    personas,
  };

  const md = renderStudyReport(report);
  const reportPath = resolve(
    EVAL_ROOT,
    "reports",
    `study-${args.version}-${timestamp()}.md`
  );
  await writeFileSafe(reportPath, md);

  console.log(renderSummaryTable(report));
  console.log("");
  console.log(`report: ${reportPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
