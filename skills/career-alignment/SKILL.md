---
name: career-alignment
description: "Use when the user asks to 'connect this to my career', 'find career-relevant angles', 'align with my goals', 'what skills does this build', 'how does this help me get a job', or mentions career goals, career paths, industry skills, or job relevance in the context of a specific assignment."
---

# Career Alignment Skill

## Purpose

Connect the student's career goals to the assignment's learning outcomes. Identify where augmentation adds meaningful career-relevant depth. The output is an opportunity map — not a gap report — showing the student where they can add value on top of the original work.

**Key framing shift from the old faculty-facing system:** "Gaps to fix" becomes "opportunities to augment." The student is not told their assignment is deficient. They are shown where they can add depth that serves their professional goals.

## When This Skill Applies

Invoke this skill when:

- A student has an assignment profile (from assignment-analysis) and wants to find career-relevant augmentation angles.
- A student asks "how does this assignment connect to my career?" or "what could I add to make this more relevant?"
- A student provides career goals and wants to see how they map to current coursework.
- The proposal-builder skill needs alignment data and none exists yet.

This skill requires structured assignment data. If no assignment profile exists, suggest running the assignment-analysis skill first.

## Core Workflow

### Step 1: Gather Career Goals

Gather the student's career goals from one of these sources, in priority order:

1. **Direct statement in conversation**: "I want to be a cloud infrastructure engineer." Use the student's own words.
2. **Student profile**: Load from `data/users/student-*.json` if the student has a stored profile with declared goals.
3. **Ask**: If no career goal is available, ask the student. Accept vague goals ("I want to work in tech," "something in healthcare") and work with them. Do not require specificity the student does not have — many students are still exploring.

Normalize the stated goal against `references/career-taxonomy.md`:

1. Parse the goal to extract the target role or career area.
2. Match to the closest taxonomy entry using keyword matching and semantic similarity.
3. If no match exists, create an ad-hoc entry and flag it. Do not discard unrecognized goals. Work with whatever the student can describe about the career's requirements.
4. Record the normalized goal for downstream use.

### Step 2: Extract Required Competencies

For the normalized career goal, determine entry-level competencies using two sources:

1. **Industry skills mapping**: load competency requirements from `references/industry-skills-mapping.md` for the matched career taxonomy entry.
2. **Industry data files**: check `data/industry/` for supplementary data — job posting analyses, employer surveys, professional body requirements.

Produce a competency list. Each competency includes:

- A concise name (e.g., "Container Technologies," "Patient Communication")
- A brief description of what entry-level looks like
- A priority level: CORE (essential for any entry-level position), IMPORTANT (expected by most employers), or BENEFICIAL (differentiating but not required)

### Step 3: Map Competencies to Assignment Outcomes

For each career competency, compare it against the assignment's learning outcomes from the assignment profile. Assign alignment scores:

- **STRONG**: The assignment outcome directly exercises this competency. A student who achieves this outcome will possess the competency.
- **PARTIAL**: The outcome provides foundational knowledge that supports the competency but does not fully develop it.
- **NONE**: No assignment outcome addresses this competency.

Scoring guidelines:

- Match on substance, not keywords. An outcome about "collaborative development practices" may strongly cover "version control" without using the exact term.
- Consider Bloom's level. A Remember-level outcome for an Apply-level competency is PARTIAL at best.
- When uncertain, score as PARTIAL and note the uncertainty.

### Step 4: Identify Augmentation Opportunities

For each competency scored PARTIAL or NONE, determine whether the student could exercise that competency WITHIN the context of the existing assignment. An augmentation opportunity must satisfy all four conditions:

1. **Additive** — it adds depth beyond the original requirements. The original work is fully preserved.
2. **Concrete** — "add a container deployment component" not "consider industry relevance."
3. **Proportional** — achievable alongside the original work. Aim for 25-50% additional effort, not 200%.
4. **Career-connected** — directly exercises a competency the student's target career demands.

Produce 2-4 concrete augmentation directions, ranked by:

- Relevance to the student's specific career goal
- Natural fit with the existing assignment structure
- Feasibility given the assignment's format and timeline

### Step 5: Produce the Alignment Analysis

Assemble the output:

1. **Career Goal Summary**: normalized goal, target role, key competencies
2. **Alignment Matrix**: table mapping each career competency to assignment outcomes with STRONG / PARTIAL / NONE scores
3. **Strongest Connections**: 2-3 ways the existing assignment already serves the career goal (validation, not criticism)
4. **Augmentation Opportunities**: 2-4 concrete directions with career rationale, ranked by relevance
5. **Recommended Direction**: the agent's top recommendation with a one-sentence explanation of why

Present to the student for discussion. The student picks the direction; the agent does not decide for them.

## Important Constraints

- **Opportunities, not gaps.** Frame everything as "you could add X" not "this assignment is missing X." The assignment is not deficient — the student is choosing to go deeper.
- **Honest about missing data.** If the career taxonomy does not cover the student's goal, say so. Offer to work with whatever the student can describe. Do not hallucinate competency requirements for careers you lack data on.
- **Proportional augmentation.** Do not suggest augmentations that would triple the assignment workload. The augmented version should stretch the student, not overwhelm them.
- **No individual data sharing.** This is a student-facing tool. The student sees their own data. Never reference other students' goals, profiles, or alignment results.

## Reference Files

- `references/career-taxonomy.md` — Career cluster taxonomy with specific roles, required competency areas, typical employers, and connections to university programs.
- `references/industry-skills-mapping.md` — Detailed competency requirements for specific career paths, mapped to typical courses and assessment types.
