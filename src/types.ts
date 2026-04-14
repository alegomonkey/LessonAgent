export interface StudentProfile {
  name: string;
  major: string;
  year: string;
  careerGoals: string;
  course: string;
}

export type PipelineStep = "ready" | "analyzed" | "aligned" | "proposed";

export interface ChatSession {
  id: string;
  student: StudentProfile;
  sdkSessionId?: string;
  pipelineStep: PipelineStep;
  createdAt: number;
}

export interface SessionResult {
  success: boolean;
  result?: string;
  costUsd: number;
  turns: number;
  sessionId: string;
  durationMs: number;
}
