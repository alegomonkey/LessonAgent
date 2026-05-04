import { callClaude } from "../client.js";
import { clampScore } from "../io.js";
import type { ProposalMetrics } from "../types.js";

const SYSTEM = `You are an academic evaluator. You score how thoroughly an augmented assignment proposal covers every original rubric criterion and learning outcome from the source assignment.

Scoring rubric (use these thresholds verbatim):
- 90–100: every original rubric criterion is explicitly addressed in the proposal; depth is added without removing or weakening any requirement.
- 70–89: every criterion is addressed but one or two only thinly; the mapping is loose and could be tightened.
- Below 70: a criterion is missing, weakened, or the augmented version replaces a requirement instead of adding to it.

Be honest. Inflated scores are useless. If a criterion is missing, score below 70.

Output exactly one line of valid JSON and nothing else, in this shape:
{"score": <integer 0-100>, "reason": "<one sentence>"}`;

function buildUser(assignment: string, proposal: string): string {
  return `ORIGINAL ASSIGNMENT:
"""
${assignment}
"""

AUGMENTED PROPOSAL:
"""
${proposal}
"""

Score the augmented proposal's rubric coverage of the original assignment. Output the JSON.`;
}

const JSON_LINE_RE = /\{[\s\S]*\}/;

export interface AssignmentAlignmentRunResult {
  metric: ProposalMetrics["assignmentAlignment"];
  rawResponse: string;
  prompt: { system: string; user: string };
  durationMs: number;
}

export async function runAssignmentAlignment(
  assignment: string,
  proposal: string,
  model?: string
): Promise<AssignmentAlignmentRunResult> {
  const user = buildUser(assignment, proposal);
  const { text, durationMs } = await callClaude({
    system: SYSTEM,
    user,
    model,
    maxTokens: 400,
  });
  const match = text.match(JSON_LINE_RE);
  if (!match) {
    throw new Error(
      `assignmentAlignment: model did not return JSON. Raw output: ${text}`
    );
  }
  const parsed = JSON.parse(match[0]) as {
    score?: unknown;
    reason?: unknown;
  };
  if (typeof parsed.score !== "number" || typeof parsed.reason !== "string") {
    throw new Error(
      `assignmentAlignment: malformed JSON. Got: ${JSON.stringify(parsed)}`
    );
  }
  return {
    metric: { score: clampScore(parsed.score), reason: parsed.reason },
    rawResponse: text,
    prompt: { system: SYSTEM, user },
    durationMs,
  };
}
