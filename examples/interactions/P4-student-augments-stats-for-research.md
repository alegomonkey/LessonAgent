# P4: Aisha Augments an STS 434 Project for ML Research

## Scenario
Aisha Okonkwo (CS MS student, ML/AI safety research goal) is in STS 434 Applied Statistics. The final team project (30% of grade) requires a full data analysis pipeline on a real dataset. She wants to augment it with an algorithmic fairness component relevant to her AI safety PhD applications.

## Data Sources Used
- Student profile (data/users/student-okonkwo.json)
- STS 434 syllabus (data/syllabi/sts434-applied-statistics.md)
- Data scientist job data (data/industry/data-scientist.json)

## Conversation

**Turn 1 — Aisha:**
"I'm in STS 434 and we have a team project — build a full data analysis pipeline on a real dataset. I want to focus on algorithmic fairness since I'm aiming for a PhD in AI safety. The rubric grades methodology, interpretation, and presentation. Can I steer the project toward fairness analysis without losing points?"

**Agent Internal Reasoning:**
- Parse STS 434 final project: 30% of grade, team project (3-4 people), full pipeline on real dataset, 15-min presentation + report.
- Rubric: methodology, interpretation/communication, presentation quality.
- Week 12 of STS 434 covers "Ethics in data science: fairness, bias, privacy" — fairness is already in the course.
- Augmentation: add a fairness audit layer ON TOP of the standard pipeline. The team does the standard work; Aisha adds the fairness component.

**Agent Response:**
"Natural fit. STS 434 already covers fairness in Week 12, so augmenting the project with a fairness component deepens a topic the course values.

**Assignment Profile:**
- 30% of grade, teams of 3-4, 15-min presentation + written report
- Rubric: methodology (rigor of analysis pipeline), interpretation (quality of findings communication), presentation (clarity and professionalism)

**Alignment to AI safety research:**
- STRONG: statistical methods, model evaluation, communication of findings
- PARTIAL: experiment design (conceptual, not deep)
- AUGMENTATION OPPORTUNITY: add a fairness audit as an additional analysis layer — compute group-level disparities, test for statistical significance of differences, interpret implications

**Suggested augmentation:**
1. Team completes the full standard pipeline (EDA, modeling, evaluation) — original project, unchanged
2. Aisha adds a fairness audit layer: demographic parity, equalized odds, calibration across protected groups
3. Additional report section (authored by Aisha individually) interpreting fairness findings and their implications for responsible deployment

This adds ~8-10 hours of individual work beyond the base project. Original methodology and interpretation criteria are met by the standard pipeline; the fairness audit is an additive analytical layer.

Shall I build the proposal?"

---

**Turn 2 — Aisha:**
"Yes. But my teammates might not care about fairness and just want to finish the project. How do I handle that?"

**Agent Response:**
"Good concern. I recommend framing the fairness audit as YOUR individual contribution to the team project:

- The team completes the standard pipeline together (everyone's responsibility)
- You add the fairness layer individually and write that section of the report yourself
- Your teammates' workload is unchanged
- The proposal to Dr. Okenwa specifies this division clearly

This way you get the augmented experience without requiring teammate buy-in. If the team IS interested, the fairness component can become shared — but that's a bonus, not a dependency.

Here's the proposal:

---

## Proposal: Augmented Team Project — Standard Pipeline + Individual Fairness Audit

**Student:** Aisha Okonkwo | **Course:** STS 434 Applied Statistics for Data Science
**Assignment:** Final Team Project | **Professor:** Dr. James Okenwa
**Date:** March 15, 2027

### Summary
I propose completing all team project requirements as specified — full data analysis pipeline, team presentation, written report — and adding an individual fairness audit component as my extended contribution. The team delivers the standard pipeline; I add a fairness analysis layer examining group-level disparities in model predictions. This augmentation deepens the course's Week 12 ethics content and supports my PhD applications in AI safety research.

### Original Requirements Met

| Original Criterion | How the Augmented Version Addresses It |
|---|---|
| Methodology (pipeline rigor) | Fully met by team's standard pipeline: EDA, feature engineering, model fitting, cross-validation, evaluation metrics. The fairness audit is an additional analytical layer that does not replace any standard methodology steps. |
| Interpretation (quality of findings) | Fully met in the team's report sections. My fairness audit section adds an additional dimension of interpretation — what the model's predictions mean for different demographic groups. |
| Presentation (15 min, team) | Unchanged. Team presents the standard pipeline and findings. If time permits, I present a 2-minute fairness findings summary within the team's slot. |

### Augmentation Components
- **Fairness audit methodology**: Compute demographic parity ratio, equalized odds difference, and calibration across at least two protected attribute groups. Use the `fairlearn` Python library (or equivalent in R).
- **Statistical testing**: Test whether observed group-level disparities are statistically significant using appropriate hypothesis tests.
- **Individual report section (2-3 pages)**: Interpret fairness findings — what do the disparities mean? Are they artifacts of training data, model design, or real-world inequities? What mitigation approaches exist?
- **Connection to AI safety research**: Brief discussion of how this analysis relates to broader questions in responsible AI deployment.

### Team vs. Individual Division

| Component | Responsibility |
|---|---|
| Data acquisition and EDA | Team (shared) |
| Feature engineering and modeling | Team (shared) |
| Model evaluation and interpretation | Team (shared) |
| Fairness audit and fairness report section | Aisha (individual) |
| Team presentation (13 min) | Team (shared) |
| Fairness summary in presentation (2 min) | Aisha (individual) |

### Deliverables
1. Team report with standard pipeline analysis (original — team)
2. Fairness audit section appended to team report (augmented — individual)
3. R/Python code for fairness analysis in team repository (augmented — individual)
4. Team presentation, 15 minutes (original — team, with my 2-min fairness segment)

### Timeline

| Date | Milestone | Component |
|---|---|---|
| Feb 15-Mar 1 | Team: data acquisition, EDA, initial modeling | Original (team) |
| Mar 1-8 | Team: model refinement, evaluation | Original (team) |
| Mar 8-12 | Aisha: run fairness audit on team's model | Augmented (individual) |
| Mar 12-14 | Aisha: write fairness report section | Augmented (individual) |
| Mar 14 | Team: finalize presentation | Original (team) |
| Mar 15 | Team presentation | Original (team + augmented segment) |

### Career Rationale
I am applying to PhD programs in AI safety and responsible ML. Fairness auditing — computing group-level disparities, testing for statistical significance, and interpreting findings in deployment context — is a core research methodology in this field. This augmentation gives me a concrete portfolio piece demonstrating fairness analysis on a real dataset, directly supporting my PhD applications to CMU and UW.

---

Pending your approval, Dr. Okenwa.

---

The team/individual split is clear, so Dr. Okenwa can see your teammates aren't affected. Want to adjust anything?"

## Why This Interaction Succeeds
- Addresses team dynamics — a real constraint for group projects
- Individual contribution model doesn't burden teammates
- Augmentation aligns with course content (Week 12 fairness topic)
- Career rationale is strong and specific (PhD applications, named programs)
- Rubric compliance is clean because the standard pipeline is fully preserved
- Team vs. individual table makes the division unambiguous for the professor
