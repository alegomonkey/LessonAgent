import type { Options } from "@anthropic-ai/claude-agent-sdk";
import { safetyHooks } from "./hooks.js";

export function buildOptions(overrides?: Partial<Options>): Options {
  // Remap API_KEY to ANTHROPIC_API_KEY if needed
  process.env.ANTHROPIC_API_KEY ??= process.env.API_KEY;

  return {
    // Load CLAUDE.md and project settings from filesystem
    settingSources: ["project"],

    // Load plugin manifest to discover commands/, skills/, agents/ at project root
    plugins: [{ type: "local", path: "." }],

    // Working directory = project root where CLAUDE.md lives
    cwd: process.cwd(),

    // Tools the agent needs for the three-skill pipeline
    allowedTools: [
      "Read",
      "Glob",
      "Grep",
      "Skill",
      "Agent",
      "AskUserQuestion",
      "TodoWrite",
    ],

    // No shell access needed in standalone deployment
    disallowedTools: ["Bash"],

    // No interactive permission UI — allow listed tools, deny everything else
    permissionMode: "dontAsk",

    // Cost and turn guards
    maxTurns: 30,
    maxBudgetUsd: 2.0,

    // Reasoning effort
    effort: "high",

    // Safety hooks (write path blocking, web access denial, stop logging)
    hooks: safetyHooks,

    // Pass environment through to the SDK process
    env: {
      ...(process.env as Record<string, string>),
    },

    // Apply any caller-provided overrides
    ...overrides,
  };
}
