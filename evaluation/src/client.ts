import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as dotenvConfig } from "dotenv";
import { EVAL_ROOT } from "./io.js";

const localEnv = resolve(EVAL_ROOT, ".env");
if (existsSync(localEnv)) {
  dotenvConfig({ path: localEnv, override: false });
}

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-4-7";

export interface CallArgs {
  system: string;
  user: string;
  model?: string;
  maxTokens?: number;
}

export interface CallResult {
  text: string;
  model: string;
  durationMs: number;
}

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ANTHROPIC_API_KEY is not set. Add it to evaluation/.env or your shell environment."
      );
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}

export async function callClaude(args: CallArgs): Promise<CallResult> {
  const model = args.model ?? DEFAULT_MODEL;
  const maxTokens = args.maxTokens ?? 1024;
  const start = Date.now();
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const resp = await getClient().messages.create({
        model,
        max_tokens: maxTokens,
        system: args.system,
        messages: [{ role: "user", content: args.user }],
      });
      const text = resp.content
        .map((b) => (b.type === "text" ? b.text : ""))
        .join("")
        .trim();
      return { text, model, durationMs: Date.now() - start };
    } catch (err) {
      lastError = err;
      const status = (err as { status?: number })?.status;
      if (status && status >= 500 && attempt === 0) {
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

export function defaultModel(): string {
  return DEFAULT_MODEL;
}
