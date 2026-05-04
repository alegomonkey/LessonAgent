
Student	Jordan Reyes
Course	INF 320 — Database Systems
Assignment	Project 2: Database Design and Normalization
Professor	Prof. M. Doyle
Date Submitted	May 4, 2026


Summary

I am proposing to complete all original requirements of Project 2 in full — including the ERD, all five SQL deliverables, and the written report — and to add four career-relevant extensions: additional operational diagnostic queries, a data dictionary, a version-controlled development history via GitHub, and an automated setup script. These additions require approximately 4–5 hours of additional work beyond the original project scope. I am currently employed part-time at the campus IT help desk and am pursuing a career in IT support and systems administration; each addition develops a competency (version control, scripting, technical documentation, diagnostic SQL) that appears consistently in entry-level sysadmin job descriptions. All original rubric criteria remain fully intact. This proposal adds depth to the existing work — nothing is removed or substituted.



Section 1: Original Requirements Met

Original Rubric Criterion	Points	How the Augmented Version Addresses It
Anomaly identification	10	report.md will identify at least three concrete anomalies — update, insertion, and deletion — with specific row-level examples drawn from bookstore_flat.csv. The data dictionary will cross-reference which constraints were added to prevent each anomaly type, reinforcing rather than replacing the report analysis.
ERD correctness	15	erd.png will be produced in Crow's Foot notation, showing all entities, relationships, and cardinalities accurately. The data dictionary supplements the ERD with column-level detail but does not replace or modify it.
Normalization	20	All tables will be normalized to at least 3NF. report.md will justify the normal form for each table. The data dictionary will include a normal form designation per table as a cross-reference, not a substitute for the report's written justification.
Schema implementation	20	schema.sql will include all required primary keys, foreign keys, NOT NULL constraints, and at least two CHECK constraints. The setup.sh script will run schema.sql and load.sql together against a clean SQLite instance to confirm the schema loads without errors — providing a reproducibility check on top of the original requirement.
Query correctness	15	queries.sql will contain all five required query types: single-table aggregate, two-table join, three-table join, GROUP BY + HAVING, and a query demonstrating the advantage of the normalized structure over the flat file. The operational queries are clearly labeled as a separate addition and do not substitute for any required type.
Report clarity	15	report.md will address all four required topics — anomalies found, design choices, normal form justification, and trade-off discussion — within the 1,000-word limit. The data dictionary is a separate file and does not count toward or encroach on the report's word count.
Submission completeness	5	All five original files (erd.png, schema.sql, load.sql, queries.sql, report.md) will be present in reyes-inf320-p2.zip with the exact names specified. The augmentation files (data_dictionary.md, setup.sh) will be included in the same ZIP. The GitHub repository link will appear in report.md as a supplementary reference only.


Section 2: Augmentation Components

A — Operational and Diagnostic Queries

What it is: 2–3 additional SQL queries appended to queries.sql in a clearly labeled section ("OPERATIONAL QUERIES"). Each query includes a one-line comment explaining the real-world problem it diagnoses — for example: identifying customers with open orders that reference no matching book record, detecting books that have never been ordered, or flagging duplicate customer entries that may have survived the ETL load.


Why it matters for my career: IT administrators regularly write ad-hoc SQL against production databases to investigate problems. These queries reflect that diagnostic mindset and the kind of work I already encounter at the help desk.


Deliverable: Labeled queries appended to queries.sql.



B — Data Dictionary

What it is: A new file data_dictionary.md with one section per database table. Each section lists every column's name, data type, constraint(s), and a plain-English description of what the column represents.


Why it matters for my career: Data dictionaries are standard handoff documentation in IT environments — what an admin writes when turning a system over to another team member or documenting a database for a runbook.


Deliverable: data_dictionary.md (approximately 1–2 pages).



C — Version-Controlled Development via GitHub

What it is: The entire project developed inside a Git repository, with commits at meaningful stages: initial ERD, first schema draft, normalization passes, finalized schema with constraints, ETL load script, and queries. The ZIP submitted to the LMS will be generated from the repository.


Why it matters for my career: Git is a core tool in sysadmin and IT infrastructure work, particularly for managing schema files and configuration-as-code. Demonstrating version-controlled development of a schema mirrors real production database workflow.


Deliverable: Public GitHub repository; link included in report.md. ZIP submitted to LMS as required.



D — Automated Setup Script

What it is: A setup.sh Bash script that runs schema.sql then load.sql in sequence against a local SQLite instance, checks exit codes, and prints a brief confirmation (e.g., "Schema created. X rows loaded. No errors.").


Why it matters for my career: Entry-level sysadmin roles expect basic shell scripting and reproducible environment setup. A setup script demonstrates that the project can be stood up reliably on a fresh machine — a practical standard in any IT environment.


Deliverable: setup.sh, included in the ZIP.



Section 3: Complete Deliverables List

Original (all preserved with original filenames)

erd.png — Entity-Relationship Diagram in Crow's Foot notation

schema.sql — DDL with PKs, FKs, NOT NULL constraints, and ≥2 CHECK constraints

load.sql — ETL script to ingest bookstore_flat.csv into normalized tables

queries.sql — Five required query types + clearly labeled operational queries

report.md — Design report (≤1,000 words) covering anomalies, design choices, normal forms, and trade-off


Augmentation Additions

data_dictionary.md — Column-level documentation for each table

setup.sh — Bash script for automated SQLite schema creation and data load

GitHub repository link — included inline in report.md


All files submitted as reyes-inf320-p2.zip to the course LMS by the Week 9 deadline.

Section 4: Timeline

Date	Milestone	Component
May 4	Initialize Git repo; set up SQLite locally; first pass through bookstore_flat.csv	Git setup; anomaly identification begins
May 6	ERD complete; functional dependencies and anomalies documented	erd.png; anomaly notes for report.md
May 8	schema.sql complete with all constraints	Schema implementation
May 9	load.sql complete; data loads cleanly in SQLite; setup.sh tested	ETL script + automation script
May 11	All five required queries complete; operational queries drafted	queries.sql
May 13	report.md and data_dictionary.md complete	Written deliverables
May 14	Full ZIP tested; GitHub link confirmed; final review	Submission completeness check
May 15	Submit reyes-inf320-p2.zip to LMS by 11:59 PM ET	Final submission


Section 5: Career Rationale

I am pursuing a career in IT support and systems administration, a path I have been building toward through part-time work at the campus IT help desk. Entry-level sysadmin roles consistently require four competencies that the original Project 2 does not fully address: version control of configuration and schema files, basic shell scripting for environment automation, formal database documentation, and diagnostic SQL judgment. Each augmentation in this proposal targets one of those gaps directly.


The original project already develops the SQL and relational modeling skills that sysadmins use daily when working with ticketing systems, asset management tools, and user directories. The bookstore normalization scenario is also a common real-world task: organizations regularly maintain operational data in flat spreadsheets, and an IT professional is often the one asked to migrate that data into a proper relational structure. By framing the deliverables to reflect professional documentation and tooling standards — a data dictionary, a reproducible setup script, a version-controlled schema history — I can produce work that demonstrates both academic mastery and practical readiness.


I am not requesting any change to the grading rubric or point allocation. I am asking, pending your approval, to complete the same project with additional depth graded on the same criteria.