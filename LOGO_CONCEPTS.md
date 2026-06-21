# Logo Concepts

## Option A: The Bracket Star (Recommended)

```
      ◊
  < deckcraft >
```

**Visual Description:**
- Clean geometric brackets `<` and `>` framing the wordmark
- 4-point diamond star centered above, replacing the space
- Star uses the iridescent pink gradient (shifting animation)
- "deckcraft" in lowercase, medium weight, generous letter-spacing (0.08em)
- Brackets in muted gray (50% opacity), star and text in gradient

**At 16px (signature):**
```
<✦/>
```
Just the star between brackets, text becomes "deckcraft" word

**At 32px (footer):**
```
   ✦
<deckcraft>
```

**At 128px (hero/loading):**
Full version with animated gradient shimmer on star

**Why it works:**
- Balanced, symmetrical, feminine without being frilly
- References code (`<>`) and creativity (✦ sparkle)
- The star is distinctive and ownable
- Scales beautifully from 16px to 128px+

---

## Option C: The Flowing D

```
  𝒹
 deckcraft
```

**Visual Description:**
- Custom letterform combining `<` bracket with flowing "d"
- The ascender of the "d" becomes the bracket angle
- Soft, calligraphic but geometric
- Lowercase, connected letterforms
- Single color (iridescent gradient) or monochrome

**At 16px:**
```
𝒹
```
Just the mark

**At 32px:**
```
𝒹craft
```

**At 128px:**
```
  𝒹
 deckcraft
```

**Why it works:**
- Extremely distinctive, ownable
- The "d" becomes instantly recognizable
- Feels crafted, bespoke, artisanal
- More abstract, lets the wordmark shine

---

## Recommendation

**Start with Option A (Bracket Star)** because:
1. More versatile across contexts (works with/without text)
2. Easier to implement (standard characters + CSS)
3. Balances technical and creative perfectly
4. The star can carry the iridescent gradient

**Option C** is beautiful but requires custom typography/design work. Consider for v2.0 when you have time to develop a custom wordmark.

## Implementation

For the signature, use Option A in text form:
```html
<span class="bracket">&lt;</span><span class="star">✦</span><span class="bracket">&gt;</span>
```

CSS makes the ✦ use the iridescent gradient animation.
