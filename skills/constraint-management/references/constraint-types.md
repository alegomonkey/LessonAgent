# Constraint Types Reference

This document provides the comprehensive specification for each constraint type used in the constraint-management skill. Use this reference when collecting constraints from faculty, validating constraint values, computing feasibility scores, and identifying constraint profiles.

---

## Constraint Definitions

### faculty_hours_available

- **Description**: Total discretionary hours the faculty member can dedicate to course redesign activities this semester. Excludes time already committed to regular teaching, office hours, and other standing obligations.
- **Data Type**: Integer
- **Typical Range**: 0-80 hours per semester
- **Collection Question**: "How many total hours can you realistically spend on redesigning this course this semester, beyond your normal teaching duties?"
- **Interaction with Recommendations**: Affects all recommendations that require faculty implementation effort. High-effort changes (developing new project assignments, creating rubrics, restructuring modules) require more hours. Low-effort changes (adding a reading, adjusting weights) require fewer.
- **Red Flags**: Values below 5 hours indicate severe time constraints. At 0 hours, only zero-effort changes are feasible (e.g., changes that can be delegated entirely to TAs or that involve removing work rather than adding it).

### budget_cap

- **Description**: Maximum budget available for new materials, software licenses, tools, subscriptions, or external services. Include only funds the faculty member can spend without additional approval beyond their normal authority.
- **Data Type**: Float (USD)
- **Typical Range**: $0-$10,000
- **Collection Question**: "What is your available budget for new course materials, tools, or software this semester?"
- **Interaction with Recommendations**: Affects recommendations requiring software purchases (autograding tools, plagiarism detection, simulation software), textbook or resource changes, and any external service fees. Free and open-source alternatives should always be considered when budget is limited.
- **Red Flags**: A $0 budget eliminates all recommendations requiring any expenditure. Verify whether institutional site licenses cover tools that would otherwise cost money (e.g., MATLAB, GitHub Enterprise).

### ta_count

- **Description**: Number of teaching assistants assigned to the course for the current semester.
- **Data Type**: Integer
- **Typical Range**: 0-5
- **Collection Question**: "How many TAs are assigned to your course?"
- **Interaction with Recommendations**: Affects recommendations requiring grading support, lab facilitation, group project management, or student mentoring. Courses with 0 TAs cannot absorb increases in grading workload unless the faculty member personally absorbs them.
- **Red Flags**: A value of 0 for courses with more than 50 students severely limits assessment redesign options. Any recommendation that adds per-student grading time must account for who will do the grading.

### ta_hours_per_week

- **Description**: Hours per week each TA is available for course-related work, including grading, office hours, lab supervision, and preparation.
- **Data Type**: Float (hours)
- **Typical Range**: 5-20
- **Collection Question**: "How many hours per week is each TA available for your course?"
- **Interaction with Recommendations**: Combined with `ta_count` to compute total available TA capacity. Recommendations that shift grading burden to TAs must fit within this capacity. Calculate total TA hours as `ta_count * ta_hours_per_week`.
- **Red Flags**: Values below 5 hours per week indicate TAs who are likely split across multiple courses and cannot take on significant new responsibilities. Verify how current TA hours are allocated before assuming spare capacity.

### total_students

- **Description**: Total enrollment across all sections of the course.
- **Data Type**: Integer
- **Typical Range**: 15-500
- **Collection Question**: "What is the total student enrollment across all sections?"
- **Interaction with Recommendations**: Directly affects grading workload for any assessment change. Per-student costs (materials, licenses) scale with enrollment. Group-work recommendations must account for group formation across the full enrollment. Peer review becomes more logistically complex above 100 students.
- **Red Flags**: Enrollment above 200 with 0 TAs is a critical constraint combination. Enrollment below 15 may limit the viability of peer-review or group-based activities.

### sections

- **Description**: Number of course sections being taught by the faculty member.
- **Data Type**: Integer
- **Typical Range**: 1-10
- **Collection Question**: "How many sections of the course are you running?"
- **Interaction with Recommendations**: Multiple sections multiply the implementation effort for any change that requires live delivery (new activities, demonstrations, lab setups). However, preparation effort (creating materials, designing rubrics) is typically one-time. Use sections to adjust time_fit calculations for delivery-dependent changes.
- **Red Flags**: More than 3 sections suggests the faculty member has a heavy teaching load. Recommendations requiring per-section customization should be avoided or simplified.

### semester_weeks_remaining

- **Description**: Weeks left in the current semester during which changes can be implemented and take effect.
- **Data Type**: Integer (weeks)
- **Typical Range**: 1-16
- **Collection Question**: "How many weeks remain in the current semester?"
- **Interaction with Recommendations**: Determines whether changes can be implemented this semester or must be deferred. Changes requiring student acclimatization (new assignment formats, new tools) need lead time. Changes requiring department approval add 2-6 weeks to the timeline.
- **Red Flags**: Fewer than 3 weeks remaining limits changes to trivial adjustments or deferred planning. Fewer than 6 weeks remaining eliminates any change requiring department approval.

### department_approval_required

- **Description**: Whether proposed changes to the course need committee or department sign-off before implementation. Applies to changes affecting official course documentation: learning outcomes, assessment weights, credit hours, prerequisite structures.
- **Data Type**: Boolean
- **Typical Range**: true/false
- **Collection Question**: "Do changes to your course require department or committee approval?"
- **Interaction with Recommendations**: When true, add 2-6 weeks to any recommendation timeline that affects official course components. Purely pedagogical changes (teaching methods, in-class activities, supplementary resources) typically do not require approval. Assessment weight changes, learning outcome modifications, and syllabus restructuring typically do.
- **Red Flags**: When true and `semester_weeks_remaining` is below 6, most substantive changes requiring approval become infeasible for the current semester.

### grading_hours_per_week

- **Description**: Hours the faculty member currently spends on grading each week. This represents existing workload that constrains how much additional grading burden can be absorbed.
- **Data Type**: Float (hours)
- **Typical Range**: 2-30
- **Collection Question**: "How many hours per week do you currently spend on grading?"
- **Interaction with Recommendations**: Assessment redesign recommendations must account for the net change in grading time. Replacing a multiple-choice exam (low grading time) with a project (high grading time) increases this value. If current grading hours are already high, recommendations should aim to reduce or maintain grading time, not increase it.
- **Red Flags**: Values above 15 hours per week indicate grading is already a significant burden. Recommendations should prioritize grading efficiency (peer review, automated grading, rubric simplification) before adding new assessments.

### technology_available

- **Description**: List of tools, platforms, and technologies already accessible to the faculty member and students. Includes LMS platforms, coding environments, communication tools, media tools, and any departmentally licensed software.
- **Data Type**: List of strings
- **Typical Range**: 3-15 items
- **Collection Question**: "What technology tools and platforms do you already have access to for your course?"
- **Interaction with Recommendations**: Recommendations requiring specific technology should check this list first. Prefer changes that leverage existing tools over those requiring new tool adoption. New tool adoption requires training time (add to faculty_hours estimate) and possibly budget (add to cost estimate).
- **Red Flags**: An empty list or a list containing only a basic LMS suggests limited technology infrastructure. Recommendations requiring sophisticated tools (autograders, simulation environments) may be infeasible.

### additional_duties

- **Description**: Other commitments competing for the faculty member's time beyond teaching. Includes committee service, research deadlines, grant writing, conference travel, administrative roles, and other course preparations.
- **Data Type**: String or list of strings
- **Typical Range**: Varies widely
- **Collection Question**: "What other significant commitments do you have this semester that compete for your time?"
- **Interaction with Recommendations**: Use this qualitatively to contextualize `faculty_hours_available`. A faculty member claiming 20 available hours but listing a grant deadline and two conferences may actually have fewer usable hours due to cognitive load and scheduling fragmentation.
- **Red Flags**: Multiple research deadlines, tenure review preparation, or administrative leadership roles suggest the faculty member's attention is divided. Recommend changes that are simple to implement and maintain rather than complex multi-phase projects.

---

## Common Constraint Profiles

### Overloaded Lecturer

- **budget_cap**: $0
- **ta_count**: 0
- **ta_hours_per_week**: 0
- **faculty_hours_available**: Less than 3 hours
- **sections**: 3 or more
- **total_students**: 100+
- **grading_hours_per_week**: 15+
- **Characteristics**: Heavy teaching load, no research expectations but also no resource allocation. Maximum sections, minimal support.
- **Feasible Changes**: Micro-adjustments only. Replace one assessment with a simpler alternative. Adopt free tools already available. Remove low-value course components to free time. Defer major changes to a future semester with explicit planning support.
- **Infeasible Changes**: Any change requiring new tool adoption, significant rubric development, increased grading, or material purchases.

### Well-Resourced Associate Professor

- **budget_cap**: $1,000-$5,000
- **ta_count**: 1-3
- **ta_hours_per_week**: 10-15
- **faculty_hours_available**: 15-40 hours
- **sections**: 1-2
- **total_students**: 30-100
- **grading_hours_per_week**: 5-10
- **Characteristics**: Moderate resources across all dimensions. Some institutional support. Sufficient time for meaningful course redesign.
- **Feasible Changes**: Assessment redesign with new rubrics, adoption of one new technology tool, restructuring one course module, piloting career-path branching for one assessment.
- **Infeasible Changes**: Full course overhaul, simultaneous changes across all assessments, adoption of multiple new tools simultaneously.

### Pre-Tenure Researcher

- **budget_cap**: $0-$500 (may have startup funds but reluctant to spend on teaching)
- **ta_count**: 0-1
- **ta_hours_per_week**: 5-10
- **faculty_hours_available**: 5-15 hours
- **sections**: 1
- **total_students**: 20-60
- **grading_hours_per_week**: 3-8
- **additional_duties**: Active research program, publication deadlines, grant writing
- **Characteristics**: Time is the scarcest resource. Research takes priority. Willing to improve teaching but cannot invest large time blocks.
- **Feasible Changes**: Small, high-impact changes. Replace one exam with a project that also serves research interests. Adopt one free tool that reduces grading time. Restructure one module using existing materials.
- **Infeasible Changes**: Multi-week implementation projects, changes requiring extensive rubric development, anything requiring more than 10 hours of upfront investment.

### Large-Enrollment Course Coordinator

- **budget_cap**: $2,000-$10,000
- **ta_count**: 3-5
- **ta_hours_per_week**: 15-20
- **faculty_hours_available**: 20-50 hours
- **sections**: 4-8
- **total_students**: 200-500
- **grading_hours_per_week**: 2-5 (delegated to TAs)
- **Characteristics**: Has resources but scale is the primary constraint. Any change must work across all sections and be implementable by TAs with training.
- **Feasible Changes**: Standardized assessment changes that TAs can implement, technology adoption at scale (autograders, peer review tools), rubric standardization across sections.
- **Infeasible Changes**: Per-section customization, project-based assessments requiring individual faculty feedback, changes that cannot be consistently applied across all sections.

---

## Constraint Interaction Matrix

Use this matrix to identify which constraints interact when evaluating specific recommendation types:

| Recommendation Type | Primary Constraints | Secondary Constraints |
|---|---|---|
| New assessment | grading_hours_per_week, ta_count, total_students | faculty_hours_available, semester_weeks_remaining |
| Technology adoption | budget_cap, technology_available | faculty_hours_available, ta_hours_per_week |
| Module restructuring | faculty_hours_available, semester_weeks_remaining | department_approval_required, sections |
| Grading reform | grading_hours_per_week, ta_count, ta_hours_per_week | total_students, faculty_hours_available |
| Career-path branching | ta_count, faculty_hours_available | total_students, grading_hours_per_week |
| Learning outcome change | department_approval_required, semester_weeks_remaining | faculty_hours_available |
