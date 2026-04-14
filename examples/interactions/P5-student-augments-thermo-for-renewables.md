# P5: Rémi Augments a CHE 360 Group Project for Renewable Energy

## Scenario
Rémi Lapointe (ChemE sophomore, renewable energy goal) wants to connect the CHE 360 thermodynamics group project to Maine's heat pump and biomass industry rather than using textbook petrochemical examples.

## Data Sources Used
- Student profile (data/users/student-lapointe.json)
- CHE 360 syllabus (data/syllabi/che360-thermodynamics.md)

## Conversation

**Turn 1 — Rémi:**
"I'm in CHE 360 and our group project is 'open-ended thermodynamic analysis of a real system.' The textbook examples are all petrochemical. Can I propose using heat pump data instead? That's the industry actually growing in Maine."

**Agent Internal Reasoning:**
- Parse CHE 360 group project: 15% of grade, teams of 3-4, open-ended analysis, rubric covers SO-1 (analyze), SO-2 (design), SO-5 (teamwork).
- "Open-ended" and "real system" = wide latitude for topic choice. Choosing heat pumps is already within scope.
- Heat pumps: direct application of Carnot cycle (Week 4), refrigeration cycles (Week 14), equations of state (Week 7-8), phase equilibrium (Week 9-10). Strong curricular fit.
- But Rémi can go further than just topic choice.

**Agent Response:**
"The project says 'open-ended analysis of a real system' — so choosing heat pumps is already within the assignment's scope. No proposal needed for just the topic.

But there's an augmentation opportunity that goes further:

**Standard project (meets rubric):**
- Apply Peng-Robinson equation of state to a refrigerant (R-410A or R-32)
- Calculate coefficient of performance for a standard heat pump cycle
- Compare to ideal Carnot COP

**Augmented version:**
- Same analysis as above (all rubric criteria met), PLUS:
- Use real performance data from NIST WebBook for the refrigerant properties instead of textbook approximations
- Compare your Peng-Robinson predictions to the NIST data — quantify how accurate the equation of state is for this system
- Connect findings to Maine's market: what COP differences matter for cold-climate heat pumps where the temperature differential is large?
- 1-page MATLAB appendix validating your hand calculations computationally

This hits course material from multiple weeks: equations of state (Weeks 7-8), generalized correlations (Week 8), refrigeration cycles (Week 14), phase equilibrium (Week 9-10). And it connects to a real Maine industry.

Want me to build the proposal for Dr. Ramaswamy?"

---

**Turn 2 — Rémi:**
"Yeah. Will Dr. Ramaswamy care about the NIST data comparison? I don't know if that's something she'd value or just see as extra work."

**Agent Response:**
"The NIST comparison is actually the strongest part for a ChemE professor. It demonstrates something textbook problem sets never require: testing whether the model you're using is accurate for your specific system. That's what process engineers do in practice — validate models against real data before using them for design decisions.

For the proposal, I'll frame it as: 'We apply course methods (equations of state, cycle analysis) and then validate predictions against NIST reference data to assess model reliability for cold-climate heat pump design.'

That framing connects the augmentation directly to engineering judgment — deciding when your model is good enough for a design decision. Dr. Ramaswamy will recognize that as a professional engineering skill, not just extra work.

Here's the proposal:

---

## Proposal: Augmented Group Project — Heat Pump Thermodynamic Analysis with NIST Validation

**Student:** Rémi Lapointe | **Course:** CHE 360 Chemical Engineering Thermodynamics
**Assignment:** Group Project — Open-Ended Thermodynamic Analysis | **Professor:** Dr. Priya Ramaswamy
**Date:** November 1, 2026

### Summary
Our team proposes analyzing the thermodynamic performance of a cold-climate heat pump system using R-32 refrigerant, applying course methods (Peng-Robinson EOS, Carnot and real cycle analysis) and validating predictions against NIST WebBook reference data. This augments the standard group project by adding model-vs.-data comparison and connecting findings to Maine's growing heat pump market.

### Original Requirements Met

| Original Criterion | How the Augmented Version Addresses It |
|---|---|
| SO-1: Analyze thermodynamic systems | Fully met. Apply first/second law analysis, calculate COP, evaluate cycle efficiency. The NIST comparison adds a model validation dimension to the analysis. |
| SO-2: Apply engineering design | Fully met. Design approach to selecting operating conditions for cold-climate performance. The augmentation adds the design judgment of assessing model reliability. |
| SO-5: Teamwork | Unchanged. Team of 3-4, shared deliverables, 10-min presentation. |

### Augmentation Components
- **NIST data comparison**: Compare Peng-Robinson predictions for R-32 thermodynamic properties (enthalpy, entropy, vapor pressure) against NIST WebBook values across the relevant temperature range. Quantify error using mean absolute percent error.
- **Cold-climate analysis**: Evaluate COP degradation as outdoor temperature drops below 0°F — the critical performance question for Maine heat pump installations.
- **MATLAB validation appendix (1 page)**: Reproduce key hand calculations computationally to verify results and generate property comparison plots.

### Deliverables
1. Team technical report, 6-8 pages (original)
2. 10-minute team presentation (original)
3. NIST data comparison section in report (augmented)
4. MATLAB appendix with code and validation plots (augmented)

### Timeline

| Date | Milestone | Component |
|---|---|---|
| Oct 15-20 | Collect NIST data for R-32; set up MATLAB template | Augmented prep |
| Oct 20-25 | Hand calculations: Peng-Robinson, cycle analysis | Original |
| Oct 25-28 | NIST comparison, error analysis | Augmented |
| Oct 28-30 | Write report; MATLAB validation appendix | Both |
| Oct 31 | Rehearse presentation | Original |
| Nov 1 | Team presentation | Original |

### Career Rationale
Process engineers in Maine's renewable energy sector evaluate heat pump installations where the outdoor temperature range is extreme (-20°F to 90°F). Understanding how thermodynamic models perform under real conditions — and when to trust or question model predictions — is a core engineering judgment skill. This project develops that judgment by comparing textbook methods to reference data for a system relevant to Maine's energy transition.

---

Pending your approval, Dr. Ramaswamy.

---

Does this work? I framed the NIST comparison as model validation — an engineering judgment skill, not just data collection."

## Why This Interaction Succeeds
- Recognizes the assignment already allows topic choice; augmentation goes beyond just that
- NIST validation is the key differentiator — turns a textbook exercise into engineering practice
- Addresses Rémi's concern about professor reception with a framing strategy
- Connects to Maine's specific renewable energy market
- Multiple course topics converge in one application (EOS, cycles, phase equilibrium)
- Timeline is realistic for a sophomore-level project
