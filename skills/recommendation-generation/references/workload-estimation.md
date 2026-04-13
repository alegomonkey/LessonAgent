# Workload Estimation Reference

This reference provides rubrics for estimating faculty preparation time, TA impact, and budget for common course revision activities. Use these estimates when annotating recommendations in the recommendation-generation skill.

---

## Faculty Preparation Time by Change Type

The following estimates assume a faculty member working at normal pace with familiarity with the course content. Adjust upward by 25-50% for a faculty member teaching the course for the first time or working in an unfamiliar content area.

### Content Modifications (Tier 1 Range)

| Change Type | Estimated Hours | Notes |
|---|---|---|
| Update a reading list entry | 0.25-0.5 | Includes finding the replacement and updating the syllabus. |
| Revise an assignment prompt (framing only) | 0.5-1.0 | Rewrite the prompt to add context; no change to requirements or rubric. |
| Replace 2-3 outdated examples | 0.5-1.0 | Includes finding current examples and updating slides or notes. |
| Add reflection questions to an assignment | 0.25-0.5 | Write 2-3 questions; no rubric change needed if ungraded. |
| Rewrite learning outcomes with Bloom's verbs | 0.5-1.5 | Depends on number of outcomes; ~10 minutes per outcome. |
| Add a brief in-class discussion prompt | 0.25-0.5 | Write the prompt and plan the facilitation. |
| Update a syllabus policy section | 0.5-1.0 | Revise language and ensure consistency with university policies. |
| Correct or clarify an existing rubric | 1.0-2.0 | Review current rubric, identify ambiguities, revise criteria. |

### New Content Creation (Tier 2 Range)

| Change Type | Estimated Hours | Notes |
|---|---|---|
| New assignment prompt with rubric | 3-5 | Write prompt, create rubric, develop sample solution, test for clarity. |
| New project specification (multi-part) | 8-15 | Write spec, create milestones, develop rubric, create starter code/data, test. |
| New lab exercise | 5-10 | Design procedure, create materials, test all steps, write instructions. |
| New case study with discussion guide | 8-12 | Research scenario, write narrative, develop questions, create facilitation guide. |
| New rubric for existing assignment | 2-4 | Define criteria, create performance levels, calibrate with sample work. |
| Peer review component setup | 3-6 | Design review rubric, create instructions, configure LMS tool, test workflow. |
| Integration of industry dataset | 4-8 | Find dataset, clean/prepare it, update lab instructions, test all analyses. |
| Guest speaker coordination | 2-4 | Identify speaker, coordinate schedule, prepare context for students, plan Q&A. |
| New quiz or exam (one instance) | 3-6 | Write questions, create answer key, review for alignment with LOs. |
| Video recording (per 15-minute segment) | 2-4 | Script, record, edit, upload, create viewing guide or quiz. |

### Structural Changes (Tier 3 Range)

| Change Type | Estimated Hours | Notes |
|---|---|---|
| Resequence course units | 15-25 | Reorganize schedule, update all cross-references, adjust prerequisites between topics. |
| New multi-week module (3-4 weeks) | 30-60 | Develop lectures, readings, activities, and assessments for 3-4 weeks of content. |
| Textbook replacement with OER | 40-80 | Identify OER for each topic, create gap-filling materials, rewrite problem sets. |
| Capstone project replacing final exam | 20-35 | Design project, create scaffolding, develop rubric, plan presentations. |
| Flipped classroom conversion | 60-100 | Record/curate all pre-class content, design all in-class activities, create prep quizzes. |
| New course delivery mode (online/hybrid) | 50-80 | Redesign for asynchronous/synchronous mix, create online materials, set up LMS. |
| Comprehensive assessment redesign | 25-40 | Replace exam-heavy model with diversified assessment; create all new instruments. |

---

## TA Impact Estimates by Change Type

Estimate TA hours needed to support the change during implementation and ongoing operation. These estimates assume a TA who is familiar with the course content.

### Implementation Support (One-Time)

| Change Type | TA Hours (One-Time) | Tasks |
|---|---|---|
| New assignment or project | 3-5 | Test the assignment, review rubric, prepare to answer student questions. |
| New lab exercise | 4-8 | Run through the lab, identify potential issues, prepare troubleshooting guide. |
| Peer review setup | 2-3 | Test the review workflow, prepare instructions for students. |
| Industry dataset integration | 2-4 | Verify data quality, test analysis steps, prepare FAQ for students. |
| Case study development | 1-2 | Review materials, prepare to facilitate discussion sections. |

### Ongoing Operational Impact (Per Semester)

| Change Type | TA Hours/Week (Additional) | Tasks |
|---|---|---|
| New project-based assignment | 1-3 | Additional office hours, grading project milestones, providing feedback. |
| Peer review facilitation | 0.5-1.0 | Monitor review quality, handle disputes, grade review participation. |
| New lab exercise | 0.5-1.5 | Support students during lab, grade lab reports. |
| Capstone project management | 2-4 | Track progress, provide feedback on milestones, attend presentations. |
| Flipped classroom activities | 1-2 | Facilitate in-class activities, monitor pre-class quiz completion. |

### TA Availability Factor

When computing total implementation cost, apply a TA availability factor:

- **TA assigned and available**: factor = 1.0 (full TA support assumed).
- **TA shared with other courses**: factor = 0.5 (TA can provide half the estimated support).
- **No TA assigned**: factor = 0.0 (all TA tasks fall to the faculty member; add TA hours to faculty hours).

---

## Budget Estimation for Common Changes

### Resource Costs

| Resource Type | Cost Range | Notes |
|---|---|---|
| Open-access textbook or OER | $0 | Free by definition; faculty time to curate is the real cost. |
| Commercial textbook (new adoption) | $80-250 per student | Student cost; may be covered by inclusive access programs. |
| Software license (per student, per semester) | $0-50 | Many tools offer free academic licenses (MATLAB, GitHub, JetBrains). Check first. |
| Cloud computing credits (per student) | $0-100 | AWS, Azure, and GCP offer free academic tiers; exceeding tiers incurs costs. |
| Industry dataset access | $0-500 | Many datasets are free (government, Kaggle); proprietary datasets may have licensing fees. |
| Guest speaker honorarium | $0-500 | Many industry professionals speak for free; some require honorarium or travel reimbursement. |
| Video production (professional) | $500-2000 per video | Only needed if professional quality is required; faculty self-recording is free. |
| Lab equipment or supplies | Varies widely | Consult department budget; new equipment may require capital request. |
| Conference or workshop registration | $100-500 per faculty | For faculty professional development related to the course change. |

### Cost Classification

- **Zero-cost changes**: modifications that use only existing resources and faculty time. Most Tier 1 changes and many Tier 2 changes fall here.
- **Low-cost changes ($1-500)**: changes requiring minor purchases such as a dataset license, guest speaker honorarium, or software access for a specific tool not covered by institutional licenses.
- **Moderate-cost changes ($500-5000)**: changes requiring new equipment, professional video production, or multiple resource purchases.
- **High-cost changes ($5000+)**: changes requiring significant infrastructure (new lab equipment, classroom renovation, major software deployment). These almost always require department budget approval.

---

## Total Implementation Cost Formula

Use this formula to estimate the total cost of implementing a recommendation:

```
total_cost = faculty_cost + ta_cost + direct_budget

where:
  faculty_cost = faculty_hours * faculty_hourly_rate
  ta_cost = (ta_hours_onetime + ta_hours_weekly * weeks_in_semester) * ta_hourly_rate * ta_availability_factor
  direct_budget = sum of all resource costs
```

### Default Rate Assumptions

When specific rates are not available, use these defaults (adjust for institution and region):

- **Faculty hourly rate** (for cost estimation, not compensation): $75/hour. This represents the opportunity cost of faculty time that could be spent on research, other courses, or service.
- **TA hourly rate**: $20/hour (graduate TA) or $15/hour (undergraduate TA).
- **Weeks in semester**: 15 (adjust for quarter system: 10 weeks).

### Example Calculation

A Tier 2 recommendation to create a new project-based assignment:

```
Faculty hours: 12 (project spec, rubric, starter code, testing)
TA hours (one-time): 4 (test assignment, prepare to support students)
TA hours (ongoing): 2 hours/week * 8 weeks (project duration) = 16 hours
TA availability factor: 1.0 (dedicated TA assigned)
Direct budget: $0 (uses existing tools and open data)

faculty_cost = 12 * $75 = $900
ta_cost = (4 + 16) * $20 * 1.0 = $400
direct_budget = $0

total_cost = $900 + $400 + $0 = $1,300
```

This total cost estimate helps faculty and departments understand the true investment required, beyond just "hours of work."

### Interpreting Total Cost

- **Under $500**: minimal investment; typical of Tier 1 changes.
- **$500-$3,000**: moderate investment; typical of Tier 2 changes.
- **$3,000-$10,000**: significant investment; typical of Tier 3 changes.
- **Over $10,000**: major investment; requires department-level budget planning and justification.

Present these estimates as ranges, not exact figures. Actual costs vary by institution, region, and individual circumstances. The estimates provide a framework for comparison and planning, not a budget commitment.

---

## Notes on Using These Estimates

- All time estimates assume focused work without interruptions. Actual calendar time may be 2-3 times the estimated hours due to context switching and scheduling.
- For changes that span multiple semesters (phased Tier 3 implementations), estimate each phase separately and present a cumulative total.
- When a faculty member reports that their available time is significantly different from these estimates (e.g., "I can create a new project in 4 hours"), defer to their self-assessment but note the estimate range for context.
- Update these estimates periodically based on actual implementation data from faculty who have completed similar changes.
