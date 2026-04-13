# Bloom's Revised Taxonomy Reference

This reference defines the six cognitive levels of Bloom's Revised Taxonomy (Anderson and Krathwohl, 2001), provides verb lists for classification, and includes a decision tree for resolving ambiguous cases.

## The Six Cognitive Levels

The levels are listed from lowest cognitive complexity to highest. Each level subsumes the levels below it.

---

### Level 1: Remember

**Definition**: Retrieve relevant knowledge from long-term memory. Recognize or recall facts, terms, basic concepts, or answers without necessarily understanding what they mean.

**Key Verbs**: define, list, name, identify, recall, recognize, state, label, match, memorize, reproduce, describe (when used as "describe from memory")

**Example Learning Outcome**: "List the five phases of the software development lifecycle."

**Best Assessment Types**: Multiple-choice recognition tests, matching exercises, fill-in-the-blank, flashcard-based quizzes, labeling diagrams from memory.

---

### Level 2: Understand

**Definition**: Construct meaning from instructional messages, including oral, written, and graphic communication. Demonstrate comprehension by interpreting, exemplifying, classifying, summarizing, inferring, comparing, or explaining.

**Key Verbs**: explain, summarize, paraphrase, interpret, classify, compare, contrast, describe (when used as "describe in your own words"), discuss, distinguish, illustrate, predict, translate

**Example Learning Outcome**: "Explain the difference between supervised and unsupervised machine learning algorithms."

**Best Assessment Types**: Short-answer explanations, concept maps, compare-and-contrast essays, "explain in your own words" prompts, prediction exercises, classification tasks.

---

### Level 3: Apply

**Definition**: Carry out or use a procedure in a given situation. Execute a known procedure on a familiar task, or implement a procedure on an unfamiliar task.

**Key Verbs**: apply, use, implement, execute, solve, demonstrate (when performing a procedure), calculate, compute, operate, practice, construct (when following instructions), modify (when applying a known modification)

**Example Learning Outcome**: "Apply the Newton-Raphson method to find the roots of a nonlinear equation."

**Best Assessment Types**: Problem sets with known solution methods, laboratory procedures, coding exercises implementing a specified algorithm, worked examples with variations, simulations.

---

### Level 4: Analyze

**Definition**: Break material into its constituent parts and determine how the parts relate to one another and to an overall structure or purpose. Differentiate relevant from irrelevant information, organize components, and attribute underlying purpose or point of view.

**Key Verbs**: analyze, differentiate, organize, attribute, deconstruct, examine, investigate, compare (when structural), contrast (when structural), diagram, dissect, distinguish (structural), outline, test (as in "test a hypothesis"), correlate, categorize (when requiring judgment)

**Example Learning Outcome**: "Analyze a given database schema to identify normalization violations and their potential impact on data integrity."

**Best Assessment Types**: Case study analysis, debugging exercises, code review tasks, data analysis assignments, comparative analyses requiring structural reasoning, research critiques.

---

### Level 5: Evaluate

**Definition**: Make judgments based on criteria and standards. Critique, assess, or justify a decision, solution, or approach.

**Key Verbs**: evaluate, judge, critique, justify, defend, assess, argue, prioritize, rank, rate, recommend (when based on criteria), appraise, validate, review (when assessing quality), select (when justifying choice among alternatives)

**Example Learning Outcome**: "Evaluate competing software architectures for a given set of requirements and justify the recommended approach."

**Best Assessment Types**: Peer review assignments, rubric-based critiques, design defense presentations, written justifications, comparative evaluations with explicit criteria, literature reviews requiring quality assessment.

---

### Level 6: Create

**Definition**: Put elements together to form a coherent or functional whole. Reorganize elements into a new pattern or structure. Generate, plan, or produce an original work.

**Key Verbs**: create, design, develop, generate, produce, plan, compose, construct (when original), formulate, synthesize, invent, propose (a novel solution), author, build (an original artifact), integrate (into a new whole), devise

**Example Learning Outcome**: "Design and implement an original RESTful API that integrates at least two external data sources."

**Best Assessment Types**: Capstone projects, original research papers, design projects, portfolio construction, creative assignments, system design tasks, open-ended programming projects, thesis work.

---

## Classification Decision Tree

Use this decision tree to classify a learning outcome:

1. **Identify the primary verb.** Find the main action verb in the learning outcome statement. Ignore auxiliary verbs ("will be able to") and focus on the operative verb.

2. **Match the verb to a level.** Consult the verb lists above. If the verb appears in exactly one level, tentatively assign that level.

3. **Check contextual modifiers.** Read the full outcome statement. Determine whether the context raises or lowers the cognitive demand:
   - Does the outcome specify "from memory" or "without references"? This may lower it to Remember.
   - Does the outcome require the student to produce something original? This may raise it to Create.
   - Does the outcome ask for judgment, justification, or critique? This may raise it to Evaluate.
   - Does the outcome require breaking something into parts? This may raise it to Analyze.

4. **Resolve ambiguity.** If the verb appears in multiple levels or the context is unclear:
   - Look at what the student produces. A product (essay, code, design) suggests Apply or higher. A list or label suggests Remember.
   - Look at the cognitive demand. Reproducing a known procedure is Apply. Adapting a procedure to a new situation is Analyze or higher.
   - When genuinely ambiguous, assign the level that best matches the assessment context (if known) and note the ambiguity.

5. **Assign the final level.** Record the level, the primary verb, and any contextual reasoning that influenced the classification.

## Common Misclassifications

The following verbs are frequently misclassified. Use these notes to avoid errors.

### "Demonstrate"

- **As Apply**: "Demonstrate the ability to configure a network switch using CLI commands." The student performs a procedure. This is Apply.
- **As Understand**: "Demonstrate understanding of object-oriented principles by explaining them to a peer." The operative cognition is explaining, which is Understand. The word "demonstrate" here means "show evidence of."
- **Resolution**: Look at what follows "demonstrate." If it is followed by a procedure or skill, classify as Apply. If followed by "understanding of" or "knowledge of," classify as Understand.

### "Describe"

- **As Remember**: "Describe the three branches of the U.S. government." If the student is expected to recall and state memorized facts, this is Remember.
- **As Understand**: "Describe in your own words how photosynthesis converts light energy to chemical energy." The student must construct an explanation, which is Understand.
- **Resolution**: Check whether "describe" requires recall of memorized material (Remember) or construction of a personal explanation (Understand).

### "Identify"

- **As Remember**: "Identify the parts of a cell from a labeled diagram." Recognition from memory.
- **As Analyze**: "Identify the root cause of a software defect by examining stack traces and logs." This requires analytical reasoning, not mere recognition.
- **Resolution**: If "identify" means "point to" or "name," it is Remember. If it means "discover through investigation," it is Analyze.

### "Discuss"

- **As Understand**: "Discuss the causes of World War I." The student explains and interprets.
- **As Evaluate**: "Discuss whether the benefits of nuclear energy outweigh its risks, supporting your position with evidence." The student makes and defends a judgment.
- **Resolution**: Check whether the discussion requires judgment and argumentation (Evaluate) or explanation and interpretation (Understand).

### "Design"

- **As Create**: "Design an experiment to test the effect of pH on enzyme activity." Original creation.
- **As Apply**: "Design a circuit using the provided schematic template." If the student follows a known pattern, this may be Apply rather than Create.
- **Resolution**: If the design is original and the student determines the structure, it is Create. If the student fills in a template or follows prescribed steps, it may be Apply.

### "Select"

- **As Remember**: "Select the correct answer from the list." Recognition.
- **As Evaluate**: "Select the most appropriate statistical test for the given dataset and justify your choice." Judgment based on criteria.
- **Resolution**: Check whether selection requires judgment (Evaluate) or recognition (Remember).

## Bloom's Level and Assessment Alignment Quick Reference

| Bloom's Level | Recommended Assessment Types | Red Flag If |
|---|---|---|
| Remember | Quizzes, matching, labeling | Used as the sole assessment for an upper-division course |
| Understand | Short answer, concept maps, explanations | Assessed only via multiple-choice (may actually test Remember) |
| Apply | Problem sets, labs, coding exercises | No hands-on component exists |
| Analyze | Case studies, debugging, data analysis | Assessed only via recall-based exams |
| Evaluate | Critiques, peer reviews, justifications | No rubric provided for the judgment criteria |
| Create | Projects, designs, original research | No formative checkpoints before the final product |
