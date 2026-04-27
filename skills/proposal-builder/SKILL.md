---
name: proposal-builder
description: "Use when the user asks to 'build a proposal', 'write a proposal for my professor', 'create the augmented assignment', 'draft a proposal', 'format the proposal', 'put this together for my professor', or is ready to produce the formal document after analysis and alignment."
---

# Proposal Builder Skill

## Purpose

Generate a formal, polished proposal document the student presents to their professor for approval. This is the terminal skill in the pipeline — its output is the product the student takes away. The proposal must prove that every original rubric criterion is met while demonstrating meaningful career-relevant augmentation.

## When This Skill Applies

Invoke this skill when:

- The student has an assignment profile (from assignment-analysis) and alignment analysis (from career-alignment) and is ready to build the proposal.
- The student says "let's write the proposal," "draft it for my professor," or "I'm ready to build this."
- The student has chosen an augmentation direction and wants it formalized into a document.

This skill requires both the assignment profile and alignment analysis. If either is missing, suggest running the prerequisite skill first.

## Core Workflow

### Step 1: Confirm Inputs

Before generating the proposal, confirm with the student:

1. **Student information**: name, course, section, professor name, date
2. **Chosen augmentation direction**: which suggested augmentation (from career-alignment) they want to pursue, or their own idea
3. **Any modifications**: the student may want to adjust the direction based on their own thinking

### Step 2: Design the Augmented Assignment

Based on the chosen direction, design the augmented version:

1. Start with every original requirement — deliverables, format, rubric criteria. These are non-negotiable.
2. Layer the augmentation components on top: what the student adds beyond the original, with specific deliverables for each component.
3. **Build the rubric compliance table.** For every original rubric criterion, write a brief explanation of how the augmented version addresses it. This is the proof that the student is not trying to dodge requirements.
4. If any criterion would be weakened or missed by the augmentation, stop and adjust the design until full compliance is achieved. Do not proceed with a proposal that has a rubric gap.

Use `references/assessment-types.md` for authentic assessment format ideas and `references/rubric-templates.md` for rubric mapping patterns.

### Step 3: Build the Timeline

Create a realistic timeline:

1. Work backward from the due date.
2. Identify milestones for both original and augmented components.
3. Estimate effort for each component. The total augmentation should add 25-50% beyond the original effort — enough to be meaningful, not so much as to be infeasible.
4. If the augmentation makes total effort disproportionate, suggest scaling back the augmentation scope to the student before proceeding.

### Step 4: Write the Career Rationale

Draft a concise section connecting the augmented work to the student's career goals:

1. Name the target career and 1-2 specific competencies the augmentation develops.
2. Cite industry data if available (from `data/industry/`).
3. Explain how the augmented work goes beyond course requirements in a professionally meaningful way.
4. Write in a tone appropriate for a professor: respectful, evidence-based, not salesy.

### Step 5: Assemble the Formal Proposal

Produce the proposal with exactly these 7 sections:

#### Section 1: Header
- Student name
- Course number and title
- Assignment title
- Professor name
- Date submitted
- Proposal title (e.g., "Proposal: Augmented Lab 5 — xv6 Virtual Memory + Linux Memory Isolation")

#### Section 2: Summary
One paragraph (3-5 sentences): what the augmented assignment is, why the student is proposing it, and the key benefit. This is the professor's first impression — clear and compelling.

#### Section 3: Original Requirements Met
A table with three columns:

| Original Rubric Criterion | Points | How the Augmented Version Addresses It |
|---|---|---|

Every row from the original rubric must appear. The third column explains concretely how the augmented version satisfies the criterion. This section is the proof that the student is not trying to circumvent requirements.

#### Section 4: Augmentation Components
What the student adds beyond the original, as a bulleted list. Each component includes:
- What it is
- Why it is career-relevant
- What the deliverable looks like

#### Section 5: Deliverables
A numbered list of everything the student will submit. Includes both original and augmentation deliverables. Specifies format for each (PDF, code repository, recording, etc.).

#### Section 6: Timeline
A table showing when each component will be completed:

| Date | Milestone | Component |
|---|---|---|

Shows the professor the student has planned the work realistically.

#### Section 7: Career Rationale
The career connection from Step 4. Brief (1-2 paragraphs), tied to specific competencies, respectful in tone.

### Step 6: Student Review

Present the complete proposal to the student. Ask:

1. "Does this accurately represent what you want to do?"
2. "Is there anything you want to add, remove, or adjust?"
3. "Are you comfortable presenting this to [professor name]?"

Make any requested adjustments. The student owns this document.

## Proposal Tone Guidelines

The proposal speaks FOR the student TO the professor:

- **Respectful**: "I am proposing" not "I want to change your assignment"
- **Evidence-based**: cite rubric criteria and career data, not feelings
- **Additive framing**: "in addition to meeting all original requirements"
- **No entitlement**: the proposal is a request, not a demand
- **Professional**: appropriate for an academic document — clear, direct, no slang

## Important Constraints

- **Every rubric criterion must appear in the compliance table.** If the augmented version cannot demonstrably meet a criterion, the proposal is not ready. Adjust the design before proceeding.
- **The professor decides.** Include language like "pending your approval" or "if you find this acceptable." Never frame the augmentation as a fait accompli.
- **Proportional effort.** If the augmentation requires dramatically more work than the original, flag this to the student and suggest scaling back.
- **No grade negotiation.** The proposal does not ask for extra credit, bonus points, or modified grading criteria. It asks to do the same assignment in an augmented format, graded on the same rubric.

## Emit Proposal Metrics (Internal)

After delivering a proposal — the very first one or any later revision — append a `PROPOSAL_METRICS` marker at the very end of your response, after `<!-- PIPELINE_GATE ... -->` if you also emit one. The server parses the marker and renders a metrics panel beside the chat. The student never sees the marker itself: the UI strips it before display.

**Internal only.** Do not describe the marker, the panel, or the scoring process to the student in chat. Just write a normal proposal-presentation response and append the marker silently.

### When to emit

- The turn produced a brand-new formal proposal (Step 5 just completed).
- The turn produced a revised proposal because the student asked for changes ("tighten the timeline," "make goal alignment stronger," "swap component X for Y," etc.).

### When NOT to emit

- The turn was confirming inputs or asking clarifying questions (Step 1) and no proposal was produced.
- The turn was purely conversational — answering a definition question, talking through tradeoffs without rewriting the proposal.
- The student asked you to revise but you have not yet produced the revised text.

### Marker format

Single-line valid JSON inside an HTML comment. Place it on its own lines after the proposal body:

```
<!-- PROPOSAL_METRICS
{"assignmentAlignment":{"score":<0-100>,"reason":"<one sentence>"},"goalAlignment":{"score":<0-100>,"reason":"<one sentence>"},"professorAcceptance":{"concerns":[{"severity":"<low|medium|high>","issue":"<one sentence>"}]}}
-->
```

### Field meanings and scoring guidance

- **`assignmentAlignment.score`** — How thoroughly the augmented version covers every original rubric criterion and learning outcome.
  - 90–100: every criterion is explicitly addressed in the compliance table; depth added without removal.
  - 70–89: every criterion addressed but one or two only thinly; tighten the mapping.
  - <70: a criterion is missing or weakened. **Do not deliver a proposal at this score** — return to Step 2 of the workflow and fix the gap first.

- **`goalAlignment.score`** — How well the augmentation actually serves the student's stated career goals, motivations, and personality (from the goal profile and prior alignment work).
  - 90–100: directly develops a primary-career competency with concrete artifacts the student could show an employer.
  - 70–89: meaningful career relevance but the connection is general, not specific to the student's named target role / employer / industry.
  - <70: augmentation is generic or only loosely tied to the student's goals. Discuss with the student before finalizing.

- **`professorAcceptance.concerns`** — Concrete reasons a real professor might push back on this proposal. List the specific issue, not a generic worry. Empty array means no concerns.
  - `severity: "low"` — a small adjustment would resolve it (e.g., add a midpoint check-in, clarify a deliverable format).
  - `severity: "medium"` — meaningful risk that needs the student to plan a mitigation (external tool dependency, ambitious timeline, novel format the professor may be unfamiliar with).
  - `severity: "high"` — likely blocker if not addressed (potential rubric gap, scope clearly exceeds proportional effort, request for grading changes). Treat high-severity as a signal to rework the proposal before delivering.

Be honest. The metrics are most useful when they reflect the proposal's real weaknesses; inflated scores defeat the purpose of the panel.

### Examples

Fresh proposal, strong fit, two minor concerns:

```
<!-- PROPOSAL_METRICS
{"assignmentAlignment":{"score":95,"reason":"All six rubric criteria addressed; depth added without removing requirements."},"goalAlignment":{"score":82,"reason":"Strong fit with primary career goal (Controls Engineer); secondary goal less directly served."},"professorAcceptance":{"concerns":[{"severity":"low","issue":"Augmented timeline is tight against the original two-week window — recommend a midpoint check-in."},{"severity":"medium","issue":"PLC simulator dependency may need IT approval; frame as a request rather than a fait accompli."}]}}
-->
```

Revised proposal where the student asked you to strengthen goal alignment:

```
<!-- PROPOSAL_METRICS
{"assignmentAlignment":{"score":94,"reason":"Rubric coverage unchanged from prior revision."},"goalAlignment":{"score":91,"reason":"Added an industry-specific deliverable (PLC ladder logic spec) that maps directly to target Controls Engineer role."},"professorAcceptance":{"concerns":[{"severity":"low","issue":"Augmented timeline still tight — keep the midpoint check-in."}]}}
-->
```

Proposal with no concerns flagged:

```
<!-- PROPOSAL_METRICS
{"assignmentAlignment":{"score":92,"reason":"All criteria explicitly mapped."},"goalAlignment":{"score":85,"reason":"Develops two named career competencies with portfolio artifacts."},"professorAcceptance":{"concerns":[]}}
-->
```

## Reference Files

- `references/assessment-types.md` — Catalog of authentic assessment types with descriptions, Bloom's levels, and effort estimates.
- `references/rubric-templates.md` — Rubric templates and guidelines for criterion design, learning outcome mapping, and career competency annotations.
