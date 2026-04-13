# P2: Student Group Requesting Alternative Assessments

## Scenario
Emily Tran (CS junior, S1) and Marcus Williams (EET senior, S2) are in CMJ 103 (gen-ed communications course). They want Speech 4 (Professional Context Speech) to be more relevant to their career goals.

## Data Sources Used
- Student profiles (data/users/student-tran.json, student-williams.json)
- CMJ 103 syllabus (data/syllabi/cmj103-public-communication.md)
- UMaine Gen-Ed framework (data/accreditation/umaine-gen-ed-framework.json)

## Conversation

**Turn 1 -- Emily:**
"I'm in CMJ 103 and I have to do Speech 4 -- a 'professional context speech.' The prompt says to present on a topic in our field to a non-specialist audience. But the rubric just grades us on delivery and organization, not on whether the content relates to our career. I'm a CS major going into cloud infrastructure. Can I propose something more relevant?"

**Agent Internal Reasoning:**
- Emily's profile: CS major, cloud infrastructure career goal, first-gen student
- CMJ 103 Speech 4: 20% of grade, rubric criteria are delivery (25pts), organization (25pts), visual aids (15pts), audience adaptation (20pts), evidence use (15pts)
- Gen-ed WOC outcomes are content-neutral -- any technical topic satisfies them
- The current prompt already allows field-specific topics. The student may not realize the flexibility.
- Need to clarify: is she asking for a different topic or a different FORMAT?

**Agent Response:**
"The current Speech 4 prompt actually allows you to present on any topic in your field -- so a presentation about 'How containers work and why they matter' aimed at a non-technical audience would qualify. The rubric criteria are all skills you would use presenting technical concepts to non-engineers.

That said, are you asking for something beyond choosing a CS topic? For example, a different format -- like a technical demo, a recorded presentation, or a poster session?"

---

**Turn 2 -- Emily:**
"Both. I think a live demo of a technical concept would be more useful for my career than a traditional podium speech. And I wish the rubric gave credit for technical accuracy, not just delivery."

**Agent Internal Reasoning:**
- Two requests: (1) format change to live demo, (2) rubric change to include technical accuracy
- Format change: WOC outcomes require "oral presentation" -- a demo with verbal explanation qualifies. Nothing requires podium style.
- Rubric change: CMJ 103 is a COMMUNICATION course. Adding "technical accuracy" would require Dr. Chen to evaluate CS content he is not trained in. This undermines the course's purpose.
- Support format change; push back on rubric change with clear explanation.

**Agent Response (partial -- waiting for Marcus):**
"Good -- that helps me understand. Before I respond fully, Marcus, did you have a similar thought?"

---

**Turn 3 -- Marcus:**
"I agree. I'm an EET major going into controls engineering. I'd rather present on PLC programming for a paper mill to plant managers. A demo where I show a control loop would be more relevant."

**Agent Internal Reasoning:**
- Two students, different disciplines, same request. Strengthens the case for format change.
- Controls engineering roles DO require presenting to non-technical plant managers. Cloud roles DO require presenting to business stakeholders. The existing rubric assesses exactly these skills.
- Key insight: the demo format RAISES the communication bar, so the existing rubric rewards them MORE.

**Agent Response:**
"A technical demo format is a great fit for both of you, and it is compatible with the gen-ed communication outcomes. Explaining a complex technical concept to a non-specialist audience IS professional communication.

Here is a proposal I can help you bring to Dr. Chen:

**Alternative Speech 4 Format: Technical Demo Presentation**
- 5-7 minutes (same duration)
- Student demonstrates a technical concept from their field to a non-specialist audience
- Same rubric criteria: delivery (25pts), organization (25pts), visual aids/demo (15pts), audience adaptation (20pts), evidence use (15pts)
- All gen-ed WOC outcomes fully met

Now, I want to be transparent about one thing. Emily, you mentioned wanting rubric credit for technical accuracy. I understand why, but I recommend against proposing that change. CMJ 103 is a communication course, and Dr. Chen is an expert in communication, not CS or EET. The gen-ed outcomes are about your ability to communicate clearly. Adding a 'technical accuracy' criterion would shift the course's purpose.

The good news: the demo format actually raises the communication bar. It is harder to explain container namespaces clearly to a non-technical audience than to give a generic speech. The existing 'audience adaptation' criterion (20 points) directly rewards that skill. A student with deep technical understanding will naturally score higher on organization and audience adaptation.

I also suggest adding a 200-word reflection connecting the presentation to a communication scenario in your target career. Emily, presenting a migration plan to a product team. Marcus, explaining a control system upgrade to plant operations staff.

Shall I format this as a formal proposal for Dr. Chen with the gen-ed compliance analysis?"

---

**Turn 4 -- Emily:**
"That makes sense about the rubric. I hadn't thought about it from Dr. Chen's perspective. Yeah, draft the proposal."

**Turn 5 -- Marcus:**
"Same. Include my PLC example too."

**Agent Internal Reasoning:**
- Both accepted the pushback -- the explanation landed
- Draft proposal framed as a request, not a demand. Students propose; faculty decides.

**Agent Response:**
"Here is the proposal, ready to send. It includes: the alternative format description, confirmation that all rubric criteria and gen-ed WOC outcomes are met, two example topics (container orchestration, PLC control loop), the career reflection addition, and a note that you are requesting this as an option alongside the traditional format.

I wrote it so Dr. Chen can approve quickly -- gen-ed compliance and unchanged rubric are in the first paragraph. Review and send when ready.

One more thing: if Dr. Chen approves this for you two, he may want to offer it class-wide. That would strengthen the career-relevance case the gen-ed committee has been asking him about."

## Why This Interaction Succeeds
- Supports a legitimate format alternative that enhances career relevance
- Pushes back appropriately on the rubric change, explaining why
- Empowers students to advocate with evidence, not just preference
- Frames output as a proposal for faculty review (respects role boundaries)
- Includes gen-ed compliance verification
