---
theme: ./theme
highlighter: shiki
lineNumbers: true
---

---
layout: cover
---

# Zero-Downtime PostgreSQL Migrations

How we moved 8TB without dropping a single connection

**Deanna · KubeCon 2026**

---
layout: divider
---

# Part 1: The Migration Problem

---
layout: content
---

# Why Migrations Fail

Database migrations are the hardest part of infrastructure work.
The database is stateful, and state is scary.

- **Downtime is not an option** — 8TB takes hours to copy
- **Replication lag** — the replica is always behind
- **Schema drift** — production moves while you're copying
- **Connection storms** — cutover can overwhelm connection pools

<!--
Frame the problem. Everyone feels this pain.
Emphasize: production databases with real traffic.
-->

---
layout: content
---

# The Dual-Write Pattern

<div class="split">
<div>

Write to both databases during the migration window.
The application doesn't know which one is primary.

```python
async def dual_write(query, params):
    old = await old_db.execute(query, params)
    new = await new_db.execute(query, params)
    return old  # read from old until cutover
```

</div>
<div>

<div class="arch">
  <div class="node">App</div>
  <span class="arrow">⤈</span>
  <div class="node accent">Dual Writer</div>
</div>
<div class="arch" style="margin-top:16px">
  <div class="node">Old DB</div>
  <span style="width:40px"></span>
  <div class="node accent">New DB</div>
</div>

<style scoped>
.arch { display: flex; align-items: center; gap: 12px; justify-content: center; }
.node { padding: 14px 22px; background: var(--c-code-bg); border: 1px solid var(--c-border); border-radius: 8px; font-family: var(--c-mono); font-size: 16px; color: var(--c-foreground); }
.accent { border-color: var(--c-accent); background: var(--c-accent-dim); color: var(--c-accent); font-weight: 600; }
.arrow { color: var(--c-accent); font-size: 20px; }
</style>

</div>
</div>

<!--
Walk through the architecture. The dual writer is the single point of truth.
-->

---
layout: content
---

# Migration State Machine

<div class="states">
  <div class="state">Snapshot</div>
  <span class="st-arrow">→</span>
  <div class="state">Replaying</div>
  <span class="st-arrow">→</span>
  <div class="state accent">Dual Writing</div>
  <span class="st-arrow">→</span>
  <div class="state">Verifying</div>
  <span class="st-arrow">→</span>
  <div class="state accent">Cutover</div>
</div>

<p class="text-sm" style="text-align:center;margin-top:28px">
  Each state has acceptance criteria before advancing
  <br/>
  <strong>Dual Writing</strong>: both databases active, monitor replication lag
</p>

<style scoped>
.states { display: flex; align-items: center; gap: 8px; justify-content: center; flex-wrap: wrap; }
.state { padding: 14px 22px; background: var(--c-code-bg); border: 1px solid var(--c-border); border-radius: 8px; font-family: var(--c-mono); font-size: 16px; color: var(--c-foreground); }
.accent { border-color: var(--c-accent); background: var(--c-accent-dim); color: var(--c-accent); font-weight: 600; }
.st-arrow { color: var(--c-accent); font-size: 14px; }
</style>

<!--
This is the core mental model. Each state has specific
acceptance criteria before moving to the next.
-->

---
layout: impact
---

# 0

Downtime seconds during the 8TB cutover

<span class="text-sm">p99 latency +12ms during dual-write window</span>

---
layout: divider
---

# Part 2: The Tooling

---
layout: content
---

# Try It Yourself

```bash
# Install pg-shuttle
$ brew install our-org/tap/pg-shuttle

# Run a dry-run migration
$ pg-shuttle migrate \
    --source postgres://old:5432/mydb \
    --target postgres://new:5432/mydb \
    --dry-run

# When you're ready
$ pg-shuttle migrate \
    --source postgres://old:5432/mydb \
    --target postgres://new:5432/mydb \
    --cutover
```

<p class="text-sm" style="margin-top:28px">
  Docs: github.com/our-org/pg-shuttle · Questions? Find me after the talk
</p>

<!--
End with executable code. Most important slide.
People should copy-paste and try it.
-->
