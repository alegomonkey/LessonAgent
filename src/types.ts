export interface StudentProfile {
  name: string;
  major: string;
  year: string;
  careerGoals: string;
  course: string;
}

export interface ChatSession {
  id: string;
  student: StudentProfile;
  sdkSessionId?: string;
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
