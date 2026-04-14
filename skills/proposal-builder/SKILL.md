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

## Reference Files

- `references/assessment-types.md` — Catalog of authentic assessment types with descriptions, Bloom's levels, and effort estimates.
- `references/rubric-templates.md` — Rubric templates and guidelines for criterion design, learning outcome mapping, and career competency annotations.
