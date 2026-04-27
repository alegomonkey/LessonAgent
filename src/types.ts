export interface StudentProfile {
  name: string;
  major: string;
  year: string;
  careerGoals: string;
  course: string;
}

export interface StudentGoalProfile {
  createdAt: string;
  updatedAt: string;

  careerGoals: {
    primary: string;
    secondary?: string;
    targetEmployers?: string[];
    industryPreference?: string;
    timeline?: string;
  };

  motivations?: {
    whatExcitesYou?: string;
    whyThisPath?: string;
    problemsToSolve?: string;
  };

  personalContext?: {
    workStatus?: string;
    relevantExperience?: string;
    constraints?: string;
    perspective?: string;
  };

  skillsSelfAssessment?: Record<string, string>;

  sectionsOffered: string[];
  sectionsCompleted: string[];
}

export interface SessionExport {
  version: 1;
  exportedAt: string;
  student: StudentProfile;
  goalProfile?: StudentGoalProfile;
}

export type PipelineStep = "ready" | "analyzed" | "aligned" | "proposed";

export type ConcernSeverity = "low" | "medium" | "high";

export interface ProposalMetrics {
  assignmentAlignment: { score: number; reason: string };
  goalAlignment: { score: number; reason: string };
  professorAcceptance: {
    concerns: Array<{ severity: ConcernSeverity; issue: string }>;
  };
  updatedAt: string;
}

export interface ChatSession {
  id: string;
  student: StudentProfile;
  sdkSessionId?: string;
  pipelineStep: PipelineStep;
  createdAt: number;
  goalProfile?: StudentGoalProfile;
  // Set by the pipeline-gate skill when it reports canAdvance=false — tells
  // the UI to render the halfway "awaiting input" marker on the connector
  // after this phase's chip. Persists across tangential (no-gate) turns.
  awaitingInfo?: "analyze" | "align" | "build" | null;
  // Latest metrics emitted by the proposal-builder skill. Replaced on every
  // turn that emits a fresh PROPOSAL_METRICS marker; preserved across
  // tangential turns that don't emit one.
  proposalMetrics?: ProposalMetrics;
}

export interface SessionResult {
  success: boolean;
  result?: string;
  costUsd: number;
  turns: number;
  sessionId: string;
  durationMs: number;
}
