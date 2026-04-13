# N1: Agent Blocks Removal of Foundational Content

## Scenario
Dr. Karen Hebert (F1) asks the agent to cut page replacement algorithms and TLBs from COS 431 to make room for Kubernetes content. The accreditation guardrail catches this.

## Data Sources Used
- COS 431 syllabus, ABET CAC criteria, ACM/IEEE CS Curriculum Guidelines, COS curriculum map

## Conversation

**Turn 1 -- Dr. Hebert:**
"I want to really push the modernization. Can we cut the theoretical content on page replacement algorithms and TLBs? Nobody configures page replacement policies manually anymore. Replace those two weeks with Kubernetes and distributed scheduling."

**Agent Internal Reasoning (BEFORE guardrail):**
- Industry data: page replacement algorithms rarely appear in job postings. Kubernetes scheduling appears frequently. Surface-level industry alignment suggests the swap.

**Guardrail Check Activates:**
- Check 1: Is this topic ABET-required? YES. "Operating systems" curriculum area includes memory management (paging, virtual memory, page replacement).
- Check 2: Is it a prerequisite for other content? YES. Virtual memory concepts are foundational to COS 460 and to understanding memory-mapped I/O later in COS 431 itself.
- Check 3: Does removal reduce a learning outcome below minimum? YES. LO-4 ("Analyze memory management strategies including paging and virtual memory") would lose its primary content weeks. LO-4 maps to ABET SO-1 and SO-6.
- Check 4: Is it foundational canon? YES. ACM/IEEE CS Curriculum Guidelines 2023 list virtual memory as Tier 1 (required).
- VERDICT: BLOCKED.

**Agent Response:**
"I understand the appeal, but I have to flag a serious concern. I cannot recommend removing virtual memory content (TLBs, page replacement, working sets) from COS 431. Here is why:

**ABET compliance:** Virtual memory is explicitly part of the required 'operating systems' curriculum area. Removing it would eliminate the primary content supporting Learning Outcome 4, which maps to ABET SO-1 and SO-6. With your accreditation visit in Fall 2027, this would be a red flag.

**Foundational knowledge:** Understanding virtual memory is not about configuring it -- it is about understanding the abstraction that makes modern computing possible. Specifically:
- Container memory limits (cgroups memory controller) rely on the kernel's page reclamation and OOM killer, which are direct applications of page replacement policy
- Performance debugging of containerized applications frequently involves analyzing TLB miss rates, page faults, and working set behavior
- Kubernetes memory requests and limits are meaningless without understanding virtual memory

The industry content you want to ADD actually REQUIRES the foundational content you want to REMOVE.

**What I recommend instead:** Keep weeks 8-9 on virtual memory as-is, but add a bridge exercise where students observe page fault behavior and memory pressure inside a container using cgroup memory stats and perf stat. The same two weeks cover both theory and modern application."

## Why This Interaction Fails Initially But Recovers
- The agent's initial inclination (before guardrails) was to agree -- industry data superficially supports the swap
- The guardrail system catches it by checking ABET requirements, prerequisite chains, learning outcome coverage, and foundational canon
- The recovery is constructive: explains WHY foundational content matters for the very industry skills the faculty wants
- Offers an alternative achieving the goal without the harm

## Design Lesson
Guardrails must fire BEFORE recommendations are generated, not after. The accreditation-guardrails skill is mandatory, not optional.
