---
name: assessment-redesign
description: "This skill should be used when the user asks to 'redesign an assessment', 'create alternative assessments', 'design a career-relevant assignment', 'replace the final exam', 'add project-based assessment', 'create assessment options for different career paths', 'build a rubric', or mentions assessment alternatives, career-mapped assessments, rubric creation, project-based learning, or authentic assessment design."
---

## Purpose

Transform traditional assessments into career-relevant alternatives while maintaining learning outcome coverage and workload parity with the original assessment. This skill bridges the gap between academic assessment (which often emphasizes recall and procedure) and professional practice (which emphasizes application, analysis, and creation). Every redesigned assessment must demonstrate that it measures the same learning outcomes as the original, requires comparable student effort, and satisfies any accreditation requirements mapped to the course.

## When This Skill Applies

Invoke this skill under the following conditions:

- A faculty member wants to replace or modify an existing assessment (exam, quiz, homework set, paper, lab report).
- Students request career-relevant alternatives to traditional assessments and the faculty member is open to considering them.
- The recommendation-generation skill has identified assessment changes as part of a revision plan and needs concrete assessment designs.
- A faculty member asks for a rubric for a new or existing assessment.
- The user wants to create multiple assessment variants for different career paths within the same course.
- The user needs to verify that a proposed assessment change maintains workload parity with the original.

Do not invoke this skill for changes that do not involve assessments (e.g., changing lecture content, adding readings, restructuring modules). Those fall under other skills.

## Career-Path Branching

When multiple career paths are represented in a course's student population, generate multiple assessment variants that each emphasize a different career trajectory while assessing the same learning outcomes at the same Bloom's taxonomy level. Career-path branching allows students to engage with material through the lens of their professional interests, increasing motivation and perceived relevance without sacrificing academic rigor.

Apply the following process for career-path branching:

1. Identify the career paths relevant to the course. Use career path data from the course profile or from student survey data if available. Common branching points include: software engineering vs. data science vs. systems engineering (for CS courses), clinical vs. research vs. public health (for biology courses), industry vs. academia vs. government (for many STEM courses).

2. For each career path, identify an authentic professional task that exercises the same cognitive level and knowledge domain as the original assessment. The task must be something a professional in that field would actually do, not a contrived academic exercise dressed up with career terminology.

3. Verify that all variants assess the same learning outcomes. Use a mapping table showing each learning outcome and how each variant addresses it. If a variant fails to cover an outcome, modify it until coverage is complete.

For example, in a data structures course where the original assessment is a final exam testing algorithm analysis, sorting, trees, and graphs:

- **Software Engineering variant**: Build a production-ready data pipeline that ingests, transforms, and serves data using appropriate data structures. Deliverables include working code, performance benchmarks, and a design rationale document explaining data structure choices.
- **Data Science variant**: Implement and benchmark data structures relevant to machine learning workflows (hash maps for feature stores, trees for decision boundaries, graphs for network analysis). Deliverables include implementation code, benchmark results, and analysis of time-space tradeoffs.
- **Systems Engineering variant**: Profile and optimize data structure performance under memory and CPU constraints. Deliverables include profiling reports, optimized implementations, and documentation of performance improvements with architectural justification.

Each variant requires the student to demonstrate understanding of the same data structures and algorithms, but through the lens of their target profession.

## Assessment Design Process

Follow these steps sequentially when redesigning any assessment. Do not skip steps. Each step builds on the previous one and omitting any step risks producing an assessment that fails accreditation checks or creates workload imbalance.

### Step 1: Analyze the Original Assessment

Identify the original assessment's properties:

- List every learning outcome the assessment currently measures. Consult the course syllabus and any accreditation mapping documents.
- Determine the Bloom's taxonomy level for each outcome as assessed by this particular instrument. A final exam testing recall operates at the Remember/Understand level even if the outcome itself is written at the Apply level.
- Record any ABET Student Outcome or general education category mappings. These are non-negotiable -- the redesigned assessment must still serve as a valid instrument for these mappings.
- Note the assessment's weight in the final grade, its format, its duration, and any special conditions (proctored, open-book, take-home).

### Step 2: Identify Authentic Professional Tasks

For each target career path (or for a single path if branching is not requested), identify authentic professional tasks that exercise the same cognitive level and knowledge domain:

- Consult the assessment types catalog in `references/assessment-types.md` for options.
- Prefer tasks that naturally operate at the same or higher Bloom's level as the original assessment. Do not design a project (Create level) to replace a quiz (Remember level) without acknowledging the level shift and adjusting expectations.
- Verify that the task is genuinely authentic -- something professionals in the target field actually do, not a simulation of academic work with a career label applied.

### Step 3: Design the Assessment

Produce a complete assessment specification including:

- **Task description**: Clear, unambiguous statement of what the student must do. Write in imperative form. Include context that frames the task in professional terms.
- **Deliverables**: Exhaustive list of what the student must submit. Specify formats (PDF report, GitHub repository, recorded presentation, etc.).
- **Time expectations**: Estimated hours of student effort. Break down by phase (research, implementation, writing, revision).
- **Submission format**: How and where to submit. Specify any technology requirements.
- **Individual vs. group**: State whether the assessment is individual or group. If group, specify group size and how individual contribution will be assessed.

### Step 4: Create the Rubric

Design a criterion-referenced rubric that maps directly to the original learning outcomes. Follow these principles:

- Each rubric criterion must trace back to a specific learning outcome from Step 1. Document the mapping explicitly.
- Use the rubric templates in `references/rubric-templates.md` as starting points.
- Define four performance levels: Exceeds Expectations, Meets Expectations, Developing, and Beginning.
- Write level descriptors using observable and measurable language. Avoid vague terms like "good understanding" or "adequate effort." Instead, specify what the student's work looks like at each level (e.g., "Implementation handles all edge cases and includes error recovery" vs. "Implementation handles common cases but fails on edge cases").
- Include career-skill annotations for each criterion, indicating which professional competency the criterion develops (e.g., "Technical Communication," "Systems Thinking," "Data-Driven Decision Making").
- Keep the number of criteria between 4 and 6. Fewer than 4 provides insufficient differentiation; more than 6 becomes unwieldy for graders and opaque for students.

### Step 5: Verify Workload Parity

Estimate the total student hours required for the new assessment and compare against the original:

- For the original assessment, estimate preparation time plus completion time. A 2-hour final exam with 10 hours of studying represents approximately 12 student hours.
- For the new assessment, estimate all phases: understanding the task, research, implementation or drafting, revision, and submission preparation.
- Acceptable variance is plus or minus 20%. If the new assessment requires more than 120% of the original's student hours, it is not a replacement -- it is an addition. Reduce scope until parity is achieved.
- If the new assessment requires significantly less time than the original, consider whether it is rigorous enough to serve as a valid replacement. Unduly easy replacements undermine the integrity of the assessment system.
- Document the workload comparison explicitly so faculty can review and adjust.

### Step 6: Run Accreditation Check

Before finalizing the assessment design, verify accreditation compliance:

- Confirm that every ABET Student Outcome or general education outcome mapped to the original assessment is still assessable with the new design. Use the accreditation-guardrails skill for this verification.
- If the original assessment is listed as an "assessment instrument" in department accreditation documentation, note that replacing it requires updating that documentation. Flag this administrative step for the faculty member.
- If the new assessment changes the Bloom's level at which an outcome is assessed, flag this for review. Accreditation bodies expect consistency in assessment rigor across reporting periods.

## Rubric Design Principles

Apply these principles to every rubric created by this skill:

- Use criterion-referenced rubrics, not norm-referenced. Each student's performance is measured against the criteria, not against other students.
- Each criterion maps to one or more learning outcomes. Document the mapping in the rubric header or as annotations.
- Performance levels must be defined with concrete, observable descriptors. Each level descriptor should make it clear what distinguishes it from the adjacent levels.
- Include a "Career Skill" annotation row beneath each criterion showing which professional competency the criterion develops. This serves dual purposes: it reinforces career relevance for students and provides data for career-skills tracking.
- Weight criteria according to the relative importance of the learning outcomes they assess. If one outcome is more central to the course, its corresponding criterion should carry more weight.

## Workload Parity

Workload parity is a hard constraint, not a suggestion. Treat it as follows:

- Compute the estimated student effort for the new assessment in hours. Break the estimate into phases and show the calculation.
- Compare against the original assessment's estimated student effort.
- If the new assessment exceeds the original by more than 20%, do one of the following: reduce the scope of the deliverables, eliminate one deliverable component, simplify the rubric criteria, or reduce the expected depth of analysis. Repeat the estimate after each adjustment until parity is achieved.
- If the faculty member explicitly agrees to increase the assessment workload (e.g., because they are removing another assessment to compensate), document this decision and note the net effect on total course workload.

## Important Constraints

Observe these constraints at all times during assessment redesign:

- **Faculty approval is required**: When students request assessment alternatives, draft the proposal but always frame it as a recommendation to bring to the instructor. Never imply that students can unilaterally change assessments. Use language like "Here is a proposal you could present to your instructor" rather than "Here is your new assessment."
- **Accreditation is non-negotiable**: No assessment redesign may compromise accreditation compliance. Always run the accreditation check (Step 6) before finalizing.
- **Grading feasibility matters**: A beautifully designed assessment that takes 45 minutes per student to grade is not viable for a 200-student course with one TA. Always check grading time against the constraint profile using the constraint-management skill.
- **Gradual rollout is preferred**: When replacing a high-stakes assessment (midterm, final), recommend piloting the new format alongside the traditional format first (e.g., offer both options and compare outcomes) before fully replacing.

## Reference Files

Consult the following references for assessment design guidance, rubric templates, and assessment type catalogs:

- `references/assessment-types.md`: Catalog of authentic assessment types with descriptions, strengths, weaknesses, Bloom's levels, and effort estimates.
- `references/rubric-templates.md`: Generic and example rubric templates with guidelines for criterion design, level descriptors, learning outcome mapping, and career competency annotations.
