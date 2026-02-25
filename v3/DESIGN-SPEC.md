# DESIGN SPEC — Marcus Reeve Portfolio (V3)

## Persona

**Name:** Marcus Reeve  
**Title:** Game Director  
**Experience:** 20 years in AAA game development  
**Tagline:** "I build worlds that ask questions."

### Career (Fictional)

- **"Ashen Meridian"** (2019) — Open-world RPG. 12M copies sold. Won 4 Game of the Year awards. Set in a dying sun-empire where every NPC has a full life simulation. Landmark for emergent storytelling.
- **"HOLLOW"** (2014) — Cult-classic psychological horror. 2M copies. Praised for its non-linear dread mechanics and unreliable narrator. Cited by critics as "the Inland Empire of games."
- **"BREACH: Overwatch Protocol"** (2022) — Tactical multiplayer shooter. 8M active players. Known for its asymmetric class design and persistent world narrative that evolves between seasons.

### Philosophy
- Emergent storytelling: systems that tell stories the designer never planned
- Player agency: every decision should feel weighted
- World-building over setpieces: a great world outlasts its plot
- "Craft. Empathy. Impact." — his three-word manifesto

### Visual Identity
- Thinks in cutscenes
- References: Kubrick framing, Tarkovsky pacing, Miyazaki world density
- Dark, cinematic, bold

---

## Aesthetic

### Color Palette
- **Background:** `#080A0C` — deep space black
- **Secondary BG:** `#0B1929` — electric midnight blue
- **Accent:** `#00C8FF` — ice blue / neon electric
- **Gold highlight:** `#C8A84B` — warm amber gold
- **Text primary:** `#E8EAF0` — near-white
- **Text muted:** `#6B7280` — cool gray

### Typography
- **Headings:** "Space Grotesk" — Google Fonts — geometric, modern, sharp
- **Body:** "DM Sans" — Google Fonts — clean, readable, warm
- Font import: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap`

### Feel
- AAA game studio meets auteur filmmaker
- Naughty Dog pitch deck × Christopher Nolan film poster
- No soft edges. Everything is intentional.
- Sections feel like "acts" in a film

### Motion
- Cursor glow: soft radial gradient follows cursor (ice blue, low opacity)
- Scroll animations: fade + translateY (elements appear on scroll via IntersectionObserver)
- Hero text: letter-by-letter stagger reveal on load
- Section transitions: clean, no bounce, subtle and cinematic
- Parallax: hero background layers move at different speeds on scroll

### Visual Language
- NO carousels
- NO stock photography
- Heavy full-bleed typography
- Geometric shapes: rectangles, diagonal cuts, lines
- CSS gradients as "images"
- SVG line art as accents
- Game cards: dark panels with glowing borders on hover
- Awards section: horizontal rule dividers, minimal

---

## Sitemap — Single Page

### 1. NAV
- Fixed top navigation
- Logo: "MR" monogram (initials, geometric) + "MARCUS REEVE" wordmark
- Links: Works · Process · Recognition · Contact
- Right side: a small `[AVAILABLE FOR PROJECTS]` status indicator (glowing dot)

### 2. HERO — Full Viewport
- Background: animated CSS gradient (dark, slowly shifting)
- Floating geometric shape (large SVG rectangle outline, faintly visible)
- Top-left: small overline text "GAME DIRECTOR / 20 YEARS"
- Center: Massive headline "I BUILD WORLDS THAT OUTLAST THEIR STORIES."
- Below: Short dramatic subtitle — "20 years. 3 landmark titles. Infinite possibility spaces."
- CTA: "Explore the work ↓" — minimal underline style
- Bottom: horizontal rule + year range "2004 — 2026"

### 3. PHILOSOPHY — Full Width
- Background: `#0B1929`
- Massive 3-word display: "Craft. Empathy. Impact."
- Each word on its own visual beat (could be on same line, massive)
- Below: 2–3 sentences on his design philosophy
- Accent: a thin gold horizontal rule above the manifesto

### 4. SELECTED WORKS — 3 Cards
- Section header: "SELECTED WORKS" (overline style, small caps)
- 3 game cards in a grid (responsive: 3-col desktop, 1-col mobile)
- Each card:
  - Large number ("01", "02", "03") in gold — top left
  - Game title in Space Grotesk, large
  - Genre tag (small, ice blue)
  - Year
  - One-line descriptor
  - On hover: card expands (CSS transition), shows brief description + awards list
  - Border: 1px subtle, glows ice blue on hover
  - Background: gradient from dark to slightly lighter dark
- No images. The typography IS the visual.

### 5. PROCESS — Timeline
- Section header: "HOW I WORK"
- 5 steps in a horizontal timeline (desktop) / vertical (mobile):
  1. **VISION** — "Define the one question the game is asking."
  2. **ARCHITECTURE** — "Build the systems before the content."  
  3. **ITERATION** — "Play it broken. Fix it honest."
  4. **COLLABORATION** — "The best idea wins, regardless of title."
  5. **SHIP** — "Done is a design decision."
- Step number in gold, step name in Space Grotesk, description in DM Sans
- Connecting line between steps (CSS border/pseudo-element)

### 6. RECOGNITION
- Section header: "RECOGNITION"
- Awards list (left column): 4–5 awards, year, game title
- Press quotes (right column): 2–3 quotes with publication name
- Quotes are large, italic, elegant
- Layout: 2-column grid on desktop

**Fictional Awards:**
- Game of the Year — The Game Awards 2019 (Ashen Meridian)
- Best Direction — BAFTA Games 2020 (Ashen Meridian)
- Best Narrative — GDC Awards 2020 (Ashen Meridian)
- Cult Classic Award — IGF 2015 (HOLLOW)
- Best Multiplayer Design — D.I.C.E. Awards 2023 (BREACH)

**Fictional Press Quotes:**
- "Marcus Reeve doesn't make games. He makes inevitabilities." — Edge Magazine
- "Ashen Meridian is proof that the medium has finally grown up." — The Guardian
- "HOLLOW haunted me for weeks. That's not hyperbole." — Kotaku

### 7. CONTACT — Minimal
- Background: `#080A0C`
- Large display text: "LET'S BUILD SOMETHING THAT MATTERS."
- Email link: `hello@marcusreeve.io` (mailto)
- LinkedIn: placeholder `linkedin.com/in/marcusreeve`
- Small print: "Currently accepting select projects for 2026."
- No form. Just the essentials.

---

## Technical Requirements

- **Pure HTML/CSS/JS** — zero frameworks, zero build tools
- **Single `index.html`** — CSS and JS either inline or in `./assets/`
- **GitHub Pages compatible** — static only
- **Fully responsive** — mobile-first breakpoints
- **No placeholder images** — CSS gradients + SVG only
- **Smooth scroll** — `scroll-behavior: smooth`
- **Intersection Observer** — for scroll-triggered fade-in animations
- **Performance** — minimal JS, lean CSS
- **Accessibility** — semantic HTML, proper heading hierarchy, aria where needed

---

## Delivery

- `index.html` — main file
- `assets/style.css` (optional, can be inline)
- `assets/script.js` (optional, can be inline)
- All self-contained, no external dependencies except Google Fonts CDN
