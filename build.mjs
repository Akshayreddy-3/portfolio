// Builds the static site into dist/ from content.yaml.
// Run with: npm run build
// You should not need to edit this file to change site content.

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import YAML from 'yaml';
import { art } from './src/art.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');
const PUBLIC = join(ROOT, 'public');

// Fonts are copied from npm packages and served from the site itself,
// so pages make no requests to any third party.
const FONTS = [
  ['node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'inter-latin-wght-normal.woff2'],
  ['node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2', 'jetbrains-mono-latin-500-normal.woff2'],
];

// ---------------------------------------------------------------- content ---

let c;
try {
  c = YAML.parse(readFileSync(join(ROOT, 'content.yaml'), 'utf8'));
} catch (err) {
  console.error('\ncontent.yaml could not be read. Check the line below for a');
  console.error('missing quote, a tab, or wrong indentation:\n');
  console.error('  ' + err.message + '\n');
  process.exit(1);
}

// true  = draft preview: unfinished buttons look finished but do nothing,
//         unfinished text shows a small "to be supplied" marker.
// false = unfinished items are hidden from visitors.
const SHOW = c.site.showPlaceholders !== false;
const warnings = [];

const tbs = (v) => typeof v === 'string' && /^TO BE SUPPLIED/i.test(v.trim());
const missing = (v) => v === undefined || v === null || (typeof v === 'string' && (v.trim() === '' || tbs(v)));
const tbsLabel = (v) => {
  const rest = String(v || '').replace(/^TO BE SUPPLIED:?\s*/i, '').trim();
  return rest ? `To be supplied: ${rest}` : 'To be supplied';
};

// A file named in content.yaml must exist in public/. If not, treat as missing.
function publicFile(v, what) {
  if (missing(v)) return null;
  if (!existsSync(join(PUBLIC, v))) {
    warnings.push(`${what}: "${v}" is not in the public/ folder, so it was left out.`);
    return null;
  }
  return v;
}

// List every placeholder still in the content file.
const todo = [];
(function walk(node, path) {
  if (typeof node === 'string') {
    if (tbs(node)) todo.push(`${path}  →  ${node}`);
  } else if (Array.isArray(node)) {
    node.forEach((n, i) => walk(n, `${path}[${i + 1}]`));
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
  }
})(c, '');

// ---------------------------------------------------------------- helpers ---

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Internal links are written as /path/ in content and made relative here,
// so the site works at any address (including a GitHub Pages sub-folder).
const href = (root, path) => (path === '/' ? root || './' : root + path.replace(/^\//, ''));

function inline(s, root) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, url) =>
      url.startsWith('/')
        ? `<a class="link" href="${href(root, url)}">${text}</a>`
        : `<a class="link" href="${url}" rel="noopener">${text}</a>`
    );
}

const slot = (v) => (SHOW ? `<span class="tbs">${esc(tbsLabel(v))}</span>` : '');
const paras = (list, root, cls = '') =>
  (list || []).filter((p) => !missing(p)).map((p) => `<p${cls ? ` class="${cls}"` : ''}>${inline(p, root)}</p>`).join('\n');
const tag = (t) => (missing(t) ? '' : `<p class="tag">${esc(t)}</p>`);
const chips = (list) => `<ul class="chips">${(list || []).map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>`;
const bullets = (list, root) => {
  const items = (list || []).map((b) => (tbs(b) ? (SHOW ? `<li>${slot(b)}</li>` : '') : `<li>${inline(b, root)}</li>`)).filter(Boolean);
  return items.length ? `<ul class="bullets">${items.join('')}</ul>` : '';
};
const stripUrl = (u) => String(u).replace(/^https?:\/\//, '').replace(/\/$/, '');
const ARROW = '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 17 17 7M9 7h8v8"/></svg>';

// ---------------------------------------------------------------- actions ---
// The visitor actions (email, resume, LinkedIn), plus GitHub and "View projects".

const resumeFile = publicFile(c.contact.resume, 'Resume');

const ACTIONS = {
  resume: { label: 'Download resume', value: () => resumeFile, raw: () => c.contact.resume, url: (v, root) => root + v, attrs: ' download' },
  email: { label: 'Email me', value: () => c.contact.email, raw: () => c.contact.email, url: (v) => `mailto:${v}`, attrs: '' },
  linkedin: { label: 'Connect on LinkedIn', value: () => c.contact.linkedin, raw: () => c.contact.linkedin, url: (v) => v, attrs: ' rel="noopener"' },
  github: { label: 'GitHub', value: () => c.contact.github, raw: () => c.contact.github, url: (v) => v, attrs: ' rel="noopener"' },
  projects: { label: 'View projects', value: () => '/projects/', raw: () => '', url: (v, root) => href(root, v), attrs: '' },
};

// variant: 'primary' | 'secondary' | 'ghost' | 'link'
function action(key, variant, root) {
  const a = ACTIONS[key];
  const v = a.value();
  const cls = variant === 'link' ? 'link' : `btn btn--${variant}`;
  if (missing(v)) {
    if (!SHOW) return '';
    // Draft preview: looks finished, does nothing.
    return `<span class="${cls} is-tbs" aria-disabled="true" title="${esc(tbsLabel(a.raw()))}">${a.label}</span>`;
  }
  return `<a class="${cls}" href="${esc(a.url(v, root))}"${a.attrs}>${a.label}</a>`;
}
// The first action is the one filled button; the rest are outlined.
const actions = (keys, root, firstVariant = 'primary') =>
  keys.map((k, i) => action(k, i === 0 ? firstVariant : 'secondary', root)).filter(Boolean).join('\n');

// ------------------------------------------------------------- components ---

const section = (inner, cls = '') => (inner && inner.trim() ? `<section class="section${cls ? ' ' + cls : ''}">\n${inner}\n</section>` : '');

const sectionHead = (eyebrowText, heading) => `
<header class="section-head reveal">
  ${tag(eyebrowText)}
  <h2>${esc(heading)}</h2>
</header>`;

// Closing call to action: a light card on the dark page.
const cta = (block, keys, root, firstVariant = 'primary') => {
  const buttons = actions(keys, root, firstVariant);
  if (!buttons) return ''; // no working buttons: leave it out
  return `
<section class="cta">
  <div class="cta__card reveal">
    <h2>${esc(block.heading)}</h2>
    ${missing(block.text) ? '' : `<p class="cta__text">${esc(block.text)}</p>`}
    <div class="actions actions--center">${buttons}</div>
  </div>
</section>`;
};

// A large project tile: illustration on one side, text on the other.
const feature = (p, text, root, flip) => `
<article class="feature tile reveal${flip ? ' feature--flip' : ''}">
  <div class="feature__art art-panel">${art(p.art)}</div>
  <div class="feature__body">
    ${chips(p.tags)}
    <h3><a href="${href(root, `/projects/${p.slug}/`)}">${esc(p.title)}</a></h3>
    <p>${inline(text, root)}</p>
    <span class="link feature__more" aria-hidden="true">Read the case study</span>
  </div>
</article>`;

const pageHead = (h, root, extra = '') => `
<section class="page-head">
  <div class="wrap">
    <h1>${esc(h.heading)}</h1>
    <div class="page-head__intro">${paras(h.intro, root, 'lede')}</div>
    ${extra}
  </div>
</section>`;

// Editorial section: heading in the left column, content in the right.
const split = (heading, body) => `
<div class="split reveal">
  <h2>${esc(heading)}</h2>
  <div class="split__body">${body}</div>
</div>`;

const contentSections = (sections, root) =>
  (sections || []).map((s) => split(s.heading, `${paras(s.paragraphs, root)}${bullets(s.bullets, root)}`)).join('\n');

// ----------------------------------------------------------------- layout ---

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects/' },
  { label: 'Experience', path: '/experience/' },
  { label: 'Contact', path: '/contact/' },
];

const siteUrl = missing(c.site.url) ? null : c.site.url.replace(/\/$/, '');
const pages = [];

// Content-Security-Policy, sent as a meta tag because GitHub Pages cannot set
// headers. Only this site's own files may load; the one inline script is
// allowed by its hash, so nothing injected into a page could run.
const INLINE_JS = "document.documentElement.className='js'";
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'sha256-${createHash('sha256').update(INLINE_JS).digest('base64')}'`,
  "style-src 'self'",
  "style-src-attr 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23000'/%3E%3Ccircle cx='32' cy='32' r='13' fill='none' stroke='%23f5f5f7' stroke-width='6'/%3E%3C/svg%3E";

function layout({ path, title, description, body, jsonLd }) {
  const depth = path.split('/').filter(Boolean).length;
  const root = '../'.repeat(depth);
  const isCurrent = (p) => (p === '/' ? path === '/' : path.startsWith(p));
  const canonical = siteUrl ? `<link rel="canonical" href="${siteUrl}${path}">\n<meta property="og:url" content="${siteUrl}${path}">` : '';
  const footerLinks = ['email', 'resume', 'linkedin', 'github'].map((k) => action(k, 'link', root)).filter(Boolean).join('\n      ');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:site_name" content="${esc(c.site.name)}">
${canonical}
<meta name="theme-color" content="#000000">
<meta name="color-scheme" content="dark">
<link rel="icon" href="${FAVICON}">
<link rel="preload" href="${root}fonts/${FONTS[0][1]}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${root}styles.css">
<script>${INLINE_JS}</script>
<script src="${root}site.js" defer></script>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header" id="site-header">
  <div class="site-header__bar">
    <a class="site-header__name" href="${href(root, '/')}">${esc(c.site.name)}</a>
    <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul>
        ${NAV.map((n) => `<li><a href="${href(root, n.path)}"${isCurrent(n.path) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('\n        ')}
      </ul>
      ${action('resume', 'ghost', root)}
    </nav>
  </div>
</header>
<main id="main">
${body(root)}
</main>
<footer class="site-footer">
  <div class="wrap site-footer__top">
    <p class="site-footer__line">${esc(c.site.footerLine)}</p>
    <div class="site-footer__links">
      ${footerLinks}
    </div>
  </div>
  <p class="site-footer__mark" aria-hidden="true">${esc(c.site.name)}</p>
</footer>
${SHOW && todo.length ? `<button type="button" class="draft-pill" id="draft-pill" aria-pressed="false">Draft preview · ${todo.length} to be supplied</button>` : ''}
</body>
</html>
`;
}

function page(def) {
  pages.push(def.path);
  const dir = join(DIST, def.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), layout(def));
}

// ------------------------------------------------------------------ build ---

rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'fonts'), { recursive: true });
if (existsSync(PUBLIC)) cpSync(PUBLIC, DIST, { recursive: true });
cpSync(join(ROOT, 'src', 'styles.css'), join(DIST, 'styles.css'));
cpSync(join(ROOT, 'src', 'site.js'), join(DIST, 'site.js'));
for (const [from, to] of FONTS) {
  if (!existsSync(join(ROOT, from))) {
    console.error('\nFonts are missing. Run "npm install" once, then build again.\n');
    process.exit(1);
  }
  cpSync(join(ROOT, from), join(DIST, 'fonts', to));
}

const projects = c.projects || [];

// ------------------------------------------------------------------- Home ---

page({
  path: '/',
  title: c.home.pageTitle,
  description: c.home.metaDescription,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: c.site.name,
    address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Houston-Clear Lake' },
    knowsAbout: c.home.skills,
    ...(siteUrl ? { url: siteUrl } : {}),
    ...([c.contact.linkedin, c.contact.github].some((v) => !missing(v))
      ? { sameAs: [c.contact.linkedin, c.contact.github].filter((v) => !missing(v)) }
      : {}),
  },
  body: (root) => {
    const textLinks = ['email', 'linkedin'].map((k) => action(k, 'link', root)).filter(Boolean).join('\n');
    const skills = c.home.skills.map((s) => `<span class="marquee__item">${esc(s)}</span>`).join('');
    const featured = projects.filter((p) => p.featured);
    return `
<section class="hero">
  <canvas class="hero__field" id="field" aria-hidden="true"></canvas>
  <div class="hero__inner">
    ${tag(c.home.eyebrow)}
    <h1 class="display">${esc(c.home.heading)}</h1>
    <p class="hero__sub">${esc(c.home.subheading)}</p>
    <div class="hero__intro">${paras(c.home.intro, root)}</div>
    <div class="actions actions--center">${actions(['resume', 'projects'], root)}</div>
    ${textLinks ? `<div class="hero__links">${textLinks}</div>` : ''}
  </div>
</section>
${section(`<div class="wrap">
  ${sectionHead(c.home.areasEyebrow, c.home.areasHeading)}
  <div class="bento">
    ${c.home.areas.map((a, i) => `<article class="tile area reveal" style="--d:${i % 2}">
      <div class="area__art art-panel">${art(a.art)}</div>
      <div class="area__body"><h3>${esc(a.title)}</h3><p>${inline(a.text, root)}</p></div>
    </article>`).join('\n    ')}
  </div>
</div>`)}
${section(`<div class="wrap">
  <header class="section-head reveal"><h2>${esc(c.home.skillsHeading)}</h2></header>
</div>
<div class="marquee reveal" aria-hidden="true">
  <div class="marquee__track"><div class="marquee__group">${skills}</div><div class="marquee__group">${skills}</div></div>
</div>
<ul class="visually-hidden">${c.home.skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`, 'section--skills')}
${section(`<div class="wrap">
  ${sectionHead(c.home.featuredEyebrow, c.home.featuredHeading)}
  <div class="features">
    ${featured.map((p, i) => feature(p, p.featuredSummary || p.summary, root, i % 2 === 1)).join('\n')}
  </div>
  <p class="after-grid reveal"><a class="btn btn--secondary" href="${href(root, '/projects/')}">See all projects</a></p>
</div>`)}
${section(`<div class="wrap">
  ${split(c.home.aboutHeading, `<div class="statement">${paras(c.home.about, root)}</div>`)}
</div>`)}
${cta(c.home.cta, ['resume', 'email', 'linkedin'], root)}`;
  },
});

// --------------------------------------------------------------- Projects ---

page({
  path: '/projects/',
  title: c.projectsPage.pageTitle,
  description: c.projectsPage.metaDescription,
  body: (root) => `
${pageHead(c.projectsPage, root)}
${section(`<div class="wrap">
  <div class="features">
    ${projects.map((p, i) => feature(p, p.summary, root, i % 2 === 1)).join('\n')}
  </div>
</div>`, 'section--flush')}
${cta(c.projectsPage.cta, ['email', 'linkedin'], root)}`,
});

// ----------------------------------------------- One page per case study ---

for (const p of projects) {
  const shots = (p.screenshots || []).map((s) => ({ ...s, ok: publicFile(s.file, `Screenshot for "${p.title}"`) }));
  const links = (p.links || [])
    .map((l) =>
      missing(l.url)
        ? SHOW ? `<span class="btn btn--secondary is-tbs" aria-disabled="true" title="${esc(tbsLabel(l.url))}">${esc(l.label)}</span>` : ''
        : `<a class="btn btn--secondary" href="${esc(l.url)}" rel="noopener">${esc(l.label)}</a>`
    )
    .filter(Boolean);
  const media = (root) =>
    shots
      .map((s) => {
        const cap = missing(s.caption) ? '' : `<figcaption>${esc(s.caption)}</figcaption>`;
        if (s.ok) return `<figure class="media"><img src="${root}${esc(s.ok)}" alt="${esc(s.alt)}" loading="lazy">${cap}</figure>`;
        return SHOW ? `<figure class="media media--tbs"><div class="media__empty"><span class="tbs">${esc(tbsLabel(s.file))}</span></div>${cap}</figure>` : '';
      })
      .filter(Boolean);

  page({
    path: `/projects/${p.slug}/`,
    title: p.pageTitle || `${p.title} | ${c.site.name}`,
    description: p.metaDescription || p.summary,
    body: (root) => {
      const frames = media(root);
      const hasMedia = links.length || frames.length;
      const closing = contentSections(p.closingSections, root);
      const metrics = (p.metrics || []).length
        ? `<div class="metrics">${p.metrics.map((m) => `<div class="metric"><span class="metric__figure">${esc(m.figure)}</span><span class="metric__label">${esc(m.label)}</span></div>`).join('')}</div>`
        : '';
      const glance = (p.glance || []).length
        ? `<aside class="tile glance" aria-label="At a glance"><h2 class="glance__title">At a glance</h2><dl class="facts">${p.glance.map((g) => `<div><dt>${esc(g.label)}</dt><dd>${inline(g.value, root)}</dd></div>`).join('')}</dl></aside>`
        : '';
      return `
<section class="page-head page-head--case">
  <div class="wrap">
    <p class="crumb"><a href="${href(root, '/projects/')}">Projects</a><span aria-hidden="true">/</span>Case study</p>
    <h1>${esc(p.title)}</h1>
    ${chips(p.tags)}
    <div class="case-top">
      <div class="case-top__text">${paras(p.intro, root, 'lede')}${metrics}</div>
      ${glance}
    </div>
  </div>
</section>
${section(`<div class="wrap"><div class="tile art-panel art-panel--wide reveal">${art(p.art)}</div></div>`, 'section--flush')}
${section(`<div class="wrap rows">${contentSections(p.sections, root)}</div>`)}
${section(hasMedia ? `<div class="wrap">
  <div class="media-block reveal">
    <div class="media-block__text">
      <h2>${esc(p.mediaHeading || 'Screenshots')}</h2>
      ${missing(p.mediaNote) ? '' : `<p>${inline(p.mediaNote, root)}</p>`}
      ${links.length ? `<div class="actions">${links.join('\n')}</div>` : ''}
    </div>
    ${frames.length ? `<div class="media-list">${frames.join('\n')}</div>` : ''}
  </div>
</div>` : '')}
${section(closing ? `<div class="wrap rows">${closing}</div>` : '')}
${cta(p.cta, ['email', 'linkedin'], root)}
<div class="back"><div class="wrap"><a class="link link--back" href="${href(root, '/projects/')}">Back to all projects</a></div></div>`;
    },
  });
}

// ---------------------------------------------- Experience & certifications ---

page({
  path: '/experience/',
  title: c.experiencePage.pageTitle,
  description: c.experiencePage.metaDescription,
  body: (root) => {
    const resume = action('resume', 'primary', root);
    const certs = (c.certifications || []).filter((x) => SHOW || !missing(x.name));
    return `
${pageHead(c.experiencePage, root, resume ? `<div class="actions">${resume}</div>` : '')}
${section(`<div class="wrap">
  <header class="section-head reveal"><h2>${esc(c.experiencePage.experienceHeading)}</h2></header>
  <div class="timeline">
    ${(c.experience || []).map((e) => `<article class="t-entry reveal">
      <p class="t-entry__dates">${tbs(e.dates) ? slot(e.dates) : esc(e.dates)}</p>
      <span class="t-entry__node" aria-hidden="true"></span>
      <div class="tile t-entry__card">
        <h3>${esc(e.role)}</h3>
        <p class="t-entry__org">${[e.org, e.location].filter((v) => !missing(v)).map(esc).join(' · ')}</p>
        ${bullets(e.bullets, root)}
      </div>
    </article>`).join('\n    ')}
  </div>
</div>`)}
${section(`<div class="wrap">
  <header class="section-head reveal"><h2>${esc(c.experiencePage.educationHeading)}</h2></header>
  <div class="cards cards--2">
    ${(c.education || []).map((e, i) => `<article class="tile card reveal" style="--d:${i}">
      ${missing(e.detail) ? '' : `<p class="card__meta">${esc(e.detail)}</p>`}
      <h3>${esc(e.degree)}</h3>
      <p class="card__sub">${esc(e.school)}</p>
    </article>`).join('\n    ')}
  </div>
</div>`)}
${section(certs.length ? `<div class="wrap">
  <header class="section-head reveal"><h2>${esc(c.experiencePage.certificationsHeading)}</h2></header>
  <div class="cards cards--3">
    ${certs.map((x, i) => `<article class="tile card reveal" style="--d:${i}">
      <p class="card__meta">Earned ${missing(x.earned) ? slot(x.earned) : esc(x.earned)}</p>
      <h3>${missing(x.name) ? slot(x.name) : esc(x.name)}</h3>
      <p class="card__foot">${missing(x.verifyUrl) ? (SHOW ? `<span class="link is-tbs" aria-disabled="true" title="${esc(tbsLabel(x.verifyUrl))}">Verify</span>` : '') : `<a class="link" href="${esc(x.verifyUrl)}" rel="noopener">Verify</a>`}</p>
    </article>`).join('\n    ')}
  </div>
</div>` : '')}
${cta(c.experiencePage.cta, ['resume', 'linkedin'], root)}`;
  },
});

// ---------------------------------------------------------------- Contact ---

const contactRows = [
  { label: 'Email', v: c.contact.email, url: (v) => `mailto:${v}`, text: (v) => v },
  { label: 'LinkedIn', v: c.contact.linkedin, url: (v) => v, text: stripUrl, ext: true },
  { label: 'GitHub', v: c.contact.github, url: (v) => v, text: stripUrl, ext: true },
  { label: 'Phone', v: c.contact.phone, url: (v) => `tel:${String(v).replace(/[^+\d]/g, '')}`, text: (v) => v },
];

page({
  path: '/contact/',
  title: c.contactPage.pageTitle,
  description: c.contactPage.metaDescription,
  body: (root) => {
    const rows = contactRows.filter((r) => SHOW || !missing(r.v));
    const resume = action('resume', 'primary', root);
    return `
${pageHead(c.contactPage, root)}
${section(rows.length ? `<div class="wrap">
  <header class="section-head reveal"><h2>${esc(c.contactPage.waysHeading)}</h2></header>
  <ul class="c-list">
    ${rows.map((r, i) => missing(r.v)
      ? `<li class="reveal" style="--d:${i}"><div class="c-row is-empty"><span class="c-row__label">${r.label}</span><span class="c-row__value">${slot(r.v)}</span></div></li>`
      : `<li class="reveal" style="--d:${i}"><a class="c-row" href="${esc(r.url(r.v))}"${r.ext ? ' rel="noopener"' : ''}><span class="c-row__label">${r.label}</span><span class="c-row__value">${esc(r.text(r.v))}</span>${ARROW}</a></li>`).join('\n    ')}
  </ul>
</div>` : '', 'section--flush')}
${section(`<div class="wrap">
  <div class="cards cards--2">
    ${resume ? `<article class="tile card card--lg reveal">
      <h2>${esc(c.contactPage.resumeHeading)}</h2>
      <p class="card__sub">${esc(c.contactPage.resumeText)}</p>
      <div class="actions">${resume}</div>
    </article>` : ''}
    <article class="tile card card--lg reveal" style="--d:1">
      <h2>${esc(c.contactPage.locationHeading)}</h2>
      <p class="card__sub">${esc(c.contactPage.locationText)}</p>
    </article>
  </div>
</div>`)}`;
  },
});

// ------------------------------------------------------- robots + sitemap ---

writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
if (siteUrl) {
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`).join('\n')}\n</urlset>\n`
  );
}

// ----------------------------------------------------------------- report ---

console.log(`\nBuilt ${pages.length} pages into dist/`);
pages.forEach((p) => console.log('  ' + p));
if (warnings.length) {
  console.log('\nWarnings:');
  warnings.forEach((w) => console.log('  ! ' + w));
}
if (todo.length) {
  console.log(`\n${todo.length} items still to be supplied in content.yaml (${SHOW ? 'draft preview: marked on the page' : 'hidden from visitors'}):`);
  todo.forEach((t) => console.log('  - ' + t));
}
console.log('');
