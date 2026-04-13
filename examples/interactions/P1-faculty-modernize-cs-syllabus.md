# P1: Faculty Modernizing a CS Syllabus

## Scenario
Dr. Karen Hebert (F1) uploads her COS 431 Operating Systems syllabus and wants to modernize it for containers/cloud while preserving ABET compliance. She has 2 sections (110 students), 2 TAs, and an ABET visit in Fall 2027.

## Data Sources Used
- Uploaded syllabus (data/syllabi/cos431-operating-systems.md)
- ABET CAC criteria (data/accreditation/abet-cac-cs.json)
- Cloud infrastructure engineer job data (data/industry/cloud-infrastructure-engineer.json)
- Aggregate student career goals (data/users/student-*.json)
- CS degree requirements (data/accreditation/cs-degree-requirements.json)

## Conversation

**Turn 1 -- Dr. Hebert:**
"I've uploaded my COS 431 Operating Systems syllabus. I want to modernize it. My students are telling me they need more Linux-specific and container-related content, and I've been hearing the same from our industry advisory board. But I absolutely cannot jeopardize our ABET accreditation -- we have a visit in Fall 2027. What can you suggest?"

**Agent Internal Reasoning:**
- Parse syllabus: 15-week schedule, 6 learning outcomes, 5 assessment types, ABET SO-1/2/3/5/6 mapped
- Cross-reference industry data: Linux namespaces/cgroups (HIGH gap), containers/Docker (HIGH gap), performance profiling (HIGH gap)
- Check student career data: 14 profiles on file, 79% have career goals where container/Linux systems knowledge is directly relevant
- ABET constraint: SO-1 through SO-6 currently mapped. Cannot lose any mapping. Visit in Fall 2027 = high stakes.

**Agent Response:**
"Thank you for uploading the COS 431 syllabus, Dr. Hebert. I cross-referenced it with current industry requirements for systems-level roles. Key gaps:

**High-priority gaps (not currently covered):**
1. Linux container primitives (namespaces, cgroups) -- foundational to cloud infrastructure roles
2. Performance profiling and observability (perf, strace, eBPF) -- standard in systems interviews
3. Modern virtualization and isolation beyond xv6's pedagogical model

I am not recommending you cut foundational content. Two approaches:

**Approach A -- Augment existing labs:** Modify 2-3 xv6 labs to add a 'bridge' exercise on a real Linux system covering the same concept.

**Approach B -- Restructure weeks 13-15:** Replace the xv6 case study and part of review/final with a 2-week capstone where students containerize a multi-process application, profile it, and write a technical design document.

Both maintain full ABET coverage. Which interests you, or would you like a hybrid?"

---

**Turn 2 -- Dr. Hebert:**
"Approach B is tempting, but I'm worried about the final exam. That's currently 25% of the grade and it's my primary direct assessment artifact for SO-1 and SO-6 for the ABET file. If I drop it, how do I maintain those assessment points?"

**Agent Internal Reasoning:**
- SO-1 assessed in COS 431 (final + midterms + labs), COS 226, COS 440. SO-6 assessed in COS 431, COS 301, COS 460.
- BUT the department assessment plan lists COS 431 final as a specific "assessment instrument." Changing it requires committee approval.
- Must flag this procedural requirement.

**Agent Response:**
"Your final exam serves as a direct assessment instrument for SO-1 and SO-6 in the department's assessment plan. Removing it without replacement creates a documentation gap. Options:

**Option 1 (Lowest effort):** Shorten the final to 1 hour (10%). Reallocate 15% to the capstone. No committee approval needed.

**Option 2 (Recommended):** Replace the final with the capstone, designing the rubric with explicit SO-1 and SO-6 criteria. Requires submitting an updated assessment plan to the CS Assessment Committee -- I can draft that language.

**Option 3 (Strongest outcome):** Keep midterms as SO-1/SO-6 instruments, capstone covers SO-2/SO-3/SO-5, drop final entirely.

I recommend Option 2, started this semester so you have one full cycle of student artifacts before the Fall 2027 visit. Shall I draft the capstone, rubric, and assessment plan language?"

---

**Turn 3 -- Dr. Hebert:**
"Let's go with Option 2. Draft the capstone and the bridge exercise for Lab 2."

**Agent Internal Reasoning:**
- Generate: (1) capstone with SO-mapped rubric, (2) Lab 2 bridge exercise on cgroups, (3) assessment plan update language

**Agent Response:**
"Three artifacts:

**1. Capstone Project: Container Performance Analysis** -- Students containerize a multi-process application, profile it using Linux tools (perf, strace), identify bottlenecks, and write a design document. Rubric maps: SO-1 (analysis), SO-2 (design), SO-3 (implementation), SO-5 (pair collaboration), SO-6 (profiling methodology).

**2. Lab 2 Bridge: From xv6 Memory to Linux cgroups** -- After the xv6 memory allocation lab, students create a cgroup, set memory limits, observe OOM killer behavior, and answer questions connecting xv6 page tables to Linux memory isolation.

**3. Assessment Plan Update Language** -- Draft paragraph for committee submission replacing the final with the capstone as the SO-1/SO-6 instrument.

(See examples/outputs/ for full artifact text.)"

---

**Turn 4 -- Dr. Hebert:**
"Aisha Okonkwo is my TA and she's mentioned that several students have career profiles on the platform. Is there anything from the student data that should shape how I pitch this change to the class?"

**Agent Internal Reasoning:**
- Privacy constraint: cannot reveal individual student data to faculty. Aggregate only.

**Agent Response:**
"I can share aggregate data but not individual student information.

Of 14 students with career profiles: 8 (57%) target software engineering, 3 (21%) target systems/cloud engineering, 2 (14%) target ML engineering, 1 (7%) is pursuing graduate school. Container and Linux systems knowledge is directly relevant to at least 11 of 14 (79%).

When pitching to students, emphasize that the capstone mirrors a real industry task -- containerizing and profiling an application is a common systems interview exercise, and bridge exercises connect textbook concepts to tools used on day one of a systems job."

## Why This Interaction Succeeds
- Respects ABET constraints throughout, never suggesting content removal without replacement
- Provides tiered options with clear effort levels and trade-offs
- Produces concrete artifacts (rubric, project description, assessment plan language)
- Handles student privacy correctly (aggregate only, no individual identification)
- Grounds modernization in real industry demand backed by data
- Flags procedural requirements (committee approval) the faculty member might not have considered
