---
name: recommendation-generation
description: "This skill should be used when the user asks to 'generate course recommendations', 'suggest syllabus changes', 'modernize a course', 'create a revision plan', 'propose curriculum updates', 'suggest quick wins for a syllabus', 'plan course improvements', or mentions tiered recommendations, revision plans, course modernization strategies, or curriculum improvement proposals."
---

# Recommendation Generation Skill

## Purpose

Produce actionable, tiered revision plans for course modernization that respect faculty constraints, preserve accreditation compliance, and address the most impactful gaps identified by prior analysis. This skill synthesizes audit data from the syllabus-analysis skill and alignment data from the goal-alignment skill into concrete, prioritized changes organized by implementation effort. Each recommendation includes effort estimates, constraint checks, and accreditation safety annotations so that faculty can make informed decisions about what to change and when.

## Prerequisites

This skill should be invoked AFTER the following skills have produced their outputs:

- **syllabus-analysis** (required): provides the structured course audit including learning outcomes with Bloom's classifications, assessment-to-outcome mappings, weekly schedule, and gap analysis. Without this data, recommendations lack grounding.
- **goal-alignment** (strongly recommended): provides the alignment matrix showing which career-relevant competencies are covered and which are missing. Without this data, recommendations address structural and accreditation gaps but cannot target career relevance.

If the syllabus-analysis skill has not been run for the target course, do not proceed with recommendation generation. Instead, inform the user that an audit is needed first and suggest invoking the syllabus-analysis skill. If goal-alignment has not been run, proceed but note that recommendations will not address career alignment gaps and suggest running goal-alignment afterward for a more complete revision plan.

Load the audit data from `data/syllabi/` and alignment data from `data/users/` or the most recent goal-alignment output.

## Tier Definitions

All recommendations are classified into one of three tiers based on implementation effort. Assign each recommendation to the appropriate tier using the criteria below and the detailed examples in `references/revision-tiers.md`.

### Tier 1: Quick Wins

Changes implementable in under 2 hours of faculty preparation time, requiring no new materials, no additional budget, and no department approval. These changes modify existing content rather than creating new content and operate within the current course structure. Examples include updating reading list entries, revising assignment prompts to add career context, replacing outdated examples, and adding reflection questions to existing assignments.

### Tier 2: Moderate Changes

Changes requiring 5 to 20 hours of faculty preparation time. May require minor budget allocation or TA support but do not require department-level approval. These changes create new content within the existing course structure. Examples include creating a new project-based assignment, developing bridge exercises linking theory to modern tools, integrating industry datasets, and adding career-path options to major assessments.

### Tier 3: Deep Restructuring

Changes requiring 40 or more hours of faculty preparation time and likely requiring department approval, curriculum committee review, or coordination with other courses. These changes alter the fundamental structure of the course. Examples include resequencing to project-based learning, replacing the textbook with OER, introducing a capstone project replacing a final exam, and adding new multi-week modules.

Consult `references/revision-tiers.md` for detailed characteristics, concrete examples with hour estimates, and the decision tree for tier assignment.

## Core Workflow

Follow these steps to generate recommendations.

### Step 1: Load Prior Analysis Data

Retrieve the syllabus audit and goal-alignment results for the target course. Confirm the following data is available:

- Learning outcomes with Bloom's classifications.
- Assessment-to-outcome mapping with identified gaps (unassessed outcomes, single-point-of-failure outcomes).
- Accreditation gap analysis (if applicable).
- Industry/career gap analysis (from goal-alignment, if available).
- Weekly schedule with topic annotations.

If any critical data is missing, note it and proceed with what is available.

### Step 2: Load Faculty Constraints

Before generating any recommendations, determine the faculty member's constraints. Gather these from the faculty profile (if stored in `data/users/`), from the current conversation, or by asking the user directly. Key constraints include:

- **Available preparation time**: how many hours the faculty member can dedicate to course revision before the next offering. This determines which tiers are feasible.
- **Budget**: whether any budget is available for new materials, software licenses, or guest speakers.
- **TA support**: whether a teaching assistant is available and for how many hours per week.
- **Department approval willingness**: whether the faculty member is willing and able to pursue changes that require committee review.
- **Timeline**: when the next course offering is and how much lead time exists.
- **Hard constraints**: anything that absolutely cannot change (e.g., "the final exam format is mandated by the department," "we must use this textbook," "class size is 200 students").

Record all constraints. They will be used to filter and annotate recommendations.

### Step 3: Generate Candidate Recommendations

For each identified gap (from the audit and alignment data), generate one or more candidate recommendations. For each candidate, specify:

- **Description**: what the change involves in concrete, actionable terms.
- **Rationale**: which specific gap or weakness it addresses, referencing the audit or alignment data by identifier (e.g., "addresses unassessed LO-3" or "closes the MISSING gap for version control identified in career alignment").
- **Tier assignment**: classify as Tier 1, 2, or 3 using the definitions above and the detailed rubric in `references/revision-tiers.md`.
- **Effort estimate**: estimated faculty preparation time in hours, estimated TA support needed in hours per week, and any budget impact. Use the estimation rubric in `references/workload-estimation.md`.

Generate recommendations across all three tiers to give the faculty member options at different effort levels. Prioritize gaps by severity: accreditation gaps first (they carry compliance risk), then career alignment gaps for CORE competencies, then structural issues (unassessed outcomes, Bloom's level imbalances), then career alignment gaps for IMPORTANT/BENEFICIAL competencies.

### Step 4: Apply Constraint Filters

For each candidate recommendation, check it against the faculty constraints from Step 2:

- If the faculty has fewer than 5 available hours, exclude Tier 2 and Tier 3 recommendations from the primary plan. Present them in an appendix labeled "future considerations."
- If no budget is available, exclude recommendations requiring purchases. Suggest open-access alternatives where possible.
- If no TA support is available, reduce effort estimates that assumed TA involvement and flag recommendations that become infeasible without a TA.
- If department approval is not feasible, exclude Tier 3 recommendations from the primary plan.
- If a recommendation violates a hard constraint, remove it entirely and note why.

For each surviving recommendation, annotate it with the constraint check results:

- **Estimated faculty preparation time**: X hours.
- **Budget impact**: $0 / $X for [item].
- **TA support needed**: X hours/week for Y weeks / none.
- **Department approval required**: yes / no.

### Step 5: Run Accreditation Safety Check

Before finalizing the recommendation set, evaluate each proposed change for its impact on accreditation compliance. For each recommendation:

1. Determine whether the change modifies, adds, or removes any learning outcome, assessment, or content topic.
2. Cross-reference the affected elements against the accreditation requirements from the audit.
3. Assign an accreditation status:
   - **SAFE**: the change does not affect any accreditation-mapped element, or it improves coverage of an accreditation requirement.
   - **WARNING**: the change modifies an accreditation-mapped element. The modification likely maintains compliance but should be reviewed by the accreditation coordinator.
   - **BLOCKED**: the change would remove or weaken coverage of a required accreditation standard. Do not present this recommendation as viable unless the gap is addressed by another change in the plan.

If the accreditation-guardrails skill is available, invoke it to perform this check. If not, perform the check manually using the accreditation data from the audit.

Do not present BLOCKED recommendations in the primary plan. If a BLOCKED recommendation addresses an important gap, note it in a separate section with an explanation of why it was blocked and what alternative approaches might address the same gap without accreditation risk.

### Step 6: Assemble the Final Revision Plan

Organize the filtered and annotated recommendations into the following output structure.

## Output Format

Structure the revision plan as follows:

### Header

- Course identifier, title, and semester.
- Date of the analysis.
- Summary of data sources used (audit date, alignment date, constraint source).

### Executive Summary

A 3-5 sentence overview: the number of recommendations by tier, the most critical gaps addressed, and the estimated total faculty effort if all recommended changes are implemented.

### Tier 1 Recommendations (Quick Wins)

For each recommendation:
- **Title**: a brief descriptive name.
- **Description**: what to change, in concrete and actionable terms.
- **Rationale**: what gap this addresses, with reference to the audit or alignment data.
- **Effort**: estimated faculty hours, TA hours, budget.
- **Accreditation Status**: SAFE or WARNING (Tier 1 should rarely trigger WARNING).
- **Suggested Timeline**: when to implement (e.g., "before next class session," "before next offering").

### Tier 2 Recommendations (Moderate Changes)

Same format as Tier 1, with the addition of:
- **Prerequisite Work**: any preparation that must happen before implementation (e.g., "identify an appropriate industry dataset," "draft a new rubric").
- **Dependencies**: whether this recommendation depends on or benefits from another recommendation being implemented first.

### Tier 3 Recommendations (Deep Restructuring)

Same format as Tier 2, with the addition of:
- **Approval Requirements**: which committees or administrators must approve the change.
- **Risk Factors**: what could go wrong (student resistance, resource availability, coordination with other courses).
- **Phased Implementation**: if the change can be implemented incrementally over multiple semesters, describe the phases.

### Blocked Recommendations (if any)

List any recommendations that were generated but blocked by accreditation safety checks or hard constraints. For each, explain the block reason and suggest alternative approaches.

### Implementation Roadmap

A timeline view showing which recommendations to implement in which order. Group by semester or preparation phase. Account for dependencies between recommendations.

## Important Constraints and Behavioral Rules

Adhere to the following rules strictly:

- **Ground every recommendation in data**: every recommendation must cite a specific gap from the audit or alignment analysis. Do not generate generic "best practice" suggestions that are not tied to identified issues in this specific course.
- **Respect faculty autonomy**: present recommendations as options, not mandates. Use language like "consider," "one approach would be," and "this change would address." Do not use language that implies the faculty member is doing something wrong.
- **Be honest about limitations**: if all feasible recommendations are Tier 1 due to severe time or resource constraints, say so explicitly. Acknowledge that minor changes have limited impact and do not overstate the transformative potential of quick wins. A revised assignment prompt is valuable but it does not constitute course modernization.
- **Do not invent gaps**: if the audit and alignment data show strong coverage with no significant gaps, say so. Not every course needs major revision. A recommendation of "maintain current approach" for well-covered areas is valid.
- **Preserve what works**: if the audit reveals strengths (e.g., excellent Bloom's distribution, strong assessment coverage), highlight these explicitly. Do not suggest changes to well-functioning elements.
- **Accreditation is non-negotiable**: never present a recommendation that would compromise accreditation compliance without clearly marking it as BLOCKED and explaining the risk.

## Reference Files

Consult the following reference files during execution:

- `references/revision-tiers.md` -- contains detailed tier definitions with concrete examples across disciplines, estimated hours for each example, prerequisite work descriptions, and a decision tree for tier assignment based on available faculty time.
- `references/workload-estimation.md` -- contains the rubric for estimating faculty preparation time by change type, TA impact estimates, budget estimation guidelines for common changes, and the formula for computing total implementation cost.
