---
name: align-goals
description: Match student career goals against course content and identify alignment gaps
argument-hint: "<career-goal-text-or-file> [--course <syllabus-path>] [--aggregate]"
allowed-tools: ["Read", "Grep", "Glob", "Agent"]
---

# /align-goals

Analyze how well a course's content aligns with student career goals.

## Arguments
- **career-goal** (required): Either a career goal description (e.g., "machine learning engineer") or a path to a student profile JSON file
- **--course** (optional): Path to a syllabus file. If omitted, use the most recently analyzed syllabus from the current conversation.
- **--aggregate** (optional): When used by faculty, load all student profiles from `data/users/student-*.json` and provide aggregate alignment statistics instead of individual data

## Execution Steps

1. **Load career goal(s)**: Parse the career goal from text input or load from a student profile JSON. If `--aggregate` is specified, load all student profiles and aggregate their goals.

2. **Normalize goals**: Map freeform career goals to entries in the career taxonomy (`skills/goal-alignment/references/career-taxonomy.md`).

3. **Extract required competencies**: For each career goal, identify required skills using `skills/goal-alignment/references/industry-skills-mapping.md` and industry data from `data/industry/`.

4. **Load course data**: Read the course syllabus (from `--course` path, from `data/syllabi/`, or from a prior analysis in this conversation). Extract learning outcomes.

5. **Score alignment**: For each required competency vs. each learning outcome, assign:
   - **STRONG**: The learning outcome directly teaches this competency
   - **PARTIAL**: The learning outcome provides foundational knowledge
   - **MISSING**: No relevant learning outcome

6. **Compute metrics**: Calculate overall alignment percentage, identify strongest connections and largest gaps.

7. **Present results**:
   - Alignment matrix table
   - Overall alignment score
   - Top 3 strongest connections (with explanation)
   - Top 3 largest gaps (with explanation)
   - If aggregate: percentage breakdown of student career goals and average alignment

8. **Privacy enforcement**: If the requester is faculty and individual student data is involved, present ONLY aggregate statistics. Never reveal individual names or goals.

9. **Suggest next steps**: Offer to generate recommendations (`/generate-recommendations`) based on the identified gaps.
