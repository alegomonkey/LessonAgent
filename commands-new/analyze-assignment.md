---
name: analyze-assignment
description: Parse a syllabus or assignment prompt to extract learning outcomes, rubric criteria, and format requirements into a structured assignment profile.
allowed-tools: Read, Grep, Glob
---

Invoke the assignment-analysis skill. If the user provides a file path, read it first. If the user pastes text, parse it directly. If a full syllabus is provided, ask which assignment to focus on before extracting.

Output the structured assignment profile and ask the student to confirm accuracy before proceeding to career alignment.
