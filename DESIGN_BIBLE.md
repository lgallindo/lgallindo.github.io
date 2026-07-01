# DESIGN BIBLE: lgallindo.github.io

## Table of Contents
1. [Core Purpose & Scope](#1-core-purpose--scope)
2. [Aesthetic Foundation](#2-aesthetic-foundation)
3. [Accessibility & Semantic Strictness](#3-accessibility--semantic-strictness)
4. [Typography & Contrast](#4-typography--contrast)
5. [Information Architecture (Navigation)](#5-information-architecture-navigation)
6. [Content Structure & Layout (Blog)](#6-content-structure--layout-blog)
7. [Interaction & Animation Strategy](#7-interaction--animation-strategy)

---

## 1. Core Purpose & Scope
- **Primary Purpose:** A highly technical showcase serving as a professional data engineering portfolio and a hub for maker/FOSS hobbies (CAD, redneck engineering, GPL games).
- **Scope Exclusions:** Non-technical, purely personal aspects of life are explicitly excluded from this iteration.

## 2. Aesthetic Foundation
- **Theme:** Retro GPL / Terminal Showcase.
- **Vibe:** Authentic, utilitarian, nostalgic, yet undeniably premium and polished. It should feel like a high-end, bespoke TUI (Text User Interface) operating system running in the browser.

## 3. Accessibility & Semantic Strictness
- **The `links` Browser Rule:** The site must degrade gracefully and remain 100% functional and highly legible in text-based browsers (like `links` and `lynx`).
- **Implementation Strategy:** **Progressive Enhancement**. The core of the site must be written in strict, unstyled HTML5 Semantic tags (`<main>`, `<article>`, `<nav>`, `<ul>`). The Retro Terminal aesthetic will be applied entirely as a CSS layer on top of this semantic foundation.

## 4. Typography & Contrast
- **Font Family:** A premium, highly legible modern developer monospace font (e.g., *JetBrains Mono*, *Fira Code*, or *IBM Plex Mono*).
- **Contrast Ratio:** Strict adherence to WCAG AAA standards. Recommended palette: CRT Amber (`#FFB000`) or Matrix Green (`#00FF00`) on a Deep Black (`#0A0A0A`) background.
- **Reading Comfort:** To prevent "wall of text" eye strain, text blocks must be constrained to a maximum width of approximately 65-75 characters, with a generous `line-height` (e.g., 1.6).

## 5. Information Architecture (Navigation)
- **Paradigm:** The Status Line.
- **Implementation:** Navigation will be anchored to the edge of the viewport (bottom or top), mimicking the status bar of terminal multiplexers or text editors (like `tmux` or `vim`). It will provide persistent system info and quick links to core directories (e.g., `[1] Home`, `[2] Projects`, `[3] Blog`).

## 6. Content Structure & Layout (Blog)
- **Layout Paradigm:** The TUI Panel.
- **Implementation:** To differentiate long-form blog content from the surrounding terminal chrome, distinct elements (articles, code blocks, sidebars, blockquotes) will be enclosed in CSS-drawn ASCII-style borders (e.g., `+----+`). This gives the content a structured, windowed feel reminiscent of `ncurses` applications, without breaking the underlying semantic HTML flow.

## 7. Interaction & Animation Strategy
- **Default Experience (Option A):** The Phosphor Glow. Snappy and responsive. Links exhibit a subtle CRT-style text glow on hover. Panels switch instantaneously without sluggish tweening. A blinking cursor effect adds to the authentic feel.
- **Theme Toggles:** The UX must include discrete UI buttons allowing users to toggle between three interaction modes:
  1. **Phosphor Glow (Default):** Subtle modern micro-animations.
  2. **Modem Dial-up:** Nostalgic typing effects and line-by-line panel wiping.
  3. **Pure Utilitarian:** No animations, instant color inversion (fastest, rawest experience).

## 8. The "Walled Garden" Presentation Boundary
- **Core Tenet:** All strategies, technical restrictions, design notes, planning documents, and agentic chat contexts are the "sausage making" of this project.
- **Implementation:** These internal development elements must strictly never enter the field of view of the blog reader. The final compiled website must provide a pure "Walled Garden" experience, presenting only the polished technical content and maker portfolio.
- **Rule of Thumb:** When in doubt about whether a piece of metadata or structural element should be visible on the live site, confirm with the owner.
