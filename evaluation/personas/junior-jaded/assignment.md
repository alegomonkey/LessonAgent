# INF 320 Project 2: Database Design and Normalization

**Course:** INF 320 — Database Systems
**Instructor:** Prof. M. Doyle
**Due:** End of Week 9
**Weight:** 20% of final grade

## Context

A small regional bookstore chain has shared a spreadsheet of how it currently tracks orders, inventory, and customers. The spreadsheet is a single flat sheet — every row contains customer info, order info, and book info repeated together. Your job is to take that flat data and design a normalized relational database for it, implement the schema in SQL, and write a short report explaining your design decisions.

You will be given `bookstore_flat.csv` (≈400 rows, 14 columns) at the start of the assignment.

## Learning Outcomes

By completing this assignment you will be able to:

1. Identify functional dependencies in flat tabular data.
2. Apply normalization rules through Third Normal Form (3NF).
3. Translate an Entity-Relationship Diagram (ERD) into a relational schema.
4. Implement a schema in SQL DDL with appropriate primary keys, foreign keys, and constraints.
5. Write SQL queries that join across normalized tables.
6. Communicate database design decisions in writing to a non-database audience.

## Task

1. Analyze `bookstore_flat.csv` and identify functional dependencies and update/insertion/deletion anomalies.
2. Produce an ERD (any standard notation: Crow's Foot, Chen, or UML) showing entities, relationships, cardinalities.
3. Write `schema.sql` that creates the normalized tables in PostgreSQL or SQLite. Include primary keys, foreign keys, NOT NULL where appropriate, and at least two CHECK constraints.
4. Write `load.sql` that ingests `bookstore_flat.csv` into your normalized tables. Use any reasonable approach (staging table is fine).
5. Write `queries.sql` containing at least five queries that demonstrate the design works:
   - one single-table aggregate
   - one two-table join
   - one three-table join
   - one query using GROUP BY + HAVING
   - one query that would be hard or anomaly-prone in the flat version
6. Write `report.md` (≤1000 words) explaining: the anomalies you found in the flat data, your design choices, what normal form each table is in, and one trade-off you made.

## Deliverables

A single zip `lastname-inf320-p2.zip` containing:
- `erd.png` (or `.pdf`)
- `schema.sql`
- `load.sql`
- `queries.sql`
- `report.md`

## Rubric (100 points total)

| Criterion | Points | Description |
|---|---|---|
| Anomaly identification | 10 | Report identifies at least three concrete anomalies in the flat data with examples. |
| ERD correctness | 15 | Entities, relationships, and cardinalities accurately model the domain. |
| Normalization | 20 | All tables are in at least 3NF; report justifies the form for each table. |
| Schema implementation | 20 | DDL includes correct PKs, FKs, and constraints; loads cleanly without errors. |
| Query correctness | 15 | All five queries return correct results on the loaded data. |
| Report clarity | 15 | Report communicates design decisions to a non-database reader; trade-off discussion is concrete. |
| Submission completeness | 5 | All required files present, named as specified, in a single zip. |

## Submission

Upload to the course LMS by 11:59 PM ET on the due date.
