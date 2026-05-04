# AssignmentAlly Evaluation Harness

Self-contained directory that scores AssignmentAlly proposals on three metrics:

1. **Assignment-structure alignment** — how thoroughly the augmented version covers every original rubric criterion (0–100).
2. **Student-goal-profile alignment** — how well the augmentation serves the student's stated career goals (0–100).
3. **Potential conflict areas from the professor** — concrete reasons a real professor might push back, each tagged `low` / `medium` / `high` severity.

It works on **any** version of the LessonAgent project: the directory has its own `package.json`, its own `tsconfig.json`, and calls Anthropic's API directly via `@anthropic-ai/sdk`. It does not depend on `@anthropic-ai/claude-agent-sdk` and does not modify any host-project files. Drop the folder into an older checkout, install its own dependencies, run.

## Setup

```bash
cd evaluation
npm install
echo "ANTHROPIC_API_KEY=sk-..." > .env       # or export it in your shell
```

Optional: `ANTHROPIC_MODEL=claude-opus-4-7` (default) or any Claude model id.

## Two ways to use it

### A. Score one proposal you already have

```bash
npm run eval -- \
  --assignment path/to/assignment.md \
  --profile path/to/profile.json \
  --proposal path/to/proposal.md
```

Outputs:
- a `ProposalMetrics` JSON document on stdout (matches the host project's `src/types.ts` `ProposalMetrics` shape exactly),
- a timestamped log file under `evaluation/logs/` containing the prompts and raw model responses.

Single-metric mode:

```bash
npm run eval -- --metric goalAlignment --assignment ... --profile ... --proposal ...
```

`--metric` accepts `assignmentAlignment`, `goalAlignment`, `professorAcceptance`, or `all` (default).

### B. Run the persona study

The harness ships with three pre-defined student personas — freshman, junior, senior — each with a `profile.json` and an `assignment.md`. You generate a proposal per persona by running each one through the AssignmentAlly UI (whichever version of the project you're testing), save the proposal, then run the study script to score everything and produce a markdown report.

Personas live under `evaluation/personas/`:

| Folder | Persona |
|---|---|
| `freshman-big-dreams/` | First-semester CS freshman, sweeping ambitions, near-zero coding experience. |
| `junior-jaded/` | Junior in Information Systems, vague career goals, mild burnout. |
| `senior-expert/` | Graduating CS senior, FAANG-bound, strong systems skills. |

Workflow for a given project version (label it `current`, `old`, or anything you like):

1. Start the host project's agent (e.g. `npm run dev` from the project root in that branch / checkout).
2. For each persona:
   - Open `personas/<persona>/profile.json` and `personas/<persona>/assignment.md`.
   - Paste them into the AssignmentAlly UI as the student profile and the assignment to augment.
   - Run through Analyze → Align → Build until the agent produces a final formal proposal.
   - Save the proposal markdown to `personas/<persona>/proposals/proposal.<version>.md`.
3. Run the study:
   ```bash
   npm run study -- --version <version>
   ```
4. Read the generated markdown report under `evaluation/reports/study-<version>-<timestamp>.md`.

To compare across project versions, repeat steps 1–3 inside an older checkout of the project (with this `evaluation/` directory copied in) and use a different `--version` label. You'll have two reports under `reports/` — diff or read them side-by-side.

Run a subset of personas:

```bash
npm run study -- --version current --personas freshman-big-dreams,senior-expert
```

## What the study report contains

Every report has the four sections the rubric of this study calls for:

- **What was evaluated** — the personas, the project version, the model, the date.
- **Personas** + **Results** tables — assignment-alignment score, goal-alignment score, professor-concern count, and max severity per persona.
- **Per-persona detail** — score-with-reason for each metric and the full list of professor concerns.
- **Example output** — raw `ProposalMetrics` JSON for the most interesting persona.
- **Conclusions** — at least one written conclusion derived from the results (e.g., goal-alignment spread across personas).

The conclusions section is auto-derived from the score patterns; edit the report afterward to add qualitative observations.

## File layout

```
evaluation/
├── README.md
├── package.json                 # @anthropic-ai/sdk + dotenv only
├── tsconfig.json
├── src/
│   ├── run.ts                   # single-proposal CLI
│   ├── study.ts                 # persona study CLI
│   ├── types.ts                 # ProposalMetrics, PersonaResult, StudyReport
│   ├── io.ts                    # file IO + score clamping + log writer
│   ├── client.ts                # Anthropic SDK wrapper
│   ├── metrics/
│   │   ├── assignmentAlignment.ts
│   │   ├── goalAlignment.ts
│   │   └── professorAcceptance.ts
│   └── report/
│       └── markdown.ts
├── personas/
│   ├── freshman-big-dreams/
│   ├── junior-jaded/
│   └── senior-expert/
├── reports/                     # generated study reports
└── logs/                        # per-run logs (prompts + raw responses)
```

## Cost note

A full study run is **3 metrics × 3 personas = 9 Anthropic API calls** per project version. Token usage per call is small (proposals are short relative to context windows), but be aware that running across two versions doubles the cost.

## Output schema

The output JSON exactly matches the host project's `ProposalMetrics` interface (`src/types.ts:51-58` in the current branch):

```ts
interface ProposalMetrics {
  assignmentAlignment: { score: number; reason: string };
  goalAlignment: { score: number; reason: string };
  professorAcceptance: {
    concerns: Array<{ severity: "low" | "medium" | "high"; issue: string }>;
  };
  updatedAt: string;
}
```

This means you can pipe `npm run eval` output into the host project's `extractProposalMetrics()` function (`src/server.ts`) for verification.
