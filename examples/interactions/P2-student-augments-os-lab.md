# P2: Marcus Augments a COS 431 Lab into a Container Deployment Exercise

## Scenario
Marcus Williams (EET senior, controls engineer goal) is also enrolled in COS 431 this semester. Lab 4 (synchronization — implementing sleep locks in xv6) requires individual C coding. Marcus wants to extend the lab to include real-world PLC-style synchronization used in industrial control systems.

## Data Sources Used
- Student profile (data/users/student-williams.json)
- COS 431 syllabus (data/syllabi/cos431-operating-systems.md)

## Conversation

**Turn 1 — Marcus:**
"I'm in COS 431. Lab 4 is implementing sleep locks in xv6 for synchronization. I get that it teaches concurrency, but I'm an EET major going into controls engineering — I'll never touch xv6 again. I'd rather connect this to industrial control systems where synchronization actually matters for safety. Here's the lab prompt."

**Agent Internal Reasoning:**
- Parse Lab 4: implements sleep locks in xv6, assesses LO-3 (design synchronization solutions, Bloom's Create), maps to ABET SO-2, SO-6.
- Rubric: (1) correct sleep lock implementation (40pts), (2) deadlock-free design (20pts), (3) test cases pass (20pts), (4) written explanation of concurrency decisions (20pts).
- Marcus's career: controls engineer. Synchronization is CRITICAL in industrial control — race conditions in a PLC program can cause physical harm. This is a strong career connection.
- The xv6 implementation is FIXED — he must do it. The written explanation is FLEXIBLE — he can expand it.

**Agent Response:**
"I've parsed Lab 4. Here's the profile:

**Learning Outcome:** LO-3 — Design synchronization solutions for concurrent processes using locks, semaphores, and monitors (Bloom's: Create)

**Rubric:**
| Criterion | Points | Fixed/Flexible |
|---|---|---|
| Correct sleep lock implementation | 40 | FIXED — must implement in xv6 |
| Deadlock-free design | 20 | FIXED — design must be verified |
| Test cases pass | 20 | FIXED — all provided tests |
| Written explanation of concurrency decisions | 20 | FLEXIBLE — scope can expand |

Here's the career connection: synchronization in industrial control systems is a safety-critical concern. A race condition in a paper mill's PLC program isn't just a bug — it can cause equipment damage or injury. The same concurrency principles from xv6 (mutual exclusion, deadlock prevention, ordering guarantees) apply directly.

**Augmentation direction:** Complete the full xv6 lab as required, then expand the written explanation to include a 1-2 page comparison of xv6 synchronization primitives to PLC synchronization mechanisms (interlocks, sequential function charts, safety PLCs). Connect the theoretical concepts to a specific industrial scenario — for example, coordinating multiple actuators on a paper machine.

This adds ~4-5 hours of research and writing. The xv6 code is unchanged.

Want me to build the proposal for Dr. Hebert?"

---

**Turn 2 — Marcus:**
"Yeah, but make sure it's clear I'm doing MORE work, not less. Dr. Hebert is old-school — she'll be suspicious if she thinks I'm trying to skip the xv6 part."

**Agent Response:**
"The rubric compliance table handles exactly that. Here's the proposal:

---

## Proposal: Augmented Lab 4 — xv6 Synchronization + Industrial Controls Comparison

**Student:** Marcus Williams | **Course:** COS 431 Operating Systems
**Assignment:** Lab 4 — Synchronization | **Professor:** Dr. Karen Hebert
**Date:** September 25, 2026

### Summary
I propose completing all original Lab 4 requirements — implementing sleep locks in xv6, verifying deadlock-free design, passing all test cases — and expanding the written explanation to include a comparative analysis of OS synchronization primitives and industrial PLC synchronization mechanisms used in controls engineering. This connects the course's theoretical concurrency content to the safety-critical synchronization I will implement as a controls engineer in Maine's manufacturing industry.

### Original Requirements Met

| Original Criterion | Pts | How the Augmented Version Addresses It |
|---|---|---|
| Correct sleep lock implementation | 40 | Unchanged. Full xv6 sleep lock implementation submitted. The augmentation does not modify the xv6 code in any way. |
| Deadlock-free design | 20 | Unchanged. Design verified with provided test scenarios. Written explanation includes deadlock prevention reasoning. |
| Test cases pass | 20 | Unchanged. All provided test cases executed and passing on department server. |
| Written explanation | 20 | Preserved and expanded. First section covers xv6 concurrency decisions (original scope). Additional sections compare to PLC synchronization. |

### Augmentation Components
- **Industrial synchronization comparison (1-2 pages)**: How do xv6 sleep locks map to PLC interlocks? How does deadlock prevention in an OS compare to safety interlock design in a Sequential Function Chart? What happens when synchronization fails in each context — a crashed process vs. a crashed paper machine?
- **Maine industry scenario**: Brief analysis of synchronization requirements for a specific industrial system — coordinating the press section of a paper machine where multiple actuators must sequence correctly.

### Deliverables
1. xv6 source code with sleep lock implementation (original)
2. Test suite output showing all tests pass (original)
3. Extended written report — 3-4 pages total instead of 1 (augmented)

### Timeline

| Date | Milestone | Component |
|---|---|---|
| Sep 15-19 | Implement sleep locks in xv6 | Original |
| Sep 20 | Run test suite, debug | Original |
| Sep 21-22 | Write xv6 concurrency explanation (pg 1) | Original |
| Sep 23-24 | Research PLC synchronization, write comparison (pgs 2-4) | Augmented |
| Sep 25 | Review and submit | Both |

### Career Rationale
Controls engineers at Maine manufacturers (Verso Corporation, ReEnergy Holdings) program PLCs that coordinate physical processes where synchronization failures have safety consequences. Understanding concurrency at the OS level — mutual exclusion, deadlock prevention, ordering guarantees — provides the theoretical foundation for designing safe industrial interlocks. This augmentation bridges COS 431's academic treatment of synchronization to the safety-critical applications I will encounter as a controls engineer.

---

Pending your approval, Dr. Hebert.

---

The first thing Dr. Hebert sees is that all four criteria are met unchanged. The augmentation is clearly additional work — more pages, more analysis — not a substitution. Want to adjust anything?"

## Why This Interaction Succeeds
- Addresses Marcus's concern ("make sure it's clear I'm doing MORE") directly in the proposal structure
- Rubric compliance table leads with "Unchanged" for the first three criteria
- Augmentation is genuinely career-relevant — PLC synchronization is a real controls engineering concern
- Maine-specific industry examples (paper machines) connect to Marcus's background and targets
- Timeline shows xv6 work comes first, augmentation after — the original lab is clearly completed
