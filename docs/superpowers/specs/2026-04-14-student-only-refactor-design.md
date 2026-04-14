# AssignmentAlly: Student-Only Refactor Design

## Context

The LessonAgent project is currently a dual-mode system serving both faculty and students. Faculty get full course redesign capabilities (syllabus audits, tiered recommendations, constraint management, accreditation validation). Students get read-only recommendations.

This refactor removes all faculty functionality and rebuilds the system from the student's perspective. The core concept: **a student uses the agent to create augmented assignments** — versions that do everything the original assignment requires (meeting the same rubric) *plus* add career-relevant depth. The student then proposes this augmented assignment to their professor.

The professor is not a user of this system. The professor is the audience for the student's proposal.

## Agent Identity

**Name:** AssignmentAlly

**Role:** Personal tool that helps students build augmented versions of their coursework — richer, career-connected assignments that meet all original learning goals and rubric criteria, plus add meaningful depth.

**Output:** Formal proposal documents students present to professors for approval.

**Boundary:** The agent proposes; the professor decides.

## Safety Principles

1. **Rubric compliance is non-negotiable.** Every augmented assignment must demonstrably meet all original rubric criteria. The agent never suggests removing or weakening requirements.
2. **Augment, don't reduce.** The augmented version is a superset — it does everything the original requires, plus more. Never advocate for less work.
3. **Propose, don't mandate.** The agent drafts proposals. The professor has final authority. The agent helps the student make a compelling case, not circumvent faculty decisions.
4. **Honest about limitations.** When the agent lacks data about a field or career path, it says so rather than guessing.

## Skills Pipeline

Three skills in a linear pipeline:

```
Student pastes syllabus/assignment
        |
        v
[1. Assignment Analysis] -- extracts learning outcomes, rubric, Bloom's level
        |
        v
[2. Career Alignment] -- maps career goals to assignment, finds augmentation opportunities
        |
        v
[3. Proposal Builder] -- generates formal proposal document with rubric proof
        |
        v
Student gets a polished proposal to bring to professor
```

### Skill 1: Assignment Analysis

**Location:** `skills/assignment-analysis/SKILL.md`

**Purpose:** Parse a course syllabus or specific assignment prompt to extract structured data the student needs.

**Input:** Raw syllabus or assignment description (markdown, plain text, LMS paste).

**Output:** Structured assignment profile:
- Learning outcomes covered (with Bloom's level and action verbs)
- Rubric criteria (extracted or inferred)
- Assessment weight in the course
- Format requirements (page count, presentation length, deliverable type)
- Prerequisites/dependencies on other assignments

**Behavior:** If given a whole syllabus, asks which assignment the student wants to augment, then focuses extraction on that assignment.

**References kept:**
- `references/bloom-taxonomy.md` (from current syllabus-analysis)
- `references/syllabus-parsing-patterns.md` (from current syllabus-analysis)

**Removed from current syllabus-analysis:**
- Full course audit report
- Accreditation gap analysis
- Industry coverage gaps (Skill 2's job)
- Assessment coverage matrix
- Single-point-of-failure flagging

### Skill 2: Career Alignment

**Location:** `skills/career-alignment/SKILL.md`

**Purpose:** Connect the student's career goals to the assignment's learning outcomes. Identify where augmentation adds meaningful career-relevant depth.

**Input:** Student's career goals + assignment profile (from Skill 1).

**Output:** Alignment analysis:
- Career competencies required for the target role
- Mapping of assignment outcomes to career competencies (STRONG / PARTIAL / NONE)
- Augmentation opportunities — specific career competencies the student can exercise on top of the original work
- Suggested augmentation directions (concrete, not generic)

**Key framing shift:** "Gaps to fix" becomes "opportunities to augment." The student isn't told their assignment is deficient — they're shown where they can add depth.

**References kept:**
- `references/career-taxonomy.md` (from current goal-alignment)
- `references/industry-skills-mapping.md` (from current goal-alignment)

**Removed from current goal-alignment:**
- Aggregate student data reporting
- Faculty privacy rules
- Course-level coverage metrics
- Gap severity scoring

### Skill 3: Proposal Builder

**Location:** `skills/proposal-builder/SKILL.md`

**Purpose:** Generate a formal, polished proposal document the student presents to their professor.

**Input:** Assignment profile (Skill 1) + alignment analysis (Skill 2) + student preferences.

**Output:** Formal proposal with these sections:
1. **Header** — Student name, course, assignment, date, professor name
2. **Summary** — One paragraph: what the augmented assignment is and why
3. **Original Requirements Met** — Table mapping every original rubric criterion to how the augmented version addresses it
4. **Augmentation Components** — What the student adds beyond the original, with career rationale
5. **Deliverables** — Concrete list of what the student will submit
6. **Timeline** — When the student will complete each component
7. **Career Rationale** — How this connects to the student's career goals

**References kept:**
- `references/assessment-types.md` (from current assessment-redesign)
- `references/rubric-templates.md` (from current assessment-redesign)

**Replaces entirely:**
- `recommendation-generation` skill
- `assessment-redesign` skill
- `accreditation-guardrails` skill

## Commands

| Command | Skill | Purpose |
|---|---|---|
| `/analyze-assignment` | assignment-analysis | Parse syllabus or assignment prompt |
| `/align-career` | career-alignment | Map career goals to assignment outcomes |
| `/build-proposal` | proposal-builder | Generate formal augmented assignment proposal |

**Removed:** `/analyze-syllabus`, `/align-goals`, `/show-constraints`, `/generate-recommendations`, `/redesign-assessment`

## Agents

| Agent | Skills Used | Purpose |
|---|---|---|
| `assignment-analyzer` | assignment-analysis | Complex syllabus/assignment parsing |
| `career-matcher` | career-alignment | Multi-step career goal matching |
| `proposal-writer` | proposal-builder | Full proposal document assembly |

**Removed:** `syllabus-auditor`, `goal-matcher`, `recommendation-engine`, `assessment-designer`, `accreditation-checker`

## Data Directory

### Keep
- `data/syllabi/` — Course syllabi (students reference these)
- `data/industry/` — Career competency maps (drives alignment)
- `data/users/student-*.json` — Student profiles with career goals (existing schema retained as-is: career goals, enrolled courses, background, skills self-assessment)

### Remove
- `data/users/faculty-*.json` — No faculty mode
- `data/accreditation/` — No accreditation checks
  - `abet-cac-cs.json`
  - `cs-degree-requirements.json`
  - `umaine-gen-ed-framework.json`

## Reference Files

### Keep (relocated to new skill directories)

| File | From | To |
|---|---|---|
| `bloom-taxonomy.md` | `skills/syllabus-analysis/references/` | `skills/assignment-analysis/references/` |
| `syllabus-parsing-patterns.md` | `skills/syllabus-analysis/references/` | `skills/assignment-analysis/references/` |
| `career-taxonomy.md` | `skills/goal-alignment/references/` | `skills/career-alignment/references/` |
| `industry-skills-mapping.md` | `skills/goal-alignment/references/` | `skills/career-alignment/references/` |
| `assessment-types.md` | `skills/assessment-redesign/references/` | `skills/proposal-builder/references/` |
| `rubric-templates.md` | `skills/assessment-redesign/references/` | `skills/proposal-builder/references/` |

### Remove
- `constraint-types.md`
- `revision-tiers.md`
- `workload-estimation.md`
- `abet-criteria.md`
- `general-education-requirements.md`

## Examples

### New Positive Examples

**P1 — Student augments a speech assignment into a technical demo**
Emily Tran (CS junior, cloud engineer goal) takes CMJ 103 Speech 4 and proposes a live technical product demo. The agent shows all oral comm rubric criteria are still met (organization, delivery, audience adaptation) plus she adds technical depth demonstrating container orchestration. Formal proposal produced.

**P2 — Student augments an OS lab into a container deployment exercise**
Marcus Williams (EET senior, controls engineer) takes a COS 431 lab and proposes extending it to include real-world container deployment. The original lab requirements (process management, memory allocation) are preserved; the augmentation adds industry-relevant containerization work.

**P3 — Student with a non-technical career goal**
A student targeting education or healthcare uses the agent. The agent adapts — career alignment works across disciplines, not just tech. Demonstrates the system's breadth.

### New Negative Examples

**N1 — Student tries to reduce workload**
Student asks agent to make an assignment "easier" or "shorter." Agent refuses: augmentation means more, not less. Redirects to finding career-relevant ways to make the work more meaningful.

**N2 — Augmented version misses rubric criteria**
Student proposes something that sounds cool but doesn't actually meet a rubric criterion. Agent catches it, shows which criterion would be missed, and suggests how to adjust.

**N3 — Unknown discipline/career path**
Student asks about a career the agent has no data for. Agent is honest about the limitation, offers to work with whatever the student can describe about the career's requirements.

### Remove All Existing Examples
All 8 current examples (P1-P4, N1-N4) are faculty-centered or dual-mode. Replace entirely.

## Sample Outputs

### New
- `examples/outputs/sample-assignment-profile.md` — Skill 1 output
- `examples/outputs/sample-alignment-analysis.md` — Skill 2 output
- `examples/outputs/sample-proposal.md` — Skill 3 output (the formal proposal document)
- `examples/outputs/sample-rubric-compliance-map.md` — The rubric proof table from the proposal

### Remove All Existing
- `sample-audit-report.md` (faculty-oriented)
- `sample-alignment-matrix.md` (faculty-oriented)
- `sample-recommendation-plan.md` (faculty-oriented)
- `sample-rubric.md` (faculty-oriented)

## Documentation

### Rewrite
- `docs/workflow-diagram.md` — New 3-step student pipeline diagram
- `CLAUDE.md` — New agent identity, safety principles, workflow, data locations

### Remove or Update
- `formationClaude4_13.txt` — Review for faculty content; remove if faculty-centric

## Plugin Configuration

Update `.claude-plugin/plugin.json` to reflect new agent name, description, and commands.

## Verification

After implementation, verify by:
1. Running each command (`/analyze-assignment`, `/align-career`, `/build-proposal`) with a sample syllabus and student profile
2. Confirming the proposal output contains all 7 required sections
3. Confirming the rubric compliance table maps every original criterion
4. Testing negative cases: workload reduction request is refused, rubric miss is caught
5. Confirming no faculty-facing content remains in any file
6. Confirming all removed files are actually deleted
7. Confirming reference files are correctly relocated to new skill directories
