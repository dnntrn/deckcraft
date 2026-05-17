# Content Design for Technical Presentations

How to structure slide CONTENT — not layout, not typography, not color.
The best-designed slide is wasted if the information architecture is wrong.

Apply these patterns when generating any slide deck. They are ordered:
apply them top to bottom.

---

## 1. Motivate, Then Mechanize

Every concept gets a "why" slide before a "how" slide.
The audience must feel the pain before you give them the cure.

**Pattern**:
- Slide A: "Here's the problem you've probably hit." (specific, relatable)
- Slide B: "Here's the concept that solves it." (mechanism)

**Example for useEffect**:
- Slide A: "You wrote a timer. It kept running after you navigated away. Why?" (motivation)
- Slide B: "useEffect with a cleanup function. The return value runs on unmount." (mechanism)

**Never**: "useEffect is a React hook that handles side effects. It takes a callback and a dependency array." (starts with mechanism, no motivation — boring, forgettable)

---

## 2. The 3-Pass Structure

Each major topic gets three passes. Don't explain everything at once.
Layer complexity progressively.

**Pass 1 — The Simple Example (aha moment)**:
- Show the simplest possible working code
- Explain what it does in plain language
- Don't mention edge cases or variants yet
- Goal: "I get it. I could write this."

**Pass 2 — The Mechanics (how it works)**:
- Walk through the code line by line with click steps
- Explain what happens when (order of execution)
- Introduce the key vocabulary (mount, update, cleanup)
- Goal: "I understand the sequence of events."

**Pass 3 — The Edge Case (what breaks)**:
- Show what happens when you do it wrong
- Show the fix
- Explain WHY it breaks (not just "do this instead")
- Goal: "I know the trap and how to avoid it."

**Example**: Teaching array destructuring
- Pass 1: `const [name, setName] = useState("")` — "this gives you a value and a setter"
- Pass 2: Walk through what `setName` triggers (re-render, batching)
- Pass 3: "If you do `name = "new value"` directly, nothing happens. Why? Because React only knows about the setter."

---

## 3. Anchor to Prior Knowledge

The first slide after framing should connect the new concept to something the audience already knows. This reduces cognitive load and builds confidence.

**Pattern**: "You already know X. This is React's version of X."

**Examples**:
- "`addEventListener` in vanilla JS is a side effect. `useEffect` is the React version of that."
- "A component is like a function that returns HTML. `props` are like function arguments."
- "State is like a variable, but React watches it. When it changes, the function runs again."

**Rule**: First slide of any section should contain an analogy. Only then introduce the React-specific syntax.

**Anti-pattern**: Opening with "useState is a React hook that returns a tuple of a stateful value and a setter function." (Academic, assumes prior framework knowledge, alienates beginners.)

---

## 4. Code Formula: Show → Walk → Result

Never dump a code block on a slide without a structured walkthrough.
Code is evidence, not decoration.

**Formula** (3 parts, can be one slide or split across two):

**(a) Show the code**:
- Complete, working example
- Short enough to fit on screen (≤20 lines)
- Lines are numbered or highlightable

**(b) Walk through it**:
- Use click steps (`{1-3|5|all}`) to reveal lines in sequence
- Each step has a one-line explanation in the speaker notes
- Don't highlight everything — only the lines that teach

**(c) Show the result**:
- What the user sees / what happens
- Or show the same code with a twist: "Now remove the dependency array. What happens?"
- Close the loop: tie back to the motivation slide

**Anti-pattern**: A slide with a full component dump, no highlighting, and the title "Here's how it works."

---

## 5. Progressive Disclosure

Start with the simplest case. Add one layer per example.
Never show the full picture until the simplest case is mastered.

**Pattern**:
```
Slide 1: useEffect with an empty array (mount only)
Slide 2: useEffect with a dependency (mount + update)
Slide 3: useEffect with a cleanup function (mount + update + unmount)
Slide 4: All four patterns side by side (the cheat sheet)
```

**Rule**: The final slide of a section is a "cheat sheet" that shows everything together. The audience should recognize all the parts because they've seen each one in isolation.

**Anti-pattern**: Slide 1 shows all four useEffect patterns at once. (Overwhelming, nothing to anchor to.)

---

## 6. The Pitfall Sandwich

When teaching something that can go wrong, use this structure:

**Pattern**:
1. Show the WRONG code (the common mistake)
2. Show the consequence (the bug, the error, the memory leak)
3. Show the RIGHT code (the fix)
4. Explain WHY the fix works (the principle, not just the fix)

**Why it works**: Contrast is memorable. The audience remembers "don't do X" more strongly when they first SEE X and its consequence.

**Example for dependency arrays**:
1. "Here's an effect with a missing dependency. Looks fine, right?"
2. "After 5 seconds, the user's name is still 'Loading...'. The effect never re-ran."
3. "Add `userId` to the dependency array. Now it updates whenever the user changes."
4. "React decides whether to re-run an effect by comparing dependency values. If `userId` in the array didn't change, the effect skips."

**Anti-pattern**: "Always include all dependencies in the array. Here's an example of the correct way." (No contrast, no memory hook.)

---

## 7. Reinforcement Slides

Every 5-6 slides, insert a slide that checks understanding.
Not a quiz — a light-touch nudge that helps the audience realize they're learning.

**Patterns** (pick one):

**(a) "What would happen if..."**
"Take the Counter component from the last slide. What would happen if we removed `[count]` from the dependency array?"
→ Next slide: Shows the answer.

**(b) "Which of these is correct?"**
Show two versions of the same component. One has a bug. Ask which is correct.
→ Next slide: Explains the difference.

**(c) "In your own words..."**
One-sentence prompt: "Complete this sentence: A cleanup function runs when..."
→ Next slide: Shows the answer + elaborates.

**Rule**: Reinforcement slides take 15-30 seconds. They're a pacing tool, not a test. Don't make the audience feel judged.

**Anti-pattern**: Skipping directly to the next section without any check-in. After 6 slides of new information, the audience is saturated.

---

## 8. Close the Loop

The final slides before the call-to-action should reference back to the opening hook.

**Pattern**:
- "Remember the `Greeting` component from the very first slide?"
- "Now you know: `useState` initializes on mount. `useEffect` runs after every render where `name` changed. The input re-renders on every keystroke. You can trace every line."
- Then: the call to action.

**Why it works**: The audience started with a question ("when does this code run?"). You answered it. Closing the loop gives them a sense of completion and mastery.

**Anti-pattern**: Ending with a generic "Thank you" or "Questions?" slide. (No closure, no CTA.)

---

## Slide Content Checklist

Before showing output, run this against every slide:

**Structure**
- [ ] Slide communicates ONE idea. Title is a claim, not a topic.
- [ ] Opening slides motivate the concept before explaining it.
- [ ] Major topics follow the 3-pass structure (example → mechanics → edge case).
- [ ] A reinforcement slide appears every 5-6 slides.

**Code**
- [ ] Every code block is preceded by a "why" (motivation) and followed by a walkthrough.
- [ ] Code uses click steps to reveal lines progressively.
- [ ] No code block exceeds 20 lines.

**Teaching**
- [ ] New concepts are anchored to something the audience already knows.
- [ ] Complexity is layered: simplest case first, full picture last.
- [ ] Pitfalls use the sandwich pattern: wrong code → consequence → right code → why.

**Narrative**
- [ ] The ending references back to the opening.
- [ ] Every slide has presenter notes that explain what to say, not what's on the slide.

---

## Applying to the React Lifecycle Deck

If generating a deck about the React component lifecycle for interns:

**Opening**: "You've written components like this. Do you know exactly WHEN each line runs?" (Hook + relatable code example)

**Section 1 — Mental Model**: "You already know event listeners. useEffect is React's version of that — it runs when React tells it to." (Anchor to prior knowledge)

**Section 2 — Mount**: Pass 1: simplest component with `useEffect([], callback)`. Pass 2: walk through render → effect → paint order. Pass 3: "If you fetch data without checking if the component is still mounted..."

**Section 3 — Update**: Pass 1: Counter component with `useEffect([count], callback)`. Pass 2: walk through click → re-render → effect. Pass 3: "What happens if you forget the dependency array?" (infinite loop)

**Section 4 — Unmount**: Pass 1: Timer component with cleanup. Pass 2: walk through mount → interval starts → unmount → cleanup → interval stops. Pass 3: "What happens without cleanup?" (memory leak demo)

**Section 5 — Cheat Sheet**: All four dependency array patterns side by side. "You've now seen all of these. Here's your reference."

**Reinforcement slides**: After sections 2, 3, and 4 — "What would happen if..." questions.

**Pitfalls**: Infinite loop (sandwich), missing dependencies (sandwich), missing cleanup (sandwich).

**Close the loop**: "Remember the Greeting component from the beginning? Now trace every line. You know when each one runs."

**CTA**: Clone the playground and build the three exercises.
