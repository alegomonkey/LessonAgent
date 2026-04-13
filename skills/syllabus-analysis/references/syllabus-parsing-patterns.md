# Syllabus Parsing Patterns Reference

This reference provides heuristics, section header variations, and fallback strategies for extracting structured data from unstructured syllabus documents.

## Common Section Headers and Variations

Syllabi use inconsistent heading styles across institutions, departments, and individual faculty. The following table maps canonical section names to known variations. Match case-insensitively and use fuzzy matching where possible.

### Course Metadata

- "Course Title" / "Course Name" / "Title"
- "Course Number" / "Course Code" / "Course ID" / "CRN"
- "Semester" / "Term" / "Quarter" / "Session"
- "Instructor" / "Professor" / "Faculty" / "Lecturer" / "Taught by"
- "Credit Hours" / "Credits" / "Units" / "Credit Value"
- "Delivery Mode" / "Modality" / "Format" / "Instruction Mode"
- "Meeting Time" / "Class Schedule" / "When/Where" / "Room/Time"

### Course Description

- "Course Description" / "Description" / "Overview" / "Course Overview" / "About This Course" / "Catalog Description"

### Prerequisites

- "Prerequisites" / "Pre-requisites" / "Required Background" / "Prior Courses" / "Co-requisites" / "Prerequisite Knowledge" / "Assumed Knowledge"

### Learning Outcomes

- "Learning Outcomes" / "Course Objectives" / "Student Learning Outcomes" / "SLOs" / "Course Goals" / "Learning Goals" / "Objectives" / "What You Will Learn" / "Expected Competencies" / "Program Outcomes Addressed" / "Course-Level Outcomes"

### Weekly Schedule

- "Weekly Schedule" / "Course Schedule" / "Schedule" / "Calendar" / "Course Calendar" / "Tentative Schedule" / "Topic Schedule" / "Weekly Topics" / "Class Schedule" / "Session-by-Session" / "Module Schedule" / "Outline"

### Assessments

- "Assessments" / "Grading" / "Evaluation" / "Assignments" / "Grading Policy" / "Grade Breakdown" / "Assessment Plan" / "Graded Components" / "Coursework" / "Grading Criteria" / "How You Will Be Evaluated"

### Required Materials

- "Required Materials" / "Textbook" / "Textbooks" / "Required Texts" / "Course Materials" / "Books and Materials" / "Required Readings" / "Software Requirements" / "Technology Requirements"

### Policies

- "Policies" / "Course Policies" / "Academic Integrity" / "Attendance" / "Late Work" / "Accommodations" / "Disability Services" / "University Policies" / "Classroom Expectations" / "Code of Conduct"

## Heuristics for Extracting Structured Data from Freeform Text

### Detecting Section Boundaries

Apply these heuristics in priority order:

1. **Markdown headers**: lines beginning with `#`, `##`, or `###` are section headers. Use the header text to match against the variations above.
2. **All-caps lines**: a line in ALL CAPITALS that is not part of a paragraph is likely a section header. Example: `COURSE OBJECTIVES`.
3. **Bold or underlined text**: lines wrapped in `**bold**`, `__underline__`, or HTML `<b>` tags at the start of a block may be headers.
4. **Numbered section headers**: patterns like `1. Course Description` or `I. Learning Outcomes` or `Section 3: Grading`.
5. **Keyword anchoring**: if no explicit header is found, search for the keyword variations above appearing at the start of a paragraph or after a blank line.
6. **Colon-terminated labels**: lines ending with a colon followed by content on the next line, such as `Course Title:` or `Instructor:`.

### Extracting Learning Outcomes

Learning outcomes are typically presented as a list. Detect them using these patterns:

- **Numbered lists**: `1.`, `2.`, `3.` or `1)`, `2)`, `3)` at the start of lines.
- **Bulleted lists**: `-`, `*`, or unicode bullet characters at the start of lines.
- **Lettered lists**: `a.`, `b.`, `c.` or `a)`, `b)`, `c)`.
- **Implied lists**: consecutive sentences that each begin with a verb phrase (e.g., "Explain...", "Apply...", "Analyze...") even without explicit list markers.
- **Prefixed outcomes**: outcomes prefixed with codes like `[SLO-1]`, `(ABET a)`, or `LO1:`.

When extracting, preserve the original numbering or lettering scheme. If the outcomes contain embedded accreditation codes (e.g., `(ABET Student Outcome 1)`), extract the code separately and associate it with the outcome.

### Extracting the Weekly Schedule

Weekly schedules are often presented as tables or structured lists. Handle these formats:

- **Markdown tables**: parse the `|` delimited rows. The header row usually contains "Week", "Topic", "Readings", "Assignments Due" or similar.
- **Tab-delimited or space-aligned columns**: detect columns by consistent spacing patterns. Reconstruct as a table.
- **Headed blocks**: patterns like `Week 1: Introduction to X` followed by sub-items for readings and assignments.
- **Date-based entries**: entries keyed by date rather than week number. Convert to week numbers relative to the course start date if known.

### Extracting Assessments and Grade Weights

Look for percentage or point values associated with assessment names:

- **Percentage patterns**: `Midterm Exam: 25%`, `Final Project (30%)`, `Homework - 15%`.
- **Point patterns**: `Quizzes: 100 points`, `Labs (200 pts)`.
- **Table format**: a table with columns for assessment name, weight, and possibly due date.
- **Paragraph format**: weights embedded in prose, e.g., "Your grade will consist of a midterm exam worth 25%, a final exam worth 30%, and homework assignments worth 45%."

When weights are given in points, convert to percentages by dividing each by the total. If weights do not sum to 100% (or total points), flag this discrepancy.

## Handling Special Cases

### Embedded Accreditation Codes

Some syllabi embed accreditation codes directly in learning outcomes or the schedule. Common patterns:

- Parenthetical codes: `(ABET SO-1)`, `(AACSB: Analytical Thinking)`, `(ACS: Inorganic Chemistry)`.
- Bracketed codes: `[PLO-3]`, `[GenEd: Quantitative Reasoning]`.
- Inline references: `Addresses ABET Student Outcome 6`.

Extract these codes and store them as metadata on the associated learning outcome or topic. Do not discard them during parsing.

### Combined Schedule/Assessment Tables

Some syllabi present the weekly schedule and assessment due dates in a single table. When this occurs:

1. Parse the full table.
2. Split the data into two structures: the weekly topic schedule and the assessment list with due dates.
3. Cross-reference by week number so that downstream analysis can link topics to assessments.

### Multi-Section Syllabi

Some documents cover multiple sections of the same course with different instructors or meeting times but shared content. Detect this by looking for multiple instructor names or meeting time blocks. Parse the shared content once and note the section-specific variations.

### Syllabi with Appendices

Some syllabi attach rubrics, detailed project descriptions, or university policy boilerplate as appendices. Detect appendix markers ("Appendix A", "Attachment 1", "See attached rubric") and parse appendix content separately. Link rubrics to their corresponding assessments.

## Fallback Strategies When Sections Are Missing or Ambiguous

### Missing Learning Outcomes

If no learning outcomes section is found:

1. Search for verb-led sentences anywhere in the document that follow the pattern "Students will [verb] [object]" or "Upon completion, students will be able to [verb]."
2. Check whether the course description contains embedded outcomes.
3. If no outcomes can be extracted, flag this as a CRITICAL GAP in the audit report and ask the user to provide them manually.

### Missing Weekly Schedule

If no schedule is found:

1. Look for a topic list without dates or week numbers.
2. Check whether the textbook table of contents is referenced as the schedule ("We will cover Chapters 1-12 in order").
3. If no schedule can be inferred, flag this as a gap and proceed with the analysis using only learning outcomes and assessments.

### Missing Assessment Weights

If weights or points are not specified:

1. Check whether the syllabus says "equal weight" or "equally weighted."
2. Look for a grading scale (A/B/C/D/F with percentage ranges) that implies a points or percentage system exists even if individual weights are not listed.
3. If no weights can be determined, flag this as a gap. Do not assign assumed weights.

### Ambiguous Section Boundaries

If two sections appear to merge (e.g., learning outcomes flow directly into the schedule without a header):

1. Use content heuristics: learning outcomes typically begin with action verbs; schedule entries typically begin with dates, week numbers, or topic nouns.
2. Look for a transition phrase like "The course will cover the following topics:" as a boundary marker.
3. If ambiguity persists, present both possible interpretations to the user and ask for clarification.

### Severely Malformed Input

If the input is so garbled (e.g., poorly OCR'd PDF) that less than 50% of sections can be parsed:

1. Extract whatever is legible.
2. Present the partial parse with clear labels on what was and was not extracted.
3. Ask the user to provide the missing sections as plain text.
4. Do not fabricate content to fill gaps.
