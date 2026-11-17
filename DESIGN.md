# DESIGN.md

The single design reference for Akshay Mamilla's portfolio site. It merges six style references into one system and records every design decision in the log at the end.

**Status: version 2. The site is built to this file with provisional colours and fonts. Version 1 was rejected as too plain; see D-030. Decisions marked Proposed are still open to change.**

## 1. How this file was put together

**Precedence rules**

1. CONTEXT.md comes first: recruiters and hiring managers are the audience, and the look must be professional, polished and corporate.
2. The brand kit wins on colours and fonts.
3. The references win on layout and feel.

**Hard rules from Akshay**

- Only copy from COPY.md appears on the site.
- No invented logos, press mentions, testimonials or stats.
- No third-party embeds or requests.

**Sources**

| File in `Design/` | Reference | Theme | What this site takes from it |
|---|---|---|---|
| `DESIGN.md` | Dala | Dark | Very large display type, alternating two-column rhythm, an animated field as the hero visual |
| `DESIGN (1).md` | Apple (product page) | Light | 28px tiles, the light card used as a contrast break |
| `DESIGN (2).md` | Apple (watch page) | Dark | Black stage, very large metric figures in a vivid colour |
| `DESIGN (3).md` | Resend | Dark | Hairline-bordered cards, restrained entrance motion |
| `DESIGN (4).md` | Air | Dark | Poster-scale type, light cards on a dark canvas |
| `DESIGN (5).md` | Index | Dark | Light wash at the top of the page, dashed eyebrow chips, blueprint line-art illustrations |

**Brand kit: NOT FOUND.** All six files are references from other sites. None contains Akshay's own colours or fonts. Until the kit is supplied, every colour and font below is **PROVISIONAL**. Tokens are named by role, so the brand kit's values can replace them without touching any component.

## 2. Design principles

1. **A black stage.** Everything sits on one black canvas. Depth comes from soft light, translucent hairlines and tiles, never from drop shadows.
2. **Type as the main event.** Very large headings with tight negative tracking carry each page.
3. **One accent.** Blue is the only colour. It marks the primary action, links, metric figures and the highlights in illustrations.
4. **Original imagery.** The hero field and the line-art illustrations are drawn in code for this site. They are abstract: no text, numbers or logos, and nothing copied from a reference.
5. **Proof stays real.** Figures, screenshots and facts are only ever the real ones from COPY.md.
6. **Calm motion.** Things rise into place and lines draw themselves once. Nothing bounces, and all motion stops for visitors who ask for reduced motion.

## 3. Colours (PROVISIONAL)

| Token | Value | Role |
|---|---|---|
| `--color-canvas` | `#000000` | Page background |
| `--color-surface` | `#0b0b0d` | Tile fill (bottom) |
| `--color-surface-2` | `#131316` | Tile fill (top) |
| `--color-line` | white at 10% | Borders and dividers |
| `--color-line-strong` | white at 22% | Hover borders, dashed chips, outlined buttons |
| `--color-text` | `#f5f5f7` | Headings and body text |
| `--color-text-muted` | `#a1a1a6` | Secondary text |
| `--color-accent` | `#0071e3` | Filled primary button |
| `--color-accent-hover` | `#0066cc` | Its hover state |
| `--color-accent-text` | `#3b9eff` | Links, metric figures, illustration highlights, focus ring |
| `--color-on-accent` | `#ffffff` | Text on the filled button |
| `--color-paper` | `#f5f5f7` | Light call-to-action card |
| `--color-ink` | `#1d1d1f` | Text on the light card |
| `--color-ink-muted` | `#515154` | Secondary text on the light card |

**Rules**

- One filled blue button per view.
- Text meets a 4.5:1 contrast ratio against its background.
- No status colours. The amber outline in draft preview is a working aid, not part of the public design.

## 4. Fonts (PROVISIONAL)

| Token | Value | Use |
|---|---|---|
| `--font-sans` | Inter (variable) | Everything except labels |
| `--font-mono` | JetBrains Mono | Eyebrows, tags, dates, fact labels |

Both are free and served from the site itself (D-022).

### Type scale

Sizes are fluid: they grow with the screen between the two values.

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Display (name on Home) | 52px to 148px | 600 | 0.92 | -0.055em |
| Page title (H1) | 44px to 96px | 600 | 0.98 | -0.045em |
| Case-study title | 40px to 76px | 600 | 1.0 | -0.045em |
| Section heading (H2) | 34px to 64px | 600 | 1.02 | -0.04em |
| Card heading (H3) | 22px to 28px | 600 | 1.15 | -0.025em |
| Metric figure | 72px to 144px | 600 | 0.84 | -0.065em |
| Skills line | 48px to 124px | 600 | 1.12 | -0.05em |
| Lede | 18px to 22px | 400 | 1.45 | 0 |
| Body | 17px (16px on phones) | 400 | 1.55 | 0 |
| Mono label | 12px, uppercase | 500 | 1.5 | +0.06em |

## 5. Spacing and shape

| Token | Value |
|---|---|
| Page max width | 1240px |
| Side padding | 24px, 16px on phones |
| Section gap | 88px to 176px |
| Tile gap | 20px to 24px |
| `--radius-pill` | 9999px: buttons, chips, header bar |
| `--radius-card` | 28px (22px on phones): tiles, screenshots |
| `--radius-sm` | 14px: small inner shapes |

**Light and surface**

- A soft blue radial light sits at the top of every page.
- Tiles have a faint vertical gradient, a 1px translucent border and a lighter top edge.
- Illustration panels have a dot grid and a blue glow from below.
- No drop shadows anywhere.

**Motion**

- One easing curve everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Headings rise in word by word. Sections rise 44px and sharpen from a soft blur as they enter the screen.
- Illustration lines draw themselves once; dashed connectors flow slowly; highlights pulse gently.
- Metric figures count up to their real value.
- The hero field moves continuously and lifts under the pointer. The skills line speeds up while the page scrolls and pauses on hover.
- A soft light follows the pointer across tiles.
- Scroll-linked, where the browser supports it: the hero eases back, illustrations drift, the timeline line grows, the light card and footer name settle into place.
- The header slides away while scrolling down and returns on the way up.
- Pages cross-fade into each other.
- All motion is off under reduced-motion settings, and the page reads fully without JavaScript.

## 6. Layout

- **Header.** A floating rounded glass bar: name, four links, a quiet Download resume pill. Collapses to a Menu button under 768px.
- **Home hero.** Full screen and centred: eyebrow chip, name at display size, subheading, opening lines, two buttons and three text links, over the animated field.
- **Section openings.** Left-aligned eyebrow chip and H2.
- **Four areas.** A bento grid of four tiles in a 7/5, 5/7 pattern, each with an illustration above its text.
- **Skills.** One line of very large type moving across the full width, alternating solid and outlined words.
- **Projects.** Full-width tiles, illustration on one side and text on the other, alternating sides.
- **Text sections.** Heading in a left column, text in the right.
- **Case studies.** Title, tags, then the opening text with very large metric figures beside an at-a-glance tile; a wide illustration; split text sections; screenshots to the right of their heading.
- **Experience.** A timeline with dates on the left of a vertical line and a tile per role. Education and certifications are tile grids.
- **Contact.** Large link rows with an arrow, then two tiles.
- **Closing call to action.** A light card.
- **Footer.** One line, the links, then the name very large and faded.
- **Breakpoints.** Phone under 640px, tablet 640px to 1023px, desktop 1024px and up.

## 7. Components

| Component | Spec |
|---|---|
| Primary button | Filled `--color-accent`, white text, pill, 50px tall, 15px weight 500. One per view. |
| Secondary button | Pill with a 1px `--color-line-strong` border; fills white on hover. On the light card it is outlined in ink. |
| Header button | Translucent white pill, 44px tall. |
| Text link | `--color-accent-text`, trailing chevron that moves on hover. |
| Eyebrow chip | Mono label in a dashed pill with an accent dot. |
| Tag chip | Mono text in a faintly filled pill. Used for tech stacks. |
| Tile | The card surface described in section 5. Border brightens on hover. |
| Illustration panel | Near-black panel with dot grid and glow, holding one line-art drawing. |
| Metric figure | Real figures only. Very large, blue gradient, with a small muted label. |
| Fact list | Mono label left, value right, hairline between rows. |
| Screenshot frame | 28px radius, 1px border, muted caption beneath. |
| Bullet list | Hairline-separated rows with a small accent ring. |
| Timeline entry | Mono dates, a node on the line (the latest is filled blue), and a tile. |
| Contact row | Mono label, large value, circular arrow that turns blue on hover. |
| Light call-to-action card | `--color-paper`, dark text, centred H2, buttons. |
| Draft preview | Only while `showPlaceholders` is true. See D-037. |

**Illustrations** are chosen per item in `content.yaml` with `art:`. Available: `chart`, `code`, `nodes`, `network`, `sorter`, `dashboard`. With none set, a plain pattern is used.

## 8. Accessibility baseline

- Visible focus ring: 2px `--color-accent-text` with a 3px offset.
- Contrast of at least 4.5:1 for text.
- Tap targets of at least 44px.
- One H1 per page, headings in order, alt text on every screenshot.
- A "Skip to content" link first.
- The moving skills line is decorative; a plain list carries the same words for screen readers.
- Illustrations and the hero field are hidden from screen readers.

## 9. Do and don't

**Do**

- Let one very large heading lead each screen.
- Keep everything on the black canvas, with tiles for grouped content.
- Use blue for the primary action, links and highlights only.
- Show only real figures and real screenshots.

**Don't**

- Add drop shadows, a second accent colour or stock imagery.
- Put two filled blue buttons in one view.
- Add text, numbers or logos to an illustration.
- Copy a reference's signature visual, logo or exact palette.

## 10. Decision log

Every design choice is recorded here. New decisions are added at the bottom with the next number.

**Status key:** Confirmed = agreed by Akshay. Proposed = recommended, awaiting review. Open = needs input. Superseded = replaced by a later decision.

| ID | Date | Decision | Why | Status |
|---|---|---|---|---|
| D-001 | 2026-11-16 | Brand kit wins on colours and fonts; references win on layout and feel. | Akshay's instruction. | Confirmed |
| D-002 | 2026-11-16 | CONTEXT.md requirements apply to every choice: recruiter audience; professional, polished, corporate. | Requirements were set before the design brief. | Confirmed |
| D-003 | 2026-11-16 | Colours are provisional and role-named until the brand kit is supplied. The site is built with them. | No brand kit was among the six files. Akshay said to use the provisional values. | Confirmed |
| D-004 | 2026-11-16 | Fonts are provisionally Inter and JetBrains Mono. The site is built with them. | No brand kit; these are the references' own named substitutes. Akshay said to use the provisional values. | Confirmed |
| D-005 | 2026-11-16 | Dark theme: black canvas with a `#111111` alternate band. | Five of six references are dark. Depends on the brand kit's colours. | Proposed |
| D-006 | 2026-11-16 | No shadows, gradients or glows anywhere. | All six references agree. | Superseded by D-030 |
| D-007 | 2026-11-16 | One accent colour, used for the primary button and links only. | All six references ration their accent. | Proposed |
| D-008 | 2026-11-16 | Pill buttons: one filled primary per view, the rest outlined. | Pills in three references. Filled (Apple, Dala) and outlined (Index, Air, Resend) are combined so "Download resume" stands out. | Proposed |
| D-009 | 2026-11-16 | Cards have a 1px hairline border and 16px radius. | Resend's card. Apple's 28px radius suits product photography, not text cards. | Superseded by D-033 |
| D-010 | 2026-11-16 | Three radius values only: pill, 16px, 24px. | The references use between two and eight; a short scale keeps the site consistent. | Superseded by D-033 |
| D-011 | 2026-11-16 | Headings are weight 600 with -0.02em tracking; display size is 64px. | Middle of the references' range (400 to 1000). Apple's values read as corporate. | Superseded by D-031 |
| D-012 | 2026-11-16 | 4px spacing base, 96px section gap, 1200px max width. | The most common values across the references. | Superseded by D-031 |
| D-013 | 2026-11-16 | Monospace labels for eyebrows, tech tags and dates. | Index and Resend; fits a technical portfolio. | Proposed |
| D-014 | 2026-11-16 | Items still marked TO BE SUPPLIED are hidden on the public site and kept as labeled placeholders in the content file. | CONTEXT.md asks for placeholders in the content file. Recruiters should not see unfinished slots. | Superseded by D-037 |
| D-015 | 2026-11-16 | No hero image, particles, 3D or photography. Imagery is project screenshots only. | Those visuals are the references' own brand signatures, and no such assets exist for this site. | Superseded by D-032 |
| D-016 | 2026-11-16 | Dashed borders (Index's signature) are not used for section containers. | Mixing Index's blueprint device with Apple's bands would blur both. | Superseded by D-034 |
| D-017 | 2026-11-16 | Home hero is a centred 720px column; all other sections are left-aligned. | Index and Apple heroes; Index's rule against centred body text. | Superseded by D-031 |
| D-018 | 2026-11-16 | Motion is limited to 150ms hover and focus transitions. | Resend. Keeps the site fast and calm. | Superseded by D-035 |
| D-019 | 2026-11-16 | A `showPlaceholders` switch in `content.yaml` controls D-014. On (the current setting), unfilled items show as dashed "to be supplied" slots; off, they are hidden. | With everything hidden the Contact page was nearly empty, which made the draft impossible to review. Dashed borders are used only for these slots. | Superseded by D-037 |
| D-020 | 2026-11-16 | The header always has a solid canvas background; only its bottom hairline appears on scroll. Replaces the transparent-at-top header in section 6. | In testing, page text showed through the transparent header during scrolling. | Superseded by D-036 |
| D-021 | 2026-11-16 | Mobile navigation collapses into a "Menu" button below 768px; card grids go to one column below 640px. | The four links plus the resume button do not fit a phone-width header. | Proposed |
| D-022 | 2026-11-16 | Fonts are self-hosted. No Google Fonts link, no analytics, no embeds: pages request nothing from a third party. | Akshay's hard rule: no third-party embeds. | Confirmed |
| D-023 | 2026-11-16 | The header's Download resume button is outlined, not filled. | A filled header button sat beside the filled button in the hero, breaking "one filled button per view" (D-008). | Superseded by D-036 |
| D-024 | 2026-11-16 | Added `--color-accent-hover` (`#0066cc`) for the filled button's hover state. | A lighter hover blue failed the 4.5:1 contrast rule with white text. It is a shade of the same accent, not a second accent. | Proposed |
| D-025 | 2026-11-16 | Cards take the opposite fill to their band: canvas cards on surface bands, surface cards on canvas bands. | A surface card on a surface band had no contrast. | Superseded by D-033 |
| D-026 | 2026-11-16 | On desktop, text-only sections (Skills, About me, case-study sections) use a 4/8 column split: H2 left, body right at 600px. Skills are a hairline-ruled list at H3 size. | Gives the long page an editorial rhythm using only type, space and hairlines. | Superseded by D-038 |
| D-027 | 2026-11-16 | Case-study opening: text left, at-a-glance card right. Screenshots sit in their own section, text left and screenshots right, stacked one per row. | Keeps the section order in COPY.md, and dashboard screenshots need the width. | Superseded by D-038 |
| D-028 | 2026-11-16 | Bands alternate automatically, and the closing call-to-action band is always surface. Where that would put two canvas bands together, the second joins the first with no gap. | Keeps D-006's flat alternation correct on every page, including pages added later. | Superseded by D-033 |
| D-029 | 2026-11-16 | Only text from COPY.md appears on the site. Eyebrows reuse COPY.md's own section names. No decorative numbering, no monogram or logo; the browser-tab icon is a plain ring. The only extra words are the functional labels "Menu" and "Skip to content" and the "to be supplied" markers. | Akshay's hard rules: only his copy; never invent logos, press mentions, testimonials or stats. | Confirmed |
| D-030 | 2026-11-16 | Version 2 of the design. The strict "flat" rule is dropped: soft radial light, subtle surface gradients and a glass header are allowed. Still no drop shadows. | Akshay reviewed version 1 and said it did not look good next to the references. Index, Resend and Apple all use light washes and layered surfaces. | Proposed |
| D-031 | 2026-11-16 | Type is much larger and tighter: the name is up to 148px, page titles up to 96px, section headings up to 64px, with tracking from -0.04em to -0.055em. Sizes are fluid. Max width is 1240px and section gaps are up to 176px. | The references set display type at 64 to 113px with tight tracking; version 1 stopped at 64px and read as timid. | Proposed |
| D-032 | 2026-11-16 | The site has its own imagery: an animated field of points in the Home hero, and line-art illustrations for the four areas and each project. All are abstract, drawn in code, with no text, numbers or logos. | Every reference has a signature visual. These are original to this site (a surface plot and blueprint-style diagrams fit a data and software portfolio) and are not copies of the references' visuals. | Proposed |
| D-033 | 2026-11-16 | One card surface, the tile: 28px radius, 1px translucent border, a faint top highlight. All sections sit on the black canvas; alternating bands are removed. Radius values are now pill, 28px and 14px. | Apple's 28px tiles and Resend's hairline cards on a single black canvas, as in five of the six references. | Proposed |
| D-034 | 2026-11-16 | Eyebrows are dashed chips with a small accent dot. | Index's eyebrow chip. Dashed lines are no longer reserved for placeholders. | Proposed |
| D-035 | 2026-11-16 | Motion: sections fade up as they scroll into view, hero content rises in on load, illustration lines draw themselves, the hero field and skills line move continuously. All of it is off when the visitor's system asks for reduced motion. | Resend and Dala both use entrance and ambient motion. | Proposed |
| D-036 | 2026-11-16 | The header is a floating rounded glass bar. Its Download resume button is a quiet translucent pill, so the page keeps one filled blue button per view. | Index's and Dala's rounded navigation; keeps D-008's intent. | Proposed |
| D-037 | 2026-11-16 | Draft preview replaces dashed placeholder buttons. While `showPlaceholders` is true, unfinished buttons look finished but do nothing, unfinished text shows a small marker, and a "Draft preview" button in the corner outlines everything still missing. Set to false, unfinished items are hidden. | Rows of dashed "to be supplied" buttons made the draft look broken and hid the real design. | Proposed |
| D-038 | 2026-11-16 | Page layouts: Home areas are a four-tile bento grid; skills are one line of very large moving type; projects are full-width tiles with the illustration on alternating sides; case studies open with very large metric figures beside an at-a-glance tile; experience is a timeline; contact details are large link rows. | Apple's tiles, Dala's alternating two-column rhythm, Air's poster-scale type and Apple's large metric figures. | Proposed |
| D-039 | 2026-11-16 | The closing call to action is a light card (`#f5f5f7`) on the dark page, with dark text. | Apple's and Air's light surfaces used as a contrast break on a dark page. | Proposed |
| D-040 | 2026-11-16 | The footer ends with the name set very large and faded. | Air's poster-scale type. It is his name, so no new copy is added. | Proposed |
| D-041 | 2026-11-16 | More motion, at Akshay's request. Headings rise in word by word; sections sharpen from a soft blur as they arrive; metric figures count up to their real value; a soft light follows the pointer across tiles; the hero field lifts under the pointer; the skills line speeds up while the page scrolls; illustrations drift slightly against the scroll; the hero eases back as it scrolls away; the header slides away going down and returns going up; pages cross-fade into each other. One easing curve is used throughout. Extends D-035. | Akshay liked version 2 and asked for smoother, richer animation. | Confirmed |
| D-042 | 2026-11-16 | "Book a call" is removed everywhere: buttons, footer, the Contact row and the booking link in the content file. Closing cards now offer Email me and Connect on LinkedIn. The visitor actions are email, resume and LinkedIn. | Akshay asked for it to be removed. | Confirmed |

