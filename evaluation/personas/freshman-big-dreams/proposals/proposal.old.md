# Proposal: Augmented Assignment 3 — Number-Guessing Game with Version Control and User-Centered Reflection

Student: Maya Patel
Course: COS 125 — Introduction to Problem Solving with Computer Programming
Assignment: Assignment 3 — Number-Guessing Game in Python
Professor: Prof. R. Alvarez
Date: May 4, 2026



Summary

I am proposing to complete Assignment 3 in full — writing guess.py and writeup.md exactly as specified — while adding two lightweight augmentations that connect the work to my goal of building technology products. First, I will track my development process using Git and publish my code to a public GitHub repository, practicing version control as I code. Second, I will expand my writeup to explain design choices through the lens of user experience and include a brief reflection on how I would improve the program in a second iteration. Both augmentations are additive: the original deliverables and all six rubric criteria are fully preserved. I am requesting your approval to include these additions before I begin.



Original Requirements Met

Original Rubric Criterion	Points	How the Augmented Version Addresses It
Correctness	35	guess.py implements all five required mechanics unchanged: random integer 1–100, repeated guessing loop, "too high" / "too low" / "correct" feedback, stop at correct answer or 7 attempts, and final guess count with a friendly message. The augmentations do not touch the program logic.
Input Handling	15	The program handles empty and non-numeric input with a friendly error message, as required. Committing code incrementally to Git actually supports this — I will have a record of testing edge cases during development.
Control Flow Clarity	15	Loops and conditionals are used as required; no copy-pasted blocks. The user-centered writeup explicitly explains where if statements versus loops were used (one of the three required points), which reinforces rather than weakens this criterion.
Style	10	Variable names are readable, non-obvious sections are commented, and indentation is consistent throughout. Having a public GitHub repository provides an additional reason to keep the code clean — but does not relax any style requirement.
Writeup	15	writeup.md covers all three required points within ≤500 words: (1) how the game flow works, (2) where if statements vs. loops were used, and (3) one thing I found tricky. The user-experience framing and v2 paragraph are woven into or appended after these required points — they do not replace or shorten them. If the extended content risks the word count, I will place it in a clearly labeled appendix below the main writeup.
Submission Completeness	10	Both guess.py and writeup.md will be submitted on time in patel-guess.zip via the LMS. The GitHub repository is a supplementary artifact, not a substitute for the zip submission.

All six rubric criteria are fully addressed. No original requirement is weakened or removed.

Augmentation Components

Component 1 — Git Version Control Practice


What it is: I will initialize a Git repository for this assignment from day one and make 3–5 meaningful commits as I build — for example, one when the basic loop works, one after adding input validation, one after cleaning up style. The finished repository will be published publicly on GitHub.

Why it is career-relevant: Version control is a foundational skill for any software role and the starting point of a professional portfolio. Starting this practice in week 6 of my first semester means my GitHub profile will have four years of history by graduation.

Deliverable: A link to the public repository, included as one sentence at the end of writeup.md. For example: "Development history is available at github.com/mayapatel/cos125-guess."


Component 2 — User-Centered Writeup with v2 Reflection
What it is: Within writeup.md, I will frame my design decisions around the player's experience — explaining not just what the code does but why each choice is right for the person using it. I will also add a 3–4 sentence paragraph treating this as a v1 and noting what I would improve in a second iteration.

Why it is career-relevant: Building products people want requires thinking about users, not just compilers. The habit of asking "why is this the right choice for the user?" is core to product and startup thinking. Practicing it on a small assignment builds the reflex early.

Deliverable: The same writeup.md, with user-experience framing integrated into the required three points and a short "v2 ideas" paragraph at the end (or in an appendix if needed).


Component 3 — Personal Career Framing (2–3 sentences)
What it is: Two or three sentences at the close of the writeup, in my own voice, connecting this assignment to my goal of building technology products.

Why it is career-relevant: Making an explicit connection between coursework and future goals is a habit I want to build deliberately, starting now.

Deliverable: Part of writeup.md, after the v2 paragraph.



Deliverables

guess.py — Python source file implementing all five required game mechanics, with readable variable names and comments. (Submitted in zip.)

writeup.md — Markdown document, ≤500 words in the main body, covering all three required points with user-centered framing; v2 paragraph; 2–3 sentence career connection; one-sentence GitHub link. (Submitted in zip.)

patel-guess.zip — Zip file containing both files above, submitted to the LMS by 11:59 PM ET on the Week 6 due date. (Required submission — unchanged.)

GitHub Repository — Public repository with 3–5 meaningful commits showing development progress. (Supplementary; not a substitute for the zip.)



Timeline

Date	Milestone	Component
May 5	Set up GitHub account and repository; write initial game loop (picks number, accepts one guess, prints feedback)	Component 1 + Original
May 7	Add 7-attempt limit and win/lose end messages; commit progress	Original — Correctness
May 9	Add input validation for empty and non-numeric input; commit	Original — Input Handling
May 11	Polish style: readable variable names, comments, consistent indentation; commit	Original — Style
May 13	Write first draft of writeup.md covering all three required points	Original — Writeup
May 15	Revise writeup: add user-experience framing, v2 paragraph, and career framing sentences; add GitHub link	Components 2 & 3
May 16	Final review: verify all rubric criteria are met; assemble zip	All
May 18	Submit patel-guess.zip to LMS by 11:59 PM ET	Submission Completeness


Career Rationale

My goal is to found a technology company. I know that is a broad ambition — I am a freshman and I do not yet know what problem I will solve. What I do know is that technical founders need to be able to build things, and building things professionally means working with tools and habits that go beyond making code run on one machine. Version control is one of those habits. Every software company — from a two-person startup to a public company — uses Git. Starting a GitHub profile now, even with a small guessing game, means that by the time I am building something that matters, the habit is already ingrained and the portfolio already exists.


The user-experience framing in the writeup connects to something I noticed while working through this assignment: the programs that change the world are the ones people actually want to use, not just the ones that technically work. That lesson is already embedded in the assignment — the 15 points for input handling are really asking "does your program treat the user respectfully when they do something unexpected?" I want to make that implicit lesson explicit in my writeup, because I think it is one of the most important ideas in this course for someone who wants to build consumer products.


I recognize that this proposal asks for no changes to the grading rubric, and I am not requesting extra credit or modified assessment criteria. I am asking only for your permission to go a bit further than the minimum — and to document that I did so. Thank you for your time in reading this.


— Maya Patel