---
theme: ./theme
highlighter: shiki
lineNumbers: true
---

---
layout: cover
---

# Kubernetes Pod Lifecycle

From Pending to Terminated — what actually happens

**Deanna · KubeCon 2026**

---
layout: divider
---

# Part 1: The Problem

---
layout: content
---

# Pod Scheduling at Scale

When you run `kubectl apply`, a lot happens before your container starts.
Most of it is invisible, and most of it can fail silently.

- The API server validates and persists the Pod spec
- The scheduler finds a node (or doesn't)
- The kubelet pulls images and starts containers
- Any step can fail without a clear signal

<!--
Setup slide. Establish the problem space.
Mention debugging CrashLoopBackOff at 2am.
-->

---
layout: content
---

# The Scheduling Loop

<div class="split">
<div>

The scheduler runs a continuous reconciliation loop — not a one-shot operation.

1. Watch for unscheduled pods
2. Filter feasible nodes
3. Score and rank candidates
4. Bind pod to best node

This loop runs forever. Pods can be rescheduled after node failure.

</div>
<div>

```go {1-5|7-9|11-13}
// The main scheduling loop
for {
    pod := nextPod()
    if pod == nil {
        time.Sleep(1 * time.Second)
        continue
    }

    nodes := feasibleNodes(pod)
    bestNode := scoreNodes(nodes)
    bindPod(pod, bestNode)
}
```

</div>
</div>

<!--
Walk through the loop structure.
The key insight: it's continuous, not one-shot.
This is why pods recover after node failure.
-->

---
layout: content
---

# System Architecture

<div class="arch">
  <div class="node accent">Client</div>
  <span class="arrow">→</span>
  <div class="node">API Server</div>
  <span class="arrow">→</span>
  <div class="node accent">Scheduler</div>
  <span class="arrow">→</span>
  <div class="node">Kubelet</div>
</div>

<p class="text-sm" style="margin-top:36px;text-align:center">
  The scheduler is the decision engine. Everything flows through it.
</p>

<style scoped>
.arch { display: flex; align-items: center; gap: 12px; justify-content: center; margin: 48px 0; flex-wrap: wrap; }
.node { padding: 16px 24px; background: var(--c-code-bg); border: 1px solid var(--c-border); border-radius: 8px; font-family: var(--c-mono); font-size: 18px; color: var(--c-foreground); }
.accent { border-color: var(--c-accent); background: var(--c-accent-dim); color: var(--c-accent); font-weight: 600; }
.arrow { color: var(--c-accent); font-size: 22px; font-weight: bold; }
</style>

<!--
The architecture diagram replaces what would have been a Mermaid render.
HTML/CSS means full control over every visual detail.
-->

---
layout: content
---

# Pod State Machine

<div class="states">
  <div class="state">Pending</div>
  <span class="st-arrow">→ Scheduled →</span>
  <div class="state accent">Running</div>
  <span class="st-arrow">→ Complete →</span>
  <div class="state">Succeeded</div>
</div>

<div class="states" style="margin-top:16px">
  <span class="st-note">On error:</span>
  <span class="st-arrow"></span>
  <div class="state danger">Failed</div>
</div>

<style scoped>
.states { display: flex; align-items: center; gap: 8px; justify-content: center; flex-wrap: wrap; }
.state { padding: 14px 24px; background: var(--c-code-bg); border: 1px solid var(--c-border); border-radius: 8px; font-family: var(--c-mono); font-size: 17px; color: var(--c-foreground); }
.accent { border-color: var(--c-accent); background: var(--c-accent-dim); color: var(--c-accent); font-weight: 600; }
.danger { border-color: var(--c-danger); background: var(--c-accent-dim); color: var(--c-danger); }
.st-arrow { color: var(--c-accent); font-size: 14px; }
.st-note { font-size: 14px; color: var(--c-muted); font-style: italic; margin-right: 6px; }
</style>

<!--
State machine in HTML/CSS. More visual control than Mermaid.
Each state is a styled div with accent highlighting on key transitions.
-->

---
layout: impact
---

# 3.2x

Faster cold starts with lazy module loading

<span class="text-sm">vs v2.1 baseline · p99 across 10k deploys</span>

---
layout: divider
---

# Part 2: The Solution

---
layout: content
---

# Next Steps

- Try this pattern in your own cluster: `kubectl apply -f example.yaml`
- Read the full proposal: [github.com/kubernetes/enhancements](https://github.com/kubernetes/enhancements)
- Join the SIG scheduling meeting: **Thursdays at 10am PT**
- Questions? Find me at the hallway track

<!--
End with clear actions. Give people something to do tomorrow.
-->
