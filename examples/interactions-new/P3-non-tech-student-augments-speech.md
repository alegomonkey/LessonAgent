# P3: Non-Technical Student Augments a Speech for Health Communication

## Scenario
Mei Chen (nursing junior, nurse practitioner goal) is in CMJ 103. She thinks public speaking is irrelevant to nursing. The agent shows her otherwise and helps her augment Speech 2 (persuasive speech — the gen-ed signature assignment) with a healthcare advocacy scenario.

## Data Sources Used
- Student profile (data/users/student-chen-mei.json)
- CMJ 103 syllabus (data/syllabi/cmj103-public-communication.md)

## Conversation

**Turn 1 — Mei:**
"I'm a nursing major in CMJ 103. I don't see how giving speeches helps me become a nurse practitioner. Is there any way to make Speech 2 — the persuasive speech — more relevant to healthcare?"

**Agent Internal Reasoning:**
- Mei's profile: NP goal, rural healthcare, sees CMJ 103 as irrelevant.
- Speech 2: persuasive speech, 7-9 min, 20% of grade, gen-ed WOC signature assignment.
- Rubric: delivery (25pts), organization (25pts), visual aids (15pts), audience adaptation (20pts), evidence use (15pts).
- Key insight: NPs persuade constantly — presenting treatment recommendations at case conferences, advocating to insurance reviewers for patient approvals, persuading patients to adhere to treatment plans, pitching program proposals to hospital administrators. Persuasive speaking is a CORE NP competency.
- The prompt says "deliver a 7-9 minute persuasive speech" — topic is open. This is not even a format change; it's a topic choice plus a reflection.

**Agent Response:**
"Persuasive speaking is actually one of the most career-relevant skills in CMJ 103 for a nurse practitioner. Here's why:

NPs routinely:
- Present treatment recommendations to care teams at case conferences
- Advocate to insurance reviewers for patient treatment approvals
- Persuade resistant patients to adhere to treatment plans
- Pitch program proposals (e.g., a new rural health clinic) to hospital administrators

All of these are persuasive communication in professional healthcare contexts.

**Assignment profile — Speech 2:**
| Criterion | Points |
|---|---|
| Delivery | 25 |
| Organization | 25 |
| Visual aids | 15 |
| Audience adaptation | 20 |
| Evidence use | 15 |

The prompt says 'deliver a 7-9 minute persuasive speech.' The topic is yours to choose. None of the rubric criteria specify what you persuade about — they assess how well you persuade.

**Augmentation idea:** Persuade a hospital board to fund a nurse-led primary care clinic in a rural Maine community. Use real data — CDC rural health statistics, Maine DHHS workforce shortage data, health outcome disparities in Aroostook County. This is the exact scenario you'd face as an NP advocating for a rural health program.

The augmentation component: a 200-word written reflection connecting the speech to a specific NP professional scenario — presenting to a Community Health Center board.

Want me to build the proposal for Dr. Chen?"

---

**Turn 2 — Mei:**
"I hadn't thought about it that way. But Speech 2 is the gen-ed signature assignment — can I really change it?"

**Agent Response:**
"You're not changing the assignment — you're choosing a specific topic within the existing prompt. The prompt says 'deliver a 7-9 minute persuasive speech.' It doesn't specify a topic. The rubric grades delivery, organization, visual aids, audience adaptation, and evidence use. A persuasive speech about rural healthcare funding meets every criterion identically to a speech about any other topic.

The gen-ed signature assignment is scored on the UMaine WOC standardized rubric, which assesses communication skills — not topic selection.

The only augmentation beyond the topic choice is the 200-word career reflection. That's the added component, and it doesn't change the speech itself.

Shall I draft the proposal?"

---

**Turn 3 — Mei:**
"Yes. And can you include some of the data sources I could use? I know Aroostook County has health access issues but I don't know where to find the numbers."

**Agent Response:**
"Here's your proposal, including suggested data sources:

---

## Proposal: Augmented Speech 2 — Rural Healthcare Advocacy Presentation

**Student:** Mei Chen | **Course:** CMJ 103 Fundamentals of Public Communication
**Assignment:** Speech 2 — Persuasive Speech | **Professor:** Dr. Marcus Chen
**Date:** October 5, 2026

### Summary
I propose focusing my persuasive speech on advocating for a nurse-led primary care clinic in rural Maine, using real public health data as evidence. This topic directly connects the communication skills assessed in Speech 2 to the advocacy work I will do as a nurse practitioner in rural healthcare. I will also submit a 200-word written reflection connecting this speech to a specific NP professional scenario.

### Original Requirements Met

| Original Criterion | Pts | How the Augmented Version Addresses It |
|---|---|---|
| Delivery | 25 | Unchanged. 7-9 minute in-class speech with standard delivery expectations. |
| Organization | 25 | Unchanged. Problem-solution structure: describe the access gap, present the clinic model, address counterarguments (cost, staffing), call to action. |
| Visual aids | 15 | Unchanged. Slides with maps showing healthcare deserts, data visualizations of health outcomes, clinic model diagram. |
| Audience adaptation | 20 | Unchanged. Presenting health policy data to a non-healthcare audience requires the same adaptation skills as any persuasive topic. |
| Evidence use | 15 | Strengthened. Real public health datasets provide stronger evidence than most persuasive speech topics. Sources listed below. |

### Augmentation Components
- **Healthcare-specific topic selection**: Advocacy for a nurse-led rural primary care clinic in Aroostook County, using real public health data rather than a generic persuasive topic.
- **Career reflection (200 words, written)**: Describes a specific NP scenario — presenting a rural clinic proposal to the Penobscot Community Health Center board — and identifies which communication skills from the speech transfer directly.

### Suggested Data Sources for Evidence
- CDC National Center for Health Statistics: rural health indicators by county
- Maine DHHS Office of Rural Health: primary care workforce data
- HRSA Health Professional Shortage Area designations for Aroostook County
- Kaiser Family Foundation: state-level NP scope of practice data
- Maine Rural Health Research Center (USM): access-to-care reports

### Deliverables
1. In-class persuasive speech, 7-9 minutes (original)
2. Slide deck with public health data visualizations (original)
3. Written career reflection, 200 words, PDF (augmented)

### Timeline

| Date | Milestone | Component |
|---|---|---|
| Sep 25-28 | Research public health data sources | Original |
| Sep 29-Oct 1 | Draft speech outline and slides | Original |
| Oct 2-3 | Rehearse speech | Original |
| Oct 4 | Write career reflection | Augmented |
| Oct 5 | Deliver speech in class | Original |

### Career Rationale
Nurse practitioners in rural Maine routinely advocate for expanded services, funding, and staffing. Presenting evidence-based proposals to hospital boards, community health center leadership, and state health agencies requires exactly the persuasive communication skills CMJ 103 develops: organizing an argument, adapting to the audience's knowledge level, and using evidence effectively. This augmented topic practices that specific professional scenario rather than a generic persuasive exercise.

---

Pending your approval, Dr. Chen.

---

Does this look good? The data sources should give you a strong start on research."

## Why This Interaction Succeeds
- Changes the student's mental model: "this IS relevant to nursing"
- Demonstrates the system works beyond tech careers — healthcare, education, etc.
- Augmentation is proportional: topic choice (free) + 200-word reflection (small)
- Respects the gen-ed signature assignment constraints completely
- Provides concrete data sources the student can immediately use
- Rubric compliance is clean because the original prompt already allows topic flexibility
