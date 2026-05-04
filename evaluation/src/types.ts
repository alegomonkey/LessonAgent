export type ConcernSeverity = "low" | "medium" | "high";

export interface ProposalMetrics {
  assignmentAlignment: { score: number; reason: string };
  goalAlignment: { score: number; reason: string };
  professorAcceptance: {
    concerns: Array<{ severity: ConcernSeverity; issue: string }>;
  };
  updatedAt: string;
}

export interface EvalInputs {
  assignment: string;
  profile: string;
  proposal: string;
}

export type MetricName =
  | "assignmentAlignment"
  | "goalAlignment"
  | "professorAcceptance";

export interface PersonaResult {
  personaId: string;
  personaSummary: string;
  primaryGoal: string;
  year: string;
  assignmentTitle: string;
  metrics: ProposalMetrics;
  proposalPath: string;
}

export interface StudyReport {
  version: string;
  model: string;
  generatedAt: string;
  personas: PersonaResult[];
}
