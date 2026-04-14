# AssignmentAlly — Workflow Architecture

## Overview

AssignmentAlly operates through a 3-skill linear pipeline, 3 subagents, and 3 user-invoked commands. Each skill produces structured output consumed by the next skill. The final output is a formal proposal document the student presents to their professor.

## Data Flow Diagram

```
Student pastes syllabus or assignment prompt
              |
              v
  +----------------------------+
  | 1. ASSIGNMENT ANALYSIS     |  <-- /analyze-assignment
  | Parse assignment/syllabus  |
  | Extract:                   |
  |   - Learning outcomes      |
  |     (with Bloom's level)   |
  |   - Rubric criteria        |
  |   - Format requirements    |
  |   - Course context         |
  +-------------+--------------+
                |
                | Assignment Profile
                | (structured data)
                |
  Student provides career goals
                |
                v
  +----------------------------+
  | 2. CAREER ALIGNMENT        |  <-- /align-career
  | Map career to assignment   |
  | Produce:                   |
  |   - Competency mapping     |
  |   - Alignment scores       |
  |     (STRONG/PARTIAL/NONE)  |
  |   - Augmentation opps      |
  +-------------+--------------+
                |
                | Alignment Analysis
                | (opportunities, not gaps)
                |
  Student picks augmentation direction
                |
                v
  +----------------------------+
  | 3. PROPOSAL BUILDER        |  <-- /build-proposal
  | Generate formal proposal   |
  | Produce:                   |
  |   - Rubric compliance map  |
  |   - Augmentation design    |
  |   - Timeline               |
  |   - Career rationale       |
  +-------------+--------------+
                |
                | Formal Proposal Document
                | (7 sections, ready for professor)
                |
                v
  Student reviews, adjusts, and
  presents to professor for approval
```

## Skill Pipeline Sequence

| Step | Skill | Input | Output | Required? |
|------|-------|-------|--------|-----------|
| 1 | assignment-analysis | Raw assignment or syllabus | Assignment Profile | Yes (entry point) |
| 2 | career-alignment | Career goals + Assignment Profile | Alignment Analysis | Yes |
| 3 | proposal-builder | Assignment Profile + Alignment Analysis + student preferences | Formal Proposal | Yes (terminal output) |

## Subagent Dispatch Model

| Agent | Dispatched When | Skills Used | Tools |
|-------|----------------|-------------|-------|
| assignment-analyzer | Complex syllabus/assignment parsing | assignment-analysis | Read, Grep, Glob, Bash |
| career-matcher | Multi-step career goal matching | career-alignment | Read, Grep, Glob |
| proposal-writer | Full proposal document assembly | proposal-builder | Read, Write, Grep, Glob |

## Command-to-Workflow Mapping

| Command | Entry Point | Pipeline Steps Triggered |
|---------|------------|------------------------|
| `/analyze-assignment` | Step 1 | 1 only (produce assignment profile) |
| `/align-career` | Step 2 | 2 (uses step 1 output if available) |
| `/build-proposal` | Step 3 | 3 (uses step 1 + 2 outputs) |

## User Interaction Patterns

### Pattern 1: Full Pipeline
```
Student: /analyze-assignment [pastes CMJ 103 Speech 4 prompt]
Agent:   [Produces assignment profile: rubric, outcomes, format]
Student: /align-career "I want to be a cloud infrastructure engineer"
Agent:   [Produces alignment analysis: STRONG on audience adaptation,
         NONE on technical demonstration. Suggests: live demo format]
Student: /build-proposal
Agent:   [Produces 7-section proposal with rubric compliance proof]
Student: [Reviews, adjusts, presents to professor]
```

### Pattern 2: Conversational (No Commands)
```
Student: "I'm in COS 431 and Lab 5 is about virtual memory in xv6.
         I want to do something with containers too. Here's the prompt..."
Agent:   [assignment-analysis triggers, then career-alignment, then
         asks if student wants to build the proposal]
```

### Pattern 3: Guardrail Activation
```
Student: "Can you make this assignment shorter? Four speeches is too many."
Agent:   [Refuses workload reduction. Redirects: "I can help make each
         speech more career-relevant, but not reduce the number."]
```

### Pattern 4: Rubric Catch
```
Student: "Instead of the pair project, I'll do an individual container tool."
Agent:   [Catches: the pair component assesses teamwork. Shows rubric
         compliance table with MISSED criterion. Suggests alternatives.]
```

## Data Dependencies

```
data/syllabi/*.md ──────────> assignment-analysis
data/industry/*.json ───────> career-alignment
data/users/student-*.json ──> career-alignment (student's own profile)
references/*.md ────────────> all three skills
```

## Safety Architecture

Two layers, simplified from the old 3-layer faculty system:

1. **CLAUDE.md behavioral rules**: Establish identity, safety principles ("augment don't reduce"), and the student-only boundary.
2. **Skill-level constraints**: Each skill has built-in guardrails:
   - `assignment-analysis`: preserves original language, flags uncertainty, analysis only
   - `career-alignment`: frames as opportunities not gaps, honest about missing data, proportional augmentation
   - `proposal-builder`: rubric compliance table is mandatory — every criterion must be addressed, the professor decides

No accreditation-guardrails skill. The student does not manage accreditation — that is the institution's concern. The student's constraint is simpler and more direct: meet the rubric.
