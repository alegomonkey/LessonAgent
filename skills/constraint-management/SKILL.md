---
name: constraint-management
description: "This skill should be used when the user asks to 'set constraints', 'check workload limits', 'manage budget constraints', 'verify TA availability', 'check feasibility', 'update course constraints', 'define time limits for changes', or mentions faculty workload caps, budget limitations, TA hours, semester timeline constraints, or feasibility scoring."
---

## Purpose

Accept, store, and enforce faculty-defined constraints on proposed course changes. Compute feasibility scores for each recommendation and filter out infeasible proposals before presenting them to the user. Constraints represent the real-world limitations that determine whether a pedagogical improvement is actionable or merely aspirational. Without constraint enforcement, the agent risks producing recommendations that waste faculty time by describing changes that cannot be implemented given available resources, timelines, or institutional requirements.

## When This Skill Applies

Invoke this skill under the following conditions:

- The faculty member explicitly specifies their available resources (time, budget, TA support, technology).
- The faculty member asks whether a particular change is feasible given their situation.
- The system needs to validate a set of recommendations against stored constraints before presenting them.
- The user runs the `/show-constraints` command to review their current constraint profile.
- Another skill (such as recommendation-generation) requests a feasibility check before finalizing output.
- The user updates their constraint profile mid-conversation (e.g., "Actually, I just lost one of my TAs").

Treat constraint management as a prerequisite gate: no recommendation should reach the user without passing through feasibility scoring unless the user has explicitly opted out of constraint enforcement.

## Constraint Types

Define and track the following constraint parameters for each faculty user:

- `faculty_hours_available` (integer, hours): Total hours the faculty member can dedicate to course redesign this semester. Include only discretionary hours not already committed to other duties. Typical range: 0-80 hours per semester. Collect by asking: "How many total hours can you realistically spend on redesigning this course this semester, beyond your normal teaching duties?"

- `budget_cap` (float, USD): Maximum budget for new materials, software licenses, tools, or services. Include only funds the faculty member can actually spend without additional approval. Typical range: $0-$10,000. Collect by asking: "What is your available budget for new course materials, tools, or software this semester?"

- `ta_count` (integer): Number of teaching assistants assigned to the course. Typical range: 0-5. Collect by asking: "How many TAs are assigned to your course?"

- `ta_hours_per_week` (float, hours): Hours per week each TA is available for course-related work. Typical range: 5-20. Collect by asking: "How many hours per week is each TA available for your course?"

- `total_students` (integer): Total enrollment across all sections. Typical range: 15-500. Collect by asking: "What is the total student enrollment across all sections?"

- `sections` (integer): Number of course sections. Typical range: 1-10. Collect by asking: "How many sections of the course are you running?"

- `semester_weeks_remaining` (integer, weeks): Weeks left in the current semester to implement changes. Typical range: 1-16. Collect by asking: "How many weeks remain in the current semester?"

- `department_approval_required` (boolean): Whether proposed changes need committee or department sign-off before implementation. Collect by asking: "Do changes to your course require department or committee approval?"

- `grading_hours_per_week` (float, hours): Current weekly grading commitment. This affects how much additional grading burden a new assessment can impose. Typical range: 2-30. Collect by asking: "How many hours per week do you currently spend on grading?"

- `technology_available` (list of strings): Tools and platforms already available and accessible. Examples include LMS platforms (Canvas, Blackboard), coding environments (GitHub Classroom, Replit), communication tools (Piazza, Slack), and media tools (Panopto, Zoom). Collect by asking: "What technology tools and platforms do you already have access to for your course?"

- `additional_duties` (string or list): Other commitments that reduce available time, such as committee service, research deadlines, grant writing, or conference travel. Use this to contextualize the `faculty_hours_available` figure. Collect by asking: "What other significant commitments do you have this semester that compete for your time?"

## Constraint Loading

Load constraints from three sources, in order of priority (highest first):

1. **Explicit user input during conversation**: When the faculty member states a constraint value directly in chat, treat it as the authoritative value. Override any stored value.
2. **User profile JSON**: Load from `data/users/{user_id}.json`. Parse the `constraints` object within the profile. Use these values as defaults when the user has not specified values in the current session.
3. **The `/show-constraints` command**: When invoked, display the current constraint profile in a formatted table, showing each constraint name, its current value, and its source (profile default or user-specified). Allow the user to modify values interactively.

If constraints have not been set and the system needs them to evaluate a recommendation, prompt the user to specify at minimum: `faculty_hours_available`, `budget_cap`, `ta_count`, and `semester_weeks_remaining`. These four form the minimum viable constraint set. Remaining constraints can be inferred or left unset with appropriate defaults (e.g., `department_approval_required` defaults to `true` as a conservative assumption).

## Feasibility Scoring

For each proposed change, compute a feasibility score on a 0-100 scale using five weighted sub-scores:

1. **time_fit** (weight: 0.30) -- Compare the estimated hours required to implement the change against `faculty_hours_available`. If the change requires 20 hours and the faculty member has 40 available, time_fit = 100. If it requires 60 hours and they have 40, time_fit = max(0, (40/60) * 100) = 67. Deduct additional points if `additional_duties` are substantial.

2. **budget_fit** (weight: 0.20) -- Compare the estimated cost of the change against `budget_cap`. If cost is $0, budget_fit = 100. If cost exceeds budget_cap, compute proportionally. If `budget_cap` is $0, any change requiring expenditure scores 0 on this dimension.

3. **ta_fit** (weight: 0.20) -- Determine whether the change requires TA support (e.g., grading new assessments, facilitating group work, running lab sections). Compare required TA hours against (`ta_count` * `ta_hours_per_week` * `semester_weeks_remaining`). Factor in current `grading_hours_per_week` to avoid double-counting existing commitments.

4. **timeline_fit** (weight: 0.20) -- Estimate the implementation timeline in weeks and compare against `semester_weeks_remaining`. A change requiring 8 weeks of rollout with only 4 weeks remaining scores poorly. Factor in `department_approval_required`, which adds 2-6 weeks for approval processes.

5. **approval_fit** (weight: 0.10) -- If `department_approval_required` is true and the change would require approval (modifying learning outcomes, changing assessment weights, altering credit hours), score based on whether there is enough time and the change is likely to be approved. Simple formatting or pedagogical method changes that do not alter official course documentation score 100 regardless.

Compute the overall feasibility score as the weighted average of the five sub-scores:

```
overall = (time_fit * 0.30) + (budget_fit * 0.20) + (ta_fit * 0.20) + (timeline_fit * 0.20) + (approval_fit * 0.10)
```

Classify the result:

- **Score < 40 -- INFEASIBLE**: Do not recommend this change. Explain why it failed and suggest alternatives.
- **Score 40-70 -- FEASIBLE WITH CAVEATS**: Present the change but clearly state which constraints are tight and what risks exist. Offer a scaled-down version if applicable.
- **Score > 70 -- FEASIBLE**: Present the change with confidence. Note any constraints that are close to their limits.

## Constraint Violation Handling

When a proposed change violates one or more constraints, do not silently drop the recommendation. Instead, follow this protocol for each violation:

1. **State the violated constraint**: Identify which specific constraint is exceeded (e.g., "This change exceeds your available faculty hours").
2. **Quantify the gap**: Provide concrete numbers (e.g., "This change requires approximately 45 implementation hours, but you have 25 hours available -- a gap of 20 hours").
3. **Suggest a scaled-down alternative**: Propose a reduced version of the same change that fits within constraints (e.g., "Implement this change for one section only this semester, then expand next semester" or "Use a simplified rubric that reduces grading time by 60%").
4. **Suggest deferral**: If no scaled-down version is viable, recommend deferring the change to next semester, specifying what the faculty member should prepare now to enable the change later.

When multiple constraints are violated simultaneously, prioritize reporting the most severe violation first (the one with the largest gap between required and available resources). Present violations in descending severity order.

## Output Format

When presenting constraint-related information, use two output components:

**Constraint Profile Summary Table**: Display the user's current constraints in a clean table format with columns for Constraint Name, Current Value, Source (profile/user-specified), and any flags (e.g., "RED FLAG: 0 TA hours" or "WARNING: <5 hours available").

**Per-Recommendation Feasibility Assessment**: For each recommendation being evaluated, present a compact feasibility card showing the recommendation name, overall feasibility score, classification (FEASIBLE / FEASIBLE WITH CAVEATS / INFEASIBLE), individual sub-scores for each of the five dimensions, and any constraint violations with quantified gaps. Sort recommendations by feasibility score in descending order so the most actionable items appear first.

When a batch of recommendations is evaluated, provide a summary line at the end: "X of Y recommendations are feasible, Z are feasible with caveats, and W are infeasible given your current constraints."

## Reference Files

Consult the following reference for detailed constraint type definitions, collection guidance, interaction effects, and common constraint profiles:

- `references/constraint-types.md`: Comprehensive specification of each constraint type including data types, typical ranges, collection questions, interaction with recommendation types, red flag values, and named constraint profiles for common faculty situations.
