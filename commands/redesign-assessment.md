---
name: redesign-assessment
description: Create career-path-specific assessment alternatives with rubrics mapped to learning outcomes
argument-hint: "<assessment-description-or-path> --careers <career1,career2,...>"
allowed-tools: ["Read", "Write", "Grep", "Glob", "Agent"]
---

# /redesign-assessment

Design career-relevant alternative assessments that maintain learning outcome coverage.

## Arguments
- **assessment** (required): Description of the current assessment to redesign, or a path to a file containing the assessment details
- **--careers** (required): Comma-separated list of career paths to design alternatives for (e.g., "software-engineering,data-science,systems-engineering")

## Execution Steps

1. **Analyze the original assessment**: Identify the learning outcomes it assesses, its Bloom's taxonomy level, its weight in the course grade, estimated student effort (hours), and any accreditation mappings.

2. **Load career path data**: For each specified career, load required competencies from `data/industry/` and `skills/goal-alignment/references/industry-skills-mapping.md`.

3. **Design alternatives**: For each career path, design an assessment variant that:
   - Exercises the same learning outcomes at the same Bloom's level
   - Uses an authentic professional task from that career context
   - Includes clear deliverables, timeline, and submission format
   - Requires approximately the same student effort as the original

4. **Create rubrics**: For each alternative, generate a criterion-referenced rubric using the template in `skills/assessment-redesign/references/rubric-templates.md`:
   - 4-6 criteria, each mapped to a specific learning outcome
   - 4 performance levels: Exceeds Expectations, Meets Expectations, Developing, Beginning
   - Career competency annotations

5. **Verify workload parity**: Estimate student hours for each alternative and compare to the original. Flag any that differ by more than 20%.

6. **Check accreditation compliance**: Verify each alternative still serves as a valid assessment instrument for all mapped accreditation outcomes.

7. **Present results**:
   - Side-by-side comparison: original vs. each alternative
   - Rubric for each alternative
   - Accreditation compliance status
   - Workload comparison
   - If student-initiated: frame as a "Proposal for [Instructor Name]" ready to share

8. **Offer follow-up**: Ask if the user wants to adjust any alternative, generate additional career variants, or modify the rubric criteria.
