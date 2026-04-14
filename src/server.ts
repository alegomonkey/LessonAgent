import "./polyfills.js";
import "dotenv/config";
import { randomUUID } from "crypto";
import express, { type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { buildOptions } from "./config.js";
import type { ChatSession, PipelineStep, StudentProfile } from "./types.js";

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
  res.json({ sessionId: session.id, pipelineStep: session.pipelineStep });
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

        // Advance pipeline state on success
        const success = result.subtype === "success";
        if (success && stepForPrompt) {
          advancePipeline(session, stepForPrompt);
        }

        res.write(
          `data: ${JSON.stringify({
            type: "done",
            sessionId: sdkSessionId,
            success,
            pipelineStep: session.pipelineStep,
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

app.listen(PORT, () => {
  console.log(`AssignmentAlly running at http://localhost:${PORT}`);
});
