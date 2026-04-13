# COS 431 Container-Based System Profiling Capstone | Rubric (100 points)

**Generated:** 2026-04-13
**Assessment:** Final Capstone Project (replaces final exam, Tier 3 recommendation)
**Weight:** 30% of course grade
**Format:** Pairs, 2-week project + presentation in finals week
**ABET SOs Assessed:** SO-1, SO-2, SO-3, SO-5, SO-6

---

## Project Description

Working in pairs, students containerize a provided multi-process application (web server, database, and background worker), configure resource isolation using cgroups, systematically profile the system under load, and produce a technical design document connecting their findings to operating system concepts from the course. The project culminates in an 8-minute presentation with live demo during the scheduled final exam period.

**Provided materials:** Base application source code, Makefile, load generation script, starter docker-compose template, profiling tool cheat sheet.

**Deliverables:**
1. Working containerized application (Dockerfiles, docker-compose.yml, cgroup configurations)
2. Profiling report with data (perf output, flamegraphs, strace summaries)
3. Technical design document (2500-3500 words)
4. Presentation slides and live demo
5. Individual peer evaluation form

---

## Rubric

### Criterion 1: Containerization and Resource Isolation (15 points)

**ABET SO-2** (Design)

| Level | Points | Descriptors |
|---|---|---|
| **Exceeds Expectations** | 14-15 | Dockerfiles use multi-stage builds with minimal image size. docker-compose correctly orchestrates all three services with appropriate networking, volume mounts, and restart policies. cgroup resource limits (CPU shares, memory limits, I/O bandwidth) are set with documented justification tied to profiling data. Health checks are implemented. |
| **Meets Expectations** | 11-13 | Dockerfiles build successfully and produce working images. docker-compose orchestrates all services with correct networking. cgroup limits are set for at least CPU and memory with brief justification. Minor inefficiencies in image layering or configuration. |
| **Developing** | 7-10 | Application runs in containers but with significant configuration issues: missing resource limits, hardcoded values instead of environment variables, incorrect networking that requires manual workarounds. Limited or no justification for resource allocation decisions. |
| **Beginning** | 0-6 | Application does not successfully run in containers, or only one of three services is containerized. No cgroup configuration. Dockerfile contains fundamental errors (e.g., running as root with no justification, missing dependencies, broken build). |

---

### Criterion 2: Problem Analysis (20 points)

**ABET SO-1** (Analyze)

| Level | Points | Descriptors |
|---|---|---|
| **Exceeds Expectations** | 18-20 | Technical document clearly identifies and analyzes at least 4 distinct OS concepts at work in the containerized application (e.g., process scheduling under CPU limits, page fault behavior under memory pressure, lock contention in the database, I/O scheduling for disk-bound worker). Analysis includes specific data from profiling that demonstrates each concept. Correctly distinguishes between application-level and OS-level causes of observed behavior. |
| **Meets Expectations** | 14-17 | Identifies and analyzes at least 4 OS concepts with supporting profiling data. Analysis is generally correct but may conflate application-level and OS-level behavior in one or two instances. Connections between observed data and theoretical concepts are present but not always precisely articulated. |
| **Developing** | 8-13 | Identifies fewer than 4 OS concepts, or identifies concepts but provides superficial analysis without clear connection to profiling data. May list course terms without demonstrating understanding of how they manifest in the containerized system. |
| **Beginning** | 0-7 | Fails to identify relevant OS concepts, or analysis contains fundamental misunderstandings (e.g., confusing virtual memory with disk storage, misidentifying scheduling behavior). Little or no connection between observed system behavior and course material. |

---

### Criterion 3: Application of CS Theory (20 points)

**ABET SO-6** (Theory Application)

| Level | Points | Descriptors |
|---|---|---|
| **Exceeds Expectations** | 18-20 | Implementation decisions are explicitly justified using theoretical concepts from the course. For example: memory limit is set based on working set size analysis; CPU shares are calculated using scheduling fairness criteria discussed in lectures; file system mount options are chosen based on journaling trade-offs from Week 13. At least 3 implementation decisions reference specific course material with correct technical reasoning. |
| **Meets Expectations** | 14-17 | At least 3 implementation decisions reference course concepts, and the reasoning is generally correct. May include minor theoretical imprecision (e.g., citing "round-robin scheduling" when the actual behavior is CFS weighted fair queuing) but demonstrates genuine effort to connect theory to practice. |
| **Developing** | 8-13 | Fewer than 3 decisions reference course theory, or references are superficial ("we set the memory limit because of virtual memory concepts"). Implementation appears to be based on trial-and-error or online tutorials rather than principled application of course material. |
| **Beginning** | 0-7 | No meaningful connection between implementation decisions and course theory. Design document reads as a how-to tutorial rather than an engineering analysis. Course concepts are absent or incorrectly applied. |

---

### Criterion 4: Performance Profiling Methodology (15 points)

**ABET SO-6** (Theory Application)

| Level | Points | Descriptors |
|---|---|---|
| **Exceeds Expectations** | 14-15 | Uses at least 3 profiling tools appropriately (e.g., `perf stat` for CPU counters, `perf record`/flamegraphs for hotspot analysis, `strace` for syscall tracing). Profiling is systematic: baseline measurement, then controlled variation of one parameter at a time. Bottleneck identification is supported by quantitative data. Flamegraphs or equivalent visualizations are included and correctly interpreted. |
| **Meets Expectations** | 11-13 | Uses at least 2 profiling tools with correct interpretation of output. Identifies at least one genuine bottleneck with supporting data. Methodology is mostly systematic but may vary multiple parameters simultaneously or draw conclusions from insufficient sample sizes. |
| **Developing** | 7-10 | Uses profiling tools but interprets output incorrectly or superficially (e.g., reports raw numbers without analysis, confuses user-time and kernel-time, misreads flamegraph). Bottleneck identification is speculative rather than data-driven. |
| **Beginning** | 0-6 | Does not use profiling tools, or uses only `time` command without deeper analysis. Performance claims are based on subjective observation ("it felt slow") rather than measurement. Profiling output, if present, is included without interpretation. |

---

### Criterion 5: Technical Document Quality (20 points)

**ABET SO-3** (Communication)

| Level | Points | Descriptors |
|---|---|---|
| **Exceeds Expectations** | 18-20 | Document follows a clear professional structure (introduction, system architecture, methodology, analysis, conclusions). Technical claims are supported by evidence (data, citations, profiling output). Figures and tables are labeled, referenced in text, and necessary (not decorative). Writing is precise -- uses correct technical terminology consistently. Within the 2500-3500 word target. Suitable for a technical audience without the authors present to explain. |
| **Meets Expectations** | 14-17 | Document has a logical structure and covers all required sections. Most technical claims are supported by evidence. Figures are present and generally useful. Writing is clear but may occasionally use imprecise terminology or include unsupported claims. Minor structural issues (e.g., conclusions that introduce new information, missing figure references). |
| **Developing** | 8-13 | Document is present but poorly organized -- sections are out of logical order, key sections are missing, or the document reads as a stream of observations rather than a structured analysis. Evidence is sparse. Significant terminology errors or writing that requires reader inference to understand the intended meaning. |
| **Beginning** | 0-7 | Document is incomplete, incoherent, or under 1500 words. No clear structure. Technical content is absent or unreliable. Writing quality impedes comprehension. |

---

### Criterion 6: Presentation and Teamwork (10 points)

**ABET SO-5** (Teamwork)

| Level | Points | Descriptors |
|---|---|---|
| **Exceeds Expectations** | 9-10 | Presentation is well-rehearsed and fits within 8 minutes. Live demo works and clearly illustrates a key finding. Both team members present substantive content and can answer questions about any part of the project (not just "their section"). Peer evaluation confirms equitable contribution. Q&A responses are accurate and demonstrate deep understanding. |
| **Meets Expectations** | 7-8 | Presentation covers all key areas within the time limit. Demo works or fails gracefully with a prepared backup (screenshots). Both members present, though one may be noticeably more prepared. Peer evaluation indicates generally equitable contribution. Q&A responses are mostly accurate. |
| **Developing** | 4-6 | Presentation exceeds time limit or omits key areas. Demo fails without backup. Presentation load is visibly unequal. Peer evaluation indicates one member did significantly more work. Q&A responses reveal gaps in understanding of partner's contributions. |
| **Beginning** | 0-3 | Presentation is disorganized or incomplete. One team member is absent or does not present. No working demo or screenshots. Peer evaluation indicates minimal collaboration. Unable to answer basic questions about project decisions. |

---

## Points Summary

| Criterion | Points | ABET SO |
|---|---|---|
| Containerization and Resource Isolation | 15 | SO-2 |
| Problem Analysis | 20 | SO-1 |
| Application of CS Theory | 20 | SO-6 |
| Performance Profiling Methodology | 15 | SO-6 |
| Technical Document Quality | 20 | SO-3 |
| Presentation and Teamwork | 10 | SO-5 |
| **Total** | **100** | |

---

## Workload Comparison

| Component | Original Final Exam | Container Capstone |
|---|---|---|
| Preparation / Development | 10-15 hours study | 20-25 hours development |
| Assessment Event | 3 hours (closed-book exam) | 5 hours writing + 2 hours presentation prep |
| Total Student Effort | 13-18 hours | 27-32 hours |
| Assessment Weight | 30% (final exam only) | 30% (replaces final exam 25% + absorbs 5% from reduced lab weight) |

**Note:** The capstone requires approximately 50-75% more student effort than the final exam it replaces. This is offset by three factors:

1. **Distributed effort.** The capstone spans 2 weeks rather than a single 3-hour high-stakes event. Students report lower anxiety and more consistent engagement with distributed assessments.
2. **Authentic assessment.** The capstone measures the ability to build, analyze, and communicate -- skills that traditional exams cannot assess. This directly addresses the audit finding that 55% of the course grade relied on traditional exams.
3. **Lab weight absorption.** Lab 1 (environment setup, 5%) is reclassified as ungraded, and its weight shifts to the capstone. This is appropriate because the capstone subsumes and extends the Docker environment setup that Lab 1 would have covered.

The net effect is a comparable per-credit-hour workload when accounting for the elimination of final exam study time and the Lab 1 weight transfer.
