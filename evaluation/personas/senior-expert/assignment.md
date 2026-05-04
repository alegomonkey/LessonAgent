# COS 431 Lab 4: Virtual Memory in xv6

**Course:** COS 431 — Operating Systems
**Instructor:** Dr. Karen Hebert
**Due:** End of Week 9
**Weight:** Counts toward Lab assignments (30% of final grade); paired with Written Report 2 (part of 15% reports grade).

## Context

You will extend the xv6 teaching operating system to support a richer virtual-memory feature. xv6 already has paging; this lab asks you to implement page-replacement policy support, add a system call surface that lets user processes observe page-fault behavior, and analyze the resulting performance trade-offs.

## Learning Outcomes (mapped to course outcomes)

By completing this lab and its written report you will be able to:

1. Analyze memory-management strategies including paging and virtual memory (LO-4).
2. Implement and reason about page-replacement algorithms and their performance trade-offs (LO-2, LO-4).
3. Design solutions to concurrency problems within a kernel context (LO-3).
4. Communicate technical design decisions in a written report (LO-6).
5. Apply CS theory and fundamentals to a real systems implementation (mapped to ABET SO-1, SO-2, SO-6).

## Task

You will work in the provided xv6 fork (`xv6-fa26`).

### Required components

1. **Page replacement policy support.** Extend the xv6 page allocator to support at least two replacement policies: FIFO and an approximation of LRU (e.g., second-chance / clock). The active policy must be selectable at boot time via a kernel build flag.
2. **`pgfaultinfo()` system call.** Add a new system call that returns, for the calling process, the number of major page faults, minor page faults, and the number of pages swapped out since process start.
3. **Swap-to-disk path.** When physical memory is exhausted, the chosen replacement policy must evict a page to a backing store on disk. xv6 does not provide this out of the box — design and implement a simple swap area on the existing disk.
4. **Test program.** Write a user-space test program (`vmtest.c`) that allocates more memory than physical RAM, walks it in different access patterns (sequential, random, working-set), and uses `pgfaultinfo()` to print fault counts at the end of each pattern.
5. **Performance numbers.** Run your test under each replacement policy, on the same xv6 image, with at least three different memory pressures. Record fault counts and elapsed time.

### Written Report 2 (graded with this lab)

A 4–6 page technical report covering:

- **Design overview.** Diagram of how your VM extension fits into the xv6 kernel.
- **Concurrency.** Where you introduced locks, why, and what invariants they protect.
- **Policy comparison.** Table of fault counts and timing across the three memory pressures and two policies.
- **Discussion.** When does FIFO beat LRU? When does LRU beat FIFO? Why? Cite at least two passages in *Operating System Concepts* (Silberschatz et al., Ch. 9–10).
- **Limitations.** What didn't work, what you'd do differently with more time.

## Deliverables

A single tarball `lastname-cos431-lab4.tar.gz` containing:
- the modified xv6 source tree (with a `git log` patch series of your changes)
- `vmtest.c`
- `results.csv` with the raw measurements
- `report.pdf`

## Rubric (100 points total)

| Criterion | Points | Description |
|---|---|---|
| Replacement policies implemented correctly | 25 | Both FIFO and LRU-approximation work; selectable at boot; correct under stress. |
| `pgfaultinfo()` syscall | 10 | Syscall is wired through the kernel boundary correctly; counts are accurate. |
| Swap path | 15 | Pages evict to disk and are correctly reloaded on access; no data corruption. |
| Concurrency correctness | 10 | No race conditions or deadlocks introduced; locking strategy is justified in the report. |
| Test program and measurements | 10 | `vmtest.c` exercises sequential, random, and working-set patterns; results.csv is well-formed. |
| Report — design and concurrency | 15 | Diagram and concurrency discussion are clear and technically correct. |
| Report — analysis and citations | 10 | Policy comparison is supported by data; at least two textbook citations. |
| Submission completeness | 5 | Tarball is well-structured; xv6 builds and boots cleanly from a fresh checkout. |

## Submission

Upload to the course LMS by 11:59 PM ET on the due date. Late labs lose 10 points per day, no exceptions.
