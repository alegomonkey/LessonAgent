# N3: Faculty Rejects All Suggestions -- Agent Adapts

## Scenario
Dr. James Okenwa (F4), a tenured math professor with 22 years of experience, was asked by the Dean to try the platform. He teaches MAT 228 (Calculus III) and STS 434 (Applied Statistics for Data Science). He is skeptical and resistant.

## Data Sources Used
- Faculty profile (data/users/faculty-okenwa.json)
- MAT 228 course data, STS 434 syllabus (data/syllabi/sts434-applied-statistics.md)
- Data scientist job data (data/industry/data-scientist.json)

## Conversation

**Turn 1 -- Dr. Okenwa:**
"The Dean asked me to try this. I've been teaching Calculus III for 22 years and my students consistently score above the department average on the standardized final. I don't see what an AI tool is going to tell me about teaching multivariable calculus."

**Agent Internal Reasoning:**
- Resistance profile: tenured, 22 years, strong outcomes, skeptical
- Must NOT be defensive or try to "sell" itself
- Must NOT suggest changes to a course that is demonstrably working well
- Strategy: acknowledge strong outcomes, find out if there IS something he cares about, and if not, gracefully accept

**Agent Response:**
"Your student outcomes speak for themselves, and I have no interest in fixing something that is not broken. If Calculus III is achieving strong results after 22 years of refinement, that is a well-calibrated course.

I have two questions, and you are welcome to say 'neither' to both:

1. Is there anything about MAT 228 that has been nagging at you -- something that does not show up in exam scores?
2. You also teach STS 434, which is a newer course in a rapidly evolving field. Would that be a more useful place for this conversation?

If the answer to both is 'no,' I will report back to the Dean that MAT 228 is performing well and does not need intervention. I would rather be honest about that than manufacture suggestions."

---

**Turn 2 -- Dr. Okenwa:**
"Hmm. Fine. Students coming into MAT 228 are weaker at spatial reasoning than they used to be. I think it's because they rely on graphing calculators and Desmos instead of sketching by hand."

**Agent Response:**
"That is a well-documented phenomenon. Research from the MAA suggests that students who routinely use visualization software for 3D surfaces develop weaker mental rotation skills than those who sketch by hand.

If you want to increase hand-drawing, one approach: add a 'sketch first, verify second' protocol to homework involving surfaces, vector fields, and contour plots. Students hand-draw first, then optionally verify with software. The graded artifact is the hand sketch.

This requires no technology, no redesign, and reinforces exactly the skill you are concerned about. I can compile the research citations if you want to present this as an evidence-based choice."

---

**Turn 3 -- Dr. Okenwa:**
"Actually... pull up STS 434. That course I'm less sure about. The data science field moves so fast that I'm not confident my R-based curriculum is keeping up. But I don't want to chase trends."

**Agent Response:**
"STS 434 is where I can be most useful. Let me pull up the skills gap analysis against Maine data science employers -- IDEXX, Jackson Lab, WEX.

Your statistical methods coverage is strong and should not change. Regression, classification, clustering -- these are foundations.

The gaps are in application and tooling layers:
- SQL and data pipelines -- every posting requires this, not currently covered
- Experiment design / A/B testing -- increasingly central to industry data science
- Reproducible research (Git, R Markdown/Quarto) -- expected in professional settings

I am NOT recommending deep learning, LLMs, or the latest AI trend. SQL, experiment design, and reproducible research are durable skills -- important for a decade and will remain so.

I would suggest modifying 2-3 homework assignments to incorporate SQL-based data extraction and adding a single lecture on A/B testing. This changes less than 15% of the course.

Want me to detail specific assignment modifications?"

## Why This Interaction Fails Initially But Succeeds
- Agent does not try to sell itself or argue with a skeptic
- Offers to report to the Dean that the course does not need intervention (builds trust)
- Supports the professor's instinct on hand-drawing (does not push technology)
- Professor opens the door to STS 434 on his own terms
- Agent distinguishes durable skills from trends, matching Dr. Okenwa's values

## Design Lesson
Adapt to resistance, do not persist. Meet faculty where they are. Not every course needs the agent.
