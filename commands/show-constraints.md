---
name: show-constraints
description: Display, set, or reset the current faculty constraints for course redesign recommendations
argument-hint: "[set|show|reset] [--faculty-hours N] [--budget N] [--ta-hours N] [--sections N] [--students N]"
allowed-tools: ["Read", "Write", "Grep"]
---

# /show-constraints

Manage faculty constraints that filter and shape course redesign recommendations.

## Subcommands
- **show** (default): Display the current constraint profile
- **set**: Update one or more constraints
- **reset**: Clear all constraints and prompt to re-enter

## Arguments (for `set`)
- **--faculty-hours N**: Hours available for course redesign this semester
- **--budget N**: Maximum budget in dollars for new materials/tools
- **--ta-hours N**: TA hours available per week
- **--sections N**: Number of course sections
- **--students N**: Total enrollment across all sections
- **--approval**: Department approval is required for changes (flag)
- **--no-approval**: Department approval is NOT required (flag)

## Execution Steps

### For `show` (default):
1. Check if a faculty profile is loaded in the current conversation
2. If yes: display the constraint profile as a formatted table
3. If no: check `data/users/` for matching faculty profiles
4. Display: faculty hours, budget, TA count and hours, student count, sections, approval requirements, grading load, technology available, additional duties
5. Compute and display the "constraint severity" level: Minimal (most changes feasible), Moderate (Tier 1+2 feasible), Severe (Tier 1 only), Critical (only prompt/framing changes feasible)

### For `set`:
1. Update the specified constraint values
2. Recalculate constraint severity level
3. Display the updated constraint profile
4. Note how the change affects feasible recommendations (e.g., "Increasing TA hours from 5 to 10 opens up Tier 2 changes requiring grading support")

### For `reset`:
1. Clear all current constraints
2. Prompt the user to specify new constraints interactively:
   - "How many hours can you dedicate to course redesign this semester?"
   - "What is your budget for new materials?"
   - "How many TAs do you have, and how many hours per week each?"
   - "How many sections and total students?"
   - "Do proposed changes need department committee approval?"
3. Set the constraints and display the resulting profile
