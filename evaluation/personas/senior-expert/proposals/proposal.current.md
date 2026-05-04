# Augmented Assignment Proposal
COS 431 — Operating Systems: Lab 4 Virtual Memory in xv6

Student: Chris Yamamoto  
Course: COS 431 — Operating Systems  
Assignment: Lab 4: Virtual Memory in xv6  
Instructor: Dr. Karen Hebert  
Date: May 4, 2026



Summary

I am proposing to complete all original requirements of Lab 4 in full and include
one additional section in Written Report 2: a "Comparison to Production Linux VM
Subsystem" analysis that maps each of my xv6 implementation components to their
counterparts in the Linux kernel source tree. The section will identify the specific
files and functions in Linux that correspond to my page-replacement policy, swap
path, and fault-tracking syscall; discuss where xv6 simplifies relative to
production requirements; and describe what an extension toward production quality
would require. All original deliverables, rubric criteria, and grading standards
remain fully intact. The augmentation adds approximately 1–2 pages to the report
beyond the 4–6 page minimum and requires no changes to the tarball structure or
submission format. My motivation is to deepen my understanding of how the OS
concepts implemented in xv6 appear in a real production codebase — a skill central
to the infrastructure engineering career I am pursuing — pending your approval.



Original Requirements Met

Original Rubric Criterion	Points	How the Augmented Version Addresses It
Replacement policies implemented correctly	25	FIFO and LRU-approximation are implemented as specified, selectable at boot via kernel build flag, and tested under memory pressure. The Linux comparison section adds analysis of how these policies correspond to Linux's active/inactive LRU list management and the clock-based second-chance algorithm in mm/vmscan.c — it does not modify or substitute the required implementation.
pgfaultinfo() syscall	10	The syscall is implemented as specified, correctly wired through the kernel boundary with accurate major fault, minor fault, and swap-out counts. The comparison section notes analogous Linux per-process fault statistics in struct task_struct and /proc/[pid]/stat for context, but does not replace the required implementation.
Swap path	15	Pages evict to disk and reload on access without data corruption. The comparison section describes the equivalent Linux swap path (mm/swap_state.c, mm/swapfile.c) and explains the simplifications made in the xv6 design relative to Linux's swapcache and swap slot management, adding conceptual depth without changing the required implementation.
Concurrency correctness	10	No race conditions or deadlocks are introduced; the locking strategy is documented and its invariants justified in the report's required Concurrency section. The comparison section notes how Linux handles the equivalent concurrency concerns (e.g., zone->lru_lock, PG_locked page flags) as a point of comparison — no changes to implementation.
Test program and measurements	10	vmtest.c exercises sequential, random, and working-set access patterns; results.csv records fault counts and elapsed time across three memory pressures and both policies. Unchanged by the augmentation.
Report — design and concurrency	15	The required kernel architecture diagram and concurrency discussion appear as specified in their own sections. The Linux comparison is a distinct additional section and does not replace or compress the required design content.
Report — analysis and citations	10	The policy comparison table and discussion citing ≥2 passages from Silberschatz et al. (Ch. 9–10) appear as required. The Linux comparison section may cite supplementary primary sources (Linux kernel documentation, relevant LWN.net articles) but does not substitute them for the required textbook citations.
Submission completeness	5	The tarball structure is unchanged: modified xv6 source, vmtest.c, results.csv, and report.pdf. The augmented report is still delivered as report.pdf. The xv6 tree builds and boots cleanly from a fresh checkout.


Augmentation Components

Linux Kernel Comparison Section (added to Written Report 2)

What it is:  
A 1–2 page section in the report that maps my xv6 VM implementation to the
corresponding components in the Linux kernel source tree, using specific file and
function references. Coverage includes:


Page replacement: how the xv6 clock/second-chance approximation corresponds

  to Linux's active/inactive LRU list management and shrink_page_list() in
  mm/vmscan.c
Swap path: how my xv6 swap area design maps to Linux's swap slot allocation

  and swapcache in mm/swapfile.c and mm/swap_state.c
Fault tracking: how pgfaultinfo() relates to Linux's per-process fault

  statistics stored in struct task_struct and exposed via /proc
Simplifications and scale: what xv6 necessarily omits that a production

  kernel must handle — including NUMA awareness, transparent huge pages, cgroup
  memory pressure accounting, and swap priority lists
Why it is career-relevant:  
Entry-level infrastructure and systems software engineers are expected to read and
reason about production kernel source, not only write against kernel interfaces.
The ability to map conceptual understanding (from xv6) to production implementation
(in Linux) demonstrates a level of systems depth that is directly relevant to the
roles I am targeting.


Deliverable:  
1–2 additional pages in report.pdf, formatted consistently with the rest of the
report. No new files; no changes to the tarball structure.



Deliverables

Modified xv6 source tree with git log patch series — required, unchanged

vmtest.c — user-space test program — required, unchanged

results.csv — raw performance measurements — required, unchanged

report.pdf — Written Report 2, meeting the 4–6 page minimum for all required

   sections plus 1–2 additional pages for the Linux comparison section —
   augmented
All packaged as lastname-cos431-lab4.tar.gz uploaded to the course LMS —

   required, unchanged

Timeline

Target Week	Milestone	Component
Week 6	Page replacement implementation (FIFO + LRU-approx) complete	Original
Week 6	pgfaultinfo() syscall wired and tested	Original
Week 7	Swap-to-disk path complete; no data corruption under stress	Original
Week 7–8	vmtest.c complete; initial performance measurements collected	Original
Week 8	Read and annotate relevant Linux kernel source (mm/vmscan.c, mm/swapfile.c, mm/swap_state.c)	Augmentation
Week 8	Draft all required Written Report 2 sections	Original
Week 8–9	Draft and revise Linux comparison section	Augmentation
Week 9	Final review; integrate report; verify tarball builds cleanly	Original + Augmentation
End of Week 9	Submit lastname-cos431-lab4.tar.gz to LMS by 11:59 PM ET	Deadline


Career Rationale

I am pursuing new-grad software engineering positions in infrastructure and systems
software at companies including Google, Stripe, and Anthropic. These roles require
working at the level of production systems. While xv6 provides an invaluable
conceptual foundation, I want this lab to also demonstrate that I can bridge
learning-OS concepts and production implementation — specifically, that I can read
Linux kernel source and locate where the ideas I implemented in xv6 appear in a
real, shipping codebase.


The proposed comparison section develops this competency directly. Tracing how
Linux manages active and inactive LRU lists in mm/vmscan.c, and comparing that
design to my clock-based implementation in xv6, requires the same analytical skill
that systems engineers apply when diagnosing production incidents or evaluating
unfamiliar codebases. I believe this section will deepen my own understanding of
the material and produce a written artifact I can discuss concretely in technical
contexts.


I am not requesting any change to the grading rubric, point allocation, or
submission format. I am requesting permission to include this additional section
alongside all original deliverables, to be graded on the same rubric as the rest
of the report.