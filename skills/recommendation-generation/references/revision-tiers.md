# Revision Tiers Reference

This reference provides detailed definitions, concrete examples, and a decision tree for classifying course revision recommendations into tiers.

---

## Tier 1: Quick Wins (Under 2 Hours)

Quick wins are changes that can be implemented with minimal preparation, no new materials or budget, and no approval beyond the instructor's own decision. They operate within the existing course structure.

### Example Changes

**1. Update a Reading List Entry (0.5 hours)**
Replace an outdated paper or textbook chapter reference with a current, freely available alternative. For example, replace a 2015 survey paper on deep learning with a 2024 survey that covers transformers and large language models. Search for open-access alternatives on arXiv, Google Scholar, or institutional repositories.

**2. Add Career Context to an Assignment Prompt (0.5-1 hour)**
Revise an existing assignment prompt to frame the task in an industry-relevant scenario. For example, change "Implement a sorting algorithm" to "You are a backend engineer at a startup. A customer reports that search results load slowly. Profile the existing sort implementation, identify the bottleneck, and implement a more efficient sorting algorithm. Document your analysis." The underlying technical requirements remain the same; only the framing changes.

**3. Replace Outdated Examples in Lecture Materials (1 hour)**
Identify 2-3 examples in lecture slides or notes that reference obsolete technologies, discontinued products, or dated cultural references. Replace them with current equivalents. For example, in a networking course, replace references to dial-up modems with examples involving 5G or satellite internet.

**4. Add Reflection Questions to an Existing Assignment (0.5 hour)**
Append 2-3 reflection questions to an existing assignment that ask students to connect the technical work to broader contexts. Examples: "How might this technique be applied in your intended career field?" or "What ethical considerations arise when applying this method to real-world data?"

**5. Revise Vague Learning Outcomes with Bloom's Verbs (1 hour)**
Replace vague verbs in learning outcomes with specific, measurable Bloom's taxonomy verbs. For example, change "Understand database concepts" to "Explain the principles of relational database normalization and apply normalization rules to a given schema." This improves measurability without changing course content.

**6. Add a Brief In-Class Discussion Activity (0.5 hour)**
Design a 5-10 minute turn-and-talk or think-pair-share activity that connects a lecture topic to industry practice. For example, after lecturing on software testing, ask pairs to discuss: "What would happen if this software were deployed without testing? Find a real example of a software failure caused by insufficient testing."

### Tier 1 Boundaries

A change exceeds Tier 1 if any of the following are true:
- It requires creating an entirely new assignment, lab, or assessment.
- It changes the weight or structure of grading.
- It requires learning new software or tools.
- It requires coordination with other people (TAs, department, guest speakers).
- It takes more than 2 hours of focused preparation.

---

## Tier 2: Moderate Changes (5-20 Hours)

Moderate changes create new course elements or substantially redesign existing ones but operate within the overall course structure and do not require department-level approval.

### Example Changes

**1. Create a New Project-Based Assignment (8-15 hours)**
Design a multi-part project that replaces a homework set or low-stakes exam. Includes writing the project specification, creating a grading rubric, developing any starter code or datasets, and testing the assignment. Prerequisite work: identify the learning outcomes the project will assess; gather or create the required materials. Example: replace three homework assignments on data analysis with a single project where students analyze a real dataset from a local organization and present findings.

**2. Develop a Bridge Exercise Linking Theory to Modern Tools (5-10 hours)**
Create an exercise that requires students to apply theoretical knowledge using a current industry tool. For example, after teaching control theory with hand calculations, create a lab where students model the same system in MATLAB/Simulink, compare results, and discuss the advantages of simulation. Prerequisite work: verify software availability and prepare installation instructions.

**3. Integrate an Industry Dataset into an Existing Lab (5-8 hours)**
Replace a synthetic or textbook dataset in an existing lab with a real dataset from an industry source (Kaggle, government open data, a partner company). Update the lab instructions to handle the messiness of real data (missing values, inconsistencies). Prerequisite work: identify and vet the dataset; test all lab steps with the new data.

**4. Add a Career-Path Option to a Major Assessment (8-12 hours)**
Redesign a major assignment or project to offer students a choice between pathways aligned with different career goals. For example, a software engineering final project could offer: (a) build a web application (aligning with full-stack development careers), (b) build a data pipeline (aligning with data engineering careers), or (c) build a testing framework (aligning with QA engineering careers). Each pathway assesses the same learning outcomes through different contexts. Prerequisite work: design specifications for each pathway; create pathway-specific rubrics.

**5. Create a Peer Review Component (5-8 hours)**
Add a structured peer review stage to an existing writing or coding assignment. Design the review rubric, create instructions for reviewers, set up the review workflow (manual or via an LMS tool), and plan how peer feedback integrates into the final grade. Prerequisite work: design the review rubric; test the LMS peer review tool if using one.

**6. Develop a Case Study Module (10-15 hours)**
Create a case study based on a real-world scenario relevant to course content. Write the case narrative, develop discussion questions, create a facilitation guide, and design a brief assessment tied to the case. Example: for a database course, create a case study about a company's data migration failure, including the schema design decisions that led to the problem. Prerequisite work: research the real-world scenario; draft and revise the case materials.

### Tier 2 Boundaries

A change exceeds Tier 2 if any of the following are true:
- It requires resequencing more than one week of the course schedule.
- It requires replacing the textbook or primary course materials.
- It requires curriculum committee or department approval.
- It affects prerequisites or downstream courses.
- It takes more than 20 hours of focused preparation.
- It requires hiring additional staff or securing new budget lines.

---

## Tier 3: Deep Restructuring (40+ Hours)

Deep restructuring changes alter the fundamental architecture of the course. They typically require department approval, may affect other courses in the program, and often benefit from phased implementation over multiple semesters.

### Example Changes

**1. Resequence Course to Project-Based Learning Progression (40-60 hours)**
Replace a topic-by-topic lecture sequence with a project-driven structure where students work on a semester-long project and learn topics as needed to advance the project. Requires redesigning the weekly schedule, creating project milestones, developing scaffolding assignments, and redesigning assessments. Approval required: department curriculum committee. Risk factors: students may resist the shift from familiar lecture-exam format; the instructor must manage diverse project timelines.

**2. Replace Textbook with Open Educational Resources (40-80 hours)**
Adopt or create open educational resources (OER) to replace a commercial textbook. Includes identifying OER for each topic, filling gaps with original materials, creating new homework problems (since textbook problem sets are no longer available), and updating all lecture references. Approval required: may need department notification; no committee approval usually required unless catalog description references the textbook. Risk factors: OER quality varies; ongoing maintenance burden falls on the instructor.

**3. Introduce a Capstone Project Replacing a Final Exam (50-80 hours)**
Replace the traditional final exam with a multi-week capstone project that integrates learning outcomes across the course. Requires designing the project specification, creating scaffolding checkpoints throughout the semester, developing a comprehensive rubric, creating a presentation or demo component, and adjusting grade weights. Approval required: may need department approval if exam format is mandated. Risk factors: grading workload increases significantly; academic integrity approaches must shift from proctored exams to project-based assessment.

**4. Add a New Multi-Week Module on an Emerging Topic (30-50 hours)**
Introduce a 3-4 week module on a topic not currently in the course (e.g., adding AI ethics to a computer science course, adding sustainability to a chemical engineering course). Requires developing lecture materials, readings, and at least one assessment for the new module. Existing content must be compressed or removed to make room. Approval required: curriculum committee if learning outcomes change. Risk factors: compressing existing content may reduce depth in other areas; the instructor may need to develop expertise in the new topic.

**5. Convert to Flipped Classroom Model (60-100 hours)**
Redesign the course from a lecture-based to a flipped classroom model. Record or curate video content for pre-class viewing, design in-class active learning activities for every session, create pre-class quizzes to verify preparation, and redesign assessments to emphasize application over recall. Approval required: typically no formal approval needed, but coordination with department for room changes (active learning classrooms) may be necessary. Risk factors: significant upfront time investment; student resistance to pre-class preparation; technology requirements for video production.

---

## Decision Tree for Tier Assignment

Use this decision tree to classify a proposed change:

```
1. Does the change require creating entirely new course content?
   - NO -> likely Tier 1. Check: can it be done in under 2 hours? 
     - YES -> Tier 1.
     - NO -> Tier 2.
   - YES -> continue to step 2.

2. Does the change require resequencing the course, replacing major components, 
   or adding/removing multi-week modules?
   - YES -> likely Tier 3. Confirm: does it require 40+ hours and/or 
     department approval?
     - YES -> Tier 3.
     - NO -> Tier 2.
   - NO -> continue to step 3.

3. Can the change be completed in 5-20 hours of faculty preparation?
   - YES -> Tier 2.
   - NO (more than 20 hours) -> Tier 3.
   - NO (fewer than 5 hours) -> re-examine; may be Tier 1.
```

### Faculty Time Budget Decision Guide

Match tier recommendations to the faculty member's available time:

- **Faculty has fewer than 5 hours available**: recommend Tier 1 changes only. Present Tier 2 and Tier 3 as future considerations for subsequent semesters.
- **Faculty has 5-25 hours available**: recommend Tier 1 and Tier 2 changes. Prioritize Tier 2 changes that address the most severe gaps. Present Tier 3 as a long-term roadmap.
- **Faculty has 25+ hours available AND department support exists**: recommend changes across all three tiers. Suggest implementing Tier 1 immediately, Tier 2 before the next offering, and Tier 3 as a phased plan over 2-3 semesters.
- **Faculty has 25+ hours but NO department support**: recommend Tier 1 and Tier 2 only. Note that Tier 3 changes become feasible if department support is secured in the future.
