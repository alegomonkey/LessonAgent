# P3: Faculty with Severe Constraints

## Scenario
Dr. Marcus Chen (F2) teaches CMJ 103 (gen-ed communications). The gen-ed review committee wants more "career relevance." He has 120 students across 4 sections, no TA, no budget, and already spends 12 hours/week grading.

## Data Sources Used
- Faculty profile (data/users/faculty-chen-marcus.json)
- CMJ 103 syllabus (data/syllabi/cmj103-public-communication.md)
- Aggregate student career data from CMJ 103 sections
- Gen-ed framework (data/accreditation/umaine-gen-ed-framework.json)

## Conversation

**Turn 1 -- Dr. Chen:**
"The gen-ed committee wants me to make CMJ 103 more career-relevant. I have 120 students, no TA, no budget, and I'm already grading 12 hours a week. I don't have time for a course redesign. What can I realistically do?"

**Agent Internal Reasoning:**
- Critical constraints: 0 TAs, $0 budget, 4 sections x 30 students, 12 hrs/week grading
- Any suggestion increasing grading load is a non-starter
- Key insight: modify PROMPTS, not add assignments. Rubric stays the same; topics change.
- Gen-ed WOC outcomes are skill-based and content-neutral. Career-contextualized topics satisfy them identically.

**Agent Response:**
"I understand the constraints. I am focusing exclusively on changes that do not increase your grading time and cost nothing.

**Change 1: Career-contextualized speech prompts (zero grading impact)**

Current Speech 1 prompt: 'Deliver a 5-7 minute informative speech on a topic of your choice.'

Proposed: 'Deliver a 5-7 minute informative speech explaining a concept from your major or intended career field to an audience of non-specialists.'

Same rubric. Same grading criteria. The only change is the topic constraint. Apply to all four speeches.

**Change 2: Add one peer evaluation question (no extra grading)**

Add to the existing peer form: 'How effectively did the speaker make their specialized topic accessible to you as a non-specialist? (1-5 scale with brief comment).'

Students fill it out; you grade evaluations on completion as you already do.

**Change 3: Reframe reflective portfolio prompt (no additional grading)**

Add: 'For each speech, describe one specific professional situation in your career where you would use the communication skill practiced.'

**Estimated time to implement:** 2-3 hours to rewrite prompts. No ongoing increase.

**Gen-ed committee evidence:** All four speeches career-contextualized with discipline-specific content. Peer evaluations include audience adaptation data. Student reflections connect skills to professional scenarios."

---

**Turn 2 -- Dr. Chen:**
"I like this. But some students are undeclared or don't have a career goal. What do they do?"

**Agent Internal Reasoning:**
- Valid concern. CMJ 103 is taken by students at all stages, including first-semester first-years.
- Solution: alternative prompt path preserving the spirit (explaining specialized knowledge) without requiring a declared career.

**Agent Response:**
"Add this language to each prompt:

'If you have not yet declared a major or identified a career direction, you may choose a topic from any field that interests you. The goal is to practice explaining specialized knowledge to a general audience -- a skill valuable in any career.'

This keeps the career framing without penalizing exploring students. In practice, even undeclared students choose something they care about, and the communication skills practice is the same."

---

**Turn 3 -- Dr. Chen:**
"What about the committee report? They want documentation that I've made changes. I don't have time to write a lengthy narrative."

**Agent Internal Reasoning:**
- Generate a concise, committee-ready summary he can submit directly.

**Agent Response:**
"Here is a ready-to-submit paragraph:

'Beginning in [semester], CMJ 103 speech prompts have been revised to require students to present on topics from their major or intended career field to a non-specialist audience. This applies to all four graded speeches. A peer evaluation question assessing cross-disciplinary audience adaptation has been added. End-of-semester reflections now ask students to connect each speech to a specific professional communication scenario. All rubric criteria and gen-ed WOC learning outcomes remain unchanged. The modifications ensure students practice career-relevant communication skills while maintaining the course's focus on communication competency.'

That is 90 words. If the committee wants before-and-after prompt language, I can generate a one-page appendix."

---

**Turn 4 -- Dr. Chen:**
"This is manageable. One last thing -- two students, Emily Tran and Marcus Williams, asked me about doing a technical demo instead of a traditional speech for Speech 4. Is that something I should consider?"

**Agent Internal Reasoning:**
- Connects to P2. Emily and Marcus prepared a proposal through the agent.
- Cannot reveal the agent helped them. Advise Dr. Chen on merits independently.

**Agent Response:**
"A technical demo format is compatible with the gen-ed WOC outcomes. The outcomes require oral presentation to an audience -- they do not specify podium-style delivery. A demo where the student explains a concept verbally while demonstrating it meets all five rubric criteria.

A technical demo actually raises the communication difficulty -- it is harder to explain a live process clearly while managing demo logistics than to deliver a prepared monologue. Students who do it well demonstrate stronger audience adaptation.

If you offer it as an option alongside the traditional format for Speech 4, career-oriented students get a format closer to professional practice (technical presentations, product demos, client walkthroughs) while others keep the traditional option. Your rubric does not change either way."

## Why This Interaction Succeeds
- Every suggestion is grading-neutral and zero-cost
- Implementable in 2-3 hours total
- Provides committee-ready reporting language
- Handles edge cases (undeclared students) gracefully
- Respects Dr. Chen's expertise -- changes are to prompts, not to pedagogy
- Connects to the student request (P2) without violating privacy
