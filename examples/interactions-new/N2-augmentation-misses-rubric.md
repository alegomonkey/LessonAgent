# N2: Augmented Version Misses a Rubric Criterion

## Scenario
Emily Tran proposes augmenting COS 431 Lab 6 (pair project: extending the xv6 shell) by replacing the pair component with an individual container networking project. The augmented version sounds impressive but drops the teamwork criterion.

## Data Sources Used
- Student profile (data/users/student-tran.json)
- COS 431 syllabus (data/syllabi/cos431-operating-systems.md)

## Conversation

**Turn 1 — Emily:**
"For Lab 6 — the pair project extending the xv6 shell — I'd rather build a container networking tool in C on my own. Something that sets up network namespaces for process isolation. That's way more relevant to my career than extending a teaching OS shell."

**Agent Internal Reasoning:**
- Parse Lab 6: PAIR project (specifically designed for ABET SO-5 = teamwork), extends xv6 shell, 30% pair contribution weighting + 70% technical implementation.
- Lab 6 is the ONLY assessment in COS 431 that assesses teamwork (SO-5).
- Emily's proposal: replace pair xv6 project with individual container tool.
- TWO problems:
  1. Drops the pair component → no teamwork assessment → rubric criterion MISSED.
  2. Replaces the original lab rather than augmenting it → violates "augment, don't replace."

**Agent Response:**
"I like the ambition, but this proposal has two problems I need to flag before we go further.

**Problem 1: Missed rubric criterion.**
Lab 6 is a pair project — it's specifically designed to assess teamwork. It's the only lab in COS 431 with a collaboration component. Your proposal replaces that with individual work:

| Original Criterion | Your Proposal | Status |
|---|---|---|
| Technical implementation (70%) | Container networking tool in C | MET — different content, comparable depth |
| Pair collaboration (30%) | Working alone | **MISSED** — no teamwork assessment |

**Problem 2: Replacement, not augmentation.**
Your proposal replaces the xv6 shell extension with a container networking tool. The original xv6 work wouldn't be completed. Augmentation means doing the original PLUS adding depth — not swapping one project for another.

**Two ways to fix this:**

**Option A (recommended):** Complete the pair xv6 shell project as assigned, then add a 1-2 page individual appendix analyzing how the shell concepts (pipes, file descriptors, process spawning) connect to container networking. You and your partner do the original lab together; your appendix is the augmented individual component.
- Original: fully preserved, pair collaboration intact
- Augmentation: individual comparative analysis connecting xv6 to Linux containers
- Additional effort: ~3-4 hours

**Option B:** Propose a pair container networking project — you and your partner build it together. This preserves the teamwork criterion but replaces the xv6 shell content. You'd need to show Dr. Hebert that the shell concepts (process creation, I/O redirection, signal handling) are still exercised through the networking tool.
- Original: content shifted but teamwork preserved
- Risk: Dr. Hebert may not approve because the xv6 shell extension exercises specific course concepts

Which direction interests you?"

---

**Turn 2 — Emily:**
"I didn't realize the pair component was a rubric criterion. Option A makes more sense — I don't want to risk Dr. Hebert saying no because I skipped the xv6 work."

**Agent Response:**
"Smart call. Option A is the path of least resistance because the original lab is fully completed — Dr. Hebert has nothing to object to.

Let me build the rubric compliance table:

| Original Criterion | Pts | How Augmented Version Addresses It | Status |
|---|---|---|---|
| Technical implementation (shell extension) | 70 | Unchanged. Pair xv6 shell extension completed per original spec. | FULLY MET |
| Pair collaboration | 30 | Unchanged. Both partners contribute to the xv6 shell work. Peer evaluation submitted. | FULLY MET |

**Augmentation (individual, additive):**
- 1-2 page appendix: How would the shell features you implemented (pipes, file descriptors, process spawning) work differently in a container context using Linux namespaces?
- Brief code sketch (pseudocode or annotated C) showing how namespace system calls would replace xv6 equivalents.

Both rubric criteria are met. The appendix is purely additional. Want me to build the full proposal?"

## Why This Interaction Succeeds (System) Despite Initial Failure (Student)
- Catches the rubric miss BEFORE the student brings a flawed proposal to the professor
- Shows EXACTLY which criterion would be missed with a compliance table
- Identifies the "replace vs. augment" problem — a second violation beyond the rubric miss
- Doesn't just say "no" — offers two concrete alternatives with trade-offs
- Student self-selects the safer option with understanding of why
- Final compliance table is clean: both criteria MET, augmentation clearly additive

## Design Lesson
The rubric compliance table is the system's primary guardrail. Every criterion from the original assignment must appear in it. If any criterion shows MISSED, the proposal is not ready — adjust the augmentation design before proceeding. This is the student-facing equivalent of the old accreditation-guardrails skill.
