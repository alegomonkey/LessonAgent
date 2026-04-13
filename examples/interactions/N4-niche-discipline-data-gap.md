# N4: Agent Lacks Data for a Niche Discipline

## Scenario
Dr. Lisa Fournier (hypothetical), Associate Professor of Forest Resources, uploads her FOR 340 (Silviculture) syllabus. The agent has no forestry industry data and no SAF (Society of American Foresters) accreditation standards.

## Data Sources Used
- Industry skills database (insufficient match -- only 2 generic "forest technician" postings)
- Accreditation database (no SAF data on file)

## Conversation

**Turn 1 -- Dr. Fournier:**
"I uploaded my Silviculture syllabus. I want to align it better with what the Maine Forest Service and forestry consulting firms are looking for in new hires."

**Agent Internal Reasoning:**
- Search industry database for "forestry," "silviculture," "forest management": only 2 generic seasonal postings. No Maine Forest Service data, no consulting firm requirements.
- Search accreditation database for SAF: no data.
- MUST NOT fabricate industry requirements or accreditation standards.
- MUST be transparent about the gap.

**Agent Response:**
"Thank you for uploading the syllabus, Dr. Fournier. I want to be upfront: I have limited data for forestry-specific career paths and industry requirements, and I do not currently have the Society of American Foresters accreditation standards in my database.

This means I cannot do a reliable skills gap analysis for FOR 340. If I tried to make specific recommendations now, I would be guessing.

**What I can do right now:**
1. Analyze your syllabus structure, assessment design, and learning outcome organization using general pedagogical best practices
2. Apply cross-disciplinary skills frameworks (communication, teamwork, critical thinking) to identify transferable professional skills gaps
3. Process any industry feedback, advisory board notes, or employer surveys you can share

**What I need to improve:**
1. The SAF accreditation standards document -- if you can share it, I can incorporate those constraints
2. Feedback from the Maine Forest Service or forestry consulting firms on desired skills
3. I will flag your discipline for data enrichment

**What I should NOT do:** Provide forestry-specific career alignment recommendations based on insufficient data."

---

**Turn 2 -- Dr. Fournier:**
"I appreciate the honesty. I do have the SAF standards PDF and advisory board notes. In the meantime, look at the general structure?"

**Agent Response:**
"Absolutely. Looking at your syllabus structure:

1. Assessments are heavily exam-weighted (midterm 25% + final 30% = 55% exams). In applied professional fields, performance-based assessments (field reports, management plans) tend to better predict professional competence.

2. Learning outcome 5 ('Apply silvicultural principles to develop a stand management plan') is assessed by only a single assignment (term project, 20%). If this is an important SAF outcome, you may want a second assessment point.

3. The field lab component (10%) seems low relative to the hands-on nature of silviculture as a profession.

These are structural observations, not content recommendations. Once you upload the SAF standards and advisory board notes, I can provide discipline-specific analysis."

## Why This Interaction Fails (Partially) But Degrades Gracefully
- Cannot perform its core function (career-aligned gap analysis) due to missing data
- Transparent immediately rather than generating vague or hallucinated recommendations
- Clearly separates what it CAN do from what it CANNOT do
- Provides a path to fill the data gap
- Offers genuine value even in degraded mode (structural observations are real and useful)

## Design Lesson
Honest degradation is always better than hallucinated recommendations. When data is insufficient, say so and provide a path to fill the gap.
