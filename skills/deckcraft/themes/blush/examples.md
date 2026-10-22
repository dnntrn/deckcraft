---
theme: ./theme
highlighter: shiki
lineNumbers: true
---

---
layout: cover
---

# Designing with Empathy

How warmth transforms user experience

**Deanna · DesignConf 2026**

---
layout: divider
---

# Part 1: The Case for Warmth

---
layout: content
---

# Why Softness Wins

Users don't remember what you built. They remember how it made them feel.

- **Emotional resonance** — interfaces that acknowledge human needs
- **Psychological safety** — clear language, predictable patterns
- **Cognitive ease** — warmth reduces friction better than simplicity alone
- **Trust through tone** — the right voice disarms resistance

<!--
Setup the argument. Warmth isn't decoration.
It's a design strategy with measurable outcomes.
-->

---
layout: metrics
---

# Traction

<div class="metrics-grid">
  <div class="metric">
    <div class="metric-value">2.4M</div>
    <div class="metric-label">Monthly Active Users</div>
    <div class="metric-desc">Up 340% year over year</div>
  </div>
  <div class="metric">
    <div class="metric-value">$8.2M</div>
    <div class="metric-label">Annual Revenue</div>
    <div class="metric-desc">Growing 2.1× quarter over quarter</div>
  </div>
  <div class="metric">
    <div class="metric-value">97%</div>
    <div class="metric-label">Retention Rate</div>
    <div class="metric-desc">Industry average: 83%</div>
  </div>
</div>

---
layout: feature-grid
---

# What Makes It Different

<div class="grid-3">
  <div class="card">
    <div class="card-icon">&#9672;</div>
    <div class="card-title">Design Intelligence</div>
    <div class="card-desc">Every slide follows visual hierarchy, color theory, and narrative structure.</div>
  </div>
  <div class="card">
    <div class="card-icon">&#9788;</div>
    <div class="card-title">Themes With Soul</div>
    <div class="card-desc">Four personalities, each with distinct character and voice.</div>
  </div>
  <div class="card">
    <div class="card-icon">&#9830;</div>
    <div class="card-title">Bounded Canvas</div>
    <div class="card-desc">1920×1080. No scrollbars. Every element earns its place.</div>
  </div>
</div>

---
layout: content
---

# The Empathy Framework

<div class="split">
<div>

A structured approach to emotional design:

1. **Listen** — research with vulnerability
2. **Reflect** — mirror user language back
3. **Adapt** — respond to emotional state
4. **Validate** — confirm the path forward

Each layer deepens the connection.

</div>
<div>

<div class="arch">
  <div class="node">Research</div>
  <span class="arrow">→</span>
  <div class="node accent">Empathy Map</div>
</div>
<div class="arch" style="margin-top:16px">
  <div class="node">Design</div>
  <span style="width:40px"></span>
  <div class="node accent">Prototype</div>
</div>

<style scoped>
.arch { display: flex; align-items: center; gap: 12px; justify-content: center; }
.node { padding: 18px 28px; background: var(--c-code-bg); border: 1px solid var(--c-border); border-radius: 12px; font-family: var(--c-mono); font-size: 18px; color: var(--c-foreground); }
.accent { border-color: var(--c-accent); background: var(--c-accent-dim); color: var(--c-accent); font-weight: 600; }
.arrow { color: var(--c-accent); font-size: 24px; font-weight: bold; }
</style>

</div>
</div>

<!--
Walk through the framework visually.
The empathy map is the hinge — everything flows through it.
-->

---
layout: comparison
---

# Before vs. After

<div class="compare">
  <div class="compare-col">
    <div class="compare-label">Before</div>

## The Old Way

- Manual slide creation
- Copy-paste from docs
- Inconsistent styling
- No presenter notes

  </div>
  <div class="compare-col">
    <div class="compare-label accent">After</div>

## The New Way

- Intentional layout selection
- Narrative-first approach
- Consistent theme system
- Every slide has a voice

  </div>
</div>

---
layout: two-cols
---

# How It Works

<div class="cols">
<div class="col-text">

### Step by step

Three rounds of intentional questions ensure your deck matches your vision.

- Purpose & Audience
- Design & Tone
- Scope & Duration

No shortcuts. No assumptions.

</div>
<div class="col-media">

<div class="placeholder">Screenshot or diagram</div>

<style scoped>
.placeholder { width: 100%; height: 100%; min-height: 300px; background: var(--c-code-bg); border: 1px dashed var(--c-border); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-family: var(--c-tertiary); font-size: 15px; color: var(--c-muted); }
</style>

</div>
</div>

---
layout: timeline
---

# Deployment Pipeline

<div class="timeline-steps">
  <div class="step active">
    <div class="step-dot active"></div>
    <div class="step-line"></div>
    <div class="step-title">Build</div>
    <div class="step-desc">Compile & bundle</div>
  </div>
  <div class="step">
    <div class="step-dot"></div>
    <div class="step-line"></div>
    <div class="step-title">Test</div>
    <div class="step-desc">Unit & integration</div>
  </div>
  <div class="step active">
    <div class="step-dot active"></div>
    <div class="step-line"></div>
    <div class="step-title">Stage</div>
    <div class="step-desc">Canary deployment</div>
  </div>
  <div class="step">
    <div class="step-dot"></div>
    <div class="step-line"></div>
    <div class="step-title">Verify</div>
    <div class="step-desc">Smoke tests & SLAs</div>
  </div>
  <div class="step">
    <div class="step-dot"></div>
    <div class="step-title">Ship</div>
    <div class="step-desc">Production rollout</div>
  </div>
</div>

---
layout: big-code
---

<div class="code-header">
  <div class="code-dots"><span></span><span></span><span></span></div>
  <div class="code-filename">empathy.js</div>
</div>

# Implementing Warmth

```javascript
function handleError(userAction) {
  return {
    status: 'gentle_fail',
    message: "That didn't work — let's try again together.",
    recoverable: true,
    nextStep: suggestAlternative(userAction)
  }
}
```

<span class="text-sm">Error messages that respect the user's emotional state</span>

---
layout: impact
---

# 73%

of users return to products that made them feel understood

<span class="text-sm">Harvard Business Review · Emotional Design Study 2025</span>

---
layout: quote
---

<blockquote>
People will forget what you said, people will forget what you did,
but people will never forget how you made them feel.
</blockquote>

<div class="attribution">
  <div class="attribution-line"></div>
  <div class="attribution-name">Maya Angelou</div>
  <div class="attribution-role">Poet & Civil Rights Activist</div>
</div>

---
layout: divider
---

# Part 2: Putting It Into Practice

---
layout: content
---

# Start Tomorrow

- **Audit your tone** — read your app's copy aloud. Does it sound human?
- **Add one warm micro-interaction** — a gentle animation, a kind error message
- **Test with real words** — show participants real content, not lorem ipsum
- **Measure affect** — add "How did this make you feel?" to your survey

<p class="text-sm" style="margin-top:28px">
  Resources: empathy.design · Questions? Find me in the hallway track
</p>

<!--
End with clear actions. Give people something to do tomorrow.
Most impactful: the tone audit. Takes 30 minutes.
-->