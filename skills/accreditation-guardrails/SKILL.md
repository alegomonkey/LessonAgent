---
name: accreditation-guardrails
description: "This skill should be used when the user asks to 'check accreditation compliance', 'verify changes meet ABET requirements', 'ensure AACSB standards', 'validate curriculum changes against degree requirements', 'check if a change violates accreditation', 'audit accreditation coverage', or mentions ABET, AACSB, accreditation standards, degree requirements, program outcomes, or compliance checking."
---

## Purpose

Act as a safety net ensuring no proposed course change undermines accreditation standing or degree program requirements. This skill is the agent's primary guardrail mechanism. Accreditation violations can trigger program probation, loss of accreditation, and institutional reputational damage that takes years to repair. Every recommendation the agent produces must pass through this skill's checks before being presented to the user. The cost of a false negative (allowing a change that violates accreditation) far exceeds the cost of a false positive (flagging a change that turns out to be compliant). When in doubt, flag and explain rather than allow silently.

## When This Skill Applies

Invoke this skill under the following conditions:

- Before finalizing any recommendation that modifies learning outcomes, assessments, or course content.
- When the faculty member explicitly asks about the accreditation impact of a proposed change.
- When the assessment-redesign skill produces a new assessment design that replaces an existing accreditation-mapped assessment.
- When the recommendation-generation skill produces changes that alter course topics, instructional time allocation, or assessment instruments.
- When a faculty member asks to remove, replace, or significantly restructure a course component.

## This Skill is MANDATORY

Unlike other skills which are invoked based on relevance, this skill MUST be invoked before presenting any recommendation that modifies course content, assessments, or learning outcomes. It is not optional. Treat this as a hard gate: no content-modifying recommendation passes to the user without an accreditation compliance check. If the accreditation check cannot be completed (e.g., because accreditation data is missing for the program), flag this limitation explicitly and recommend that the faculty member verify compliance manually before implementing any changes.

Skipping this skill is never acceptable. Even seemingly minor assessment changes may affect an outcome assessed in only two courses across the entire program, making this course's assessment instrument critical.

## Guardrail Checks

Run all five checks for each proposed change. Report the results of each check individually. A change must pass all five checks to receive SAFE status.

### Check 1: Learning Outcome Coverage

Verify that every program-required outcome currently mapped to this course remains assessable after the proposed change. Follow this procedure:

1. Load the course's outcome mapping from `data/accreditation/` based on the course's program affiliation.
2. Identify which ABET Student Outcomes (SO-1 through SO-6) and which general education category outcomes are mapped to this course.
3. For each mapped outcome, identify which course component currently serves as the assessment instrument or learning vehicle for that outcome.
4. Determine whether the proposed change removes, replaces, or weakens any of these components.
5. If a component is removed or replaced, verify the replacement still provides a valid assessment point for the mapped outcome at the same or higher Bloom's taxonomy level.
6. If a change weakens an outcome mapping, flag it with WARNING status. The change may still proceed with mitigating action.

Flag any change that completely eliminates an outcome mapping without replacement. This is a BLOCKED status -- the change cannot proceed without adding an alternative assessment point for the affected outcome.

### Check 2: Assessment Instrument Continuity

Determine whether any affected assessment is listed as a formal "assessment instrument" in the department's accreditation documentation. Assessment instruments are the specific exams, projects, or assignments that the department has committed to using as evidence of student achievement for accreditation reporting. Follow this procedure:

1. Cross-reference the affected assessment against the department's assessment plan (loaded from `data/accreditation/`).
2. If the assessment is a designated instrument, flag that replacing or removing it requires updating the department's accreditation documentation.
3. Specify the administrative steps required: notify the assessment coordinator, update the assessment plan, ensure the replacement instrument will be in place before the next accreditation data collection cycle.
4. If the next accreditation visit or annual report is imminent (within the current academic year), elevate the urgency -- changes to assessment instruments close to reporting deadlines are high-risk.

This check produces a WARNING status (not BLOCKED) because the change can proceed with administrative action. However, the administrative steps are mandatory, not optional.

### Check 3: Contact Hour Requirements

Verify that the proposed change does not reduce required instructional time below the credit-hour minimum established by the institution and accreditation body. Follow this procedure:

1. Determine the course's credit hours and the institution's credit hour policy (typically 1 credit = 50 minutes of instruction per week for 15 weeks, or equivalent).
2. Calculate the minimum required contact hours for the course.
3. If the proposed change replaces synchronous instruction with asynchronous activities, verify that the total instructional time (including structured asynchronous activities) still meets or exceeds the minimum.
4. If the change replaces lecture with project work, lab time, or other experiential learning, verify that these activities count as contact hours under the institution's policy. Most institutions count supervised lab and project time but may not count unsupervised out-of-class work.

Replacing lecture with project work is acceptable if contact hours are maintained. Replacing lecture with "self-study" or "independent work" without structured supervision typically violates contact hour requirements.

### Check 4: Core Topic Preservation

Verify that topics explicitly required by the accreditation body remain in the course syllabus after the proposed change. Follow this procedure:

1. Load the required topic list for the program from the accreditation criteria reference (see `references/abet-criteria.md`).
2. Identify which required topics are currently taught in this course based on the syllabus analysis.
3. Determine whether the proposed change removes, reduces, or relocates any required topic.
4. If a required topic is being removed from this course, verify that it is still adequately covered in another required course in the program. If it is not, the change is BLOCKED.
5. If a required topic is being taught differently (e.g., through a project rather than through lectures), this is acceptable as long as the topic is still explicitly addressed and assessable. The method of instruction may change; the presence of the topic may not.

Pay particular attention to explicitly named topic requirements. For ABET CS programs, "operating systems" is a specifically named required topic area. Removing or significantly reducing operating systems content from a course designated to cover it is a potential accreditation violation even if the content appears elsewhere in the curriculum.

### Check 5: Minimum Assessment Points

Verify that accreditation outcomes maintain sufficient assessment coverage across the program after the proposed change. Follow this procedure:

1. Load the program-wide curriculum map from `data/accreditation/`.
2. For each accreditation outcome mapped to the current course, count how many other courses in the program also assess that outcome.
3. If this course is one of only two courses assessing a particular outcome, any change that weakens this course's assessment of that outcome is HIGH-RISK. Flag with WARNING status and explain that weakening assessment here leaves only one other course covering the outcome -- a single point of failure.
4. If this course is the ONLY course assessing a particular outcome, any change that weakens that assessment is BLOCKED. The program cannot lose its sole assessment point for an accreditation outcome.

This check requires program-wide data. If program-wide data is not available, flag this limitation and recommend manual verification with the department's assessment coordinator.

## Compliance Report Format

For each proposed change, produce a compliance status using one of three classifications:

### SAFE

The change does not affect any accreditation mapping. All five guardrail checks pass without findings. Proceed with the recommendation. No additional action is required.

Output format: "ACCREDITATION CHECK: SAFE. This change does not affect any accreditation-mapped outcomes, assessment instruments, contact hours, required topics, or program-wide assessment coverage."

### WARNING

The change affects one or more accreditation mappings but can be mitigated through specific actions. The change may proceed if the faculty member completes the noted action items. List each warning with its required mitigation.

Output format: "ACCREDITATION CHECK: WARNING. This change can proceed with the following required actions: [numbered list of action items]. Failure to complete these actions before the next accreditation review cycle may result in compliance gaps."

Common WARNING scenarios:
- Replacing a designated assessment instrument (mitigation: update department assessment plan)
- Changing the Bloom's level at which an outcome is assessed (mitigation: verify with assessment coordinator)
- Reducing one course's coverage of an outcome assessed in multiple other courses (mitigation: confirm other courses' coverage is active)

### BLOCKED

The change would create an accreditation violation that cannot be mitigated within the current constraints. Do NOT recommend this change. Explain what would need to change for it to become feasible.

Output format: "ACCREDITATION CHECK: BLOCKED. This change cannot proceed because: [specific violation]. To make this change feasible: [specific alternative or prerequisite action]."

Common BLOCKED scenarios:
- Removing the only assessment point for a program outcome
- Eliminating a required topic area without relocating it to another course
- Reducing contact hours below the credit-hour minimum
- Removing a learning outcome that is required by the program

## Escalation Protocol

When a change receives BLOCKED status, follow this escalation procedure:

1. **State the specific standard or requirement at risk.** Cite the accreditation body, the standard number or name, and the specific requirement. Example: "ABET CAC Criterion 3, Student Outcome 2: An ability to design, implement, and evaluate a computing-based solution."

2. **Explain the nature of the violation.** Describe concretely how the proposed change would create a compliance gap. Example: "Removing the design project from COS 301 eliminates the only assessment instrument for SO-2 in the BS Computer Science program. The annual assessment report requires at least one direct measure of each student outcome."

3. **Suggest an alternative that achieves the same pedagogical goal without the violation.** Example: "Instead of removing the design project, redesign it to be career-relevant while maintaining the design and evaluation components. This preserves SO-2 assessment while improving student engagement."

4. **If no alternative exists within the current course, recommend deferral to a program-level curriculum review.** Some accreditation issues cannot be resolved at the course level -- they require program-level coordination to redistribute outcomes across courses. Flag these for the department curriculum committee.

## Data Sources

Load accreditation data from the following locations:

- `data/accreditation/{program_id}/outcomes.json`: Program-level outcome definitions and mappings.
- `data/accreditation/{program_id}/curriculum_map.json`: Course-to-outcome mapping across the full program.
- `data/accreditation/{program_id}/assessment_plan.json`: Designated assessment instruments and reporting schedule.
- Course syllabus data from the syllabus-analysis skill output.

Cross-reference course-level data with program-level data to check program-wide outcome coverage. Use the curriculum map to identify how many courses assess each outcome and whether the current course is a critical (sole or one-of-two) assessment point.

## Important Limitation

Accreditation data in the system may not reflect the latest version of accreditation criteria. Accreditation bodies periodically update their standards. If the user mentions new or updated criteria that do not match the system's stored data, take the following steps:

1. Flag that the system's accreditation data may be outdated.
2. State the version or date of the criteria currently loaded in the system.
3. Recommend that the faculty member verify against the official accreditation body website before implementing changes.
4. Do NOT fabricate or guess about criteria not present in the database. Inventing accreditation requirements that do not exist is worse than acknowledging a gap.

If accreditation data is entirely missing for a program, state this clearly: "No accreditation data is loaded for [program name]. Recommend manual verification with the department assessment coordinator before implementing changes that affect learning outcomes, assessments, or course content."

## Reference Files

Consult the following references for detailed accreditation criteria and requirements:

- `references/abet-criteria.md`: ABET Computing Accreditation Commission criteria including Student Outcomes, curriculum requirements, and assessment documentation requirements.
- `references/general-education-requirements.md`: University of Maine General Education requirements including category outcomes, signature assignment requirements, and committee approval policies.
