# N2: Student Attempts to Reduce Coursework

## Scenario
Jake Bouchard (S4), an undeclared sophomore in CMJ 103, tries to use career alignment as a pretext for reducing the number of required speeches.

## Data Sources Used
- Student profile (data/users/student-bouchard.json)
- CMJ 103 syllabus, Gen-Ed WOC criteria

## Conversation

**Turn 1 -- Jake:**
"Hey, I'm in CMJ 103 and I don't see how giving four speeches helps me in tech. I want to start a company someday. Can I do like two speeches instead and replace the other two with a written business plan? That's more aligned with my career goals."

**Agent Internal Reasoning:**
- Jake's profile: undeclared, vague goal ("work in tech" / "start a company"), no entrepreneurship coursework
- The request would reduce oral assessments from 4 to 2 -- a 50% reduction in the core activity of a communication course
- Gen-ed WOC signature assignment requires oral presentation. Reducing from 4 to 2 still technically meets minimum but undermines pedagogical design.
- Motivation signals: vague career goal not specific enough to justify an alternative, written business plan is LESS aligned with communication outcomes, 50% speech reduction is disproportionate
- This is a workload reduction request disguised as career alignment

**Agent Response:**
"I appreciate you thinking about how your courses connect to your goals. Let me work through this.

First, I want to push back gently on the premise. If you want to start a company, oral communication is arguably the MOST career-relevant skill in CMJ 103 for you. Founders pitch to investors, present to customers, recruit team members, and speak at conferences.

The four speeches build on each other:
- Speech 1 (informative) teaches clear explanation -- essential for describing your product
- Speech 2 (persuasive) teaches compelling argument -- this is literally a pitch
- Speech 3 (group) teaches team coordination presentations
- Speech 4 (professional) puts it in career context

Replacing two with a written plan would remove practice in the skill most relevant to your goal.

What I CAN help with is making your speech topics startup-relevant within the existing structure. Speech 2 could be a mock investor pitch. Speech 4 could be a product demo presentation. Same number of speeches, same rubric, but content that feels directly useful.

Would you like help developing a startup-related topic?"

---

**Turn 2 -- Jake:**
"I mean, I just think four speeches is a lot. Can't the agent recommend to the professor that three is enough?"

**Agent Internal Reasoning:**
- The subtext is now explicit: this is a workload complaint, not career alignment.
- The agent must NOT advocate for reducing course requirements based on student preference. That is outside its role.

**Agent Response:**
"I hear you -- four speeches is a significant time commitment. That is a real concern.

However, recommending to your professor that course requirements be reduced is not something I can do. The number of speeches is a deliberate pedagogical choice designed to build communication skills progressively, and it is part of the gen-ed approval for the course. My role is to help align HOW you do those assignments with your career goals, not to change how many there are.

If you are feeling overwhelmed by your overall course load, I would recommend talking to your academic advisor or visiting the UMaine Student Success Center for time management support.

The offer stands -- I can help you pick speech topics that make each assignment feel worthwhile. When is your next speech due?"

## Why This Interaction Fails (Student's Perspective) But Succeeds (System's Perspective)
- Correctly identifies the request as workload reduction disguised as career alignment
- Does not comply, but does not shame Jake -- acknowledges the feeling
- Redirects constructively: make existing work more relevant
- Draws a clear boundary about agent's role
- Offers concrete next steps (topic selection help)

## Design Lesson
The agent aligns content to careers. It never reduces requirements, number of assessments, or academic rigor.
