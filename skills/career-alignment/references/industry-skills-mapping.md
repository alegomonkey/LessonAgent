# Industry Skills Mapping Reference

This reference maps specific career paths to required skills, links those skills to typical university courses, and provides a methodology for computing skill coverage from course learning outcomes.

---

## Software Engineering

### Required Skills

| Skill | Priority | Description | Typical Course(s) |
|---|---|---|---|
| Data Structures | CORE | Arrays, linked lists, trees, graphs, hash tables; select appropriate structure for a given problem. | CS 201 Data Structures, CS 301 Algorithms |
| Algorithms | CORE | Sorting, searching, graph algorithms, dynamic programming; analyze time/space complexity using Big-O notation. | CS 301 Algorithms, CS 401 Advanced Algorithms |
| Systems Programming | IMPORTANT | Memory management, concurrency, process/thread models, system calls; build software that interacts with the OS. | CS 350 Operating Systems, CS 360 Systems Programming |
| Version Control | CORE | Git workflow including branching, merging, rebasing, pull requests, conflict resolution; use in collaborative teams. | CS 220 Software Engineering (often embedded), CS labs |
| Testing and QA | CORE | Unit testing, integration testing, test-driven development, debugging strategies, code review practices. | CS 220 Software Engineering, CS 420 Software Quality |
| CI/CD Pipelines | IMPORTANT | Continuous integration and deployment tooling; automated build, test, and release processes. | CS 220 Software Engineering, DevOps electives |
| Database Fundamentals | CORE | Relational databases, SQL, normalization, indexing, transactions; basic understanding of NoSQL options. | CS 345 Database Systems |
| API Design | IMPORTANT | RESTful API principles, HTTP methods, authentication, versioning, documentation. | CS 220 Software Engineering, web development courses |
| Agile Methodologies | IMPORTANT | Scrum, Kanban, sprint planning, retrospectives, user stories, iterative development. | CS 220 Software Engineering, project-based courses |
| Technical Communication | IMPORTANT | Writing technical documentation, presenting designs to peers and stakeholders, code commenting. | ENG 317 Technical Writing, CS capstone courses |

---

## Data Science

### Required Skills

| Skill | Priority | Description | Typical Course(s) |
|---|---|---|---|
| Statistics and Probability | CORE | Descriptive statistics, distributions, hypothesis testing, confidence intervals, regression, Bayesian basics. | STA 215 Statistics I, STA 380 Mathematical Statistics |
| Programming in Python and/or R | CORE | Data manipulation (pandas/dplyr), scripting, package management, reproducible analysis. | STA 220 Statistical Computing, CS 151 Intro to Programming |
| SQL and Database Querying | CORE | Write complex queries, joins, aggregations, subqueries; interact with relational databases for data extraction. | CS 345 Database Systems, STA 320 Data Management |
| Data Visualization | IMPORTANT | Create clear and accurate charts, dashboards, and visual narratives using tools like matplotlib, ggplot2, Tableau, or D3. | STA 325 Data Visualization, CS electives |
| Experiment Design | IMPORTANT | Design controlled experiments, A/B tests, and observational studies; understand confounding, randomization, and power analysis. | STA 380 Mathematical Statistics, STA 440 Experimental Design |
| Machine Learning Fundamentals | CORE | Supervised learning (regression, classification), unsupervised learning (clustering, dimensionality reduction), model evaluation, cross-validation. | CS 460 Machine Learning, STA 450 Statistical Learning |
| Data Wrangling and Cleaning | CORE | Handle missing data, outliers, format inconsistencies, joins across datasets, data validation. | STA 220 Statistical Computing, CS 345 Database Systems |
| Communication of Findings | IMPORTANT | Present analysis results to non-technical audiences; write clear reports; create executive summaries. | STA 490 Capstone, ENG 317 Technical Writing |

---

## Controls/Systems Engineering

### Required Skills

| Skill | Priority | Description | Typical Course(s) |
|---|---|---|---|
| PLC Programming | CORE | Program programmable logic controllers using ladder logic, structured text, or function block diagrams for industrial automation. | ELE 456 Industrial Automation, ECE 480 Control Systems Lab |
| Process Control | CORE | PID control, feedback/feedforward loops, tuning methods, stability analysis; apply to thermal, chemical, and mechanical systems. | ECE 380 Control Systems, CHE 460 Process Control |
| Electrical Systems | IMPORTANT | Circuit analysis, power distribution, motor drives, instrumentation, signal conditioning. | ECE 210 Circuits I, ECE 310 Electronics |
| MATLAB/Simulink | CORE | Model dynamic systems, simulate control strategies, analyze frequency response, design controllers using MATLAB and Simulink toolboxes. | ECE 380 Control Systems, MAT 310 Numerical Methods |
| Instrumentation and Sensors | IMPORTANT | Select, calibrate, and interpret data from sensors (temperature, pressure, flow, position); understand signal conditioning and data acquisition. | ECE 320 Instrumentation, MET 350 Measurements |
| Industrial Communication Protocols | IMPORTANT | Understand and configure protocols such as Modbus, EtherNet/IP, Profinet, and OPC-UA for device communication. | ELE 456 Industrial Automation |
| Safety and Compliance | IMPORTANT | Apply safety standards (IEC 61508, OSHA), safety instrumented systems (SIS), lockout/tagout, risk assessment for control systems. | ELE 456 Industrial Automation, safety training modules |
| Systems Modeling | CORE | Develop mathematical models of physical systems (transfer functions, state-space representations); validate models against real data. | ECE 380 Control Systems, MAT 310 Numerical Methods |
| Technical Documentation | IMPORTANT | Create P&ID diagrams, control narratives, loop diagrams, wiring schematics, and commissioning documents. | Engineering capstone courses, ENG 317 Technical Writing |

---

## Methodology for Computing Skill Coverage from Course Learning Outcomes

Use the following methodology when a course's structured learning outcomes are available from a syllabus audit.

### Step 1: Enumerate Required Skills

For the target career path, extract the full list of required skills from the tables above (or from `data/industry/` for paths not listed here). Record each skill with its priority level (CORE, IMPORTANT, BENEFICIAL).

### Step 2: Match Skills to Learning Outcomes

For each required skill, search the course's learning outcomes for matches. A match exists when:

- The learning outcome's topic domain overlaps with the skill domain.
- The learning outcome's action verb indicates the student will practice or develop the skill (not merely be exposed to it conceptually).
- The Bloom's taxonomy level of the LO is appropriate: CORE skills generally require Apply-level or higher coverage; IMPORTANT skills may accept Understand-level coverage if supplemented by practice opportunities.

Score each match as STRONG, PARTIAL, or MISSING using the rubric defined in the goal-alignment SKILL.md.

### Step 3: Compute Coverage Metrics

**Single-Course Coverage**: for one course against one career path:

```
coverage = (STRONG_count * 1.0 + PARTIAL_count * 0.5) / total_skills * 100
```

**Weighted Coverage**: weight by priority:

```
weighted_coverage = (sum of score * priority_weight for each skill) / (sum of priority_weight for each skill) * 100
where priority_weight: CORE = 3, IMPORTANT = 2, BENEFICIAL = 1
and score: STRONG = 1.0, PARTIAL = 0.5, MISSING = 0.0
```

**Multi-Course Coverage**: when analyzing a program of study (multiple courses), a skill is covered if ANY course in the program covers it. Use the highest score across all courses for each skill. This avoids double-counting but captures cumulative coverage.

### Step 4: Identify Gaps and Prioritize

Sort MISSING skills by priority (CORE first, then IMPORTANT, then BENEFICIAL). For PARTIAL matches, note what additional learning would close the gap (e.g., "the course covers theory but lacks hands-on practice; adding a lab exercise would upgrade this to STRONG").

### Step 5: Generate Coverage Report

Produce a summary table:

| Skill | Priority | Coverage Score | Covering LO(s) | Gap Description (if any) |
|---|---|---|---|---|
| Data Structures | CORE | STRONG | LO3: "Implement and analyze..." | -- |
| Version Control | CORE | MISSING | -- | No LO addresses version control. |
| Testing | CORE | PARTIAL | LO7: "Explain testing strategies..." | LO is Understand-level; no hands-on testing LO. |

Include the computed coverage percentage and weighted coverage percentage at the bottom of the report.

---

## Notes on Maintaining This Reference

- Update skill requirements annually based on industry surveys, job posting analyses, and advisory board input.
- Cross-reference with O*NET, Bureau of Labor Statistics, and professional body guidelines (ACM/IEEE for CS, ABET for engineering, AACSB for business).
- When adding new career paths, follow the same format: skill name, priority, description, and mapped courses.
- Flag any skill that has no corresponding course in the university catalog as a CURRICULUM GAP for the department to address.
