# Code Slides

Code is the biggest reason developers choose Slidev. Get it right.
Bad code slides are the #1 reason technical talks fail.

## Fundamentals

### Always specify the language

```python
# Good
```

```python
// Bad — no language tag, no highlighting
```

Never generate a code block without a language identifier.

### Line highlighting

Highlight only the lines you're talking about. The audience's eyes follow the highlight.

```python {1-4|6-8|all}
def schedule_pod(name, namespace):        # ← highlighted first
    pod = client.V1Pod(                   #
        metadata={"name": name}           #
    )                                     #
    return api.create_namespaced_pod(    #
        namespace=namespace,              # ← highlighted second
        body=pod                          #
    )                                     #
```

Use click steps (`|`) to walk through the code:
- `{1-4}` — first click, highlight lines 1-4
- `{6-8}` — second click, highlight lines 6-8
- `{all}` — third click, show all lines
- `{none}` — show no highlighting (dim all lines)

### Code annotations

Don't make the audience read code. Annotate it.

```md
---
layout: two-cols
---

# Scheduling Loop

The scheduler runs a continuous reconciliation loop:

1. Watch for unscheduled pods
2. Filter feasible nodes
3. Score and rank nodes
4. Bind pod to best node

::right::

```go {1-5|7-9|11-13}
// Main scheduling loop
for {
    pod := nextPod()       // ①
    if pod == nil {
        time.Sleep(1 * time.Second)
        continue
    }

    nodes := feasibleNodes(pod)  // ②
    bestNode := scoreNodes(nodes, pod)

    bindPod(pod, bestNode)       // ③
}
```
```

Use numbered annotations (①, ②) in comments or in the explanation column.
Match them to the highlighted lines.

## Code Slide Patterns

### Pattern: Code Walkthrough (most common)

Walk through a function or algorithm line by line. Use click steps to reveal.

```md
---
layout: default
clicks: 4
---

# Recursive Descent Parser

```ts {1|2|3-4|5}
function parse(input: string): AST {        // Entry point
    const tokens = tokenize(input)          // Lex
    const ast = parseExpression(tokens)     // Parse: recurse
    return ast                              // Return tree
}
```

<v-clicks>

- Start with the raw input string
- Tokenizer produces a flat list of tokens
- Recursive descent builds the tree
- Return the completed AST

</v-clicks>
```

### Pattern: Diff View (what changed)

Show a code change or evolution. Two code blocks side by side.

```md
---
layout: two-cols
---

# Before

```python
result = requests.get(
    "https://api.example.com/data"
)
data = result.json()
```

::right::

# After

```python
async with aiohttp.ClientSession() as s:
    async with s.get(
        "https://api.example.com/data"
    ) as result:
        data = await result.json()
```
```

Highlight the changed lines with the accent color via custom CSS if needed.

### Pattern: Terminal / Shell

For command-line demos, use a terminal-style slide:

```md
---
layout: default
---

# Installing the Operator

```sh {1|2|3|4}
$ helm repo add acme https://charts.acme.com
$ helm repo update
$ helm install my-operator acme/k8s-operator
$ kubectl get pods -l app=my-operator
```

<v-clicks>

- Add the chart repository
- Update the local index
- Install the operator
- Verify it's running

</v-clicks>
```

Use `sh` or `bash` as the language. Prefix commands with `$`.

### Pattern: TwoSlash (TypeScript types)

For TypeScript talks, use Twoslash to show inferred types:

```ts twoslash
import { useState } from 'react'

const [count, setCount] = useState(0)
//    ^?
```

### Pattern: Monaco Editor (live demos)

For interactive code, use the Monaco editor component:

```md
```ts {monaco-run}
// Edit this code live:
function greet(name: string): string {
    return `Hello, ${name}!`
}
console.log(greet("KubeCon"))
```
```

Use sparingly. Live demos can fail. Always have static backup slides.

## Code Formatting

- Indent: 2 spaces (4 spaces wastes horizontal space)
- Max width: 80 characters per line (fits on 2/3 of slide at 18px)
- Font: JetBrains Mono at 18px minimum
- Line numbers: enable for walkthrough slides, disable for quick examples
- Never use screenshots of code. Slides must be editable and copyable.

## What NOT to Do

- A full file dump on one slide (split it, annotate it, or use `{maxHeight}`)
- Code with no highlighting and no walkthrough (the audience won't read it)
- Light theme code on a dark slide with low contrast
- Code at <16px (unreadable beyond the front row)
- Mixing too many languages in one deck (stick to 1-2 primary languages)
- Comments that just repeat the code (use comments for WHY, not WHAT)
