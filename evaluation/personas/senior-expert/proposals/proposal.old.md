# Proposal: Augmented Lab 4 — Virtual Memory in xv6
RFC-Format Design Document · Statistical Benchmarking · Linux Kernel Parallels


Student: Chris Yamamoto
Course: COS 431 — Operating Systems
Assignment: Lab 4: Virtual Memory in xv6
Professor: Dr. Karen Hebert
Date Submitted: May 4, 2026



Summary

I am proposing to complete all original requirements for Lab 4 in full and layer three targeted additions on top: (1) restructure Written Report 2 as a technical engineering design document following the RFC format used at infrastructure software companies, preserving every required report section as a named subsection within the RFC structure; (2) run each vmtest.c benchmark configuration a minimum of five times and report mean, standard deviation, and 95% confidence intervals in results.csv, along with a brief methodology note describing the statistical controls applied and the production-grade profiling tools (e.g., perf, flamegraphs) that would supplement this analysis in a Linux environment; and (3) add a Linux Parallels section to the report (~1 page) that maps the xv6 implementation to the corresponding Linux kernel mechanisms — mm/vmscan.c, mm/swap.c, and arch/x86/mm/fault.c — and extends the required FIFO vs. LRU trade-off discussion to include TLB hit rate behavior and cache locality effects. The original rubric criteria are met in full; every addition is strictly a superset of the original requirements. I am also proposing to publish the final xv6 patch series as a public GitHub repository, pending your confirmation that this does not conflict with course academic integrity policy.



Original Requirements Met

Every criterion from the original rubric is addressed below. The augmented version does not remove, weaken, or substitute any requirement.


Original Rubric Criterion	Points	How the Augmented Version Addresses It
Replacement policies implemented correctly	25	FIFO and LRU-approximation (second-chance / clock) are implemented in xv6 as required, selectable at boot via build flag, and verified under memory stress. The Linux Parallels section additionally cites how Linux's mm/vmscan.c implements analogous reclaim logic — this is analysis in the report, not a substitution for the implementation.
pgfaultinfo() system call	10	The syscall is implemented exactly as specified: wired through the xv6 trap table and syscall dispatch, returning major fault count, minor fault count, and pages swapped out for the calling process. The benchmarking methodology note describes what a perf or eBPF-based equivalent would show in Linux, as supporting analysis only.
Swap path	15	A swap area is designed and implemented on the xv6 disk. The RFC's Alternatives Considered section documents the design choices evaluated (contiguous swap partition vs. swap map; eviction granularity) and justifies the selected approach — this enriches the required design rationale rather than replacing it.
Concurrency correctness	10	The required locking analysis is preserved as a dedicated subsection within the RFC Design section. It identifies every lock introduced, the invariant each protects, and the reasoning for the chosen granularity. The report's concurrency discussion is expanded, not abbreviated.
Test program and measurements	10	vmtest.c exercises all three required access patterns: sequential, random, and working-set. Each configuration is run N ≥ 5 times (rather than once). results.csv is extended to include per-run raw data, mean, standard deviation, and 95% confidence interval columns — a well-formed superset of the required format.
Report — design and concurrency	15	The RFC Design section contains the required kernel diagram and the full concurrency discussion. The Motivation and Goals / Non-Goals sections added by the RFC format provide framing context; the required content is fully present.
Report — analysis and citations	10	The required policy comparison table (fault counts + timing, ≥ 3 memory pressures, 2 policies) is present in the Evaluation section. The required ≥ 2 citations from Silberschatz et al. Ch. 9–10 are included. The hardware-cache locality extension and Linux Parallels section add supplementary citations that do not replace the required ones.
Submission completeness	5	The tarball contains all required elements: modified xv6 source tree with git log patch series, vmtest.c, results.csv, and report.pdf. The public GitHub repository is an additional artifact; the tarball submission to the LMS is unchanged.


Augmentation Components

Component A — RFC-Format Engineering Design Document

What it is: Written Report 2 is restructured to follow the technical engineering design document (RFC) format standard at infrastructure software companies. The RFC structure contains seven named sections:


Motivation — Why virtual memory extension is needed; what problem the lab addresses

Goals / Non-Goals — Explicit scope boundaries (e.g., "This design targets xv6's existing paging infrastructure; it does not address multi-processor TLB shootdown")

Design — Kernel architecture diagram; implementation details for page replacement, swap path, and system call; locking subsection (maps directly to the required design overview and concurrency discussion)

Alternatives Considered — Swap area design alternatives; LRU approximation variants considered; reasoning for chosen approaches

Evaluation — Policy comparison table with statistical results; discussion of when FIFO outperforms LRU and vice versa; textbook citations (maps directly to the required policy comparison and discussion)

Linux Parallels — Mapping of xv6 implementation to Linux kernel equivalents (see Component C)

Open Questions / Limitations — Maps directly to the required Limitations section


Every required report section (design overview, concurrency, policy comparison, discussion, limitations) is present within this structure. The RFC format adds Motivation, Goals/Non-Goals, Alternatives Considered, and Linux Parallels.
Why it is career-relevant: Engineering design documents and RFCs are the primary communication artifact on infrastructure teams at Google, Meta, Stripe, Cloudflare, and Anthropic. A senior engineer reviewing a new hire's work product expects this format. Writing one for a kernel implementation project produces a concrete portfolio artifact: a document an interviewer can read and evaluate on its technical merits.


Deliverable: report.pdf — complete RFC-format report, ≤ 8 pages



Component B — Statistical Benchmarking with Methodology Note

What it is: Each vmtest.c trial configuration (policy × memory pressure × access pattern) is run N ≥ 5 times instead of once. results.csv is extended to include per-run raw values alongside computed mean, standard deviation, and 95% confidence interval for fault counts and elapsed time. A half-page Benchmark Methodology subsection within the Evaluation section documents: (a) how many trials were run and why, (b) what sources of variance exist in the xv6 emulation environment, and (c) what production-grade tooling (perf stat, flamegraphs, strace) would supplement this analysis if the workload were running on Linux.


Why it is career-relevant: Infrastructure engineers at top-tier companies are expected to design performance experiments — not just execute them — and to distinguish signal from noise in measurements. The methodology note also demonstrates awareness of the production profiling ecosystem directly relevant to these roles.


Deliverable: Extended results.csv (per-run data + summary statistics) and Benchmark Methodology subsection in report.pdf



Component C — Linux Parallels Section

What it is: A ~1-page section in the report, titled Linux Parallels, that maps the xv6 implementation to the corresponding mechanisms in the Linux 6.x kernel:


xv6 mechanism	Linux equivalent	Key differences
Page fault handler	arch/x86/mm/fault.c → do_page_fault()	Linux distinguishes major/minor faults via VMA lookup; xv6 has no VMA abstraction
Page reclaim / replacement	mm/vmscan.c → shrink_page_list()	Linux uses a two-list LRU (active/inactive); our clock approximation is a single-list analog
Swap eviction	mm/swap.c, mm/swapfile.c	Linux swap supports multiple backing devices; xv6 swap area is a single contiguous partition
pgfaultinfo() syscall	/proc/[pid]/stat fields 9–12	Linux exposes fault counts via procfs rather than a per-process syscall

The section additionally extends the required FIFO vs. LRU trade-off discussion to include TLB behavior and spatial/temporal locality: why sequential access patterns show smaller policy differences (hardware prefetcher masks eviction cost), why random access amplifies FIFO's disadvantage (no temporal locality for the eviction oracle to exploit), and why the working-set pattern most closely approximates real production workloads.
Why it is career-relevant: The Linux Parallels section makes explicit and technical the connection between xv6 work and production kernel knowledge, demonstrating that the implementation reflects genuine understanding of how real systems work. It also develops the hardware-software interface competency — TLB, cache hierarchy, prefetcher behavior — expected in infrastructure engineering roles at this tier.


Deliverable: Linux Parallels section (~1 page) and extended trade-off discussion within report.pdf



Component D — Public GitHub Repository

What it is: The xv6 patch series is published as a public GitHub repository under a clearly labeled course project README. The repository contains: the full patch series as a clean, rebased commit history (one logical commit per feature: FIFO policy, clock-LRU policy, swap path, pgfaultinfo() syscall, vmtest.c); a README.md linking to report.pdf and summarizing the design; and build instructions for reproducing the xv6 image from a clean checkout.


Why it is career-relevant: A public repository with a clean patch series and a design document in the README is a direct portfolio artifact — linkable from a resume and readable by any infrastructure engineer evaluating the work. The commit history organization also demonstrates version control discipline consistent with Linux kernel patch submission conventions.


Deliverable: Public GitHub repository (link included in tarball README)


> Note: This component is proposed pending your confirmation that a public repository does not conflict with course academic integrity or intellectual property policy. If publication is not permitted, this component is withdrawn and the repository remains private.



Deliverables

yamamoto-cos431-lab4.tar.gz — Tarball containing all required and augmented components, uploaded to course LMS by 11:59 PM ET, end of Week 9

Modified xv6 source tree (xv6-fa26 fork) with a clean, rebased git log patch series organized as one logical commit per feature

vmtest.c — User-space test program exercising sequential, random, and working-set access patterns; uses pgfaultinfo() to report fault counts at the end of each pattern

results.csv — Raw per-trial measurements (N ≥ 5 runs per configuration) plus computed summary statistics (mean, SD, 95% CI) for fault counts and elapsed time across both policies and all memory pressure levels

report.pdf — RFC-format engineering design document (≤ 8 pages) containing all original required sections plus Motivation, Goals/Non-Goals, Alternatives Considered, Benchmark Methodology, and Linux Parallels

Public GitHub repository (pending approval) — Clean patch-series commit history with design document README and build instructions



Timeline

Week	Milestone	Component
Week 5 (current)	Submit proposal to Dr. Hebert; initialize GitHub repository; set up xv6-fa26 fork with build infrastructure; draft Motivation and Goals/Non-Goals sections	Proposal; Component D; Component A (initial sections)
Week 6	Implement FIFO page replacement policy; implement clock-LRU approximation; boot-time policy selection via build flag; begin swap area design	Original requirements (policies, swap design)
Week 6 end	Draft Alternatives Considered section documenting swap area and policy design choices evaluated	Component A (Alternatives Considered)
Week 7	Implement swap-to-disk path (eviction + reload); implement pgfaultinfo() syscall; verify correctness under memory pressure	Original requirements (swap path, syscall)
Week 7 end	Draft Design section (kernel diagram, locking analysis, implementation narrative)	Original requirements + Component A (Design section)
Week 8	Complete vmtest.c; run N ≥ 5 benchmark trials per configuration; compute summary statistics; draft Evaluation section with policy comparison table and trade-off discussion	Original requirements + Component B
Week 8 end	Write Linux Parallels section; extend trade-off discussion to TLB/cache locality; assemble complete report draft	Component C
Week 9	Final report revision and polish; clean up git commit history; verify xv6 builds from fresh checkout; assemble and test tarball; publish GitHub repository; submit by 11:59 PM ET	All components — final submission

Effort estimate: The original lab is estimated at 45–55 hours. The augmentation components add approximately 13–18 hours (RFC restructuring: 4h; statistical benchmarking and scripting: 4h; Linux Parallels and cache analysis: 4h; GitHub repository organization: 3–4h; methodology note: 2h). Total augmented effort: approximately 58–73 hours, or 25–35% above the original.

Career Rationale

My target career is infrastructure software engineering at a top-tier technology company, with a focus on large-scale distributed systems and systems software. Based on composite job posting analysis from AWS, Cloudflare, and Fastly (compiled March 2026), entry-level infrastructure SWE roles at this tier require demonstrated competency in operating systems concepts, systems programming, performance profiling methodology, and technical writing in the engineering design document format. The existing Lab 4 already delivers strongly on the first two — it is genuine kernel C work, and I intend to execute it as such. The three augmentation components address the remaining gaps directly: statistical benchmarking builds the performance engineering competency I am still developing; the RFC format produces the kind of written technical artifact I will be expected to produce on day one; and the Linux Parallels section converts the xv6 implementation into a demonstration of transferable kernel knowledge rather than familiarity with a teaching artifact.

I want to be clear about what I am not asking for: I am not requesting modified grading criteria, extra credit, or reduced requirements. I am asking permission to do the same assignment in a format that simultaneously meets all course learning outcomes and produces work I can develop professionally from. If you find this proposal acceptable, I will proceed exactly as described. If any component is not appropriate for this course context, I welcome your guidance on which to remove or modify.