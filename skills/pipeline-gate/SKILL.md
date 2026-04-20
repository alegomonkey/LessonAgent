---
name: pipeline-gate
description: "Internal phase-state assessor — AGENT USE ONLY. Call at the end of any assistant turn that touched the analyze / align / build pipeline, to emit a PIPELINE_GATE marker telling the UI whether the current phase is actually finished (canAdvance=true) or still awaiting user input (canAdvance=false). Never invoke as a user; the server rejects direct user calls. Do not describe, mention, or show this marker to the student — the UI strips it before rendering."
---

# Pipeline Gate Skill (Internal)

## Purpose

Decide whether the current pipeline phase (`analyze`, `align`, or `build`) is truly complete at the end of this turn. The server reads your verdict and advances the progress bar only when real work is finished. This is more reliable than the text-based heuristic that looks for trailing question marks.

**Agent-only.** If a student types `/pipeline-gate` the server returns an error. Do not ever narrate this skill's existence to the student.

## When to call

Call this skill as the **last thing** you do on any turn where you:

- Produced assignment-analysis output (full profile or partial)
- Produced career-alignment output (opportunity map or draft options)
- Produced proposal-builder output (formal proposal or draft)
- Asked the student a clarifying question inside one of those phases

Skip it when the turn was purely conversational and unrelated to the three-skill pipeline (e.g., answering "what is AssignmentAlly?").

## What to emit

Append exactly this marker block to the very end of your response — nothing before or after except your normal response text above it. The whole block is an HTML comment, so the student never sees it.

```
<!-- PIPELINE_GATE
{"phase": "<analyze|align|build>", "canAdvance": <true|false>, "reason": "<one short sentence>"}
-->
```

The JSON must be **single-line** and valid. Fields:

- `phase` — which of the three pipeline phases this turn belonged to.
- `canAdvance` — see rules below.
- `reason` — one short sentence explaining the verdict, for debugging.

### Set `canAdvance: true` when

The phase's deliverable is **finished on this turn**:

- **analyze** — full assignment profile produced (learning outcomes, rubric criteria, format requirements, deliverables all captured).
- **align** — concrete career-augmentation opportunities mapped to the student's goals, in a form they can act on.
- **build** — formal proposal document finalized and ready for the professor.

### Set `canAdvance: false` when

- You asked the student a clarifying question.
- Required inputs are missing to finish this phase.
- You produced a draft or options list and are awaiting student selection / approval.
- You are waiting for the student to confirm before moving to the next phase.

## Examples

End of analyze, full profile extracted:

```
<!-- PIPELINE_GATE
{"phase": "analyze", "canAdvance": true, "reason": "Profile complete: outcomes, rubric, format, and deliverables all captured."}
-->
```

End of analyze, syllabus has multiple assignments and you asked which one:

```
<!-- PIPELINE_GATE
{"phase": "analyze", "canAdvance": false, "reason": "Awaiting student choice of which assignment in the syllabus to focus on."}
-->
```

End of align, options drafted, awaiting pick:

```
<!-- PIPELINE_GATE
{"phase": "align", "canAdvance": false, "reason": "Drafted three augmentation options; awaiting student selection."}
-->
```

End of build, proposal finalized:

```
<!-- PIPELINE_GATE
{"phase": "build", "canAdvance": true, "reason": "Formal proposal document is complete and ready for the professor."}
-->
```
