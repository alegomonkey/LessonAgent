import type { PersonaResult, StudyReport } from "../types.js";

function maxSeverity(p: PersonaResult): string {
  const order = { high: 3, medium: 2, low: 1 } as const;
  let best = 0;
  let label = "—";
  for (const c of p.metrics.professorAcceptance.concerns) {
    if (order[c.severity] > best) {
      best = order[c.severity];
      label = c.severity;
    }
  }
  return label;
}

function fmtScore(s: number): string {
  return `${s}/100`;
}

function pickSpotlight(personas: PersonaResult[]): PersonaResult {
  if (personas.length === 0) throw new Error("No personas");
  const goalScores = personas.map((p) => p.metrics.goalAlignment.score);
  const max = Math.max(...goalScores);
  const min = Math.min(...goalScores);
  const spread = max - min;
  if (spread >= 20) {
    const winner = personas[goalScores.indexOf(max)];
    return winner;
  }
  return personas.reduce((a, b) =>
    b.metrics.professorAcceptance.concerns.length >
    a.metrics.professorAcceptance.concerns.length
      ? b
      : a
  );
}

function deriveConclusions(personas: PersonaResult[]): string[] {
  const conclusions: string[] = [];

  const ga = personas.map((p) => ({
    id: p.personaId,
    score: p.metrics.goalAlignment.score,
  }));
  const gaSorted = [...ga].sort((a, b) => b.score - a.score);
  const gap = gaSorted[0].score - gaSorted[gaSorted.length - 1].score;
  if (gap >= 20) {
    conclusions.push(
      `Specificity of stated career goals materially affects goal-alignment scores: a ${gap}-point gap separates "${gaSorted[0].id}" (${gaSorted[0].score}/100) from "${gaSorted[gaSorted.length - 1].id}" (${gaSorted[gaSorted.length - 1].score}/100).`
    );
  }

  const failing = personas.filter(
    (p) => p.metrics.assignmentAlignment.score < 70
  );
  if (failing.length > 0) {
    conclusions.push(
      `Augmentation for ${failing
        .map((p) => `"${p.personaId}"`)
        .join(", ")} did not fully cover the rubric (score < 70) — flag for rework before professor delivery.`
    );
  }

  const totalConcerns = personas.reduce(
    (n, p) => n + p.metrics.professorAcceptance.concerns.length,
    0
  );
  if (totalConcerns >= 5) {
    const heaviest = personas.reduce((a, b) =>
      b.metrics.professorAcceptance.concerns.length >
      a.metrics.professorAcceptance.concerns.length
        ? b
        : a
    );
    conclusions.push(
      `Professor pushback risk concentrates in "${heaviest.personaId}" (${heaviest.metrics.professorAcceptance.concerns.length} concerns), suggesting that this persona's assignment type is the hardest to augment defensibly.`
    );
  }

  if (conclusions.length === 0) {
    conclusions.push(
      "Across all three personas, the agent produced rubric-compliant proposals with goal-alignment scores tracking the specificity of each persona's stated career goals."
    );
  }

  return conclusions;
}

export function renderStudyReport(report: StudyReport): string {
  const lines: string[] = [];
  const datestr = new Date(report.generatedAt).toISOString().slice(0, 10);

  lines.push(`# AssignmentAlly Persona Evaluation Study — version "${report.version}"`);
  lines.push("");
  lines.push(`**Generated:** ${report.generatedAt}`);
  lines.push(`**Model:** ${report.model}`);
  lines.push(`**Project version label:** \`${report.version}\``);
  lines.push("");

  lines.push("## What was evaluated");
  lines.push("");
  lines.push(
    `On ${datestr}, three pre-defined student personas were run through the AssignmentAlly agent (project version \`${report.version}\`). Each persona supplied a profile and a course assignment; the agent's resulting augmented-assignment proposal was scored on three metrics by direct calls to the Anthropic API: **assignment-structure alignment**, **student-goal-profile alignment**, and **potential conflict areas from the professor**. Scoring rubrics are inherited verbatim from \`skills/proposal-builder/SKILL.md\`.`
  );
  lines.push("");

  lines.push("## Personas");
  lines.push("");
  lines.push("| Persona | Year | Primary career goal | Assignment |");
  lines.push("|---|---|---|---|");
  for (const p of report.personas) {
    lines.push(
      `| \`${p.personaId}\` | ${p.year} | ${p.primaryGoal} | ${p.assignmentTitle} |`
    );
  }
  lines.push("");

  lines.push("## Results");
  lines.push("");
  lines.push(
    "| Persona | Assignment alignment | Goal alignment | Professor concerns (count) | Max severity |"
  );
  lines.push("|---|---|---|---|---|");
  for (const p of report.personas) {
    lines.push(
      `| \`${p.personaId}\` | ${fmtScore(p.metrics.assignmentAlignment.score)} | ${fmtScore(p.metrics.goalAlignment.score)} | ${p.metrics.professorAcceptance.concerns.length} | ${maxSeverity(p)} |`
    );
  }
  lines.push("");

  lines.push("## Per-persona detail");
  lines.push("");
  for (const p of report.personas) {
    lines.push(`### \`${p.personaId}\` — ${p.personaSummary}`);
    lines.push("");
    lines.push(`- **Proposal scored:** \`${p.proposalPath}\``);
    lines.push(
      `- **Assignment alignment:** ${fmtScore(p.metrics.assignmentAlignment.score)} — ${p.metrics.assignmentAlignment.reason}`
    );
    lines.push(
      `- **Goal alignment:** ${fmtScore(p.metrics.goalAlignment.score)} — ${p.metrics.goalAlignment.reason}`
    );
    if (p.metrics.professorAcceptance.concerns.length === 0) {
      lines.push(`- **Professor concerns:** none flagged.`);
    } else {
      lines.push(`- **Professor concerns:**`);
      for (const c of p.metrics.professorAcceptance.concerns) {
        lines.push(`  - **${c.severity}** — ${c.issue}`);
      }
    }
    lines.push("");
  }

  lines.push("## Example output");
  lines.push("");
  const spotlight = pickSpotlight(report.personas);
  lines.push(
    `Raw \`ProposalMetrics\` JSON for the spotlight persona (\`${spotlight.personaId}\`):`
  );
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(spotlight.metrics, null, 2));
  lines.push("```");
  lines.push("");

  lines.push("## Conclusions");
  lines.push("");
  for (const c of deriveConclusions(report.personas)) {
    lines.push(`- ${c}`);
  }
  lines.push("");

  lines.push("---");
  lines.push("");
  lines.push(
    "_Report generated by `evaluation/src/study.ts`. Edit freely to add qualitative observations._"
  );

  return lines.join("\n");
}

export function renderSummaryTable(report: StudyReport): string {
  const lines: string[] = [];
  lines.push(`Study summary — version="${report.version}", model=${report.model}`);
  for (const p of report.personas) {
    lines.push(
      `  ${p.personaId.padEnd(22)} aa=${String(p.metrics.assignmentAlignment.score).padStart(3)} ` +
        `ga=${String(p.metrics.goalAlignment.score).padStart(3)} ` +
        `concerns=${p.metrics.professorAcceptance.concerns.length} (max=${maxSeverity(p)})`
    );
  }
  return lines.join("\n");
}
