# N3: Unknown Discipline / Career Path

## Scenario
A marine sciences student pursuing a career in aquaculture uses the agent. The agent has no aquaculture industry data in its system.

## Data Sources Used
- CHE 360 syllabus (data/syllabi/che360-thermodynamics.md)
- Industry data search: no match for aquaculture
- Career taxonomy search: no match for marine sciences

## Conversation

**Turn 1 — Student:**
"I'm a marine sciences major taking CHE 360 as a required course. I want to go into aquaculture — specifically, developing sustainable fish farming systems for the Maine coast. Can you help me augment the group project?"

**Agent Internal Reasoning:**
- Search industry data: no aquaculture job data in `data/industry/`.
- Search career taxonomy: no marine sciences or aquaculture entry in `references/career-taxonomy.md`.
- CHE 360 group project: "open-ended thermodynamic analysis of a real system" — flexible enough for an aquaculture topic.
- The student likely knows more about aquaculture competency requirements than the agent does.
- Must be transparent about the data gap and collaborate rather than guess.

**Agent Response:**
"I want to be upfront: I don't have aquaculture or marine sciences industry data in my system, so I can't do the career competency mapping I normally would. I don't want to guess about what aquaculture employers need — I'd rather get it right.

**What I can do:**
1. Parse the CHE 360 group project requirements and rubric — that part works the same regardless of your career path.
2. Help you structure an augmented version that applies thermo concepts to an aquaculture system. I know the thermodynamics side even if I don't know the aquaculture side.
3. Build the rubric compliance table and proposal format.

**What I need from you:**
- What thermodynamic processes are important in aquaculture? I'd guess heat exchange in water systems, dissolved gas equilibrium, maybe temperature control — but you'd know better.
- What do aquaculture employers look for that involves thermodynamics or process engineering?

With that information from you, I handle the proposal structure, rubric compliance, and CHE 360 framing. You handle the aquaculture domain knowledge.

What thermo concepts matter most in your field?"

---

**Turn 2 — Student:**
"Heat exchange is huge. Recirculating aquaculture systems need to maintain water temperature, and energy costs are the biggest operating expense. Also dissolved gas equilibrium — oxygen and CO2 at different temperatures affect fish health."

**Agent Internal Reasoning:**
- Now have enough to map to CHE 360 content:
  - Heat exchange → energy balances (Weeks 2-3), heat of mixing
  - Temperature control → first law for open systems (Week 3)
  - Dissolved gas equilibrium → Henry's Law, VLE concepts (Weeks 9-10)
  - Energy costs → thermodynamic efficiency analysis (Week 14)
- Can now build a real augmentation direction.

**Agent Response:**
"Now I can work with this. Here's how it maps to CHE 360:

**Assignment profile:** Group project, open-ended thermodynamic analysis of a real system. Rubric: SO-1 (analyze), SO-2 (design approach), SO-5 (teamwork).

**Thermodynamic mapping:**
| Aquaculture Concept | CHE 360 Topics | Course Weeks |
|---|---|---|
| Heat exchanger for water temp control | Energy balances, first law for open systems | Weeks 2-3 |
| Dissolved O2/CO2 at varying temps | Henry's Law, VLE, phase equilibrium | Weeks 9-10 |
| Energy cost optimization | Thermodynamic efficiency, COP | Weeks 13-14 |
| Refrigerant selection for chillers | Equations of state, property calculations | Weeks 7-8 |

**Augmentation direction:**
- Standard analysis: model heat exchange in a recirculating aquaculture system (RAS) — energy balance for maintaining 15°C water temperature in a Maine coastal facility where intake water varies 2°C to 18°C seasonally
- Apply Henry's Law to predict dissolved oxygen levels at operating temperature
- Compare chiller options using thermodynamic efficiency analysis
- Use NIST data for seawater properties where available

This hits content from at least four different course sections and connects to a real Maine industry. The rubric criteria (analysis, design, teamwork) are fully compatible.

I still can't tell you whether this is what aquaculture employers specifically look for — you'll write the career rationale section based on your domain knowledge. But I can handle the proposal structure, rubric proof, and thermodynamic framing.

Ready to build the proposal?"

---

**Turn 3 — Student:**
"Yeah. For the career rationale, I can describe what I've seen at the Darling Marine Center — they're always talking about energy costs for their RAS systems."

**Agent Response:**
"Use that firsthand experience. A career rationale that references real conversations at the Darling Marine Center is more credible than any job posting data I could provide.

Here's how I'll structure the proposal:

### Original Requirements Met
[Full rubric compliance table — SO-1 analysis via heat exchange and dissolved gas modeling, SO-2 design via chiller selection, SO-5 teamwork unchanged]

### Augmentation Components
- NIST seawater property data comparison (model vs. real data)
- Seasonal energy cost analysis for Maine coastal conditions
- Connection to Darling Marine Center RAS operations

### Career Rationale
[You draft this section — describe the energy cost challenge in aquaculture RAS systems, cite your Darling Marine Center experience, and explain how thermodynamic analysis skills apply directly]

I'll format everything into the 7-section proposal. You review and fill in the career rationale. Sound good?"

## Why This Interaction Degrades Gracefully
- Transparent immediately about the missing data — no hedging, no guessing
- Clearly separates what the agent CAN do (rubric compliance, proposal structure, thermo mapping) from what it CANNOT (aquaculture career competencies)
- Asks the student to fill the knowledge gap collaboratively — treats them as the domain expert
- Still produces a fully structured, rubric-compliant proposal
- Does NOT hallucinate aquaculture industry requirements or fake competency data
- The student's firsthand experience (Darling Marine Center) ends up being more credible than generic job posting data would have been

## Design Lesson
Honest degradation is always better than hallucinated recommendations. When data is insufficient:
1. Say so immediately and specifically (what data is missing)
2. Separate what works from what doesn't
3. Collaborate — the student may have domain knowledge the agent lacks
4. The proposal structure, rubric compliance table, and formatting work regardless of career path
