# Recommendation Plan: COS 431 Operating Systems

**Generated:** 2026-04-13
**Faculty:** Dr. Marcus Hebert
**Target Semester:** Fall 2026
**Basis:** Syllabus audit report, career alignment matrix (Cloud Infrastructure Engineer)

---

## Executive Summary

COS 431 has strong foundational content and clear ABET mapping, but lacks connection to modern Linux systems practice -- the bridge from xv6 to production infrastructure. This plan proposes 6 recommendations across three tiers, designed to fit within Dr. Hebert's stated constraints. Tiers 1 and 2 are implementable within the 25-hour budget and require no department approval.

---

## Faculty Constraints Profile

| Constraint | Value |
|---|---|
| Available preparation time | 25 hours (one-time, before Fall 2026) |
| Budget | $500 (discretionary, no purchase orders needed) |
| Teaching assistants | 2 TAs at 10 hrs/week each |
| Department approval threshold | Tier 1-2: no approval needed. Tier 3: requires assessment plan committee review. |
| Non-negotiables (stated by faculty) | xv6 lab sequence must remain. Midterm exam structure is fixed. Lecture schedule cannot shift by more than 1 week. |
| Technical infrastructure | Department Linux servers, student SSH access, no cloud credits currently |

---

## Tier 1: Quick Wins

*Low effort, no risk, immediate value. Total: 6 hours.*

### Recommendation 1: Add ML/Cloud Context to 2 Programming Assignments

| Field | Detail |
|---|---|
| **Effort** | 3 hours |
| **Cost** | $0 |
| **Risk** | SAFE -- changes dataset, not assignment structure |
| **LOs Affected** | LO-2 (scheduling analysis), LO-5 (file system evaluation) |
| **Gaps Addressed** | Industry relevance, student motivation |

**Details:**

- **Lab 3 (Scheduling Analysis):** Replace the synthetic workload generator with a trace file from a real cloud scheduling scenario. Students analyze the same scheduling algorithms but against a realistic multi-tenant workload. Provide a 1-paragraph context blurb connecting the exercise to Kubernetes pod scheduling.
- **Lab 6 (File Systems):** Add an optional extension where students measure file system performance under a containerized database write pattern (provided as a script). The core xv6 exercise remains unchanged; the extension adds a 30-minute "what would happen on real Linux?" analysis question.

**TA Impact:** None. Grading rubric unchanged for core exercises.

---

### Recommendation 2: Replace 2 Quizzes with Career Connection Reflections

| Field | Detail |
|---|---|
| **Effort** | 1 hour |
| **Cost** | $0 |
| **Risk** | SAFE -- replaces low-weight formative assessments |
| **LOs Affected** | LO-6 (communication) |
| **Gaps Addressed** | SO-3 (communication), student career awareness |

**Details:**

Replace the Week 5 and Week 11 reading quizzes (currently 1% each, ungraded for correctness) with 200-word "career connection" reflections. Students connect that week's OS topic to their intended career path. Graded on completion and specificity, not correctness.

Example prompt: *"This week we covered virtual memory and TLBs. In 200 words, describe a scenario in your target career where understanding virtual memory behavior would help you diagnose a problem or make a design decision. Be specific about the tools or context involved."*

**TA Impact:** Comparable grading time to quizzes (completion-based). Provides SO-3 evidence for ABET with minimal overhead.

---

### Recommendation 3: Update Reading List with Contemporary Resources

| Field | Detail |
|---|---|
| **Effort** | 2 hours |
| **Cost** | $0 |
| **Risk** | SAFE -- supplementary only, does not replace textbook |
| **LOs Affected** | All (contextual enrichment) |
| **Gaps Addressed** | Industry gaps (Linux internals, containers, profiling) |

**Details:**

Add a "Modern Systems Resources" section to the course website with curated links organized by week. These are optional but recommended readings that connect each week's lecture topic to current practice.

| Week | Topic | Supplementary Resource |
|---|---|---|
| 3 | Process Management | Linux kernel source: `kernel/fork.c` (annotated excerpt, 2 pages) |
| 5 | Scheduling | Blog post: "How the CFS Scheduler Works" (linked) |
| 7 | Synchronization | Linux `futex` man page + Drepper's "Futexes Are Tricky" |
| 10 | Virtual Memory | Blog post: "Understanding Linux OOM Killer" |
| 12 | Containers Context | Docker documentation: "How Docker Uses Namespaces" (official docs) |
| 13 | File Systems | LWN.net article: "An Introduction to eBPF" (file system tracing section) |

**TA Impact:** None.

---

## Tier 2: Moderate Changes

*Meaningful curriculum improvement. Requires summer preparation. Total: 20 hours.*

### Recommendation 4: Add Linux Bridge Exercises to Labs 2, 4, and 6

| Field | Detail |
|---|---|
| **Effort** | 12 hours (8 hrs creating exercises + 4 hrs building Docker image) |
| **Cost** | $0 (Docker image hosted on department GitLab) |
| **Risk** | SAFE -- additive exercises, do not modify existing lab content |
| **LOs Affected** | LO-2, LO-3, LO-5 (plus new practical skills) |
| **Gaps Addressed** | Linux internals, containers, performance profiling (all HIGH industry gaps) |

**Details:**

After each core xv6 exercise in Labs 2, 4, and 6, students complete a 30-45 minute "bridge exercise" on a real Linux system. A pre-configured Docker image provides a consistent environment with all tools pre-installed.

| Lab | xv6 Core Exercise | Linux Bridge Exercise |
|---|---|---|
| Lab 2 | Implement round-robin scheduler in xv6 | Use `cgroups v2` to set CPU shares for two competing processes. Measure actual CPU allocation with `perf stat`. Answer: how does the Linux CFS scheduler differ from your xv6 round-robin? |
| Lab 4 | Implement sleep locks in xv6 | Use `strace` to trace lock contention in a provided multi-threaded C program on Linux. Identify the futex calls. Answer: how does Linux's futex mechanism compare to xv6's sleep locks? |
| Lab 6 | Modify xv6 file system to support large files | Use `perf trace` to measure syscall overhead of sequential vs. random writes on ext4. Compare to your xv6 measurements. Answer: what optimizations does ext4 use that xv6 lacks? |

**Deliverable:** Pre-configured Docker image (`cos431-bridge:fall2026`) with gcc, perf, strace, stress-ng, and all exercise scripts. Students pull and run with one command.

**TA Impact:** +30 minutes grading per section per bridge exercise (3 bridges x 2 sections = 3 additional TA hours across the semester). Well within TA capacity.

---

### Recommendation 5: Add "OS in the Wild" Group Research Project

| Field | Detail |
|---|---|
| **Effort** | 8 hours (project description, rubric, scheduling presentations) |
| **Cost** | $0 |
| **Risk** | SAFE + beneficial -- adds assessment diversity without removing existing instruments |
| **LOs Affected** | LO-2, LO-6 (plus SO-3, SO-5) |
| **Gaps Addressed** | SO-3 (communication), SO-5 (teamwork), assessment diversity |

**Details:**

Teams of 3 research how a real company or open-source project uses operating system concepts covered in the course. Replaces 5% of the final exam weight (final drops from 30% to 25%).

**Project deliverables:**
- 10-minute presentation with live demo or code walkthrough (Week 14)
- 2-page technical summary document
- Individual peer evaluation form

**Example topics (student-selected, instructor-approved):**
- How Netflix uses eBPF for production kernel tracing
- Memory management in the Android runtime (ART)
- How PostgreSQL uses the Linux page cache
- Container isolation failures: analyzing CVE-2024-21626

**Assessment split:** Presentation quality (40%), technical depth (40%), peer evaluation (20%).

**TA Impact:** TAs attend presentations and grade using provided rubric. Estimated 4 additional TA hours total.

---

## Tier 3: Deep Restructuring

*Significant curriculum change. Requires department approval. Total: 20 hours.*

### Recommendation 6: Replace Final Exam with Container Capstone Project

| Field | Detail |
|---|---|
| **Effort** | 20 hours (project design, rubric, Docker environment, grading infrastructure) |
| **Cost** | $0 (uses department infrastructure) |
| **Risk** | WARNING -- requires updating department assessment plan |
| **LOs Affected** | LO-1 through LO-6 (comprehensive) |
| **Gaps Addressed** | All industry gaps, assessment diversity, SO-3, SO-5 |

**Details:**

Replace the 3-hour closed-book final exam with a 2-week capstone project. Students work in pairs to containerize a multi-process application, profile its performance, and produce a technical design document.

**Project phases:**
1. **Containerization (Week 14):** Given a multi-process application (web server + database + worker), students write Dockerfiles, docker-compose configuration, and cgroup resource limits.
2. **Profiling (Week 14-15):** Systematically profile the containerized application using perf, strace, and provided eBPF scripts. Identify bottlenecks and connect them to OS concepts from the course.
3. **Documentation (Week 15):** Write a technical design document explaining their containerization decisions, profiling methodology, and findings. Must reference at least 4 course concepts (scheduling, memory, synchronization, file I/O).
4. **Presentation (Finals Week):** 8-minute demo + Q&A in the scheduled final exam slot.

**WARNING:** This recommendation changes a formal assessment instrument (final exam) listed in the department assessment plan. Implementation requires:
1. Submit assessment plan modification to the CS Assessment Committee (Dr. Rivera, chair)
2. Committee review (typically 2-3 weeks)
3. Update ABET course assessment mapping document

**Recommended timeline:** Submit the assessment plan change this semester (Spring 2026) so that approval is in place for Fall 2026 implementation. This also allows one full artifact collection cycle before the next ABET visit.

See `sample-rubric.md` for the detailed capstone rubric.

---

## Blocked Recommendations

None for this constraint profile. All 6 recommendations are feasible given the stated constraints, with Tier 3 requiring the additional step of committee approval.

---

## Implementation Timeline

| Period | Action | Tier | Hours |
|---|---|---|---|
| Spring 2026 (now) | Submit Tier 3 assessment plan change to committee | Tier 3 prep | 2 |
| Summer 2026, Weeks 1-2 | Update reading list, write career reflection prompts, modify Lab 3/6 datasets | Tier 1 | 6 |
| Summer 2026, Weeks 3-6 | Build Docker bridge image, write bridge exercises, test with TAs | Tier 2 | 12 |
| Summer 2026, Weeks 5-7 | Design group project, write rubric, build presentation schedule | Tier 2 | 8 |
| Summer 2026, Weeks 7-10 | Design capstone project, write rubric, build grading infrastructure | Tier 3 | 18 |
| Fall 2026, Week 1 | Deploy all Tier 1 and Tier 2 changes | -- | -- |
| Fall 2026, Week 13 | Deploy Tier 3 capstone (if approved) | -- | -- |

---

## Resource Summary

| Tier | Faculty Hours | Cost | Approval Required |
|---|---|---|---|
| Tier 1 (Quick Wins) | 6 hours | $0 | No |
| Tier 2 (Moderate) | 20 hours | $0 | No |
| Tier 3 (Deep) | 20 hours | $0 | Yes (assessment committee) |
| **Tier 1 + 2 combined** | **26 hours** | **$0** | **No** |

Tier 1 + Tier 2 combined (26 hours) slightly exceeds the 25-hour budget. To fit exactly within budget, defer the group project rubric refinement (2 hours) to early Fall 2026 -- TAs can assist with rubric testing during Week 1.

Tier 3 would require deferring to a second preparation cycle or allocating additional summer time beyond the stated 25-hour constraint.
