# Rubric Compliance Map: Augmented Lab 4 — xv6 Synchronization + Industrial Controls Comparison

**Student:** Marcus Williams
**Original Assignment:** COS 431 Lab 4 — Synchronization (Sleep Locks)
**Augmented Assignment:** Lab 4 + Industrial Controls Synchronization Comparison
**Professor:** Dr. Karen Hebert

---

## Compliance Summary

| Metric | Value |
|---|---|
| Total original criteria | 4 |
| Criteria fully met (unchanged) | 3 |
| Criteria fully met + augmented | 1 |
| Criteria weakened | 0 |
| Criteria missed | 0 |
| Original points addressable | 100 / 100 |

---

## Detailed Compliance Table

| # | Original Rubric Criterion | Pts | How Augmented Version Addresses It | Status |
|---|---|---|---|---|
| 1 | Correct sleep lock implementation in xv6 | 40 | Unchanged. Full sleep lock implementation submitted in xv6 kernel code. The augmented comparison is a separate written analysis and does not modify the xv6 implementation in any way. The sleep lock correctly acquires/releases, handles the sleep/wakeup protocol, and prevents lost wakeups. | **FULLY MET** |
| 2 | Deadlock-free design | 20 | Unchanged. Design verified against provided test scenarios: no circular wait conditions, lock ordering maintained, sleep channel correctly implemented. Written explanation (Section 1) documents deadlock prevention reasoning using the techniques from Week 5 lectures. | **FULLY MET** |
| 3 | All test cases pass | 20 | Unchanged. All provided test cases executed on the department server. Output log included in submission. The industrial controls comparison is a written appendix only and does not affect the xv6 code or its test results. | **FULLY MET** |
| 4 | Written explanation of concurrency decisions | 20 | Preserved and expanded. Section 1 of the written report covers xv6 synchronization design decisions at the same depth as the original requirement (1 page): why sleep locks were chosen over spin locks, how the sleep/wakeup protocol prevents lost wakeups, how deadlock is avoided. Sections 2-3 ADD a comparative analysis of xv6 synchronization primitives and PLC synchronization mechanisms (interlocks, sequential function charts). The original criterion is met in Section 1 alone; the additional sections are purely additive. | **FULLY MET + AUGMENTED** |

---

## Augmentation Impact Assessment

| Question | Answer |
|---|---|
| Does the augmentation modify any original deliverable? | No. xv6 code is unchanged. Test results are unchanged. |
| Does the augmentation affect any original rubric criterion negatively? | No. All 4 criteria are met independently of the augmentation. |
| Could the augmented component be removed and the original still be complete? | Yes. If you removed the industrial controls comparison, the submission would be a complete, rubric-compliant Lab 4. |
| What does the augmentation add? | 2-3 additional pages of written analysis comparing OS synchronization to industrial PLC synchronization, with a career-relevant application to Maine manufacturing. |
| Is the additional effort proportional? | Yes. Approximately 4-5 additional hours of research and writing beyond the original lab effort of ~10-15 hours. |
