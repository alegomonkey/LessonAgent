# COS 431: Operating Systems
## Fall 2026 | Dr. Karen Hebert | University of Maine

### Course Description
Introduction to the design and implementation of operating systems. Topics include process management, memory management, file systems, I/O, and protection. Students gain hands-on experience through programming assignments using the xv6 teaching operating system.

### Prerequisites
- COS 220 (Data Structures)
- COS 301 (Programming Languages)

### Format
- 2x 75-minute lectures per week
- 1x 110-minute lab per week
- Enrollment cap: 55 per section, 2 sections offered

### Learning Outcomes
Upon successful completion of this course, students will be able to:
1. Explain the role of an operating system as a resource manager and abstraction layer (ABET SO-1)
2. Implement process scheduling algorithms and analyze their performance trade-offs (ABET SO-1, SO-2, SO-6)
3. Design solutions to concurrency problems using synchronization primitives (ABET SO-2)
4. Analyze memory management strategies including paging and virtual memory (ABET SO-1, SO-6)
5. Implement a simple file system and evaluate design trade-offs (ABET SO-2, SO-5)
6. Communicate technical designs through written reports and code documentation (ABET SO-3)

### Weekly Schedule
| Week | Topic | Lab |
|------|-------|-----|
| 1 | Introduction: What is an OS? History, structure | Lab 0: xv6 setup and exploration |
| 2 | Processes and threads: creation, lifecycle, context switching | Lab 1: Adding a system call to xv6 |
| 3 | CPU scheduling: FCFS, SJF, Round Robin, MLFQ | Lab 1 continued |
| 4 | Synchronization I: race conditions, critical sections, mutexes | Lab 2: Implementing a priority scheduler |
| 5 | Synchronization II: semaphores, monitors, deadlock | Lab 2 continued |
| 6 | **Midterm 1**; Deadlock detection and prevention | Lab 3: Solving producer-consumer with semaphores |
| 7 | Memory management: contiguous allocation, segmentation | Lab 3 continued |
| 8 | Virtual memory: paging, page replacement algorithms | Lab 4: Adding virtual memory page to xv6 |
| 9 | Virtual memory II: TLBs, thrashing, working sets | Lab 4 continued |
| 10 | Storage and I/O: disk scheduling, RAID, DMA | Lab 5: Building a simple file system |
| 11 | File systems I: directory structure, allocation methods | Lab 5 continued |
| 12 | File systems II: journaling, log-structured FS | Lab 6: Extending the xv6 shell (pair project) |
| 13 | **Midterm 2**; Protection and security basics | Lab 6 continued |
| 14 | Case study: xv6 kernel walkthrough | Written Report 3 due |
| 15 | Review; **Final Exam** | — |

### Assessments
| Assessment | Weight | Description | ABET SO |
|-----------|--------|-------------|---------|
| Lab assignments (6) | 30% | xv6 modifications: syscall, scheduler, VM, sync, FS, shell | SO-1, SO-2, SO-6 |
| Midterm 1 | 15% | Written exam: processes, scheduling, synchronization | SO-1, SO-6 |
| Midterm 2 | 15% | Written exam: memory, storage, file systems | SO-1, SO-6 |
| Final exam | 25% | Comprehensive written exam | SO-1, SO-6 |
| Written reports (3) | 15% | Design documents for Labs 2, 4, 6 | SO-3 |

### Required Textbook
- *Operating System Concepts* by Silberschatz, Galvin, and Gagne (10th Edition)

### ABET Student Outcome Coverage
| Student Outcome | How Assessed |
|----------------|-------------|
| SO-1: Analyze complex computing problems | Midterms, final exam, labs (scheduling analysis, memory analysis) |
| SO-2: Design computing-based solutions | Labs 2, 3, 5, 6 (implementation projects) |
| SO-3: Communicate effectively | Written reports (3) |
| SO-5: Function on teams | Lab 6 (pair project) |
| SO-6: Apply CS theory and fundamentals | Midterms, final exam, all labs |

### Known Gaps (not addressed in current syllabus)
- No coverage of Linux-specific kernel features (namespaces, cgroups, eBPF)
- No containerization or virtualization technologies (Docker, VMs)
- No performance profiling tools (perf, strace, dtrace)
- No distributed systems concepts (covered in COS 440)
- Git/CI/CD used informally but not taught
- All labs use xv6 (pedagogical OS), no real-world Linux systems programming
