# COS 125 Assignment 3: Number-Guessing Game in Python

**Course:** COS 125 — Introduction to Problem Solving with Computer Programming
**Instructor:** Prof. R. Alvarez
**Due:** Week 6 (two weeks from release)
**Weight:** 5% of final grade

## Context

This assignment introduces you to control flow, user input, and basic program structure in Python. You will build a small interactive program from scratch and submit your code along with a short writeup describing how it works.

## Learning Outcomes

By completing this assignment you will be able to:

1. Use `input()` and `print()` to interact with a user in the terminal.
2. Convert between data types (string ↔ integer) and validate user input.
3. Use `if`/`elif`/`else` and `while` loops to control program flow.
4. Use Python's `random` module to generate values.
5. Write a short, clear technical description of your own code.

## Task

Write a Python program (`guess.py`) that:

1. Picks a random integer between 1 and 100 (inclusive).
2. Repeatedly asks the user to guess the number.
3. After each guess, prints `"too high"`, `"too low"`, or `"correct"`.
4. Stops when the user guesses correctly, or after 7 attempts (whichever comes first).
5. At the end of the game, prints the number of guesses used and a friendly message.

## Deliverables

1. `guess.py` — your Python source file.
2. `writeup.md` — a one-page (≤500 words) description of your program covering: how the game flow works, where you used `if` statements vs. loops, and one thing you found tricky.

## Rubric (100 points total)

| Criterion | Points | Description |
|---|---|---|
| Correctness | 35 | Program plays the game correctly: random number, comparison feedback, win/lose conditions. |
| Input handling | 15 | Program does not crash on empty input or non-numeric input; gives a friendly error message. |
| Control flow clarity | 15 | Loops and conditionals are used appropriately; no copy-pasted blocks that could be a loop. |
| Style | 10 | Variable names readable; one short comment per non-obvious section; consistent indentation. |
| Writeup | 15 | Writeup explains the program clearly to a peer; addresses the three required points. |
| Submission completeness | 10 | Both files submitted on time, in a single zip named `lastname-guess.zip`. |

## Submission

Upload `lastname-guess.zip` to the course LMS by 11:59 PM ET on the due date.
