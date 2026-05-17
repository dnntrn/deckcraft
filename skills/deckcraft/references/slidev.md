# Slidev Syntax & Custom Layouts

> Full docs at sli.dev. This reference covers Slidev syntax plus deckcraft's custom layout system.

## File Format

Slidev slides are a single Markdown file with `---` as slide separators.

```md
---
theme: ./theme
highlighter: shiki
lineNumbers: true
title: My Talk
---

---
layout: cover
---

# Title

Content.
```

## Frontmatter (Per-Deck)

```yaml
---
theme: ./theme              # Path to theme directory
title: My Talk              # Browser tab title
highlighter: shiki          # Syntax highlighter
lineNumbers: true           # Show line numbers
exportFilename: my-talk     # Export filename base
---
```

## Deckcraft Custom Layouts

All layouts are custom Vue components in `theme/layouts/` with scoped styles.
UnoCSS cannot touch scoped styles — no interference, no cut-off content.
**Never use Slidev built-in layouts** (`default`, `two-cols`, `center`, `section`).

### `layout: cover` — Opening slide

Full-bleed opening. Large title, subtitle, optional author.

```md
---
layout: cover
---

# Kubernetes Pod Lifecycle

What happens between `kubectl apply` and a running pod

**Deanna · KubeCon 2026**
```

### `layout: content` — Default slide

Title + body. The workhorse layout. 42px title with accent left-border (studio)
or accent-colored title (nocturne). 22px body.

```md
---
layout: content
---

# The Problem

Your text here. Bullet points, code blocks, tables — everything works.
```

### `layout: impact` — Big centered statement

For statistics, key takeaways, or calls to action.

```md
---
layout: impact
---

# 3.2x

Faster cold starts with lazy loading

<span class="text-sm">vs v2.1 baseline · p99 across 10k deploys</span>
```

### `layout: divider` — Section transition

Use between major topic changes. Centered, large type.

```md
---
layout: divider
---

# Part 2: The Solution
```

## Split Layout (code + explanation)

Use the `.split` CSS class inside a `content` layout. Two equal columns.

```md
---
layout: content
---

<div class="split">
<div>

# Scheduling Loop

The scheduler runs a continuous reconciliation loop:

- Watch for unscheduled pods
- Filter feasible nodes
- Score and rank
- Bind to best node

</div>
<div>

```go {1-5|7-9|11-13}
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
```

The `.split` class is defined in the `content.vue` layout's scoped styles.
Left column: text. Right column: code.

## Per-Slide Custom Styling

Add `<style scoped>` at the bottom of any slide for one-off styles.
These are scoped to the current slide — no global pollution.

```md
---
layout: content
---

# Custom Layout

<div class="my-grid">
  <div>Left content</div>
  <div>Right content</div>
</div>

<style scoped>
.my-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 24px;
}
</style>
```

## Code Features

### Syntax highlighting with click steps

Always specify the language. Use `{lines}` for click-through highlighting.

```jsx {1-3|5|7-9|all}
function Counter() {
  const [count, setCount] = useState(0)  // Lines 1-3 shown first

  useEffect(() => {                       // Line 5 shown second
    document.title = `Count: ${count}`
  }, [count])

  return (                                // Lines 7-9 shown third
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

### Code max-height (scrollable blocks)

```go {maxHeight:'320px'}
// Long code with scroll
```

### Inline code

```md
Use `useEffect` for side effects in React.
```

## Presenter Notes

HTML comments at the end of a slide become presenter notes:

```md
# My Slide

Content the audience sees.

<!--
This is for you. Explain the motivation here.
Mention the gotcha with cleanup functions.
Spend 2 minutes on this slide — it's the key concept.
-->
```

Every slide must have presenter notes. Notes explain *what to say*.

## Click Animations

- **NEVER use `<v-clicks>` or `<v-click>` on body text.** Text appears all at once.
- **Code click-through highlighting is fine**: ```jsx {1-3|5|all}
- With `{lines}` syntax, each pipe-separated group is a click step.

## Exporting

See `references/export.md` for PDF/PPTX/PNG export.

## Resources

- Full Slidev docs: https://sli.dev
- Deckcraft themes: see `themes/studio/` and `themes/nocturne/`
