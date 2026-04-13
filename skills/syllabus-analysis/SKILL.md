---
name: syllabus-analysis
description: "This skill should be used when the user asks to 'analyze a syllabus', 'audit course materials', 'parse a syllabus', 'check learning outcomes', 'review course objectives', 'compare syllabus to standards', 'extract topics from a syllabus', or mentions syllabus parsing, course auditing, learning outcome extraction, or Bloom's taxonomy classification."
---

# Syllabus Analysis Skill

## Purpose

Parse uploaded syllabi into structured components, classify learning outcomes by Bloom's taxonomy level, map assessments to accreditation standards, and identify coverage gaps. This skill transforms unstructured syllabus documents into a comprehensive audit report that reveals the pedagogical architecture of a course, highlights alignment between stated objectives and actual assessments, and surfaces any accreditation or industry coverage deficiencies. The audit report serves as the foundational data layer that downstream skills (goal-alignment, recommendation-generation) depend on for producing actionable insights.

## When This Skill Applies

Invoke this skill when any of the following conditions hold:

- A faculty member uploads a syllabus document (PDF, markdown, pasted text, or file path) and requests analysis.
- A user asks for a "course audit" or "syllabus review" in any phrasing.
- A user wants to understand learning outcome alignment, Bloom's taxonomy distribution, or assessment coverage before making changes.
- Another skill (such as goal-alignment or recommendation-generation) requires structured syllabus data and none exists yet for the target course.
- A user asks to compare a syllabus against accreditation standards or industry benchmarks.

Do not invoke this skill when the user is asking for changes or recommendations directly. Complete the audit first, then hand off to the recommendation-generation skill.

## Core Workflow

Follow these steps in order. Do not skip steps unless the user explicitly requests a partial analysis.

### Step 1: Parse Syllabus Sections

Extract the following components from the uploaded syllabus document:

- **Course Metadata**: course title, course number, semester/year, instructor name, credit hours, delivery mode (in-person, online, hybrid).
- **Course Description**: the catalog description or equivalent introductory paragraph.
- **Prerequisites**: any required prior courses, co-requisites, or assumed knowledge.
- **Learning Outcomes**: every stated learning outcome, student learning outcome, course objective, or goal. Preserve the original numbering scheme.
- **Weekly Schedule**: the week-by-week or module-by-module topic sequence, including readings and activities listed for each week.
- **Assessments**: every graded component with its weight, due date (if available), and brief description. Include exams, assignments, projects, participation, and any other graded items.
- **Required Materials**: textbooks, software, hardware, access codes, or other required purchases.
- **Policies**: attendance, late work, academic integrity, accessibility, and other policy statements.

Use the parsing heuristics defined in `references/syllabus-parsing-patterns.md` to identify section boundaries. When a section header is ambiguous or missing, flag it in the output and ask the user for clarification rather than guessing.

### Step 2: Classify Learning Outcomes by Bloom's Taxonomy

For each extracted learning outcome, perform the following:

1. Identify the primary action verb in the outcome statement.
2. Match the verb against the Bloom's Revised Taxonomy classification table in `references/bloom-taxonomy.md`.
3. Check whether the surrounding context modifies the verb's default classification. For example, "demonstrate understanding of X" is Understand level, while "demonstrate the ability to build X" is Apply or Create level depending on specifics.
4. Assign a Bloom's level: Remember, Understand, Apply, Analyze, Evaluate, or Create.
5. Tag the cognitive domain and any relevant subdomain (e.g., "Apply: procedural knowledge").

Produce a distribution summary showing the count and percentage of learning outcomes at each Bloom's level. Flag courses that cluster heavily at Remember/Understand levels (more than 60% of outcomes) as potentially under-challenging, and flag courses with more than 40% at Evaluate/Create with no scaffolding at lower levels as potentially lacking prerequisite skill-building.

### Step 3: Map Assessments to Learning Outcomes

For each assessment item, determine which learning outcomes it measures. Construct a mapping table with assessments as rows and learning outcomes as columns, marking each cell as PRIMARY (the assessment directly measures the LO), SECONDARY (the assessment tangentially touches the LO), or BLANK (no connection).

After constructing the mapping, identify:

- **Unassessed outcomes**: learning outcomes with no PRIMARY assessment. These represent promises the syllabus makes but does not verify.
- **Single-point-of-failure outcomes**: learning outcomes measured by only one assessment. If a student performs poorly on that single assessment, there is no recovery opportunity for that outcome.
- **Over-assessed outcomes**: learning outcomes measured by three or more PRIMARY assessments, which may indicate redundancy or could confirm thorough assessment depending on context.

### Step 4: Cross-Reference Against Accreditation Standards

Determine the course's program affiliation (e.g., ABET for engineering, AACSB for business, ACS for chemistry). Load the relevant accreditation standards from `data/accreditation/` based on the program identifier.

For each required accreditation standard or student outcome:

1. Check whether at least one course learning outcome maps to it with STRONG alignment.
2. Check whether at least one assessment measures that learning outcome.
3. Flag any accreditation standard that has no corresponding learning outcome as an ACCREDITATION GAP.
4. Flag any accreditation standard that has a matching learning outcome but no assessment as an ASSESSMENT GAP.

If accreditation data is unavailable for the program, note this in the report and skip to Step 5.

### Step 5: Analyze Weekly Schedule for Content Gaps

Compare the weekly schedule topics against three sources:

1. **Accreditation requirements**: topics mandated by the accrediting body that do not appear in any week.
2. **Industry benchmarks**: load relevant industry skill frameworks from `data/industry/` and identify commonly expected topics that are absent. For example, a software engineering course missing version control, or a statistics course missing any mention of reproducibility.
3. **Internal consistency**: topics referenced in learning outcomes that never appear in the weekly schedule, or topics that appear in the schedule but connect to no learning outcome.

Produce a gap list organized by source (accreditation, industry, internal consistency).

### Step 6: Produce Structured Audit Report

Assemble the final audit report with the following sections in order:

1. **Course Metadata**: all extracted metadata fields.
2. **Learning Outcomes Analysis**: each learning outcome listed with its Bloom's level, cognitive domain tags, and the assessments mapped to it. Include the Bloom's distribution summary.
3. **Weekly Schedule Map**: the weekly topic sequence annotated with which learning outcomes each week addresses.
4. **Assessment Breakdown**: weight distribution across assessment types (exams, projects, homework, participation, etc.), type distribution (formative vs. summative), and the assessment-to-outcome mapping table.
5. **Gap Analysis**: three subsections for accreditation gaps, industry gaps, and assessment gaps (unassessed outcomes, single-point-of-failure outcomes).
6. **Recommendations Summary**: a brief (3-5 bullet) summary of the most critical findings. Do not propose specific changes here; instead, note what the goal-alignment and recommendation-generation skills can do with this data.

## Handling Different Input Formats

The syllabus may arrive in several forms. Handle each adaptively as follows:

- **Markdown text**: parse directly using section headers (lines beginning with `#`, `##`, or bold text) as section delimiters. Markdown is the cleanest input format and typically requires no preprocessing.
- **Pasted plain text**: use the heuristics in `references/syllabus-parsing-patterns.md` to detect section boundaries from capitalized headers, numbered sections, or keyword matches. Apply the keyword anchoring strategy when no explicit headers are present: scan for known section keywords (e.g., "prerequisite," "objective," "grading") appearing at the start of paragraphs.
- **PDF-extracted text**: expect formatting artifacts such as broken lines, missing whitespace, garbled tables, and header/footer repetition on every page. Apply cleanup heuristics before parsing: rejoin broken lines, remove repeated headers and page numbers, and reconstruct tables from positional cues. If a table is detected (e.g., the weekly schedule), attempt to reconstruct rows and columns from alignment patterns in the raw text.
- **File path reference**: read the file at the given path using the Read tool. Determine the format from the file extension and contents, then apply the appropriate parsing strategy from the options above.
- **HTML or LMS export**: some syllabi arrive as HTML exported from an LMS (Canvas, Blackboard, Moodle). Strip HTML tags, preserve list structure and table formatting, and parse the resulting text. Pay attention to LMS-generated boilerplate (e.g., auto-inserted accessibility statements) and separate it from instructor-authored content.

If the input is severely malformed or sections cannot be reliably identified, present what was successfully parsed and list the sections that could not be extracted. Ask the user to provide those sections manually rather than fabricating content.

## Important Constraints

Adhere to the following constraints strictly:

- **Analysis only**: this skill produces an audit report. It does not propose changes, suggest new assignments, or recommend restructuring. If the user asks for changes during analysis, complete the audit first, then inform the user that the recommendation-generation skill can produce actionable changes based on the audit.
- **Preserve original language**: when quoting learning outcomes or assessment descriptions, use the exact language from the syllabus. Do not paraphrase or "improve" the wording in the audit.
- **Flag uncertainty**: if a classification or mapping is uncertain (e.g., a verb could indicate two different Bloom's levels), note both possibilities and the reasoning. Do not silently choose one.
- **No assumptions about quality**: report findings neutrally. A course with all Bloom's Level 1 outcomes is not "bad"; it may be an introductory survey course where that distribution is appropriate. Present the data; let the user and downstream skills interpret it.
- **Data persistence**: store the structured audit output in `data/syllabi/` under the course identifier so that other skills can load it without re-parsing.
- **Scope boundaries**: do not analyze course materials beyond the syllabus itself (e.g., do not evaluate the quality of linked readings, the rigor of referenced textbooks, or the appropriateness of software tools). The audit is limited to the information contained in the syllabus document. If the user wants deeper analysis of specific materials, that requires a separate review process.

## Reference Files

Consult the following reference files during execution:

- `references/bloom-taxonomy.md` -- contains the full Bloom's Revised Taxonomy classification table, verb lists for each level, example outcomes, recommended assessment types per level, and a decision tree for handling ambiguous verbs.
- `references/syllabus-parsing-patterns.md` -- contains common section header variations, parsing heuristics for freeform text, strategies for handling different list formats (numbered, bulleted, lettered), approaches for embedded accreditation codes, and fallback strategies when sections are missing or ambiguous.
