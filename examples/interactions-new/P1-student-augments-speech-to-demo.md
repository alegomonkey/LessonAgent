# P1: Emily Augments a Speech Assignment into a Technical Demo

## Scenario
Emily Tran (CS junior, cloud engineer goal) takes CMJ 103 Speech 4 (professional context speech, 20% of grade) and proposes a live technical product demo instead of a traditional podium speech. The agent shows all oral comm rubric criteria are still met, plus she adds technical depth demonstrating container orchestration.

## Data Sources Used
- Student profile (data/users/student-tran.json)
- CMJ 103 syllabus (data/syllabi/cmj103-public-communication.md)
- Cloud infrastructure engineer job data (data/industry/cloud-infrastructure-engineer.json)

## Conversation

**Turn 1 — Emily:**
"I'm in CMJ 103 and Speech 4 is a 'professional context speech' — 5 to 7 minutes on a topic in our field to a non-specialist audience. I'm a CS major going into cloud infrastructure. Can I propose doing a live technical demo instead of a traditional podium speech? Here's the assignment prompt: [pastes Speech 4 description]"

**Agent Internal Reasoning:**
- Invoke assignment-analysis. Parse Speech 4 from CMJ 103.
- Rubric: delivery (25pts), organization (25pts), visual aids (15pts), audience adaptation (20pts), evidence use (15pts). Total 100pts.
- Gen-ed WOC outcomes require oral presentation — they do NOT require podium format.
- A live demo with verbal explanation meets all five criteria. In fact, the demo format raises the communication bar — explaining container namespaces to non-engineers is harder than a generic podium speech.

**Agent Response:**
"I've parsed Speech 4. Here's the assignment profile:

**Learning Outcomes:** LO-1 (construct and deliver organized oral presentation), LO-2 (analyze audience and adapt), LO-4 (effective visual aids)

**Rubric Criteria:**
| Criterion | Points |
|---|---|
| Delivery (eye contact, vocal variety, pacing, confidence) | 25 |
| Organization (intro, body, conclusion, transitions) | 25 |
| Visual aids and supporting materials | 15 |
| Audience adaptation (making content accessible to non-specialists) | 20 |
| Evidence use (supporting claims with data/examples) | 15 |

**Format:** Individual, 5-7 minutes, in-person to class

Good news: a live demo is fully compatible with this rubric. The gen-ed WOC outcomes require oral presentation to an audience — not podium style specifically. A demo with verbal explanation qualifies.

**Key insight:** the demo format actually makes the 'audience adaptation' criterion (20 pts) harder and more career-relevant. Explaining container orchestration to CMJ 103 classmates is the ultimate non-specialist audience adaptation challenge.

Tell me about your career goals and I'll find the augmentation angles."

---

**Turn 2 — Emily:**
"I want to be a cloud infrastructure engineer — companies like AWS, Cloudflare. I already know how Docker containers work from self-study. I'd want to demonstrate how containers use OS namespaces to isolate processes — connect it to my COS 431 work."

**Agent Internal Reasoning:**
- Invoke career-alignment. Load cloud infrastructure engineer competencies.
- Alignment: technical presentation to non-technical stakeholders is a CORE competency (product reviews, architecture presentations to PMs). CMJ 103 speech directly exercises this.
- Augmentation: the demo itself IS the augmentation — it transforms a generic speech into a career-authentic format (technical product demo). Add a written career reflection.

**Agent Response:**
"Strong match. Here's the alignment:

**Already strong:** Presenting technical concepts to non-technical audiences is a core cloud infrastructure competency. Engineers at AWS present architecture decisions to product managers, write design docs for cross-functional teams, and demo systems to stakeholders. This speech directly exercises that skill.

**Augmentation components:**
1. **Live demo format** — demonstrate container namespace isolation with a simple Docker example running on your laptop. Show processes inside vs. outside the container.
2. **Career reflection (200 words)** — describe a specific professional scenario: presenting a migration plan to a product team who does not know what containers are.

The rubric compliance is clean:
| Criterion | Demo Compatibility |
|---|---|
| Delivery (25pts) | You're still speaking to an audience for 5-7 min. Assessed identically. |
| Organization (25pts) | Your demo needs a clear intro, walkthrough, conclusion. Same structure criterion. |
| Visual aids (15pts) | The live demo IS the visual aid — more engaging than slides. |
| Audience adaptation (20pts) | Explaining namespaces to non-CS classmates is harder than a generic speech. This criterion rewards you MORE with a demo. |
| Evidence use (15pts) | Cite real-world applications: cloud provider architectures, container adoption statistics. |

Want me to build the formal proposal for Dr. Chen?"

---

**Turn 3 — Emily:**
"Yes. But I want to mention that I'm not asking for the rubric to be changed — I know it's a communication course, not a CS course."

**Agent Internal Reasoning:**
- Emily preemptively addressed the rubric concern. This strengthens the proposal.
- Invoke proposal-builder. Generate all 7 sections with explicit rubric compliance table.

**Agent Response:**
"Smart framing. Here's your proposal:

---

## Proposal: Augmented Speech 4 — Live Technical Product Demo

**Student:** Emily Tran | **Course:** CMJ 103 Fundamentals of Public Communication
**Assignment:** Speech 4 — Professional Context Speech | **Professor:** Dr. Marcus Chen
**Date:** November 10, 2026

### Summary
I propose delivering Speech 4 as a live technical product demonstration rather than a traditional podium speech, while meeting all five rubric criteria unchanged. The demo will explain how software containers use operating system namespaces to isolate processes, presented to our class of non-specialists. I will also submit a 200-word written reflection connecting this presentation to a specific communication scenario in my target career as a cloud infrastructure engineer. This augmentation adds career-relevant depth to the communication skills the assignment assesses.

### Original Requirements Met

| Original Criterion | Pts | How the Augmented Version Addresses It |
|---|---|---|
| Delivery | 25 | Unchanged. I present to the class for 5-7 minutes with eye contact, vocal variety, and confident pacing. The demo format adds the challenge of managing live technology while maintaining delivery quality. |
| Organization | 25 | Unchanged. The demo follows a clear structure: introduction (what are containers and why they matter), body (live walkthrough of namespace isolation), conclusion (implications for cloud computing). Transitions between sections are explicit. |
| Visual aids | 15 | Enhanced. Instead of static slides, the live terminal demonstration serves as an interactive visual aid. A brief slide deck provides context before and after the demo. |
| Audience adaptation | 20 | Strengthened. Explaining OS namespaces to a class of non-CS students is a more demanding audience adaptation challenge than presenting a general-interest topic. I will use analogies (containers as apartments in a building, each with their own address) and check for understanding during the demo. |
| Evidence use | 15 | Unchanged. I cite container adoption statistics (Datadog 2025 report), real employer requirements from cloud infrastructure job postings, and one academic reference on OS isolation mechanisms. |

### Augmentation Components
- **Live demo format**: Docker container demonstration showing process isolation via namespaces. Approximately 2-3 minutes of the 5-7 minute speech involves live interaction with a terminal.
- **Career reflection (200 words, written)**: Describes a specific professional scenario — presenting a container migration plan to a product management team — and connects the communication skills practiced in this speech to that scenario.

### Deliverables
1. In-class speech delivery, 5-7 minutes (original)
2. Brief slide deck providing context before/after the demo (original — modified format)
3. Written career reflection, 200 words, PDF (augmented)

### Timeline

| Date | Milestone | Component |
|---|---|---|
| Nov 1-3 | Prepare slide deck and demo environment | Original + Augmented |
| Nov 4-6 | Rehearse full presentation with live demo | Original |
| Nov 7-8 | Write career reflection | Augmented |
| Nov 9 | Final rehearsal | Both |
| Nov 10 | Deliver speech in class | Original |

### Career Rationale
Cloud infrastructure engineers routinely present technical architectures to non-technical stakeholders — product managers, executives, and cross-functional teams. The ability to explain complex systems clearly and demo them live is a core professional skill at companies like AWS and Cloudflare. This augmented speech practices exactly that scenario: making container isolation technology accessible to a non-specialist audience, using the communication skills (delivery, organization, audience adaptation) that CMJ 103 teaches.

---

Note: I am not requesting any changes to the rubric or grading criteria. This proposal uses the existing rubric as-is. The augmentation is in the format and depth of the content, not in how it is evaluated. Pending your approval, Dr. Chen.

---

Does this look right? Anything you want to change before bringing it to Dr. Chen?"

## Why This Interaction Succeeds
- Rubric compliance table is front and center — proves the student isn't dodging requirements
- All 5 original criteria are explicitly addressed with concrete explanations
- Augmentation is clearly additive: same speech + demo format + career reflection
- Emily proactively frames the rubric correctly; the agent reinforces it
- Proposal tone is respectful, evidence-based, request-oriented
- Career rationale is specific to cloud infrastructure, not generic
- Timeline shows realistic planning
