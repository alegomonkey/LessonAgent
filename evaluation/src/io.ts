import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const EVAL_ROOT = resolve(__dirname, "..");

export async function readTextFile(path: string): Promise<string> {
  return readFile(path, "utf8");
}

export async function readProfile(path: string): Promise<string> {
  const raw = await readFile(path, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return raw;
  }
}

export function clampScore(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function timestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
}

export async function ensureDir(path: string): Promise<void> {
  if (!existsSync(path)) {
    await mkdir(path, { recursive: true });
  }
}

export async function writeFileSafe(path: string, content: string): Promise<void> {
  await ensureDir(dirname(path));
  await writeFile(path, content, "utf8");
}

export interface LogEntry {
  metric: string;
  prompt: { system: string; user: string };
  rawResponse: string;
  parsed: unknown;
  durationMs: number;
}

export async function writeLog(
  label: string,
  entries: LogEntry[],
  context: Record<string, unknown>
): Promise<string> {
  const file = resolve(EVAL_ROOT, "logs", `${label}-${timestamp()}.log`);
  const lines: string[] = [];
  lines.push(`# Evaluation log — ${label}`);
  lines.push(`generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Context");
  lines.push("```json");
  lines.push(JSON.stringify(context, null, 2));
  lines.push("```");
  lines.push("");
  for (const e of entries) {
    lines.push(`## Metric: ${e.metric}`);
    lines.push(`duration: ${e.durationMs}ms`);
    lines.push("");
    lines.push("### System prompt");
    lines.push("```");
    lines.push(e.prompt.system);
    lines.push("```");
    lines.push("### User prompt");
    lines.push("```");
    lines.push(e.prompt.user);
    lines.push("```");
    lines.push("### Raw response");
    lines.push("```");
    lines.push(e.rawResponse);
    lines.push("```");
    lines.push("### Parsed");
    lines.push("```json");
    lines.push(JSON.stringify(e.parsed, null, 2));
    lines.push("```");
    lines.push("");
  }
  await writeFileSafe(file, lines.join("\n"));
  return file;
}

export function truncate(text: string, max = 400): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + `\n…[${text.length - max} more chars truncated]`;
}
