import "./polyfills.js";
import "dotenv/config";
import { randomUUID } from "crypto";
import express, { type Request, type Response } from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { buildOptions } from "./config.js";
import type {
  ChatSession,
  PipelineStep,
  ProposalMetrics,
  SessionExport,
  StudentGoalProfile,
  StudentProfile,
} from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ?? 3000;

// In-memory session store
const sessions = new Map<string, ChatSession>();

// File upload config — memory storage, 5MB limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Known pipeline prompts — must match the data-prompt attributes in index.html
const PIPELINE_PROMPTS = {
  analyze:
    "Please analyze my assignment. Here\u2019s the syllabus for my course \u2014 which assignments are available?",
  align:
    "Now align this assignment with my career goals and suggest augmentation opportunities.",
  build:
    "Build a formal proposal for the augmented assignment that I can present to my professor.",
} as const;

// Maps any pipeline-related identifier (skill, agent, or slash-command name)
// to a pipeline phase. The agent may invoke a phase's work via the Skill tool,
// the Agent/Task tool, or by reading a skill's SKILL.md directly — detection
// needs to cover all three paths.
const NAME_TO_PHASE: Record<string, "analyze" | "align" | "build"> = {
  // Skills
  "assignment-analysis": "analyze",
  "career-alignment": "align",
  "proposal-builder": "build",
  // Agents
  "assignment-analyzer": "analyze",
  "career-matcher": "align",
  "proposal-writer": "build",
  // Slash commands
  "analyze-assignment": "analyze",
  "align-career": "align",
  "build-proposal": "build",
};

// Plugin-qualified identifiers arrive as "<plugin>:<name>" (e.g.
// "assignment-ally:assignment-analysis"). Strip the prefix so lookups match
// the bare skill/agent name.
function stripPluginPrefix(id: string | undefined): string | undefined {
  if (!id) return id;
  const i = id.lastIndexOf(":");
  return i >= 0 ? id.slice(i + 1) : id;
}

// Human-friendly status label for the loading indicator, derived from the
// current tool_use block. Returned string is shown verbatim next to the
// spinner so the user can see what the agent is actually doing.
function describeToolUse(block: {
  name?: string;
  input?: Record<string, unknown>;
}): string | undefined {
  const name = block.name;
  const input = block.input ?? {};

  if (name === "Skill") {
    const skill = stripPluginPrefix(input.skill as string | undefined);
    if (skill === "assignment-analysis") return "Analyzing your material...";
    if (skill === "career-alignment") return "Aligning with career goals...";
    if (skill === "proposal-builder") return "Building proposal...";
    // Internal skills — do not announce to the user.
    if (skill === "pipeline-gate") return undefined;
    return "Working on it...";
  }

  if (name === "Agent" || name === "Task") {
    const agent = stripPluginPrefix(
      (input.subagent_type ?? input.agent_type) as string | undefined
    );
    if (agent === "assignment-analyzer") return "Analyzing your material...";
    if (agent === "career-matcher") return "Matching career opportunities...";
    if (agent === "proposal-writer") return "Writing proposal...";
    return agent ? `Delegating to ${agent}...` : "Delegating work...";
  }

  if (name === "Read") {
    const p = (input.file_path ?? "") as string;
    if (/\/skills\/.*\/SKILL\.md$/i.test(p)) return "Getting started...";
    if (/\/skills\//i.test(p)) return "Reviewing reference material...";
    if (/\/syllabi\//i.test(p)) return "Reading syllabus...";
    if (/\/industry\//i.test(p)) return "Reading industry data...";
    if (/\/users\//i.test(p)) return "Reading student profile...";
    if (/\/examples\//i.test(p)) return "Reading example...";
    return "Reading document...";
  }

  if (name === "Grep") return "Searching content...";
  if (name === "Glob") return "Finding files...";
  if (name === "AskUserQuestion") return "Preparing a question...";
  if (name === "TodoWrite") return "Planning next steps...";
  if (name === "Write") return "Saving output...";

  return undefined;
}

function detectPhaseFromBlock(block: {
  type: string;
  name?: string;
  input?: Record<string, unknown>;
}): "analyze" | "align" | "build" | undefined {
  if (block.type !== "tool_use") return undefined;
  const input = block.input ?? {};

  // 1) Skill tool — { skill: "<name>", ... }
  if (block.name === "Skill") {
    const skill = stripPluginPrefix(input.skill as string | undefined);
    if (skill && NAME_TO_PHASE[skill]) return NAME_TO_PHASE[skill];
  }

  // 2) Agent/Task tool — { subagent_type: "<name>", ... }
  if (block.name === "Agent" || block.name === "Task") {
    const agent = stripPluginPrefix(
      (input.subagent_type ?? input.agent_type) as string | undefined
    );
    if (agent && NAME_TO_PHASE[agent]) return NAME_TO_PHASE[agent];
  }

  // 3) Read tool opening a skill's SKILL.md — strong signal that the agent
  //    is actually executing that phase even if no Skill/Agent tool was used.
  if (block.name === "Read") {
    const p = (input.file_path ?? "") as string;
    const m = p.match(/\/skills\/([^/]+)\/SKILL\.md$/i);
    if (m && NAME_TO_PHASE[m[1]]) return NAME_TO_PHASE[m[1]];
  }

  // 4) Fallback — scan the stringified input for any mapped identifier. Catches
  //    cases like Bash/Glob reading skill directories, or tools we don't know
  //    about whose input happens to name a skill/agent/command.
  try {
    const inputStr = JSON.stringify(input);
    for (const [name, phase] of Object.entries(NAME_TO_PHASE)) {
      if (inputStr.includes(name)) return phase;
    }
  } catch {
    // ignore — stringify can fail on circular refs
  }

  return undefined;
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// ── Upload endpoint — extract text from files ────────────────────────

app.post(
  "/api/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file provided." });
      return;
    }

    const ext = path.extname(file.originalname).toLowerCase();

    try {
      let text: string;

      if (ext === ".pdf") {
        const pdf = new PDFParse({ data: new Uint8Array(file.buffer) });
        const result = await pdf.getText();
        text = result.text;
        await pdf.destroy();
        if (text.trim().length < 50) {
          res.status(422).json({
            error:
              "Could not extract enough text from this PDF. It may be a scanned image. Try copy/pasting the text instead.",
          });
          return;
        }
      } else if (ext === ".txt" || ext === ".md") {
        text = file.buffer.toString("utf-8");
      } else {
        res.status(400).json({
          error: `Unsupported file type "${ext}". Please upload a PDF, TXT, or MD file, or paste the text directly.`,
        });
        return;
      }

      res.json({ text, fileName: file.originalname });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to process file.";
      res.status(500).json({ error: msg });
    }
  }
);

// ── Example interactions ─────────────────────────────────────────────
// Expose the positive example transcripts (P*.md) from examples/interactions
// to the UI so students can preview what a good session looks like. Negative
// examples (N*.md) are deliberately excluded — they exist for agent training,
// not for students to emulate.

const EXAMPLES_DIR = path.join(__dirname, "..", "examples", "interactions");
const POSITIVE_FILE_RE = /^(P\d+)-.*\.md$/;
const EXAMPLE_ID_RE = /^P\d+$/;

function parseExampleMetadata(
  markdown: string
): { title: string; scenario: string } {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  // Strip the "P1: " prefix used internally so the card title reads naturally.
  const title = titleMatch
    ? titleMatch[1].replace(/^P\d+:\s*/, "").trim()
    : "";

  // First paragraph under the "## Scenario" heading, up to the next blank
  // line or heading. Falls back to empty string if the section is missing.
  const scenarioMatch = markdown.match(
    /^##\s+Scenario\s*\n+([^\n][\s\S]*?)(?:\n\s*\n|\n##\s)/m
  );
  const scenario = scenarioMatch ? scenarioMatch[1].trim() : "";

  return { title, scenario };
}

type ExampleTurn =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string };

// Extract just the chat transcript the student would actually see in a live
// session: user messages and the agent's user-facing responses. Drops the
// meta sections (Scenario, Data Sources Used, Why This Interaction Succeeds)
// and the "Agent Internal Reasoning" blocks, which are authoring notes, not
// part of the real interaction.
function parseExampleTurns(markdown: string): ExampleTurn[] {
  // Isolate the conversation section. If "Why This Interaction Succeeds"
  // exists, use it as a hard right boundary.
  const convoStart = markdown.search(/^##\s+Conversation\s*$/m);
  if (convoStart < 0) return [];
  let convo = markdown.slice(convoStart).replace(/^##\s+Conversation\s*\n+/, "");
  const whyIdx = convo.search(/^##\s+Why This Interaction Succeeds\s*$/m);
  if (whyIdx >= 0) convo = convo.slice(0, whyIdx);

  // Drop every "Agent Internal Reasoning" block. It ends at the next known
  // marker — either "Agent Response" or the next "Turn N —" header.
  convo = convo.replace(
    /\*\*Agent Internal Reasoning:\*\*[\s\S]*?(?=\*\*Agent Response:\*\*|\*\*Turn \d+ — )/g,
    ""
  );

  // Walk remaining markers in order: each becomes a turn. Everything between
  // one marker and the next is that turn's content.
  const markerRe =
    /\*\*(?:Turn \d+ — [^:*]+:|Agent Response:)\*\*/g;
  const matches: Array<{ kind: "user" | "assistant"; end: number; start: number }> =
    [];
  for (const m of convo.matchAll(markerRe)) {
    const kind = m[0].startsWith("**Agent Response") ? "assistant" : "user";
    matches.push({ kind, start: m.index!, end: m.index! + m[0].length });
  }

  const turns: ExampleTurn[] = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const contentStart = m.end;
    const contentEnd = i + 1 < matches.length ? matches[i + 1].start : convo.length;
    let content = convo.slice(contentStart, contentEnd).trim();

    // Strip the "---" turn separator that often precedes the next Turn header,
    // plus leading/trailing horizontal rules that were only there as visual
    // dividers between Turn N and Turn N+1 in the source file.
    content = content.replace(/\n?\s*---+\s*$/, "").trim();
    content = content.replace(/^---+\s*\n?/, "").trim();

    // Unwrap surrounding quotation marks: the source files stylize every
    // user turn and most agent responses as "..." but a real chat bubble
    // doesn't show quotes around itself.
    content = stripWrappingQuotes(content);

    if (content) turns.push({ role: m.kind, content });
  }

  return turns;
}

function stripWrappingQuotes(text: string): string {
  // Only unwrap when the whole turn is one quoted block — don't touch
  // inline quotes inside the content.
  const trimmed = text.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("“") && trimmed.endsWith("”"))
  ) {
    const inner = trimmed.slice(1, -1);
    // Guard: if the inner text also contains unescaped quote pairs that would
    // indicate this isn't a single wrapping quote, keep it as-is.
    if (!inner.includes('"\n') && !inner.includes('\n"')) {
      return inner.trim();
    }
  }
  return trimmed;
}

app.get("/api/examples", async (_req: Request, res: Response) => {
  try {
    const entries = await fs.readdir(EXAMPLES_DIR);
    const positive = entries
      .filter((name) => POSITIVE_FILE_RE.test(name))
      .sort();

    const examples = await Promise.all(
      positive.map(async (filename) => {
        const id = filename.match(POSITIVE_FILE_RE)![1];
        const markdown = await fs.readFile(
          path.join(EXAMPLES_DIR, filename),
          "utf-8"
        );
        const { title, scenario } = parseExampleMetadata(markdown);
        return { id, filename, title, scenario };
      })
    );

    res.json(examples);
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Failed to load examples.";
    res.status(500).json({ error: msg });
  }
});

app.get("/api/examples/:id", async (req: Request, res: Response) => {
  const id = String(req.params.id);
  if (!EXAMPLE_ID_RE.test(id)) {
    res.status(400).json({ error: "Invalid example id." });
    return;
  }

  try {
    const entries = await fs.readdir(EXAMPLES_DIR);
    const filename = entries.find((name) => {
      const m = name.match(POSITIVE_FILE_RE);
      return m && m[1] === id;
    });
    if (!filename) {
      res.status(404).json({ error: "Example not found." });
      return;
    }
    const markdown = await fs.readFile(
      path.join(EXAMPLES_DIR, filename),
      "utf-8"
    );
    const { title, scenario } = parseExampleMetadata(markdown);
    const turns = parseExampleTurns(markdown);
    res.json({ id, filename, title, scenario, turns });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Failed to load example.";
    res.status(500).json({ error: msg });
  }
});

// ── Create a new session with student profile ────────────────────────

app.post("/api/session", (req: Request, res: Response) => {
  const { name, major, year, careerGoals, course } =
    req.body as StudentProfile;

  if (!name || !major || !year || !careerGoals || !course) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  const session: ChatSession = {
    id: randomUUID(),
    student: { name, major, year, careerGoals, course },
    pipelineStep: "ready",
    createdAt: Date.now(),
  };

  sessions.set(session.id, session);
  res.json({
    sessionId: session.id,
    pipelineStep: session.pipelineStep,
    awaitingInfo: session.awaitingInfo ?? null,
  });
});

// ── Import a saved profile to skip the intro survey ─────────────────

app.post("/api/session/import", (req: Request, res: Response) => {
  const body = req.body as Partial<SessionExport> | undefined;
  const student = body?.student as Partial<StudentProfile> | undefined;

  if (!student) {
    res.status(400).json({ error: "Missing student profile in uploaded file." });
    return;
  }
  const { name, major, year, careerGoals, course } = student;
  if (!name || !major || !year || !careerGoals || !course) {
    res.status(400).json({
      error:
        "Uploaded profile is missing required fields (name, major, year, course, careerGoals).",
    });
    return;
  }

  if (body?.version && body.version !== 1) {
    res.status(400).json({
      error: `Unsupported profile version ${body.version}. Please export a fresh profile.`,
    });
    return;
  }

  const session: ChatSession = {
    id: randomUUID(),
    student: { name, major, year, careerGoals, course },
    pipelineStep: "ready",
    createdAt: Date.now(),
    ...(body?.goalProfile ? { goalProfile: body.goalProfile } : {}),
  };

  sessions.set(session.id, session);
  res.json({
    sessionId: session.id,
    pipelineStep: session.pipelineStep,
    awaitingInfo: session.awaitingInfo ?? null,
    hasGoalProfile: !!session.goalProfile,
  });
});

// ── Chat endpoint — streams agent responses via SSE ──────────────────

app.post("/api/chat", async (req: Request, res: Response) => {
  const { sessionId, message, fileText } = req.body as {
    sessionId: string;
    message: string;
    fileText?: string;
  };

  const session = sessions.get(sessionId);
  if (!session) {
    res.status(404).json({ error: "Session not found. Please start over." });
    return;
  }

  if (!message?.trim()) {
    res.status(400).json({ error: "Message is required." });
    return;
  }

  // pipeline-gate is an internal, agent-only skill — reject direct user calls.
  if (/^\s*\/\s*pipeline-gate\b/i.test(message)) {
    res
      .status(400)
      .json({ error: "pipeline-gate is an internal skill and cannot be invoked directly." });
    return;
  }

  // ── Pipeline enforcement ──────────────────────────────────────────
  // Only enforce on known button prompts; free-text always passes through
  const stepForPrompt = identifyPipelineStep(message);

  if (stepForPrompt === "align" && stepIndex(session.pipelineStep) < 1) {
    res
      .status(400)
      .json({ error: "Please analyze an assignment first.", pipelineStep: session.pipelineStep });
    return;
  }
  if (stepForPrompt === "build" && stepIndex(session.pipelineStep) < 2) {
    res.status(400).json({
      error:
        stepIndex(session.pipelineStep) < 1
          ? "Please analyze an assignment and align career goals first."
          : "Please complete career alignment first.",
      pipelineStep: session.pipelineStep,
    });
    return;
  }

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Build the prompt
  let prompt = message;

  // Prepend uploaded file text if provided
  if (fileText) {
    prompt = `[Uploaded assignment/syllabus document]\n${fileText}\n\n[Student's message]\n${message}`;
  }

  // On first message, include student context
  if (!session.sdkSessionId) {
    const s = session.student;
    prompt =
      `[Student context — use this to personalize your responses]\n` +
      `Name: ${s.name}\n` +
      `Major: ${s.major}\n` +
      `Year: ${s.year}\n` +
      `Career goals: ${s.careerGoals}\n` +
      `Course they want to work on: ${s.course}\n\n` +
      prompt;
  }

  try {
    const options = buildOptions({
      maxTurns: 50,
      ...(session.sdkSessionId ? { resume: session.sdkSessionId } : {}),
    });

    const conversation = query({ prompt, options });
    let accumulatedText = "";
    // Tracks the latest phase the agent touched in this turn. We only mark
    // that phase complete if (a) the agent later moves to a strictly-later
    // phase or (b) the turn ends without a pending question to the user.
    let phaseInTurn: "analyze" | "align" | "build" | undefined;

    for await (const msg of conversation) {
      if (msg.type === "assistant") {
        const content = (msg as Record<string, unknown>).message as
          | {
              content?: Array<{
                type: string;
                text?: string;
                name?: string;
                input?: Record<string, unknown>;
              }>;
            }
          | undefined;
        if (content?.content) {
          for (const block of content.content) {
            if (block.type === "text" && block.text) {
              accumulatedText += block.text;
              res.write(
                `data: ${JSON.stringify({ type: "text", content: block.text })}\n\n`
              );
            } else if (block.type === "tool_use") {
              const statusMsg = describeToolUse(block);
              if (statusMsg) {
                res.write(
                  `data: ${JSON.stringify({
                    type: "status",
                    content: statusMsg,
                  })}\n\n`
                );
              }
              const phase = detectPhaseFromBlock(block);
              if (phase) {
                // Starting a strictly-later phase implies the previous phase
                // is complete — advance pipelineStep for it now.
                if (
                  phaseInTurn &&
                  PHASE_ORDER[phase] > PHASE_ORDER[phaseInTurn]
                ) {
                  advancePipeline(session, phaseInTurn);
                }
                phaseInTurn = phase;
                res.write(
                  `data: ${JSON.stringify({
                    type: "phase",
                    activePhase: phase,
                    pipelineStep: session.pipelineStep,
                  })}\n\n`
                );
              }
            }
          }
        }
      }

      if (msg.type === "result") {
        const result = msg as Record<string, unknown>;
        const sdkSessionId = result.session_id as string | undefined;
        if (sdkSessionId) {
          session.sdkSessionId = sdkSessionId;
        }

        // Extract goal profile from agent response if present
        const profileJson = extractGoalProfile(accumulatedText);
        if (profileJson) {
          session.goalProfile = profileJson;
        }

        // Replace-silently: a fresh PROPOSAL_METRICS marker overwrites the
        // session's metrics. Absent marker leaves prior metrics in place so a
        // tangential follow-up turn doesn't blank the panel.
        const metrics = extractProposalMetrics(accumulatedText);
        if (metrics) {
          session.proposalMetrics = {
            ...metrics,
            updatedAt: new Date().toISOString(),
          };
        }

        // Prefer the pipeline-gate skill's explicit verdict over the
        // trailing-question heuristic. The gate is the agent's own judgment
        // about whether its phase work is actually done for this turn.
        const gate = extractPipelineGate(accumulatedText);
        if (gate) {
          if (gate.canAdvance) {
            advancePipeline(session, gate.phase);
            session.awaitingInfo = null;
          } else {
            session.awaitingInfo = gate.phase;
          }
        } else if (phaseInTurn && !endsWithQuestion(accumulatedText)) {
          // Fallback only when the agent forgot to call pipeline-gate.
          advancePipeline(session, phaseInTurn);
          session.awaitingInfo = null;
        }
        // No gate + question-ending: leave session.awaitingInfo as-is so a
        // tangential turn doesn't erase the halfway marker.

        const success = result.subtype === "success";

        res.write(
          `data: ${JSON.stringify({
            type: "done",
            sessionId: sdkSessionId,
            success,
            pipelineStep: session.pipelineStep,
            awaitingInfo: session.awaitingInfo ?? null,
            hasGoalProfile: !!session.goalProfile,
            proposalMetrics: session.proposalMetrics ?? null,
          })}\n\n`
        );
      }
    }
  } catch (err) {
    const errorMsg =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    res.write(
      `data: ${JSON.stringify({ type: "error", content: errorMsg })}\n\n`
    );
  }

  res.end();
});

// ── Pipeline helpers ─────────────────────────────────────────────────

const STEP_ORDER: PipelineStep[] = [
  "ready",
  "analyzed",
  "aligned",
  "proposed",
];

function stepIndex(step: PipelineStep): number {
  return STEP_ORDER.indexOf(step);
}

function identifyPipelineStep(
  message: string
): "analyze" | "align" | "build" | null {
  if (message === PIPELINE_PROMPTS.analyze) return "analyze";
  if (message === PIPELINE_PROMPTS.align) return "align";
  if (message === PIPELINE_PROMPTS.build) return "build";
  return null;
}

function advancePipeline(
  session: ChatSession,
  step: "analyze" | "align" | "build"
): void {
  const nextStep: Record<string, PipelineStep> = {
    analyze: "analyzed",
    align: "aligned",
    build: "proposed",
  };
  const target = nextStep[step];
  // Only advance forward, never go backward
  if (stepIndex(target) > stepIndex(session.pipelineStep)) {
    session.pipelineStep = target;
  }
}

const PHASE_ORDER: Record<"analyze" | "align" | "build", number> = {
  analyze: 1,
  align: 2,
  build: 3,
};

// Heuristic: the agent is waiting on the user when its final prose ends with
// a question. In that case the phase it started isn't actually finished — the
// user still needs to answer before the step should be marked complete.
// Used only as a fallback when the pipeline-gate skill wasn't invoked.
function endsWithQuestion(text: string): boolean {
  const cleaned = text
    // Strip internal markers so the real prose is what we test.
    .replace(
      /<!-- GOAL_PROFILE_JSON -->[\s\S]*?<!-- \/GOAL_PROFILE_JSON -->/g,
      ""
    )
    .replace(/<!-- PIPELINE_GATE[\s\S]*?-->/g, "")
    .replace(/<!-- PROPOSAL_METRICS[\s\S]*?-->/g, "")
    // Strip trailing whitespace and markdown punctuation (e.g. "?**", "?*_").
    .replace(/[\s*_`~]+$/, "");
  return cleaned.endsWith("?");
}

// The pipeline-gate skill emits a single-line JSON payload inside an HTML
// comment, e.g.:
//   <!-- PIPELINE_GATE {"phase":"analyze","canAdvance":true,...} -->
// (leading/trailing whitespace and newlines inside the comment are allowed).
// Multiple gates in one turn are tolerated — we use the last one.
const PIPELINE_GATE_RE = /<!-- PIPELINE_GATE\s*([\s\S]*?)\s*-->/g;

function extractPipelineGate(
  text: string
):
  | { phase: "analyze" | "align" | "build"; canAdvance: boolean; reason?: string }
  | null {
  const matches = [...text.matchAll(PIPELINE_GATE_RE)];
  if (matches.length === 0) return null;
  const last = matches[matches.length - 1];
  try {
    const parsed = JSON.parse(last[1]) as {
      phase?: unknown;
      canAdvance?: unknown;
      reason?: unknown;
    };
    if (
      parsed.phase !== "analyze" &&
      parsed.phase !== "align" &&
      parsed.phase !== "build"
    ) {
      return null;
    }
    if (typeof parsed.canAdvance !== "boolean") return null;
    return {
      phase: parsed.phase,
      canAdvance: parsed.canAdvance,
      reason: typeof parsed.reason === "string" ? parsed.reason : undefined,
    };
  } catch {
    return null;
  }
}

// ── Proposal metrics extraction ─────────────────────────────────────
// The proposal-builder skill emits a single-line JSON payload inside an HTML
// comment, e.g.:
//   <!-- PROPOSAL_METRICS {"assignmentAlignment":{...},...} -->
// (whitespace and newlines inside the comment are tolerated). Multiple
// markers in one turn are tolerated — we use the last one.
const PROPOSAL_METRICS_RE = /<!-- PROPOSAL_METRICS\s*([\s\S]*?)\s*-->/g;

function extractProposalMetrics(
  text: string
): Omit<ProposalMetrics, "updatedAt"> | null {
  const matches = [...text.matchAll(PROPOSAL_METRICS_RE)];
  if (matches.length === 0) return null;
  const last = matches[matches.length - 1];
  try {
    const parsed = JSON.parse(last[1]) as {
      assignmentAlignment?: { score?: unknown; reason?: unknown };
      goalAlignment?: { score?: unknown; reason?: unknown };
      professorAcceptance?: {
        concerns?: Array<{ severity?: unknown; issue?: unknown }>;
      };
    };

    const aa = parsed.assignmentAlignment;
    const ga = parsed.goalAlignment;
    const pa = parsed.professorAcceptance;
    if (
      !aa ||
      typeof aa.score !== "number" ||
      typeof aa.reason !== "string" ||
      !ga ||
      typeof ga.score !== "number" ||
      typeof ga.reason !== "string" ||
      !pa ||
      !Array.isArray(pa.concerns)
    ) {
      return null;
    }

    const concerns: ProposalMetrics["professorAcceptance"]["concerns"] = [];
    for (const c of pa.concerns) {
      if (
        c &&
        typeof c.issue === "string" &&
        (c.severity === "low" || c.severity === "medium" || c.severity === "high")
      ) {
        concerns.push({ severity: c.severity, issue: c.issue });
      }
    }

    return {
      assignmentAlignment: {
        score: clampScore(aa.score),
        reason: aa.reason,
      },
      goalAlignment: {
        score: clampScore(ga.score),
        reason: ga.reason,
      },
      professorAcceptance: { concerns },
    };
  } catch {
    return null;
  }
}

function clampScore(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

// ── Goal profile extraction ─────────────────────────────────────────

const PROFILE_MARKER_RE =
  /<!-- GOAL_PROFILE_JSON -->\s*```(?:json)?\s*([\s\S]*?)\s*```\s*<!-- \/GOAL_PROFILE_JSON -->/;

function extractGoalProfile(text: string): StudentGoalProfile | null {
  const match = text.match(PROFILE_MARKER_RE);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[1]);
    // Validate minimum required fields
    if (!parsed.careerGoals?.primary) return null;
    // Ensure required arrays exist
    if (!Array.isArray(parsed.sectionsOffered)) parsed.sectionsOffered = [];
    if (!Array.isArray(parsed.sectionsCompleted)) parsed.sectionsCompleted = [];
    return parsed as StudentGoalProfile;
  } catch {
    return null;
  }
}

function sessionExportToMarkdown(
  student: StudentProfile,
  profile: StudentGoalProfile | undefined,
  exportedAt: string
): string {
  const lines: string[] = [];

  lines.push(`# Profile: ${student.name}`);
  lines.push("");

  // Student Profile (always present)
  lines.push("## Student Profile");
  lines.push("");
  lines.push(`**Major:** ${student.major}`);
  lines.push(`**Year:** ${student.year}`);
  lines.push(`**Course:** ${student.course}`);
  lines.push(`**Career goals:** ${student.careerGoals}`);
  lines.push("");

  // Goal profile sections (only if present)
  if (profile) {
    lines.push(`**Goal profile created:** ${profile.createdAt}`);
    lines.push("");

    lines.push("## Career Goals");
    lines.push("");
    lines.push(`**Primary goal:** ${profile.careerGoals.primary}`);
    if (profile.careerGoals.secondary) {
      lines.push(`**Secondary goal:** ${profile.careerGoals.secondary}`);
    }
    if (profile.careerGoals.targetEmployers?.length) {
      lines.push(
        `**Target employers:** ${profile.careerGoals.targetEmployers.join(", ")}`
      );
    }
    if (profile.careerGoals.industryPreference) {
      lines.push(
        `**Industry preference:** ${profile.careerGoals.industryPreference}`
      );
    }
    if (profile.careerGoals.timeline) {
      lines.push(`**Timeline:** ${profile.careerGoals.timeline}`);
    }
    lines.push("");

    if (profile.motivations) {
      lines.push("## Motivations");
      lines.push("");
      if (profile.motivations.whatExcitesYou) {
        lines.push(
          `**What excites you:** ${profile.motivations.whatExcitesYou}`
        );
      }
      if (profile.motivations.whyThisPath) {
        lines.push(`**Why this path:** ${profile.motivations.whyThisPath}`);
      }
      if (profile.motivations.problemsToSolve) {
        lines.push(
          `**Problems to solve:** ${profile.motivations.problemsToSolve}`
        );
      }
      lines.push("");
    }

    if (profile.personalContext) {
      lines.push("## Personal Context");
      lines.push("");
      if (profile.personalContext.workStatus) {
        lines.push(`**Work status:** ${profile.personalContext.workStatus}`);
      }
      if (profile.personalContext.relevantExperience) {
        lines.push(
          `**Relevant experience:** ${profile.personalContext.relevantExperience}`
        );
      }
      if (profile.personalContext.constraints) {
        lines.push(`**Constraints:** ${profile.personalContext.constraints}`);
      }
      if (profile.personalContext.perspective) {
        lines.push(`**Perspective:** ${profile.personalContext.perspective}`);
      }
      lines.push("");
    }

    if (
      profile.skillsSelfAssessment &&
      Object.keys(profile.skillsSelfAssessment).length > 0
    ) {
      lines.push("## Skills Self-Assessment");
      lines.push("");
      lines.push("| Skill | Level |");
      lines.push("|-------|-------|");
      for (const [skill, level] of Object.entries(
        profile.skillsSelfAssessment
      )) {
        const label = skill.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        lines.push(`| ${label} | ${level} |`);
      }
      lines.push("");
    }
  }

  lines.push("---");
  lines.push(`*Generated by AssignmentAlly on ${exportedAt}*`);
  lines.push("");
  lines.push(
    "*Upload the JSON version of this file on the start page to resume without re-taking the survey.*"
  );

  return lines.join("\n");
}

// ── Profile download endpoint ───────────────────────────────────────
// Returns the combined session export: the intro-survey StudentProfile
// (always) plus the richer StudentGoalProfile (when one has been built).

app.get(
  "/api/session/:sessionId/profile",
  (req: Request, res: Response) => {
    const sid = String(req.params.sessionId);
    const session = sessions.get(sid);
    if (!session) {
      res.status(404).json({ error: "Session not found." });
      return;
    }

    const format = String(req.query.format ?? "json");
    const safeName = session.student.name.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-");
    const exportedAt = new Date().toISOString();

    if (format === "markdown") {
      const md = sessionExportToMarkdown(
        session.student,
        session.goalProfile,
        exportedAt
      );
      res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${safeName}-profile.md"`
      );
      res.send(md);
    } else {
      const payload: SessionExport = {
        version: 1,
        exportedAt,
        student: session.student,
        ...(session.goalProfile ? { goalProfile: session.goalProfile } : {}),
      };
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${safeName}-profile.json"`
      );
      res.json(payload);
    }
  }
);

app.listen(PORT, () => {
  console.log(`AssignmentAlly running at http://localhost:${PORT}`);
});
