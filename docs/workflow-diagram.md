# Goal-Aligned Education Agent — Workflow Architecture

## Overview

The Goal-Aligned Education Agent operates through a pipeline of 6 skills, 5 subagents, and 5 user-invoked commands. Skills chain together in a defined sequence with feedback loops. The accreditation-guardrails skill acts as a mandatory validation gate at multiple points.

## Data Flow Diagram

```
                    +-------------------+
                    | Faculty uploads   |
                    | syllabus          |
                    +--------+----------+
                             |
                             v
                    +-------------------+
                    | SYLLABUS-ANALYSIS |  <-- /analyze-syllabus command
                    | Parse, classify,  |
                    | map to standards  |
                    +--------+----------+
                             |
                             | Structured Audit Report
                             |
              +--------------+---------------+
              |                              |
              v                              v
    +-------------------+         +---------------------+
    | Student provides  |         | Faculty sets        |
    | career goals      |         | constraints         |
    +--------+----------+         +----------+----------+
             |                               |
             v                               v
    +-------------------+         +---------------------+
    | GOAL-ALIGNMENT    |  <--    | CONSTRAINT-         |
    | Match goals to    |    /align-goals  | MANAGEMENT |  <-- /show-constraints
    | course content    |         | Validate limits     |
    +--------+----------+         +----------+----------+
             |                               |
             | Alignment Matrix              | Validated Constraints
             |                               |
             +---------------+---------------+
                             |
                             v
                    +-------------------+
                    | RECOMMENDATION-   |  <-- /generate-recommendations
                    | GENERATION        |
                    | Produce tiered    |
                    | revision plan     |
                    +--------+----------+
                             |
                             | Candidate Recommendations
                             |
                             v
                    +-------------------+
                    | ACCREDITATION-    |
                    | GUARDRAILS        |
                    | Validate each     |
                    | change            |
                    +--------+----------+
                             |
                    +--------+----------+
                    |        |          |
                    v        v          v
                  SAFE    WARNING    BLOCKED
                    |        |          |
                    |        |          +---> Explain why, suggest alternative
                    |        |                      |
                    |        +---> Note action       |
                    |              items needed       |
                    |                                 |
                    +----------------+----------------+
                                     |
                                     v
                    +-------------------+
                    | ASSESSMENT-       |  <-- /redesign-assessment
                    | REDESIGN          |
                    | (if assessment    |
                    | changes needed)   |
                    +--------+----------+
                             |
                             | Career-branched alternatives + rubrics
                             |
                             v
                    +-------------------+
                    | ACCREDITATION-    |
                    | GUARDRAILS        |
                    | Final validation  |
                    +--------+----------+
                             |
                             v
                    +-------------------+
                    | Deliver to        |
                    | Faculty           |
                    | (review + decide) |
                    +-------------------+
```

## Skill Pipeline Sequence

| Step | Skill | Input | Output | Mandatory? |
|------|-------|-------|--------|------------|
| 1 | syllabus-analysis | Raw syllabus document | Structured audit report | Yes (entry point) |
| 2 | goal-alignment | Career goals + audit report | Alignment matrix | Recommended |
| 3 | constraint-management | Faculty constraints | Validated constraint profile | Yes (before recommendations) |
| 4 | recommendation-generation | Audit + alignment + constraints | Tiered revision plan | Yes (core output) |
| 5 | accreditation-guardrails | Proposed changes + accreditation data | Compliance report (SAFE/WARNING/BLOCKED) | MANDATORY |
| 6 | assessment-redesign | Assessment to modify + career paths | Career-branched alternatives + rubrics | Optional (if assessment changes needed) |
| 7 | accreditation-guardrails | New assessments | Final compliance check | MANDATORY (if step 6 occurred) |

## Subagent Dispatch Model

| Agent | Dispatched When | Skills Used | Tools |
|-------|----------------|-------------|-------|
| syllabus-auditor | Complex syllabus parsing needed | syllabus-analysis | Read, Grep, Glob, Bash |
| goal-matcher | Multi-step career-to-course matching | goal-alignment | Read, Grep, Glob |
| recommendation-engine | Tiered plan generation with constraint integration | recommendation-generation, constraint-management | Read, Grep, Glob, Bash |
| assessment-designer | Career-branched assessment creation with rubrics | assessment-redesign | Read, Write, Grep, Glob |
| accreditation-checker | Compliance validation against standards | accreditation-guardrails | Read, Grep, Glob |

## Command-to-Workflow Mapping

| Command | Entry Point | Pipeline Steps Triggered |
|---------|------------|------------------------|
| `/analyze-syllabus` | Step 1 | 1 only (audit report) |
| `/align-goals` | Step 2 | 2 (uses step 1 output if available) |
| `/show-constraints` | Step 3 | 3 only (display/set constraints) |
| `/generate-recommendations` | Step 4 | 4 + 5 (recommendations + accreditation check) |
| `/redesign-assessment` | Step 6 | 6 + 7 (redesign + accreditation check) |

## User Interaction Patterns

### Pattern 1: Full Pipeline (Faculty)
```
Faculty: /analyze-syllabus data/syllabi/cos431-operating-systems.md --accreditation abet
Agent:   [Produces audit report]
Faculty: /align-goals "cloud infrastructure engineer" --course data/syllabi/cos431-operating-systems.md
Agent:   [Produces alignment matrix showing 52% alignment]
Faculty: /show-constraints set --faculty-hours 25 --budget 500 --ta-hours 10
Agent:   [Displays constraint profile: "Moderate" severity]
Faculty: /generate-recommendations --tier all
Agent:   [Produces tiered plan with accreditation checks]
Faculty: /redesign-assessment "final exam" --careers software-engineering,data-science
Agent:   [Produces career-branched capstone with rubrics, accreditation-verified]
```

### Pattern 2: Quick Consultation (Student)
```
Student: "I want to be an ML engineer. How relevant is COS 431 for me?"
Agent:   [goal-alignment skill triggers, produces alignment matrix]
Student: "Can I propose a different final project?"
Agent:   [assessment-redesign skill triggers, produces proposal for faculty review]
```

### Pattern 3: Constrained Faculty (Minimal Changes)
```
Faculty: "I have no budget, no TA, and 3 hours. What can I do?"
Agent:   [constraint-management identifies "Critical" severity]
Agent:   [recommendation-generation produces Tier 1 only: prompt modifications, reading list updates]
Agent:   [Explicitly acknowledges: "With these constraints, only prompt and framing changes are feasible"]
```

### Pattern 4: Guardrail Activation
```
Faculty: "Remove virtual memory content and add Kubernetes"
Agent:   [accreditation-guardrails activates: BLOCKED]
Agent:   [Explains ABET requirement, prerequisite chain, foundational canon]
Agent:   [Proposes alternative: bridge exercise covering both theory and modern application]
```

## Data Dependencies

```
data/syllabi/*.md ────────────> syllabus-analysis
data/accreditation/*.json ───> accreditation-guardrails, syllabus-analysis
data/industry/*.json ────────> goal-alignment, recommendation-generation
data/users/faculty-*.json ──> constraint-management
data/users/student-*.json ──> goal-alignment (aggregate only for faculty)
```

## Safety Architecture

The agent has three layers of safety:

1. **CLAUDE.md behavioral rules**: Establish identity, persona modes, and high-level principles
2. **Skill-level constraints**: Each skill has built-in guardrails (e.g., goal-alignment has privacy rules, constraint-management has feasibility scoring)
3. **Accreditation-guardrails skill**: Mandatory validation gate that checks every proposed change against accreditation standards before it is presented to the user

No recommendation reaches the user without passing through all three layers.
