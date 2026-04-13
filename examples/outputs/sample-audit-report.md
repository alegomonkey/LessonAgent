# Syllabus Audit Report: COS 431 Operating Systems

**Generated:** 2026-04-13
**Skill:** syllabus-analysis
**Input:** COS 431 syllabus (Fall 2026), ABET CAC criteria, program outcome mapping

---

## Course Metadata

| Field | Value |
|---|---|
| **Course Title** | COS 431: Operating Systems |
| **Instructor** | Dr. Marcus Hebert |
| **Credits** | 4 (3 lecture + 1 lab) |
| **Format** | In-person, 2x75 min lectures + 1x110 min lab per week |
| **Enrollment** | 32 students (cap: 35) |
| **Prerequisites** | COS 280 (Computer Architecture), COS 285 (Data Structures) |
| **Textbook** | Arpaci-Dusseau & Arpaci-Dusseau, *Operating Systems: Three Easy Pieces* |
| **Lab Platform** | xv6 (RISC-V), GCC toolchain on department Linux servers |

---

## Learning Outcomes Analysis

| LO | Learning Outcome Text | Bloom Level | Primary Verb | Assessments Mapped | ABET SOs Mapped |
|---|---|---|---|---|---|
| LO-1 | Explain the role of the operating system as resource manager and abstraction layer | Understand | Explain | Midterm Q1-3, Final Q1-2 | SO-1, SO-6 |
| LO-2 | Analyze process scheduling algorithms and evaluate their trade-offs under varying workloads | Analyze | Analyze | Midterm Q4-6, Lab 2, Lab 3, Written Report 1 | SO-1, SO-2, SO-6 |
| LO-3 | Design synchronization solutions for concurrent processes using locks, semaphores, and monitors | Create | Design | Midterm Q7-8, Lab 4, Final Q3-5 | SO-2, SO-6 |
| LO-4 | Compare memory management strategies and evaluate virtual memory implementations | Evaluate | Compare | Final Q6-9, Lab 5 | SO-1, SO-6 |
| LO-5 | Evaluate file system design decisions and their impact on reliability and performance | Evaluate | Evaluate | Lab 6, Written Report 2 | SO-1, SO-2 |
| LO-6 | Communicate technical analysis of operating system behavior through written reports | Apply | Communicate | Written Report 1, Written Report 2 | SO-3 |

---

## Assessment Breakdown

### Assessment Instruments

| Assessment | Weight | Type | LOs Assessed |
|---|---|---|---|
| Midterm Exam | 25% | Traditional Exam | LO-1, LO-2, LO-3 |
| Final Exam | 30% | Traditional Exam | LO-1, LO-3, LO-4 |
| Lab 2: Process Scheduling | 5% | Lab/Practical | LO-2 |
| Lab 3: Scheduling Analysis | 5% | Lab/Practical | LO-2 |
| Lab 4: Synchronization | 5% | Lab/Practical | LO-3 |
| Lab 5: Virtual Memory | 5% | Lab/Practical | LO-4 |
| Lab 6: File Systems | 5% | Lab/Practical | LO-5 |
| Lab 1: Environment Setup | 5% | Lab/Practical | (Setup, not mapped) |
| Written Report 1: Scheduling Trade-offs | 7.5% | Written Report | LO-2, LO-6 |
| Written Report 2: File System Evaluation | 7.5% | Written Report | LO-5, LO-6 |

### Weight Distribution by Type

| Assessment Type | Total Weight |
|---|---|
| Traditional Exams | 55% |
| Labs/Practicals | 30% |
| Written Reports | 15% |

---

## Assessment Coverage Matrix

| Assessment | LO-1 | LO-2 | LO-3 | LO-4 | LO-5 | LO-6 |
|---|---|---|---|---|---|---|
| Midterm Exam | X | X | X | | | |
| Final Exam | X | | X | X | | |
| Lab 2 | | X | | | | |
| Lab 3 | | X | | | | |
| Lab 4 | | | X | | | |
| Lab 5 | | | | X | | |
| Lab 6 | | | | | X | |
| Written Report 1 | | X | | | | X |
| Written Report 2 | | | | | X | X |
| **Coverage Count** | **2** | **4** | **3** | **2** | **2** | **2** |

**Legend:**
- 4 assessments: Well-covered (LO-2)
- 3 assessments: Adequate (LO-3)
- 2 assessments: Minimally covered (LO-1, LO-4, LO-5, LO-6) -- single-point-of-failure risk for lab-only outcomes

---

## Gap Analysis

### Accreditation Gaps

| ABET SO | Status | Detail |
|---|---|---|
| SO-1 (Analyze) | COVERED | Mapped via LO-1, LO-2, LO-4, LO-5. Multiple assessment instruments. |
| SO-2 (Design) | COVERED | Mapped via LO-2, LO-3, LO-5. Labs provide design artifacts. |
| SO-3 (Communication) | THIN | Mapped only via LO-6 (written reports), which carries 15% of course grade. No oral communication component. If written reports are removed or reduced, SO-3 loses its only anchor in this course. |
| SO-4 (Ethics/Professional Responsibility) | NOT COVERED | COS 431 does not address ethics. This is expected -- SO-4 is covered in COS 350 (Software Engineering) and COS 490 (Senior Seminar). No action needed at the course level, but the program assessment plan should confirm this mapping remains current. |
| SO-5 (Teamwork) | NOT COVERED | All assessments are individual. Teamwork is addressed in COS 350 and COS 490 at the program level. |
| SO-6 (Theory Application) | COVERED | Mapped via LO-1, LO-2, LO-3, LO-4. Strong coverage through labs connecting theory to xv6 implementation. |

### Industry Gaps

Competencies expected by employers for OS-related roles but not addressed in COS 431:

| Competency | Severity | Notes |
|---|---|---|
| Linux namespaces and cgroups | HIGH | Foundation of modern container isolation. Course uses xv6 exclusively -- students do not interact with real Linux kernel interfaces. |
| Container technologies (Docker, OCI) | HIGH | Industry-standard deployment model. Not mentioned in syllabus. |
| Performance profiling (perf, strace, eBPF) | HIGH | Standard diagnostic workflow for systems engineers. Labs use printf debugging only. |
| Distributed systems concepts | MEDIUM | Covered in COS 440 (Distributed Systems), an elective. Not all students take it. |
| Version control / CI-CD workflows | MEDIUM | Students use department servers with manual submission. No Git, no automated testing pipeline. |

### Assessment Gaps

| Gap | Severity | Detail |
|---|---|---|
| LO-5 single-point coverage | MEDIUM | File system evaluation (LO-5) is assessed by Lab 6 and Written Report 2 only. If a student performs poorly on Lab 6, the only recovery path is the written report (7.5%). |
| Heavy exam weighting | MEDIUM | 55% of the course grade comes from traditional closed-book exams. This is a valid but narrow assessment strategy -- it primarily measures recall and analysis under time pressure, not authentic systems-building skills. |
| No formative assessment loop | LOW | There are no quizzes, homework checks, or low-stakes assessments between the midterm and final. Students receive limited feedback on LO-3 and LO-4 before the final exam. |

---

## Summary

COS 431 provides strong foundational coverage of OS concepts with clear ABET mapping. The xv6 lab sequence is well-structured and builds progressively through core topics. Learning outcomes are appropriately leveled across Bloom's taxonomy, and ABET SOs 1, 2, and 6 have robust multi-instrument coverage.

Primary areas for improvement: bridging to modern Linux systems programming (containers, profiling), diversifying assessment types beyond traditional exams, and strengthening SO-3 (communication) coverage. The 55% exam weighting and absence of real-world Linux tooling represent the largest opportunities for course evolution without sacrificing theoretical rigor.
