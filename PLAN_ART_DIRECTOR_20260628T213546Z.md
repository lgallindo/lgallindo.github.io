# Art Director Plan & Specification
**Timestamp**: 2026-06-28T21:35:46Z
**Status**: ACTIVE / PLANNING PHASE

This document outlines the definition, workflow, best practices, and audited bibliography for the **Art Director Agent**. It is designed to establish a solid visual design foundation (`DESIGN_BIBLE.md`) before any UX layout or code changes begin.

---

## 1. Agent Definition & Provenance
The **Art Director** is an autonomous design specialist agent. Its primary definition originates from the standard visual design and developer interface patterns modified for developer portfolios. Its goal is to act as a bridge between user vision, aesthetic trends, and structural web engineering.

---

## 2. Interactive Interview Workflow
The Art Director will query the user in a structured, multi-step dialogue to capture:
1. **Goals & Identity**: Purpose of the blog, key topics, target audience, and personal brand keywords.
2. **Aesthetic & Theme Preferences**: Color palette interests (warm/cool, minimalist, bold), dark/light mode preference, and visual inspirations.
3. **Typography & Readability**: Preference for serif (classic/editorial) vs. sans-serif (modern/minimal) typefaces.
4. **Content Provenance**: Existing blog posts, social links, or repositories that need migration.

---

## 3. Best Practices & Guidelines
The Art Director's work is driven by industry-recognized design systems and usability research:

### A. Color Theory & Contrast
* Maintain compliance with [WCAG 2.1 Contrast (Minimum)](#ref-wcag-2018) guidelines. Contrast ratios must be at least 4.5:1 for normal text and 3:1 for large text.
* Utilize the **60-30-10 Rule** for color distribution to establish visual hierarchy, as championed in modern layout frameworks like [Material Design 3](#ref-google-m3).

### B. Typography & Layout
* Establish a type scale based on harmonic scales (e.g., Major Third or Perfect Fourth) to ensure a unified page structure ([Apple HIG Typography](#ref-apple-hig)).
* Set body line heights between 1.5 and 1.6 to enhance readability for long-form content, based on research from the [Nielsen Norman Group](#ref-nng-typo).

---

## <a id="bibliography"></a>4. Externally Audited Bibliography

Below is the list of external guidelines, frameworks, and audits referenced in this specification:

* <a id="ref-wcag-2018"></a>**[WCAG 2.1]** W3C (2018). *Web Content Accessibility Guidelines (WCAG) 2.1*.  
  * **Link**: [W3C WCAG 2.1 Specification](https://www.w3.org/TR/WCAG21/)  
  * **Reverse Reference**: [Contrast minimum Section 3.A](#ref-wcag-2018)
* <a id="ref-google-m3"></a>**[Google M3]** Google (2021). *Material Design 3 Color System Guidelines*.  
  * **Link**: [Material Design 3 Color System](https://m3.material.io/styles/color/the-color-system/key-colors)  
  * **Reverse Reference**: [Visual hierarchy Section 3.A](#ref-google-m3)
* <a id="ref-apple-hig"></a>**[Apple HIG]** Apple Inc. (2023). *Human Interface Guidelines: Typography*.  
  * **Link**: [Apple HIG Typography Guidelines](https://developer.apple.com/design/human-interface-guidelines/typography)  
  * **Reverse Reference**: [Type scaling Section 3.B](#ref-apple-hig)
* <a id="ref-nng-typo"></a>**[Nielsen Norman Group]** NNg (2020). *Typography and Text Layout Best Practices*.  
  * **Link**: [NNg Typography on Web](https://www.nngroup.com/articles/typography/)  
  * **Reverse Reference**: [Line heights Section 3.B](#ref-nng-typo)

---

## 5. Output Artifact Specification (`DESIGN_BIBLE.md`)
The Art Director must compile the interview results into a structured [DESIGN_BIBLE.md](file:///home/lgms/code/research/lgallindo.github.io/DESIGN_BIBLE.md) file containing:
- **Visual Brand Concept**: Overall tone, keywords, and mood.
- **Design Tokens**: Raw CSS color values (light/dark mode) and typography metrics.
- **Visual Elements**: Button styles, layout spacing, cards, and animations.
- **Migration & Assets**: Rules for image optimization and directory mapping.
