import { callClaude } from "../client.js";
import { clampScore } from "../io.js";
import type { ProposalMetrics } from "../types.js";

const SYSTEM = `You are an academic evaluator. You score how well an augmented assignment proposal serves a specific student's stated career goals, motivations, and personality. Read the student profile carefully — note primary career goal, target employers (if listed), industry preference, motivations, and any constraints — then judge the proposal against those.

Scoring rubric (use these thresholds verbatim):
- 90–100: the augmentation directly develops a primary-career competency for the student's named target role / employer / industry, and would produce a concrete portfolio artifact the student could show that employer.
- 70–89: there is meaningful career relevance, but the connection is general (industry-flavored) rather than specific to the student's named target role / employer.
- Below 70: the augmentation is generic or only loosely tied to the student's stated goals; it could apply to almost any student in this major.

If the student's profile itself states only vague goals, the score should reflect that — a vague profile rarely deserves a 90+ even if the proposal is creative, because the connection cannot be specific.

Be honest. Inflated scores are useless.

Output exactly one line of valid JSON and nothing else, in this shape:
{"score": <integer 0-100>, "reason": "<one sentence>"}`;

function buildUser(profile: string, proposal: string): string {
  return `STUDENT PROFILE:
"""
${profile}
"""

AUGMENTED PROPOSAL:
"""
${proposal}
"""

Score how well the augmentation serves this specific student's stated career goals. Output the JSON.`;
}

const JSON_LINE_RE = /\{[\s\S]*\}/;

export interface GoalAlignmentRunResult {
  metric: ProposalMetrics["goalAlignment"];
  rawResponse: string;
  prompt: { system: string; user: string };
  durationMs: number;
}

export async function runGoalAlignment(
  profile: string,
  proposal: string,
  model?: string
): Promise<GoalAlignmentRunResult> {
  const user = buildUser(profile, proposal);
  const { text, durationMs } = await callClaude({
    system: SYSTEM,
    user,
    model,
    maxTokens: 400,
  });
  const match = text.match(JSON_LINE_RE);
  if (!match) {
    throw new Error(
      `goalAlignment: model did not return JSON. Raw output: ${text}`
    );
  }
  const parsed = JSON.parse(match[0]) as {
    score?: unknown;
    reason?: unknown;
  };
  if (typeof parsed.score !== "number" || typeof parsed.reason !== "string") {
    throw new Error(
      `goalAlignment: malformed JSON. Got: ${JSON.stringify(parsed)}`
    );
  }
  return {
    metric: { score: clampScore(parsed.score), reason: parsed.reason },
    rawResponse: text,
    prompt: { system: SYSTEM, user },
    durationMs,
  };
}
