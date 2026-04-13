---
name: goal-alignment
description: "This skill should be used when the user asks to 'match career goals to courses', 'align student goals with curriculum', 'find career-relevant content', 'identify skill gaps', 'map career paths to learning outcomes', 'check if a course prepares students for a career', or mentions career goal alignment, skill gap analysis, industry skill mapping, or career path matching."
---

# Goal Alignment Skill

## Purpose

Map student-declared career goals to course learning outcomes, identify where the curriculum supports those goals and where gaps exist, and produce an alignment matrix that quantifies coverage. This skill bridges the gap between what a course teaches (as documented in its learning outcomes) and what students need (as defined by their career aspirations and the competencies those careers demand). The alignment matrix and gap report provide the evidence base for the recommendation-generation skill to propose targeted course modifications that increase career relevance.

## When This Skill Applies

Invoke this skill when any of the following conditions hold:

- A student asks how a specific course connects to their career goals or what career-relevant skills the course develops.
- A faculty member wants to understand how their course serves the career aspirations of their student population.
- The recommendation-generation skill needs alignment data to prioritize which gaps to address.
- A department chair or curriculum committee requests data on how well a set of courses prepares students for target career paths.
- A user asks to "map career goals," "check skill alignment," "find career gaps," or any variation of career-to-curriculum matching.

This skill requires structured learning outcomes data for the target course. If no syllabus audit exists for the course, suggest running the syllabus-analysis skill first to produce the structured audit, then return to this skill.

## Core Workflow

Follow these steps in order. Each step depends on the output of the previous step.

### Step 1: Accept and Normalize Career Goals

Gather career goals from one of the following sources:

- **Direct user input**: the user states a career goal in freeform text (e.g., "I want to become a data scientist" or "My students mostly want to go into software engineering or product management").
- **Student profile data**: load career goals from `data/users/` if the student has a stored profile with declared goals.
- **Aggregate class data**: for faculty requests, load all student profiles associated with the course section and aggregate their career goals.

Once gathered, normalize each freeform goal against the career taxonomy defined in `references/career-taxonomy.md`. The normalization process works as follows:

1. Parse the stated goal to extract the target role or career area.
2. Match it to the closest entry in the career taxonomy. Use keyword matching and semantic similarity. For example, "I want to work in AI" maps to "ML/AI Research" or "Data Science" depending on context.
3. If a goal does not match any taxonomy entry, create an ad-hoc entry and flag it for manual review. Do not discard unrecognized goals.
4. Record the normalized career goal with its taxonomy identifier for use in subsequent steps.

When working with aggregate data for a faculty member, compute the distribution of career goals across taxonomy categories (e.g., "42% software engineering, 23% data science, 15% cybersecurity, 20% other/undeclared").

### Step 2: Extract Required Competencies for Each Career Goal

For each normalized career goal, determine the competencies required for entry-level success in that career. Use two sources:

1. **Industry skills mapping**: load the competency requirements from `references/industry-skills-mapping.md` for the matched career taxonomy entry.
2. **Industry data files**: check `data/industry/` for supplementary data such as job posting analyses, employer surveys, or professional body requirements specific to the career.

Produce a competency list for each career goal. Each competency should include:

- A concise name (e.g., "Data Structures and Algorithms").
- A brief description of what the competency entails at entry level.
- A priority level: CORE (essential for any entry-level position), IMPORTANT (expected by most employers), or BENEFICIAL (differentiating but not required).

### Step 3: Load Course Learning Outcomes

Retrieve the structured learning outcomes for the target course. Check these sources in order:

1. **Existing syllabus audit**: load from `data/syllabi/` if the syllabus-analysis skill has already processed this course.
2. **Raw syllabus data**: if no audit exists but a raw syllabus is available, suggest running the syllabus-analysis skill first.
3. **User-provided outcomes**: if no stored data exists, ask the user to provide the learning outcomes directly.

Each learning outcome should already have its Bloom's taxonomy classification from the syllabus audit. If not, classify it using the process defined in the syllabus-analysis skill before proceeding.

### Step 4: Score Alignment Between Competencies and Learning Outcomes

For each required competency from Step 2, compare it against every learning outcome from Step 3. Assign one of three alignment scores:

- **STRONG**: the learning outcome directly teaches the competency. The student who achieves this LO will possess the competency at an appropriate level. Example: the competency is "version control" and the LO is "Use Git to manage collaborative software projects including branching, merging, and pull request workflows."
- **PARTIAL**: the learning outcome provides foundational knowledge that supports the competency but does not fully develop it. The student gains relevant background but would need additional learning to be competent. Example: the competency is "version control" and the LO is "Explain the principles of software configuration management."
- **MISSING**: no learning outcome in the course addresses this competency in any meaningful way.

When scoring, apply these guidelines:

- Match on substance, not keywords. A learning outcome about "collaborative development practices" may strongly cover "version control" even without using the exact term.
- Consider Bloom's level. A Remember-level LO about a topic provides weaker coverage than an Apply-level LO about the same topic. A Remember-level LO for an Apply-level competency should generally be scored as PARTIAL rather than STRONG.
- When uncertain, score as PARTIAL rather than STRONG and note the uncertainty.

### Step 5: Compute Alignment Metrics

Calculate the following metrics for each career goal:

**Overall Alignment Percentage**: (STRONG count * 1.0 + PARTIAL count * 0.5) / total required competencies * 100

**Core Competency Coverage**: the same formula applied only to CORE-priority competencies. This metric matters more than overall alignment because missing a core competency is more consequential than missing a beneficial one.

**Bloom's Level Match**: for each STRONG alignment, check whether the learning outcome's Bloom's level is appropriate for the competency. A competency requiring hands-on application (e.g., "write SQL queries") should be covered by an Apply-level or higher LO. Flag mismatches where the LO is at a lower Bloom's level than the competency demands.

**Gap Severity Score**: for each MISSING competency, assign a severity based on its priority: CORE = 3, IMPORTANT = 2, BENEFICIAL = 1. Sum the severity scores to produce a total gap severity. Higher scores indicate more urgent gaps.

### Step 6: Produce Alignment Matrix and Gap Report

Assemble the final output with the following components:

**Alignment Matrix Table**: a table with columns for career goal, required competency, competency priority, matching learning outcome (if any), alignment score (STRONG/PARTIAL/MISSING), and notes. Sort by career goal, then by competency priority (CORE first).

**Summary Statistics**: for each career goal, report the overall alignment percentage, core competency coverage percentage, gap severity score, and a one-sentence natural-language summary (e.g., "This course covers 68% of software engineering competencies, but is missing version control and testing, both of which are core skills").

**Strongest Connections**: list the top 3-5 learning outcomes that provide the broadest career coverage, explaining which competencies they support and for which career goals.

**Largest Gaps**: list the top 3-5 competencies that are MISSING across the most student career goals, ordered by aggregate gap severity. These represent the highest-impact opportunities for course improvement.

**Aggregate View (for faculty)**: if the analysis covers multiple career goals from a class roster, produce a heat map or summary table showing which competencies are most in-demand across the student population and how well the course covers them.

## Alignment Scoring Rubric

Use these detailed definitions to ensure consistent scoring:

| Score | Criteria | Example |
|---|---|---|
| STRONG | The LO explicitly develops the competency. A student achieving the LO at the expected Bloom's level will possess the competency. The connection is direct and unambiguous. | Competency: "Write unit tests." LO: "Develop and execute unit tests for Java applications using JUnit." |
| PARTIAL | The LO provides supporting knowledge or adjacent skill. The student gains relevant background but would need additional practice or instruction to fully possess the competency. | Competency: "Write unit tests." LO: "Explain the principles of software quality assurance including testing strategies." |
| MISSING | No LO in the course addresses this competency. The student would gain no relevant knowledge or skill toward this competency from this course alone. | Competency: "Write unit tests." No LO mentions testing, quality assurance, or verification in any form. |

When multiple learning outcomes partially cover a competency, do not automatically upgrade to STRONG. Instead, list each partial match and note that the combined effect may approach full coverage. Leave the final judgment to the user or the recommendation-generation skill.

## Privacy Rules

Adhere strictly to the following privacy constraints:

- **Faculty viewing aggregate data**: when a faculty member requests alignment data for their class, provide ONLY aggregate statistics. Report career goal distributions as percentages and counts, not as lists of individual students. Example of acceptable output: "57% of students with profiles target software engineering; 23% target data science." Example of prohibited output: "Alice targets software engineering; Bob targets data science."
- **Faculty viewing individual data**: never reveal an individual student's career goals, profile contents, or alignment results to a faculty member, even if the faculty member asks for it by name.
- **Students viewing their own data**: a student may see their own alignment matrix, gap report, and all details of their own career goals and how they map to course outcomes.
- **Cross-student comparisons**: never produce output that allows a student to see another student's career goals or alignment data.
- **Stored data**: when writing alignment results to `data/users/`, ensure the file permissions and access controls match the privacy rules above.

If a user requests data that would violate these rules, explain the privacy constraint and offer the permissible alternative (e.g., aggregate data instead of individual data).

## Reference Files

Consult the following reference files during execution:

- `references/career-taxonomy.md` -- contains the career cluster taxonomy with specific roles, required competency areas, typical employers, and connections to university programs. Use this to normalize freeform career goals into structured taxonomy entries.
- `references/industry-skills-mapping.md` -- contains detailed competency requirements for specific career paths, mapped to typical courses. Use this to extract the required competencies for each career goal and to inform alignment scoring.
