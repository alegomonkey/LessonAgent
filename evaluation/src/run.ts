import { readTextFile, readProfile, writeLog, writeFileSafe, truncate } from "./io.js";
import { runAssignmentAlignment } from "./metrics/assignmentAlignment.js";
import { runGoalAlignment } from "./metrics/goalAlignment.js";
import { runProfessorAcceptance } from "./metrics/professorAcceptance.js";
import { defaultModel } from "./client.js";
import type { MetricName, ProposalMetrics } from "./types.js";

interface CliArgs {
  assignment?: string;
  profile?: string;
  proposal?: string;
  metric: MetricName | "all";
  model?: string;
  out?: string;
  help: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { metric: "all", help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    switch (a) {
      case "--assignment":
        args.assignment = next();
        break;
      case "--profile":
        args.profile = next();
        break;
      case "--proposal":
        args.proposal = next();
        break;
      case "--metric": {
        const v = next();
        if (
          v !== "all" &&
          v !== "assignmentAlignment" &&
          v !== "goalAlignment" &&
          v !== "professorAcceptance"
        ) {
          throw new Error(`Unknown --metric value: ${v}`);
        }
        args.metric = v;
        break;
      }
      case "--model":
        args.model = next();
        break;
      case "--out":
        args.out = next();
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

const USAGE = `Usage: tsx src/run.ts \\
  --assignment <path> \\
  --profile <path> \\
  --proposal <path> \\
  [--metric assignmentAlignment|goalAlignment|professorAcceptance|all] \\
  [--model <id>] \\
  [--out <path>]

Computes the AssignmentAlly proposal metrics by calling the Anthropic API directly.
Reads ANTHROPIC_API_KEY from environment or evaluation/.env.

Outputs ProposalMetrics JSON to stdout. Always writes a timestamped log to evaluation/logs/.`;

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
  if (!args.assignment || !args.profile || !args.proposal) {
    console.error("Missing required argument(s): --assignment, --profile, --proposal");
    console.error(USAGE);
    process.exit(2);
  }

  const [assignment, profile, proposal] = await Promise.all([
    readTextFile(args.assignment),
    readProfile(args.profile),
    readTextFile(args.proposal),
  ]);

  const model = args.model ?? defaultModel();
  const need = args.metric;
  const wantAA = need === "all" || need === "assignmentAlignment";
  const wantGA = need === "all" || need === "goalAlignment";
  const wantPA = need === "all" || need === "professorAcceptance";

  type AAResult = Awaited<ReturnType<typeof runAssignmentAlignment>>;
  type GAResult = Awaited<ReturnType<typeof runGoalAlignment>>;
  type PAResult = Awaited<ReturnType<typeof runProfessorAcceptance>>;

  const aaP: Promise<AAResult | null> = wantAA
    ? runAssignmentAlignment(assignment, proposal, model)
    : Promise.resolve(null);
  const gaP: Promise<GAResult | null> = wantGA
    ? runGoalAlignment(profile, proposal, model)
    : Promise.resolve(null);
  const paP: Promise<PAResult | null> = wantPA
    ? runProfessorAcceptance(assignment, proposal, model)
    : Promise.resolve(null);

  const settled = await Promise.allSettled([aaP, gaP, paP]);
  const failures = settled.filter((s) => s.status === "rejected") as PromiseRejectedResult[];
  if (failures.length > 0) {
    for (const f of failures) {
      console.error("Metric failed:", f.reason);
    }
    process.exit(1);
  }
  const aaResult = (settled[0] as PromiseFulfilledResult<AAResult | null>).value;
  const gaResult = (settled[1] as PromiseFulfilledResult<GAResult | null>).value;
  const paResult = (settled[2] as PromiseFulfilledResult<PAResult | null>).value;

  const partial: Partial<ProposalMetrics> = {};
  if (aaResult) partial.assignmentAlignment = aaResult.metric;
  if (gaResult) partial.goalAlignment = gaResult.metric;
  if (paResult) partial.professorAcceptance = paResult.metric;
  partial.updatedAt = new Date().toISOString();

  const output = JSON.stringify(partial, null, 2);
  console.log(output);

  const logEntries: Parameters<typeof writeLog>[1] = [];
  if (aaResult)
    logEntries.push({
      metric: "assignmentAlignment",
      prompt: aaResult.prompt,
      rawResponse: aaResult.rawResponse,
      parsed: aaResult.metric,
      durationMs: aaResult.durationMs,
    });
  if (gaResult)
    logEntries.push({
      metric: "goalAlignment",
      prompt: gaResult.prompt,
      rawResponse: gaResult.rawResponse,
      parsed: gaResult.metric,
      durationMs: gaResult.durationMs,
    });
  if (paResult)
    logEntries.push({
      metric: "professorAcceptance",
      prompt: paResult.prompt,
      rawResponse: paResult.rawResponse,
      parsed: paResult.metric,
      durationMs: paResult.durationMs,
    });

  const logPath = await writeLog("eval", logEntries, {
    model,
    metric: args.metric,
    inputs: {
      assignmentPath: args.assignment,
      profilePath: args.profile,
      proposalPath: args.proposal,
      assignmentPreview: truncate(assignment),
      profilePreview: truncate(profile),
      proposalPreview: truncate(proposal),
    },
  });
  console.error(`log: ${logPath}`);

  if (args.out) {
    await writeFileSafe(args.out, output + "\n");
    console.error(`out: ${args.out}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
