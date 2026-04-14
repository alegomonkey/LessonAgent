import "dotenv/config";
import { randomUUID } from "crypto";
import express, { type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { buildOptions } from "./config.js";
import type { ChatSession, StudentProfile } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ?? 3000;

// In-memory session store
const sessions = new Map<string, ChatSession>();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Create a new session with student profile
app.post("/api/session", (req: Request, res: Response) => {
  const { name, major, year, careerGoals, course } = req.body as StudentProfile;

  if (!name || !major || !year || !careerGoals || !course) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  const session: ChatSession = {
    id: randomUUID(),
    student: { name, major, year, careerGoals, course },
    createdAt: Date.now(),
  };

  sessions.set(session.id, session);
  res.json({ sessionId: session.id });
});

// Chat endpoint — streams agent responses via SSE
app.post("/api/chat", async (req: Request, res: Response) => {
  const { sessionId, message } = req.body as {
    sessionId: string;
    message: string;
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

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Build the prompt — on first message, include student context
  let prompt = message;
  if (!session.sdkSessionId) {
    const s = session.student;
    prompt =
      `[Student context — use this to personalize your responses]\n` +
      `Name: ${s.name}\n` +
      `Major: ${s.major}\n` +
      `Year: ${s.year}\n` +
      `Career goals: ${s.careerGoals}\n` +
      `Course they want to work on: ${s.course}\n\n` +
      `[Student's message]\n${message}`;
  }

  try {
    const options = buildOptions({
      maxTurns: 50,
      ...(session.sdkSessionId ? { resume: session.sdkSessionId } : {}),
    });

    const conversation = query({ prompt, options });

    for await (const msg of conversation) {
      if (msg.type === "assistant") {
        const content = (msg as Record<string, unknown>).message as
          | { content?: Array<{ type: string; text?: string }> }
          | undefined;
        if (content?.content) {
          for (const block of content.content) {
            if (block.type === "text" && block.text) {
              res.write(
                `data: ${JSON.stringify({ type: "text", content: block.text })}\n\n`
              );
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
        res.write(
          `data: ${JSON.stringify({
            type: "done",
            sessionId: sdkSessionId,
            success: result.subtype === "success",
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

app.listen(PORT, () => {
  console.log(`AssignmentAlly running at http://localhost:${PORT}`);
});
