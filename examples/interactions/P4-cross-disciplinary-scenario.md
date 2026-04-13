# P4: Cross-Disciplinary Scenario

## Scenario
Dr. Priya Ramaswamy (F3) teaches CHE 360 Thermodynamics. Student feedback says "too theoretical." She wants real-world process simulation but has severe constraints (pre-tenure, 0.5 TA, max 6 hrs/week redesign time). Aisha Okonkwo (S3), a CS grad student in STS 434, suggested using publicly available process data for a data-driven analysis project.

## Data Sources Used
- Faculty profile (data/users/faculty-ramaswamy.json)
- CHE 360 syllabus (data/syllabi/che360-thermodynamics.md)
- Student profile (data/users/student-okonkwo.json)
- ABET EAC criteria for Chemical Engineering (data/accreditation/abet-eac-che.json)
- Chemical process engineer job data (data/industry/chemical-process-engineer.json)

## Conversation

**Turn 1 -- Dr. Ramaswamy:**
"I teach Chemical Engineering Thermodynamics and I keep getting feedback that it's too theoretical. I want to add process simulation, maybe using Aspen Plus, but I only have a half-time TA and I'm pre-tenure so I can't spend more than 6 hours a week on redesign. One of my students from another department -- Aisha, a CS grad student in STS 434 -- suggested using publicly available process data for a data-driven thermo analysis. Is that feasible?"

**Agent Internal Reasoning:**
- Constraints: 0.5 TA, pre-tenure (teaching evaluations matter for tenure case), max 6 hrs/week
- Aspen Plus: license available but steep learning curve, installation support burden, troubleshooting falls on 0.5 TA. Too heavy.
- Aisha's suggestion: feasible. NIST WebBook, DOE EIA, EPA all have quality public data. Students know MATLAB from CHE 220.
- Implementation: reframe existing group project (15%) rather than adding new work.
- ABET: strengthens SO-6 (experimentation/data analysis), the exact area where "too theoretical" feedback hits.

**Agent Response:**
"This is a strong idea. Let me assess both options.

**Aspen Plus: Not recommended this semester.** The site license is available, but the learning curve is significant. With a half-time TA, you would not have troubleshooting bandwidth when 30 students hit convergence errors simultaneously. Consider it for CHE 477 where it integrates more naturally.

**Data-driven thermodynamic analysis (recommended):** Reframe your existing group project (15%) as a data-driven analysis.

*Revised Group Project: Data-Driven Thermodynamic Analysis*
- Teams of 3-4 analyze a real thermodynamic system using publicly available data
- Data sources: NIST WebBook (properties), DOE EIA (power plant performance), EPA (process data)
- Students apply course models (equations of state, phase equilibria, cycle analysis) and compare predictions to real data
- Analysis in MATLAB (prerequisite knowledge from CHE 220)

**Example topics relevant to Maine industry:**
1. Compare Peng-Robinson predictions to NIST data for R-134a -- relevant to Maine's heat pump industry
2. Analyze DOE power plant data for Rankine cycle efficiency -- connects to regional energy infrastructure
3. Model vapor-liquid equilibrium for ethanol-water using NIST data -- relevant to bioprocessing

**Deliverable:** 6-8 page technical report with MATLAB code, plus 10-min team presentation.

**ABET mapping:** Covers SO-1 (analyze), SO-2 (design approach), SO-5 (teamwork), and strengthens SO-6 (experimentation/data analysis) -- the area where feedback says the course is too theoretical.

**Cross-disciplinary opportunity with Aisha:** If she holds one optional session on confidence intervals, residual analysis, and statistical comparison methodology, both sides benefit. Your students learn rigorous comparison rather than visual 'eyeballing.' Aisha gets a real-world dataset for her STS 434 work.

**Your time investment:** 3-4 hours to revise the project, create a topic list, and set up a MATLAB template. Your 0.5 TA handles grading.

Would you like me to draft the project description and MATLAB templates?"

---

**Turn 2 -- Dr. Ramaswamy:**
"Yes, draft those. But I'm worried about the statistical methods piece. My students haven't taken a statistics course -- CHE doesn't require one until junior year and many of them are sophomores. Will they be able to handle confidence intervals and residual analysis?"

**Agent Internal Reasoning:**
- Valid concern. CHE 360 is typically sophomores; formal statistics comes later.
- Scope statistics to arithmetic-level operations: percent error, mean absolute deviation, visual residual plots. No hypothesis testing, no regression, no distributions.

**Agent Response:**
"Good concern. Here is how to scope the statistics for sophomores:

**Required statistical methods (arithmetic-level):**
- Percent error between model prediction and experimental value at each data point
- Mean absolute percent error across the dataset (one summary number)
- Residual plot: predicted minus experimental versus the independent variable

These require only subtraction, division, and plotting -- operations they already do in MATLAB.

**What Aisha's session would cover:** How to interpret a residual plot (random scatter = good fit; systematic pattern = model limitation), and why percent error alone can be misleading. Conceptual, not computational.

**In the MATLAB template:** Statistical calculations pre-coded as functions. Students call `percentError(predicted, experimental)` and `plotResiduals(predicted, experimental, xVariable)`. They interpret the output; they do not derive the methods.

This keeps analytical rigor real while matching student preparation."

---

**Turn 3 -- Dr. Ramaswamy:**
"That works. One more question -- how does this affect my tenure case? Teaching evaluations are part of my file, and I'm worried that if this goes badly, it hurts me."

**Agent Internal Reasoning:**
- Career-stakes question. Must be honest about risk without being dismissive.
- Risk: first-run assignments have rough edges. But the change is bounded (one project, 15% of grade).
- Recommend: pilot conservatively, collect feedback, frame as responsive teaching in tenure narrative.

**Agent Response:**
"I want to give you a direct answer.

**The risk is real but bounded.** First-run assignments always have rough edges. If students struggle and blame the assignment, it could affect evaluations.

**Mitigation strategies:**

1. **Pilot in one section.** Run the data-driven project in one section, keep the traditional problem set in the other. Compare evaluations.

2. **Provide a safety net.** Include in the description: 'If your team encounters data access or analysis difficulties, schedule office hours for guided troubleshooting.'

3. **Frame as responsive teaching.** In your tenure narrative, describe the change as directly responding to student feedback. Tenure committees value faculty who iterate based on evidence.

4. **Collect mid-project feedback.** A 3-question anonymous survey at the midpoint lets you catch problems before they become evaluation complaints.

You are modifying an existing assignment, not adding one, so the downside is contained. If the pilot goes poorly, you revert next semester with lessons learned -- that is also a valid tenure narrative about reflective teaching practice."

## Why This Interaction Succeeds
- Steers away from infeasible option (Aspen Plus) with clear rationale
- Works within existing assessment structure (modifying group project, not adding one)
- Cross-disciplinary connection is genuine and benefits both parties
- Keeps pre-tenure time constraints front and center
- ABET mapping maintained and arguably strengthened
- Handles the tenure-risk question directly rather than offering false reassurance
- Recommends a pilot approach that limits downside while generating evidence
