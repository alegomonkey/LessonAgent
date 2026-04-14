---
name: assignment-analysis
description: "Use when the user asks to 'analyze an assignment', 'parse a syllabus', 'extract rubric criteria', 'check learning outcomes', 'understand what an assignment requires', or pastes an assignment prompt, syllabus section, or course document."
---

# Assignment Analysis Skill

## Purpose

Parse a course syllabus or specific assignment prompt to extract structured data the student needs before augmenting the assignment. This skill transforms unstructured assignment descriptions into a clear profile: what the assignment requires, what it measures, and what format it demands. The assignment profile is the foundation that the career-alignment and proposal-builder skills depend on.

## When This Skill Applies

Invoke this skill when:

- A student pastes or uploads an assignment prompt, syllabus, or course document.
- A student asks "what does this assignment actually require?" or "what's the rubric?"
- A student wants to understand the rubric criteria, learning outcomes, or format requirements before proposing changes.
- The career-alignment skill needs structured assignment data and none exists yet.

## Core Workflow

Follow these steps in order. Do not skip steps unless the user explicitly requests a partial analysis.

### Step 1: Accept the Input

Accept the assignment in any format:

- **Full syllabus**: If the student provides a whole syllabus, ask which specific assignment they want to augment, then extract data for that assignment in the context of the full course.
- **Single assignment prompt**: Parse directly.
- **Pasted text from an LMS**: Handle Canvas, Blackboard, and Moodle formatting artifacts — strip HTML tags, preserve list structure and table formatting, separate boilerplate from instructor content.
- **File path**: Read the file and determine format from extension and content.

Use the parsing heuristics in `references/syllabus-parsing-patterns.md` to identify section boundaries. When a section is ambiguous or missing, ask the student rather than guessing.

### Step 2: Extract Learning Outcomes

For the target assignment, extract:

1. Every learning outcome the assignment is designed to measure. Check both the assignment description and the syllabus learning outcomes section.
2. For each outcome, classify its Bloom's taxonomy level using `references/bloom-taxonomy.md`. Identify the primary action verb, then check contextual modifiers that may raise or lower the classification.
3. Note any accreditation or gen-ed mappings mentioned (e.g., "ABET SO-2", "WOC"). These become constraints the augmented version must also satisfy — not because the student checks accreditation, but because the professor will notice if the mapping breaks.

### Step 3: Extract Rubric Criteria

Extract every grading criterion:

1. If an explicit rubric is provided, extract each criterion with its point value and level descriptors (Exceeds / Meets / Developing / Beginning or equivalent).
2. If no explicit rubric is provided, infer grading criteria from the assignment description. Look for phrases like "you will be graded on," "assessment criteria include," or weighted percentage breakdowns. Mark inferred criteria as INFERRED and ask the student to confirm.
3. For each criterion, note what distinguishes high performance from low performance — this is what the rubric compliance table in the proposal will need to address.

### Step 4: Extract Format Requirements

Identify all format constraints:

- **Deliverable type**: paper, presentation, code submission, lab report, portfolio, poster, demo, etc.
- **Length/duration**: page count, word count, presentation minutes, code complexity expectations
- **Submission format**: PDF, GitHub repo, LMS upload, in-person delivery, recorded video
- **Individual vs. group**: and if group, expected group size and how individual contribution is assessed
- **Due date and timeline**: including any intermediate milestones or drafts
- **Specific structural requirements**: e.g., "must include abstract," "APA format," "include a demo," "use provided template"

### Step 5: Identify Context Within the Course

If syllabus data is available:

- What percentage of the final grade does this assignment carry?
- What other assignments precede or follow it? Does this build on prior work or feed into future work?
- What topics from the course schedule does this assignment cover?
- Are there any special conditions (e.g., this is the gen-ed signature assignment, this is an ABET assessment instrument)?

### Step 6: Produce the Assignment Profile

Assemble the structured output with these sections:

1. **Assignment Metadata**: title, course, weight, due date, format
2. **Learning Outcomes**: each outcome with Bloom's level and action verb
3. **Rubric Criteria**: each criterion with point allocation and performance indicators
4. **Format Requirements**: deliverable type, length, submission method
5. **Course Context**: prerequisites, related assignments, topics covered
6. **Augmentation Readiness**: a brief note on which elements are FIXED (must be preserved exactly in any augmented version) vs. FLEXIBLE (could be expanded or modified in format while still meeting the criterion)

Present this to the student for confirmation before proceeding to career alignment.

## Important Constraints

- **Analysis only.** This skill extracts and structures data. It does not suggest changes or augmentations — that is the career-alignment skill's job.
- **Preserve original language.** When quoting rubric criteria or learning outcomes, use the exact language from the source document. Do not paraphrase.
- **Flag uncertainty.** If a Bloom's classification or rubric extraction is uncertain, note both possibilities and the reasoning. Do not silently choose one.
- **No assumptions about quality.** Report findings neutrally. An assignment with all Bloom's Level 1 outcomes may be appropriate for the course level. Present the data; let the student and downstream skills interpret it.

## Reference Files

- `references/bloom-taxonomy.md` — Bloom's Revised Taxonomy classification table, verb lists for each level, decision tree for resolving ambiguous verbs.
- `references/syllabus-parsing-patterns.md` — Common section header variations, parsing heuristics for freeform text, LMS export handling strategies.
