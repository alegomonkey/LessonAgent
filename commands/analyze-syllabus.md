---
name: analyze-syllabus
description: Parse and audit a syllabus document for structure, learning outcomes, assessment alignment, and accreditation coverage
argument-hint: "<path-to-syllabus> [--accreditation abet|aacsb|gen-ed]"
allowed-tools: ["Read", "Grep", "Glob", "Bash", "Agent"]
---

# /analyze-syllabus

Perform a comprehensive audit of a course syllabus.

## Arguments
- **path-to-syllabus** (required): Path to the syllabus file, or "paste" to accept pasted text
- **--accreditation** (optional): Accreditation framework to check against. Options: `abet` (ABET-CAC for CS), `aacsb` (AACSB for business), `gen-ed` (UMaine General Education). If omitted, infer from the course department.

## Execution Steps

1. **Load the syllabus**: Read the file at the provided path. If the user says "paste", prompt them to paste the syllabus text.

2. **Parse sections**: Extract course metadata, learning outcomes, weekly schedule, assessments, and required materials. Use the heuristics in `skills/syllabus-analysis/references/syllabus-parsing-patterns.md`.

3. **Classify learning outcomes**: For each learning outcome, identify the Bloom's taxonomy level using `skills/syllabus-analysis/references/bloom-taxonomy.md`. Record the primary verb and assigned level.

4. **Map assessments to outcomes**: Create an assessment-outcome matrix. Flag any learning outcomes with no assessment mapping (coverage gap) or only one assessment mapping (single point of failure).

5. **Check accreditation alignment**: Load the relevant accreditation data from `data/accreditation/`. For each required standard or outcome, check whether the syllabus provides coverage and assessment evidence.

6. **Identify gaps**: Compare against industry benchmarks in `data/industry/` to identify topics or skills absent from the syllabus that are commonly expected.

7. **Produce the audit report**: Present findings in a structured format:
   - Course Metadata summary
   - Learning Outcomes table (LO number, text, Bloom level, assessments mapped, accreditation SOs mapped)
   - Assessment Breakdown (weight distribution, type distribution)
   - Gap Analysis (accreditation gaps, industry gaps, assessment coverage gaps)
   - Summary of strengths and areas for improvement

8. **Suggest next steps**: After presenting the audit, ask whether the user wants to:
   - Run a career goal alignment analysis (`/align-goals`)
   - Generate modernization recommendations (`/generate-recommendations`)
   - Explore a specific gap in more detail
