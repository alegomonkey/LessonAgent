---
name: generate-recommendations
description: Generate a tiered revision plan for modernizing a course based on audit and alignment data
argument-hint: "[--tier quick|moderate|deep|all] [--constraints <profile-path>]"
allowed-tools: ["Read", "Grep", "Glob", "Bash", "Agent"]
---

# /generate-recommendations

Produce an actionable, tiered revision plan for course modernization.

## Arguments
- **--tier** (optional): Filter to specific tier(s). Options: `quick` (Tier 1 only), `moderate` (Tier 1+2), `deep` (all tiers), `all` (default, shows all tiers)
- **--constraints** (optional): Path to a faculty profile JSON containing constraints. If omitted, prompt the user to specify constraints or use defaults from conversation context.

## Prerequisites
This command works best after running `/analyze-syllabus` and `/align-goals`. If no prior analysis exists in the conversation, note this and offer to run the analysis first.

## Execution Steps

1. **Load prior analysis**: Retrieve syllabus audit results and alignment gap data from the current conversation context. If unavailable, note what's missing.

2. **Load constraints**: Read faculty constraints from the specified profile or from conversation context. If no constraints are set, prompt the user:
   - "How many hours can you dedicate to course redesign this semester?"
   - "What is your budget for new materials or tools?"
   - "How many TAs do you have, and how many hours per week?"
   - "Do changes need department committee approval?"

3. **Generate candidates**: Based on identified gaps, generate a comprehensive list of potential changes. Draw on the tier examples in `skills/recommendation-generation/references/revision-tiers.md`.

4. **Estimate workload**: For each candidate, estimate faculty preparation time, TA impact, and budget cost using `skills/recommendation-generation/references/workload-estimation.md`.

5. **Apply constraint filters**: Remove or flag candidates that violate hard constraints. For borderline cases, note the constraint tension.

6. **Run accreditation checks**: For each remaining candidate, check accreditation compliance using data from `data/accreditation/`. Mark each as SAFE, WARNING, or BLOCKED.

7. **Classify into tiers**: Assign each recommendation to Tier 1 (Quick Wins, <2hrs), Tier 2 (Moderate, 5-20hrs), or Tier 3 (Deep, 40+hrs).

8. **Present the plan**:
   - Executive summary
   - Tier 1 recommendations (if requested)
   - Tier 2 recommendations (if requested)
   - Tier 3 recommendations (if requested)
   - Blocked recommendations with explanations
   - Implementation timeline suggestion

9. **Offer follow-up**: Ask if the user wants to drill into any specific recommendation, redesign an assessment (`/redesign-assessment`), or adjust constraints.
