# AssignmentAlly

A web app that helps students build augmented versions of their coursework — richer, career-connected assignments that meet all original learning goals and rubric criteria, plus add meaningful depth.

AssignmentAlly produces formal proposal documents that students present to professors for approval. The professor is not a user of this system; the professor is the audience for the student's proposal.

## How It Works

AssignmentAlly follows a three-step pipeline:

1. **Analyze** — Parse a syllabus or assignment prompt to extract learning outcomes, rubric criteria, and format requirements into a structured assignment profile.
2. **Align** — Map your career goals to assignment outcomes and identify concrete augmentation opportunities.
3. **Build** — Generate a formal 7-section augmented assignment proposal with rubric compliance proof, ready for professor review.

Each step builds on the previous one. The analysis informs the alignment, and both feed into the final proposal.

## Prerequisites

- **Node.js** 22+
- An **Anthropic API key** set in a `.env` file at the project root:
  ```
  API_KEY=sk-ant-...
  ```

## Setup

Create a new file named `.env` at the project root and enter your key:
```
API_KEY=sk-ant-...
```

In your terminal: 
```bash
npm install
```

## Running the App

Start the development server:

```bash
npm run dev
```

Click the link in your terminal or 
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Getting Started

1. **Fill out your profile** — Enter your name, major, year, career goals, and the course you're working on. This helps the agent tailor its suggestions to your background.
2. **Chat with the agent** — Once you're in, you'll see a conversational interface. Tell the agent about your assignment, or use the quick-action buttons to step through the pipeline:
   - **Analyze Assignment** — Share your syllabus or assignment prompt and the agent will break it down
   - **Align Career Goals** — The agent maps your career goals to the assignment and suggests augmentations
   - **Build Proposal** — The agent drafts a formal proposal document you can present to your professor
3. **Iterate** — The conversation is persistent within your session. Ask follow-up questions, adjust the proposal, or explore different augmentation ideas.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
CLAUDE.md                          # Agent identity, safety principles, workflow
.claude-plugin/plugin.json         # Plugin manifest

src/                               # Backend (Claude Agent SDK + Express)
  server.ts                        # Web server, session management, SSE streaming
  config.ts                        # SDK options and tool permissions
  hooks.ts                         # Safety hooks
  types.ts                         # Shared types

public/                            # Frontend (served as static files)
  index.html                       # Single-page app: onboarding + chat
  styles.css                       # Styling
  app.js                           # Client-side logic

skills/                            # Three-skill pipeline
  assignment-analysis/SKILL.md     # Step 1: parse assignments
  career-alignment/SKILL.md        # Step 2: map career goals
  proposal-builder/SKILL.md        # Step 3: generate proposals

commands/                          # User-invokable commands
  analyze-assignment.md
  align-career.md
  build-proposal.md

agents/                            # Specialist subagents
  assignment-analyzer.md           # Parsing specialist
  career-matcher.md                # Career alignment specialist
  proposal-writer.md               # Proposal writing specialist

data/
  users/                           # Student and faculty profiles
  syllabi/                         # Course documents
  industry/                        # Job postings, competency frameworks

examples/
  interactions/                    # Reference conversations (positive and negative)
  outputs/                         # Sample skill outputs
```

## Safety Principles

1. **Rubric compliance is non-negotiable.** Every augmented assignment must meet all original rubric criteria.
2. **Augment, don't reduce.** The augmented version is a superset — it does everything the original requires, plus more.
3. **Propose, don't mandate.** The agent drafts proposals. The professor has final authority.
4. **Honest about limitations.** When data about a field or career path is missing, the agent says so rather than guessing.

## Built With

- [Claude Agent SDK](https://docs.anthropic.com/en/docs/agents/agent-sdk) — Anthropic's SDK for building autonomous agents
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — Skills, commands, and agent definitions
- [Express](https://expressjs.com/) — Web server

## Authors

Clark LaChance, Johnny Sylvain, Zach Narcotta
