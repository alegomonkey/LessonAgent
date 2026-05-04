# Proposal: Augmented Assignment 3 — Number-Guessing Game with Professional Code Structure
Student: Maya Patel
Course: COS 125 — Introduction to Problem Solving with Computer Programming
Assignment: Assignment 3: Number-Guessing Game in Python
Professor: Prof. R. Alvarez
Date: May 4, 2026



Summary

I am writing to propose a modest augmentation to Assignment 3 that preserves every
original requirement while adding two professional practices I am working to develop:
function decomposition and version control. Specifically, I propose to organize my
guess.py into named functions with docstrings rather than a single procedural script,
and to track my development in a Git repository with a meaningful commit history. Both
the original guess.py and writeup.md will be submitted in full via the required
patel-guess.zip, with the three required writeup points addressed as specified. The
augmentation adds approximately 90 minutes of extra work to an assignment I estimate
will take three to four hours — well within a proportional range — and produces habits
I intend to carry through every programming course that follows.



Section 1: Original Requirements Met

Original Rubric Criterion	Points	How the Augmented Version Addresses It
Correctness	35	All game mechanics are fully preserved: generate_secret() picks a random integer between 1 and 100, the loop in play_game() collects guesses and calls evaluate_guess() to return "too high", "too low", or "correct", the game stops at a correct guess or after 7 attempts, and the final message with guess count is printed. Refactoring into functions changes the structure of the code, not its behavior.
Input handling	15	Input validation is handled in a dedicated validate_input() function that catches empty and non-numeric input and returns a friendly error message without crashing. Extracting this logic into a named function makes the validation behavior more explicit, not less complete.
Control flow clarity	15	The while loop and if/elif/else blocks are preserved exactly as the assignment requires — organized into play_game() and evaluate_guess() respectively. Separating them into functions eliminates any risk of copy-pasted logic and makes the control flow easier to trace. No single block performs more than one logical task.
Style	10	Variable and function names are descriptive and self-documenting (secret_number, guess_count, validate_input). Each function carries a one-line docstring in place of a section comment, which satisfies the intent of "one short comment per non-obvious section" while following Python convention. Indentation is consistent throughout.
Writeup	15	writeup.md addresses all three required points: how the game flow works, where if statements versus loops are used, and one thing I found tricky. Two additional short paragraphs — one describing the function boundaries I chose and why, one describing my commit history — bring the writeup to approximately 480 words, within the 500-word ceiling.
Submission completeness	10	Both guess.py and writeup.md are submitted on time in patel-guess.zip via the course LMS. The GitHub repository is referenced in the writeup as supplementary context but is not a replacement for the zip submission.


Section 2: Augmentation Components

Component A — Git Version Control


What it is: A GitHub repository tracking the project from setup through completion,

  with 4–6 commits that each represent a logical development step (e.g., "Add random
  number generation and game skeleton," "Add input validation," "Refactor into functions
  with docstrings," "Add guess counter and end message").
Why it is career-relevant: Version control is a foundational skill for any

  professional software role. Building the habit of making meaningful, well-labeled
  commits on a small project is the right time to learn it — before the stakes are higher.
Deliverable: A public GitHub repository. The URL and a description of the commit

  structure are included in writeup.md.
Component B — Function Decomposition and Docstrings


What it is: guess.py is organized into named functions — generate_secret(),

  validate_input(raw), evaluate_guess(secret, guess), play_game(), and main() —
  each with a one-line docstring and an if __name__ == "__main__": entry point.
Why it is career-relevant: Professional Python code — in software teams and data

  science alike — is organized into functions that each do one thing. Learning this
  structure in an introductory course means my code is already readable to anyone who
  might collaborate with me, and it makes the program easier to extend or debug.
Deliverable: The refactored guess.py, submitted in the required zip. The writeup

  includes one paragraph explaining why I drew the function boundaries where I did.

Section 3: Full Deliverables List

guess.py — Python source file, organized into named functions with docstrings,

   implementing all required game mechanics. Submitted in patel-guess.zip.
writeup.md — Markdown file, ≤500 words, covering the three required points

   (game flow, if vs. loops, one tricky thing) plus two additional paragraphs on function
   design and commit history. Submitted in patel-guess.zip.
patel-guess.zip — Single zip containing both files above, uploaded to the course

   LMS by 11:59 PM ET on the due date.
GitHub repository (supplementary, not a replacement for the zip) — Public

   repository with commit history. URL included in writeup.md for reference only.

Section 4: Timeline

By	Milestone	Component
May 6 (Wed)	Create GitHub repo; first commit with guess.py skeleton	Augmentation A
May 8 (Fri)	Complete core game logic: random number, guessing loop, feedback, end message	Original
May 9 (Sat)	Add input validation; commit	Original + Aug. A
May 11 (Mon)	Refactor into named functions with docstrings; verify all game behavior preserved	Augmentation B
May 12 (Tue)	Draft writeup.md covering three required points	Original
May 13 (Wed)	Add function-design and commit-history paragraphs to writeup; word count check	Aug. A + B
May 14 (Thu)	Final review, polish, package patel-guess.zip	Original
May 15 (Fri)	Submit to LMS by 11:59 PM ET	Original


Section 5: Career Rationale

My career goal is to work in software and technology, and I hope eventually to build
something of my own. I chose this augmentation because both skills — version control
and function organization — are among the first things a professional software team
would expect a new contributor to know, and neither is taught explicitly in introductory
coursework. Every internship posting I have looked at for software roles lists Git as a
requirement. Industry data from the data science field similarly lists "reproducible
research" practices — including Git — among preferred qualifications even for analytical
roles.


Function decomposition is equally fundamental: code that does not exist in named,
purposeful units is hard for anyone else to read, review, or build on. Learning to
structure code this way now — even in a 50-line program — is the right time to develop
the habit, before the programs are large enough that disorganization becomes a real
problem.


Both augmentations are additive. They do not ask for modifications to the grading
criteria, additional points, or an extension to the deadline. I am asking only for your
approval to submit a guess.py organized into functions and to describe my version
control practice in my writeup, while meeting every original requirement in full.


Thank you for your consideration. I am happy to discuss this proposal or adjust it
based on your feedback.


— Maya Patel