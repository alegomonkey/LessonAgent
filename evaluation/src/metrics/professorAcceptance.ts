import { callClaude } from "../client.js";
import type { ConcernSeverity, ProposalMetrics } from "../types.js";

const SYSTEM = `You are role-playing as the professor who assigned the original assignment. A student has presented an augmented version of the assignment and is asking for your approval. Read the original assignment and the augmented proposal, then list concrete reasons you might push back on this proposal as the professor.

Each concern must be a specific, concrete issue grounded in the proposal — not a generic worry. If you have no real concerns, return an empty list.

Severity rubric (use these thresholds verbatim):
- "low" — a small adjustment would resolve it (e.g., add a midpoint check-in, clarify a deliverable format).
- "medium" — meaningful risk that needs the student to plan a mitigation (external tool dependency, ambitious timeline, novel format the professor may be unfamiliar with).
- "high" — likely blocker if not addressed (potential rubric gap, scope clearly exceeds proportional effort, request for grading changes).

Output exactly one valid JSON object on a single line and nothing else, in this shape:
{"concerns":[{"severity":"low|medium|high","issue":"<one sentence>"}]}

Empty list is allowed: {"concerns":[]}`;

function buildUser(assignment: string, proposal: string): string {
  return `ORIGINAL ASSIGNMENT (your assignment, as the professor):
"""
${assignment}
"""

AUGMENTED PROPOSAL (what the student is asking you to approve):
"""
${proposal}
"""

As this professor, list your concrete concerns with severity. Output the JSON.`;
}

const JSON_LINE_RE = /\{[\s\S]*\}/;

export interface ProfessorAcceptanceRunResult {
  metric: ProposalMetrics["professorAcceptance"];
  rawResponse: string;
  prompt: { system: string; user: string };
  durationMs: number;
}

function isSeverity(s: unknown): s is ConcernSeverity {
  return s === "low" || s === "medium" || s === "high";
}

export async function runProfessorAcceptance(
  assignment: string,
  proposal: string,
  model?: string
): Promise<ProfessorAcceptanceRunResult> {
  const user = buildUser(assignment, proposal);
  const { text, durationMs } = await callClaude({
    system: SYSTEM,
    user,
    model,
    maxTokens: 600,
  });
  const match = text.match(JSON_LINE_RE);
  if (!match) {
    throw new Error(
      `professorAcceptance: model did not return JSON. Raw output: ${text}`
    );
  }
  const parsed = JSON.parse(match[0]) as {
    concerns?: Array<{ severity?: unknown; issue?: unknown }>;
  };
  if (!Array.isArray(parsed.concerns)) {
    throw new Error(
      `professorAcceptance: malformed JSON, concerns must be array. Got: ${JSON.stringify(parsed)}`
    );
  }
  const concerns: ProposalMetrics["professorAcceptance"]["concerns"] = [];
  for (const c of parsed.concerns) {
    if (c && typeof c.issue === "string" && isSeverity(c.severity)) {
      concerns.push({ severity: c.severity, issue: c.issue });
    }
  }
  return {
    metric: { concerns },
    rawResponse: text,
    prompt: { system: SYSTEM, user },
    durationMs,
  };
}
