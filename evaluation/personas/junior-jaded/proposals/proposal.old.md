# Proposal: Augmented Project 2 — Database Design and Normalization  
with Operational Automation Script and Version Control

Student: Jordan Reyes  
Course: INF 320 — Database Systems  
Assignment: Project 2: Database Design and Normalization  
Professor: Prof. M. Doyle  
Date Submitted: May 4, 2026



Summary

I am proposing to complete all original requirements for Project 2 in full, and to add
two small operational components: a shell automation script that runs database health
checks and generates a timestamped query report against the finished SQLite database,
and a Git version history that tracks each stage of the project from data analysis
through final submission. Every original deliverable, rubric criterion, and constraint
is preserved exactly as specified. The augmentation adds approximately four hours of
work beyond the original scope. My motivation is to use this project to practice
skills directly relevant to IT support and systems administration work — specifically,
the ability to write basic automation scripts and to track changes to technical
artifacts over time, pending your approval.



Section 1: Original Requirements Met

The table below maps every rubric criterion from the original assignment to a concrete
explanation of how the augmented version addresses it. No criterion is reduced,
replaced, or deferred.


Original Rubric Criterion	Points	How the Augmented Version Addresses It
Anomaly identification	10	report.md will identify at least three concrete anomalies (update, insertion, and deletion) in bookstore_flat.csv with specific row and field examples. The automation script and Git history are independent of this criterion and do not change it.
ERD correctness	15	erd.png will be produced using Crow's Foot notation, showing all entities, relationships, and cardinalities. No augmentation component modifies or replaces the ERD.
Normalization	20	All tables in schema.sql will be designed to at least Third Normal Form. report.md will justify each table's normal form explicitly. The shell script operates on the finished normalized schema — it does not alter the schema itself.
Schema implementation	20	schema.sql will include correct primary keys, foreign keys, NOT NULL constraints, and at least two CHECK constraints for SQLite. The schema will load cleanly without errors. db_report.sh runs against this schema as a read-only consumer.
Query correctness	15	queries.sql will contain all five required query types: single-table aggregate, two-table join, three-table join, GROUP BY + HAVING, and one query demonstrating a difficulty that would be anomaly-prone in the flat version. The automation script invokes one of these existing queries — it does not replace them or introduce new query requirements.
Report clarity	15	report.md will remain within the 1,000-word limit and will explain anomalies, design choices, normal form for each table, and one concrete trade-off to a non-database reader. The Git log will be appended as a brief addendum outside the word count, not embedded in the report body.
Submission completeness	5	All five original files (erd.png, schema.sql, load.sql, queries.sql, report.md) will be present in reyes-inf320-p2.zip, named exactly as specified. The two augmentation files (db_report.sh, git-log.txt) will also be included in the zip.


Section 2: Augmentation Components

Component A — db_report.sh: Operational Automation Script

What it is:  
A Bash shell script (~25–30 lines) that performs two tasks against the finished
SQLite database:


Health check: Runs SQLite's built-in PRAGMA integrity_check and

   PRAGMA foreign_key_check and prints a one-line DB OK or ERRORS FOUND
   status to the terminal.
Automated report: Runs the aggregate sales query from queries.sql and

   appends the results to a timestamped file (reports/YYYY-MM-DD.txt), creating
   the reports/ directory if it does not exist.
The script accepts the database file path as a command-line argument so it works
on any copy of the database.


Why it is career-relevant:  
Systems administrators and IT support staff routinely write small scripts to
automate repetitive operational tasks — nightly database health checks, scheduled
report generation, log-file rotation. This script is a minimal, real example of
that practice. It also directly exercises SQLite's administrative PRAGMA
commands, which are how a practitioner would verify database integrity after a
restore or migration.


Deliverable: db_report.sh — executable Bash script, commented, included in
the submission zip.



Component C — Git Version History

What it is:  
A Git repository initialized at the start of the project, with commits made at
each meaningful stage:


Initial commit: flat CSV analysis and anomaly notes

ERD draft complete

schema.sql running without errors in SQLite

load.sql ingesting data correctly

queries.sql — all five queries returning correct results

report.md first draft

db_report.sh added and tested

Final review and submission-ready state


A one-page git-log.txt (output of git log --oneline) will be included in the
submission zip to make the history visible to the grader without requiring a hosted
repository.
Why it is career-relevant:  
Version control is a standard professional practice in any role that produces
technical files — scripts, configuration files, SQL schemas, and documentation.
Tracking changes to a schema over the course of a project also reinforces a key
database concept from the course: that schema changes have consequences for
existing data, and that those changes should be deliberate and documented.


Deliverable: git-log.txt — plain-text commit history, included in the
submission zip.



Section 3: Complete Deliverables List

The following files will be submitted in reyes-inf320-p2.zip:


Original required files (unchanged):


erd.png — Crow's Foot ERD diagram

schema.sql — Normalized DDL for SQLite; PKs, FKs, NOT NULL, two CHECK constraints

load.sql — Data ingestion script (staging table approach)

queries.sql — Five required queries as specified in the assignment

report.md — Design report, ≤1,000 words


Augmentation files (additions only):
db_report.sh — Operational automation script (Component A)

git-log.txt — Version history (git log --oneline output) (Component C)



Section 4: Timeline

Working backward from the Week 9 deadline:


Milestone	Target	Component
CSV analysis complete; anomalies documented in notes	Week 6, end	Original
ERD drafted (erd.png)	Week 7, mid	Original
schema.sql running cleanly in SQLite	Week 7, end	Original
load.sql ingesting all rows without errors	Week 8, start	Original
queries.sql — all five queries returning correct results	Week 8, mid	Original
report.md first draft (anomalies, design, normalization, trade-off)	Week 8, end	Original
db_report.sh written, tested against loaded database	Week 9, start	Augmentation A
report.md final edit; confirm ≤1,000 words	Week 9, mid	Original
Final commits; git-log.txt exported	Week 9, mid	Augmentation C
Zip assembled and submitted	Week 9, by 11:59 PM ET	Both

Effort estimate:  
Original assignment: approximately 15–18 hours.  
Augmentation A (db_report.sh): approximately 2–3 hours.  
Augmentation C (Git commits + log): approximately 1 hour distributed across the project.  
Total augmentation overhead: approximately 3–4 hours (~20% above base).

Section 5: Career Rationale

My current career interest is IT support and systems administration. I work
part-time at a campus IT help desk, where I regularly troubleshoot issues with
applications that store data in databases. In that context, understanding how a
database is structured — what tables exist, what relationships they have, and what
constraints are enforced — is directly useful when a user reports data that looks
wrong or an application that behaves unexpectedly.


The two augmentation components address skills I am actively trying to build.
Shell scripting is a foundational sysadmin competency: most routine operational
tasks (backups, health checks, report generation) are automated through scripts,
and I am early in developing that skill. Writing db_report.sh as part of this
project gives me a concrete, working script tied to concepts I understand, which
is a more grounded way to learn than working through exercises disconnected from
any real artifact. Version control is a professional norm I have not yet built
into my academic work; using Git on this project establishes the habit in a
low-stakes setting before it matters in a workplace.


Both additions are proportional to the original assignment, require no resources
beyond what the assignment already uses (SQLite, a text editor, a terminal), and
produce professional-format deliverables rather than additional academic writing.


I recognize that this proposal requires your approval, and I am happy to adjust
the scope or format of either component if you have concerns. Thank you for your
consideration.



Proposal prepared with AssignmentAlly | INF 320 — Database Systems | Spring 2026