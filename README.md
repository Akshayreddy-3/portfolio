# Akshay Mamilla — portfolio site

A static site of six pages. All content lives in one file, `content.yaml`.

| File or folder | What it is |
|---|---|
| `content.yaml` | **Every word, link and contact detail on the site.** The only file you edit for content. |
| `public/` | Files the site serves as they are: resume PDF, screenshots. |
| `COPY.md` | The approved page copy that `content.yaml` was filled from. |
| `DESIGN.md` | The design system and the decision log. |
| `src/styles.css` | Styles. Colours and fonts are set once, at the top. |
| `build.mjs` | Turns `content.yaml` into the finished site in `dist/`. |
| `src/art.mjs` | The line-art illustrations. Pick one per project with `art:` in `content.yaml`. |
| `src/site.js` | Motion: the hero field, scroll reveals, the mobile menu. |
| `dist/` | The finished site. Rebuilt every time; never edit it by hand. |

## Preview on your computer

Needs Node.js 18 or newer. Run this once:

```bash
npm install
```

Then, to build and preview at http://localhost:4321:

```bash
npm run dev
```

After editing `content.yaml`, stop the preview (Ctrl+C) and run it again.

## Edit content

Open `content.yaml`. Change the text between quotes and save.

- **Fill in a placeholder.** Search for `TO BE SUPPLIED` and replace the whole value. Example: `email: "TO BE SUPPLIED: email"` becomes `email: "you@example.com"`. Every build prints the list of what is left.
- **Add your resume.** Put the PDF in `public/`, then set `resume: "your-file.pdf"` under `contact:`.
- **Add a screenshot.** Put the image in `public/`, then write its filename in that project's `screenshots:` list.
- **Add a project.** Copy one whole block under `projects:` (from `- slug:` down to its `cta:`), paste it below, and edit it. It gets a card on the Projects page and its own page at `/projects/<slug>/`. Set `featured: true` to show it on Home as well.
- **Formatting.** `**bold**` and `[link text](https://example.com)` work inside text.

### Before you share the site

The site starts in draft preview. Unfinished buttons look finished but do nothing, unfinished text shows a small "to be supplied" marker, and a "Draft preview" button in the bottom-left corner outlines everything still missing. To hide unfinished items from visitors, set this near the top of `content.yaml`:

```yaml
showPlaceholders: false
```

Hidden items simply do not appear, so fill in at least your email, LinkedIn and resume first.

## Put it online (free)

The site's address is `https://akshaymamilla.com` (set as `site.url` in `content.yaml`). Push this folder to a GitHub repository, pick one host, then connect the domain in that host's settings.

**Netlify or Vercel**

1. Create a new site from the GitHub repository.
2. Build command: `npm run build`
3. Publish (output) directory: `dist`

**GitHub Pages**

1. In the repository, open Settings → Pages and set Source to "GitHub Actions".
2. Push to the `main` branch. The workflow in `.github/workflows/pages.yml` builds and publishes the site.

**Connect the domain.** In the host's domain settings, add `akshaymamilla.com` and `www.akshaymamilla.com`. The host then shows the DNS records to add where you bought the domain. HTTPS is switched on by the host once the records are in place.

## Change colours or fonts

The colours and fonts are provisional (see `DESIGN.md`). To apply a brand kit, change the values in the `:root` block at the top of `src/styles.css`. Fonts are served from the site itself (no Google Fonts or other third-party requests). To change a font, install its `@fontsource` package, then update the `FONTS` list in `build.mjs` and the two `@font-face` blocks in `src/styles.css`.
