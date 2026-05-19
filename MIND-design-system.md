# MIND — Design System

> **Version 1.0** · Extracted from *Out of Mind* poster · Bebas Neue + DM Sans + `#A89CE0`  
> A language built on tension — heavy flat type grounded against inflated, glossy 3D forms.  
> One accent. No gradients on backgrounds. Every decision intentional.

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Brand Foundation](#2-brand-foundation)
3. [Color](#3-color)
4. [Typography](#4-typography)
5. [Spacing](#5-spacing)
6. [Motion](#6-motion)
7. [Blob System](#7-blob-system)  ← fixed & fully specified
8. [Components](#8-components)
9. [Layout](#9-layout)
10. [Accessibility](#10-accessibility)
11. [Voice & Copy](#11-voice--copy)

---

## 1. Quick Start

### Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display / Poster | Bebas Neue | 400 | Always uppercase |
| Body / UI | DM Sans | 300, 400, 500 | Sentence case unless labelling |

### CSS Custom Properties — paste into `:root`

```css
:root {
  /* ── Colors ── */
  --color-bg:          #EAEAF2;
  --color-surface:     #F2F2F8;
  --color-surface-2:   #FFFFFF;
  --color-ink:         #0D0D0F;
  --color-ink-muted:   #5A5A66;
  --color-rule:        rgba(13,13,15,0.10);

  --color-blob:        #A89CE0;
  --color-blob-light:  #C8C0F0;
  --color-blob-pale:   #E8E4FF;
  --color-blob-dark:   #7B6FBB;
  --color-blob-deep:   #5A50A0;
  --color-blob-cast:   rgba(100,88,160,0.18);

  /* ── Typography ── */
  --font-display: 'Bebas Neue', sans-serif;
  --font-body:    'DM Sans', sans-serif;

  --type-poster:  clamp(64px, 16vw, 160px);
  --type-display: clamp(40px, 8vw,  88px);
  --type-heading: 28px;
  --type-subhead: 20px;
  --type-body:    15px;
  --type-label:   11px;
  --type-caption: 12px;

  /* ── Spacing ── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  16px;
  --space-4:  24px;
  --space-5:  40px;
  --space-6:  64px;
  --space-7:  104px;
  --space-8:  160px;

  /* ── Radius ── */
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   20px;
  --radius-pill: 999px;

  /* ── Shadow ── */
  --shadow-sm:   0 2px 12px rgba(100,88,160,0.06);
  --shadow-md:   0 8px 32px rgba(100,88,160,0.12);
  --shadow-lg:   0 16px 64px rgba(100,88,160,0.18);
  --shadow-blob: 0 16px 40px rgba(85,72,160,0.28);

  /* ── Easing ── */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out:    cubic-bezier(0.16, 1.00, 0.30, 1.00);
  --ease-in-out: cubic-bezier(0.45, 0.00, 0.55, 1.00);
}
```

---

## 2. Brand Foundation

### Identity

| Token | Value | Usage |
|-------|-------|-------|
| Brand mark | `MIND.` | Logotype — Bebas Neue, `--color-blob` period |
| Tagline | *Out of Mind* | Italic DM Sans, secondary contexts |
| Accent | `#A89CE0` | Single accent — never use multiple accent hues |

### Design Philosophy

- **Flat vs. Volume** — Flat black type is the immovable ground. Glossy purple blobs are the volumetric element that floats above it. The contrast between the two *is* the design.
- **One accent** — `#A89CE0` and its tints/shades only. Never introduce secondary accent hues.
- **No background gradients** — The background (`#EAEAF2`) is always flat. Gradients live only inside blobs.
- **Typography is inert** — Poster text never animates, never has hover states. Only blobs move.

---

## 3. Color

### Palette

```
Background    #EAEAF2  ──  --color-bg
Surface       #F2F2F8  ──  --color-surface
Surface 2     #FFFFFF  ──  --color-surface-2
Ink           #0D0D0F  ──  --color-ink
Ink Muted     #5A5A66  ──  --color-ink-muted
Rule          rgba(13,13,15,0.10)  ──  --color-rule

Blob Pale     #E8E4FF  ──  --color-blob-pale    (specular core)
Blob Light    #C8C0F0  ──  --color-blob-light   (highlight zone)
Blob          #A89CE0  ──  --color-blob         (base / UI accent)
Blob Dark     #7B6FBB  ──  --color-blob-dark    (shadow zone)
Blob Deep     #5A50A0  ──  --color-blob-deep    (darkest edge)
Blob Cast     rgba(100,88,160,0.18)  ──  --color-blob-cast
```

### Usage Rules

- `--color-ink` on `--color-bg` → ✅ passes WCAG AA (contrast ≈ 16.5:1)
- `--color-blob` on `--color-bg` → ⚠️ decorative use only — do not use as sole text color
- `--color-blob` on `#FFFFFF` → ✅ acceptable for UI labels (contrast ≈ 3.5:1)
- Never use `--color-blob` as a solid background for body text

---

## 4. Typography

### Scale

| Name | Token | Size | Weight | Font | Line-height |
|------|-------|------|--------|------|-------------|
| Poster | `--type-poster` | clamp(64px→160px) | 400 | Bebas Neue | 0.88 |
| Display | `--type-display` | clamp(40px→88px) | 400 | Bebas Neue | 0.92 |
| Heading | `--type-heading` | 28px | 300 | DM Sans | 1.10 |
| Subhead | `--type-subhead` | 20px | 400 | DM Sans | 1.20 |
| Label | `--type-label` | 11px | 500 | DM Sans | 1.40 |
| Body | `--type-body` | 15px | 300 | DM Sans | 1.65 |
| Caption | `--type-caption` | 12px | 400 | DM Sans | 1.50 |

### CSS Classes

```css
/* ── Display / Poster ── */
.t-poster  { font-family: var(--font-display); font-size: var(--type-poster);  line-height: 0.88; text-transform: uppercase; }
.t-display { font-family: var(--font-display); font-size: var(--type-display); line-height: 0.92; text-transform: uppercase; }

/* ── Body Scale ── */
.t-heading { font-family: var(--font-body); font-size: var(--type-heading); font-weight: 300; line-height: 1.10; }
.t-subhead { font-family: var(--font-body); font-size: var(--type-subhead); font-weight: 400; line-height: 1.20; }
.t-label   { font-family: var(--font-body); font-size: var(--type-label);   font-weight: 500; letter-spacing: 0.20em; text-transform: uppercase; color: var(--color-ink-muted); }
.t-body    { font-family: var(--font-body); font-size: var(--type-body);    font-weight: 300; line-height: 1.65; }
.t-caption { font-family: var(--font-body); font-size: var(--type-caption); color: var(--color-ink-muted); }
```

### Rules

- Poster / Display → always uppercase, never hyphenated
- Body → sentence case
- Labels → uppercase + `letter-spacing: 0.20em`; only for metadata/tags
- Max line length for body text: `65ch`

---

## 5. Spacing

Based on a linear scale anchored at `4px`.

| Token | Value | Use |
|-------|-------|-----|
| `--space-1` | 4px | Icon gap, tiny padding |
| `--space-2` | 8px | Chip padding, tight gap |
| `--space-3` | 16px | Default gap, card internal |
| `--space-4` | 24px | Section sub-gap |
| `--space-5` | 40px | Component to component |
| `--space-6` | 64px | Section padding |
| `--space-7` | 104px | Section padding (large) |
| `--space-8` | 160px | Hero breathing room |

---

## 6. Motion

### Easing Tokens

| Name | Curve | Use |
|------|-------|-----|
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Blob entrance, button press — has overshoot |
| `--ease-out` | `cubic-bezier(0.16, 1.00, 0.30, 1.00)` | Panel open, page reveal |
| `--ease-in-out` | `cubic-bezier(0.45, 0.00, 0.55, 1.00)` | Idle breathe loops |

### Duration Scale

| Moment | Duration | Easing |
|--------|----------|--------|
| Hover micro-interaction | 200–250ms | `--ease-out` |
| Button press feedback | 150ms | `--ease-spring` |
| Page element entrance | 600–900ms | `--ease-out` with `animation-delay` stagger |
| Blob idle float | 4000–5000ms | `ease-in-out` |
| Blob breathe | 3000ms | `ease-in-out` |

### Float Keyframe (copy-paste)

```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-10px) rotate(1.5deg); }
  66%       { transform: translateY(5px) rotate(-1deg); }
}

/* Apply to blobs with staggered delays */
.blob-1 { animation: float 4.2s ease-in-out infinite; }
.blob-2 { animation: float 4.8s ease-in-out infinite; animation-delay: -1.3s; }
.blob-3 { animation: float 4.5s ease-in-out infinite; animation-delay: -2.6s; }
.blob-4 { animation: float 5.0s ease-in-out infinite; animation-delay: -0.8s; }
```

### Motion Principles

1. **Blobs move · type stays** — The flat typographic stack is the immovable anchor. Only blobs breathe, float, and react.
2. **Physics, not mechanics** — Use `--ease-spring` for entrances so blobs feel weighted, not robotic. They overshoot slightly, then settle.
3. **Parallax depth** — On scroll, blobs translate at `0.7×` scroll rate vs. background type, reinforcing material hierarchy without perspective transforms.
4. **Cast shadows shift** — The drop-shadow offset subtly changes during float (`dy` from 12px→18px) to sell the 3D illusion.
5. **Respect prefers-reduced-motion** — Wrap all animations:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Blob System

This is the core visual identity element. The blobs simulate inflated, glossy 3D objects floating above flat type.

### What They Are NOT

The previous placeholder blobs were plain ellipses/rounded-rects with a single gradient — **they should NOT look like that**. Compare:

```
❌ Flat geometric shapes with one gradient stop
✅ Organic bezier paths with multi-stop radial gradient + specular highlight + cast shadow
```

### Anatomy of a Correct Blob

Every blob has **4 layers** drawn in this order:

```
1. Cast shadow   (blurred ellipse BELOW the blob on the background plane)
2. Blob body     (organic bezier path + 5-stop radial gradient)
3. Secondary glow (soft, large ellipse, ~20% white, simulates sub-surface scatter)
4. Specular dot  (small, sharp, ~70% white radial gradient — the "shiny" highlight)
```

### Gradient Specification

The 5-stop radial gradient is positioned at **cx=30% cy=25%** (upper-left light source):

| Stop | Color | Opacity | Zone |
|------|-------|---------|------|
| 0% | `#F2EEFF` | 100% | Specular center |
| 18% | `#D4CCFF` | 100% | Highlight zone |
| 50% | `#A89CE0` | 100% | Base color |
| 82% | `#7868C0` | 100% | Shadow zone |
| 100% | `#5A50A0` | 100% | Darkest rim |

**The hue never changes between blob variants — only luminance.**

### SVG Blob Template

Copy this pattern for any blob. Replace the `<path d="...">` with an organic bezier shape.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>

    <!-- 3D gradient: light upper-left → dark lower-right -->
    <radialGradient id="blobGrad" cx="30%" cy="25%" r="72%" fx="30%" fy="25%">
      <stop offset="0%"   stop-color="#F2EEFF"/>
      <stop offset="18%"  stop-color="#D4CCFF"/>
      <stop offset="50%"  stop-color="#A89CE0"/>
      <stop offset="82%"  stop-color="#7868C0"/>
      <stop offset="100%" stop-color="#5A50A0"/>
    </radialGradient>

    <!-- Specular highlight (the white shiny dot) -->
    <radialGradient id="specGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#FFFFFF" stop-opacity="0.80"/>
      <stop offset="55%"  stop-color="#FFFFFF" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>

    <!-- Sub-surface scatter glow -->
    <radialGradient id="glowGrad" cx="38%" cy="32%" r="60%">
      <stop offset="0%"   stop-color="#FFFFFF" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>

    <!-- Drop shadow (cast shadow on background) -->
    <filter id="castShadow" x="-30%" y="-20%" width="160%" height="170%">
      <feDropShadow dx="0" dy="14" stdDeviation="18"
        flood-color="#5040A8" flood-opacity="0.26"/>
    </filter>

  </defs>

  <!-- 1. Cast shadow is applied via filter on the group -->
  <g filter="url(#castShadow)">

    <!-- 2. Blob body — replace path with your organic shape -->
    <path d="M 100,30
             C 140,28 168,55 170,90
             C 172,125 158,162 120,170
             C 82,178 40,158 32,118
             C 24,78 60,32 100,30 Z"
          fill="url(#blobGrad)"/>

    <!-- 3. Sub-surface scatter glow (same path, overlay) -->
    <path d="M 100,30
             C 140,28 168,55 170,90
             C 172,125 158,162 120,170
             C 82,178 40,158 32,118
             C 24,78 60,32 100,30 Z"
          fill="url(#glowGrad)"/>

  </g>

  <!-- 4. Specular dot (outside the drop-shadow group so it stays bright) -->
  <ellipse cx="78" cy="62" rx="18" ry="12"
           fill="url(#specGrad)"
           transform="rotate(-30 78 62)"/>

</svg>
```

### Organic Shape Paths (ready to use)

These are actual organic bezier paths — **not ellipses or rounded rects**:

**Blob shape A** (wide, M-family vibes):
```
M 52,100 C 48,62 72,36 104,40 C 118,42 130,54 140,68 C 150,54 164,42 178,40 C 212,36 238,64 234,104 C 230,136 214,160 184,164 C 168,166 156,156 140,140 C 124,156 112,166 96,164 C 64,160 54,136 52,100 Z
```

**Blob shape B** (tall pill, I-family vibes):
```
M 85,44 C 85,24 98,14 116,14 C 134,14 148,24 148,44 C 152,74 148,108 146,134 C 150,154 156,176 156,200 C 156,226 140,240 114,240 C 88,240 72,226 72,200 C 72,176 80,154 84,134 C 80,108 78,74 85,44 Z
```

**Blob shape C** (angular-organic, N-family vibes):
```
M 36,118 C 30,80 52,52 82,54 C 96,56 108,68 122,84 L 140,54 C 150,38 164,32 180,36 C 200,42 212,64 208,100 C 204,132 188,158 162,162 C 148,162 138,150 132,130 C 126,150 114,162 98,162 C 68,160 40,150 36,118 Z
```

**Blob shape D** (round with interior ring, D-family vibes — use `fill-rule="evenodd"`):
```
<!-- Outer ring -->
M 28,112 C 26,70 54,42 98,40 C 144,38 174,68 176,112 C 178,156 150,188 104,190 C 58,192 28,154 28,112 Z
<!-- Inner cutout -->
M 74,112 C 74,94 84,84 102,84 C 120,84 130,94 130,112 C 130,130 120,140 102,140 C 84,140 74,130 74,112 Z
```
*(set `fill-rule="evenodd"` on the path element using both sub-paths)*

### Float + Hover Interaction

```css
.blob {
  animation: float 4.5s ease-in-out infinite;
  transition: filter 0.3s var(--ease-spring);
  cursor: pointer;
}
.blob:hover {
  filter: brightness(1.08)
          drop-shadow(0 20px 48px rgba(85,72,160,0.40));
}
```

### Blob Usage Rules

| Rule | Do | Don't |
|------|-----|-------|
| Z-order | Blobs always on top of flat type (`z-index: 2+`) | Never put type on top of blob |
| Rotation | Blobs slightly rotated (±3°–12°) | Never perfectly upright |
| Hue | Purple only (`#A89CE0` family) | No recolored blobs |
| Interaction | Only blobs react to hover/scroll | Type never hover-states |
| Background | Always on `--color-bg` (#EAEAF2) | Not on dark or colored backgrounds |
| Shadows | Cast shadow required, always below | No shadow = blob loses weight |

---

## 8. Components

### 8.1 Buttons

#### Base Styles

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: 18px;
  letter-spacing: 0.04em;
  padding: 11px 30px 9px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition:
    transform 0.25s var(--ease-spring),
    box-shadow 0.25s var(--ease-out),
    background 0.2s,
    color 0.2s;
  white-space: nowrap;
  user-select: none;
}
.btn:active { transform: scale(0.96) !important; }
.btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  pointer-events: none;
}
```

#### Variants

```css
/* Primary — dark fill */
.btn-primary {
  background: var(--color-ink);
  color: var(--color-bg);
}
.btn-primary:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 24px rgba(13,13,15,0.25);
}

/* Secondary / Outline */
.btn-outline {
  background: transparent;
  color: var(--color-ink);
  border: 1.5px solid var(--color-ink);
}
.btn-outline:hover {
  background: var(--color-ink);
  color: var(--color-bg);
  transform: scale(1.03);
}

/* Blob / Accent */
.btn-blob {
  background: var(--color-blob);
  color: #fff;
}
.btn-blob:hover {
  transform: scale(1.05) rotate(1deg);
  box-shadow: 0 8px 28px var(--color-blob-cast);
}

/* Ghost */
.btn-ghost {
  background: transparent;
  color: var(--color-ink-muted);
  border: 1.5px solid var(--color-rule);
}
.btn-ghost:hover {
  background: var(--color-surface-2);
  color: var(--color-ink);
  border-color: transparent;
}

/* Danger */
.btn-danger {
  background: #D94F4F;
  color: #fff;
}
.btn-danger:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 20px rgba(217,79,79,0.30);
}

/* Sizes */
.btn-sm { font-size: 14px; padding: 7px 20px 6px; }
.btn-lg { font-size: 22px; padding: 14px 40px 12px; }
.btn-icon { width: 44px; height: 44px; padding: 0; border-radius: 50%; }
```

#### HTML Examples

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-blob">Blob</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-danger">Delete</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-icon btn-outline" aria-label="Settings">
  <!-- icon svg -->
</button>
<button class="btn btn-primary" disabled>Disabled</button>
```

---

### 8.2 Chips / Tags

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  border: 1.5px solid var(--color-blob);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: var(--radius-pill);
  cursor: default;
  transition: background 0.2s, color 0.2s;
  user-select: none;
}
.chip:hover            { background: var(--color-blob); color: #fff; }
.chip.chip--filled     { background: var(--color-blob); color: #fff; border-color: transparent; }
.chip.chip--muted      { border-color: var(--color-rule); color: var(--color-ink-muted); }
.chip.chip--muted:hover { background: var(--color-rule); color: var(--color-ink); }

.chip-group { display: flex; flex-wrap: wrap; gap: var(--space-2); }
```

```html
<div class="chip-group">
  <span class="chip">Mind</span>
  <span class="chip chip--filled">Active</span>
  <span class="chip chip--muted">Archived</span>
</div>
```

---

### 8.3 Input Fields

```css
/* Label */
.ds-label {
  display: block;
  font-size: var(--type-label);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  margin-bottom: var(--space-2);
}

/* Text input */
.ds-input {
  width: 100%;
  background: var(--color-surface);
  border: 1.5px solid var(--color-rule);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 300;
  color: var(--color-ink);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
}
.ds-input::placeholder { color: var(--color-ink-muted); opacity: 0.6; }
.ds-input:hover        { border-color: rgba(168,156,224,0.5); }
.ds-input:focus {
  border-color: var(--color-blob);
  box-shadow: 0 0 0 3px rgba(168,156,224,0.20);
}
.ds-input.input--error {
  border-color: #D94F4F;
  box-shadow: 0 0 0 3px rgba(217,79,79,0.15);
}

/* Textarea */
.ds-textarea {
  resize: vertical;
  min-height: 96px;
}

/* Select */
.ds-select-wrap {
  position: relative;
}
.ds-select-wrap::after {
  content: '▾';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-ink-muted);
  pointer-events: none;
  font-size: 12px;
}
.ds-select {
  /* inherits .ds-input */
  padding-right: 40px;
  cursor: pointer;
}

/* Error message */
.ds-error {
  font-size: 12px;
  color: #D94F4F;
  margin-top: var(--space-1);
}

/* Hint */
.ds-hint {
  font-size: 12px;
  color: var(--color-ink-muted);
  margin-top: var(--space-1);
}
```

#### Checkbox & Radio

```css
.ds-check-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
}
.ds-check-wrap input[type="checkbox"],
.ds-check-wrap input[type="radio"] {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--color-rule);
  border-radius: 4px;
  background: var(--color-surface);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  flex-shrink: 0;
}
.ds-check-wrap input[type="radio"] { border-radius: 50%; }
.ds-check-wrap input:checked {
  background: var(--color-blob);
  border-color: var(--color-blob);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 12 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5l3.5 3.5L11 1' stroke='white' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 10px 8px;
}
.ds-check-wrap input[type="radio"]:checked {
  background-image: none;
  box-shadow: inset 0 0 0 4px #fff, inset 0 0 0 9px var(--color-blob);
}
.ds-check-label {
  font-size: 14px;
  font-weight: 300;
  color: var(--color-ink);
}
```

```html
<!-- Text input -->
<label class="ds-label">State of mind</label>
<input class="ds-input" type="text" placeholder="Out of mind…">
<span class="ds-hint">Describe your current headspace</span>

<!-- Textarea -->
<label class="ds-label">Notes</label>
<textarea class="ds-input ds-textarea" placeholder="Stream of consciousness…"></textarea>

<!-- Select -->
<label class="ds-label">Mode</label>
<div class="ds-select-wrap">
  <select class="ds-input ds-select">
    <option>Mind</option>
    <option>Out of Mind</option>
  </select>
</div>

<!-- Checkbox -->
<label class="ds-check-wrap">
  <input type="checkbox" checked>
  <span class="ds-check-label">Stay in focus</span>
</label>

<!-- Radio -->
<label class="ds-check-wrap">
  <input type="radio" name="state" checked>
  <span class="ds-check-label">In</span>
</label>
```

---

### 8.4 Cards

```css
.ds-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s, transform 0.3s var(--ease-spring);
}
.ds-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.ds-card-eyebrow {
  font-size: var(--type-label);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-blob);
  margin-bottom: var(--space-2);
}
.ds-card-title {
  font-family: var(--font-display);
  font-size: 32px;
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}
.ds-card-body {
  font-size: 13px;
  font-weight: 300;
  color: var(--color-ink-muted);
  line-height: 1.6;
}
.ds-card-footer {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Featured card — with blob blob accent */
.ds-card--featured {
  background: var(--color-ink);
  color: var(--color-bg);
}
.ds-card--featured .ds-card-title  { color: var(--color-bg); }
.ds-card--featured .ds-card-body   { color: rgba(234,234,242,0.65); }
.ds-card--featured .ds-card-eyebrow { color: var(--color-blob-light); }
```

```html
<div class="ds-card">
  <div class="ds-card-eyebrow">State 04</div>
  <div class="ds-card-title">Out of Mind</div>
  <p class="ds-card-body">The flat grounds; the volumetric floats.</p>
  <div class="ds-card-footer">
    <span class="chip chip--muted">Focus</span>
    <button class="btn btn-outline btn-sm">Explore</button>
  </div>
</div>
```

---

### 8.5 Badge

```css
.ds-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: var(--radius-pill);
  line-height: 1;
}
.ds-badge--default { background: var(--color-rule); color: var(--color-ink-muted); }
.ds-badge--blob    { background: var(--color-blob-pale); color: var(--color-blob-deep); }
.ds-badge--dark    { background: var(--color-ink); color: var(--color-bg); }
.ds-badge--dot::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  margin-right: 5px;
}
```

```html
<span class="ds-badge ds-badge--blob">New</span>
<span class="ds-badge ds-badge--dark ds-badge--dot">Live</span>
<span class="ds-badge ds-badge--default">v1.0</span>
```

---

### 8.6 Avatar

```css
.ds-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-blob-pale);
  color: var(--color-blob-deep);
  font-family: var(--font-display);
  font-size: 18px;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}
.ds-avatar--sm  { width: 32px; height: 32px; font-size: 13px; }
.ds-avatar--md  { width: 44px; height: 44px; font-size: 18px; }
.ds-avatar--lg  { width: 64px; height: 64px; font-size: 26px; }
.ds-avatar img  { width: 100%; height: 100%; object-fit: cover; }
.ds-avatar-group { display: flex; }
.ds-avatar-group .ds-avatar { border: 2px solid var(--color-bg); margin-left: -8px; }
.ds-avatar-group .ds-avatar:first-child { margin-left: 0; }
```

```html
<!-- Initials -->
<div class="ds-avatar ds-avatar--md">MO</div>

<!-- Image -->
<div class="ds-avatar ds-avatar--lg">
  <img src="photo.jpg" alt="User name">
</div>

<!-- Group -->
<div class="ds-avatar-group">
  <div class="ds-avatar ds-avatar--sm">A</div>
  <div class="ds-avatar ds-avatar--sm">B</div>
  <div class="ds-avatar ds-avatar--sm">+4</div>
</div>
```

---

### 8.7 Navigation

```css
.ds-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: var(--space-3) var(--space-5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(234,234,242,0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-rule);
}

/* Logo mark */
.nav-logo {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--color-ink);
  letter-spacing: 0.05em;
  text-decoration: none;
}
.nav-logo span { color: var(--color-blob); }

/* Links */
.nav-links {
  display: flex;
  gap: var(--space-5);
  list-style: none;
  padding: 0; margin: 0;
}
.nav-links a {
  font-size: var(--type-label);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover        { color: var(--color-ink); }
.nav-links a.nav-active   { color: var(--color-ink); }

/* Nav CTA slot */
.nav-actions { display: flex; align-items: center; gap: var(--space-3); }
```

```html
<nav class="ds-nav">
  <a href="/" class="nav-logo">MIND<span>.</span></a>
  <ul class="nav-links">
    <li><a href="/work" class="nav-active">Work</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/journal">Journal</a></li>
  </ul>
  <div class="nav-actions">
    <button class="btn btn-outline btn-sm">Contact</button>
  </div>
</nav>
```

---

### 8.8 Divider

```css
.ds-divider {
  width: 100%;
  height: 1px;
  background: var(--color-rule);
  border: none;
  margin: var(--space-5) 0;
}
.ds-divider--blob {
  background: linear-gradient(
    to right,
    transparent,
    var(--color-blob) 30%,
    var(--color-blob) 70%,
    transparent
  );
  opacity: 0.35;
}
```

---

### 8.9 Toast / Notification

```css
.ds-toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  background: var(--color-surface-2);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  box-shadow: var(--shadow-md);
  border-left: 3px solid transparent;
  max-width: 380px;
  animation: toastIn 0.4s var(--ease-spring) both;
}
.ds-toast--info    { border-left-color: var(--color-blob); }
.ds-toast--success { border-left-color: #5CB85C; }
.ds-toast--error   { border-left-color: #D94F4F; }
.ds-toast-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-ink);
  margin-bottom: 2px;
}
.ds-toast-body {
  font-size: 12px;
  color: var(--color-ink-muted);
}

@keyframes toastIn {
  from { opacity: 0; transform: translateY(8px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

---

### 8.10 Progress / Loading

```css
.ds-progress {
  width: 100%;
  height: 4px;
  background: var(--color-rule);
  border-radius: var(--radius-pill);
  overflow: hidden;
}
.ds-progress-bar {
  height: 100%;
  background: linear-gradient(to right, var(--color-blob-dark), var(--color-blob-light));
  border-radius: var(--radius-pill);
  transition: width 0.5s var(--ease-out);
}

/* Indeterminate */
.ds-progress--indeterminate .ds-progress-bar {
  width: 40% !important;
  animation: progressSweep 1.4s var(--ease-in-out) infinite;
}
@keyframes progressSweep {
  0%   { transform: translateX(-150%); }
  100% { transform: translateX(350%); }
}
```

---

## 9. Layout

### Grid

```css
.ds-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.ds-grid-2 { display: grid; grid-template-columns: 1fr 1fr;      gap: var(--space-5); }
.ds-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-4); }
.ds-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: var(--space-3); }

@media (max-width: 768px) {
  .ds-grid-2, .ds-grid-3, .ds-grid-4 { grid-template-columns: 1fr; }
}
```

### Poster Layout

The signature layout: stacked `MIND` type (5×) with blobs floating above.

```
┌────────────────────────────────────────┐
│ MIND                              MIND │  ← corner anchors (11px, weight 500)
│                                        │
│         MIND                           │
│         MIND    [blob M]  [blob I]     │
│         MIND                           │
│         MIND    [blob N]  [blob D]     │
│         MIND                           │
│                                        │
│ OUT                                OUT │  ← corner anchors
└────────────────────────────────────────┘
```

```css
.poster-layout {
  position: relative;
  overflow: hidden;
  background: var(--color-bg);
}

/* The stacked type */
.poster-type {
  font-family: var(--font-display);
  font-size: var(--type-poster);
  line-height: 0.88;           /* intentional compression */
  color: var(--color-ink);
  text-transform: uppercase;
  user-select: none;
  position: relative;
  z-index: 1;
}

/* Blob overlay — sits above type */
.poster-blobs {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

/* Corner anchors */
.poster-corner {
  position: absolute;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-ink);
  z-index: 10;
}
.poster-corner.tl { top: var(--space-5);    left: var(--space-5);  }
.poster-corner.tr { top: var(--space-5);    right: var(--space-5); }
.poster-corner.bl { bottom: var(--space-5); left: var(--space-5);  }
.poster-corner.br { bottom: var(--space-5); right: var(--space-5); }
```

### Section Anatomy

```css
section {
  padding: var(--space-7) 0;
  border-top: 1px solid var(--color-rule);
}

/* Section label pattern: "01  Colors ————————" */
.section-label {
  font-family: var(--font-body);
  font-size: var(--type-label);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  margin-bottom: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-rule);
}
.section-num { color: var(--color-blob); }
```

```html
<section>
  <div class="ds-wrap">
    <p class="section-label">
      <span class="section-num">01</span> Colors
    </p>
    <!-- content -->
  </div>
</section>
```

---

## 10. Accessibility

| Check | Requirement |
|-------|-------------|
| Ink on background | `#0D0D0F` on `#EAEAF2` → passes AAA (16.5:1) |
| Interactive min size | All clickable elements ≥ 44×44px touch target |
| Focus visible | Always override default; use `box-shadow: 0 0 0 3px rgba(168,156,224,0.5)` |
| Animations | Wrap in `@media (prefers-reduced-motion: reduce)` |
| Blob text alt | If blobs form letters, also render real text in aria-label |
| Color alone | Never use color as the sole indicator of state |

```css
/* Focus ring — apply to all interactive elements */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(168,156,224,0.55);
  border-radius: var(--radius-sm);
}
```

---

## 11. Voice & Copy

| Tone | Direction |
|------|-----------|
| **Display copy** | Short, punchy, all-caps. Max 2 words per line in poster contexts. |
| **Body copy** | Calm, considered, slightly poetic. No exclamation marks. |
| **UI labels** | Functional, uppercase, no periods. |
| **Error states** | Direct and kind. Never blame the user. |

### Word palette

`MIND · OUT · STATE · FOCUS · GROUND · FLOAT · SURFACE · DEPTH · FORM · VOID`

These words carry the brand tension (in/out, flat/volume, still/moving). Use sparingly and with intention.

---

*MIND Design System v1.0 — extracted from the Out of Mind poster*  
*Bebas Neue · DM Sans · `#A89CE0` · One accent. No gradients on backgrounds. Every decision intentional.*
