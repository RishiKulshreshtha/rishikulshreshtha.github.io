# rishikulshreshtha.github.io

> Personal site: web accessibility & AI-readiness work, open-source Drupal modules, writing, talks — plus a footer-linked Playground of small arcade games.

**[rishikulshreshtha.github.io](https://rishikulshreshtha.github.io/)**

---

## Stack

```
Frontend    SvelteKit 2 · Svelte 5 · adapter-static · CSS Custom Properties
Audio       Web Audio API (synthesized — zero external files, Playground only)
Icons       Font Awesome 6 (self-hosted)
Fonts       Press Start 2P · VT323 · Inter
Testing     Vitest · Playwright
Hosting     GitHub Pages · GitHub Actions CI/CD
```

## Routes

```
/                          Home
/about                     About, background, and skills
/projects                  Open-source Drupal modules maintained
/talks                     Talks and presentations
/writing, /writing/[slug]  Writing index and posts (+ /rss.xml feed)
/playground                Five small arcade games — footer-linked, not gated
/accessibility-statement   Accessibility conformance statement
```

Every route is prerendered to static HTML at build time (`adapter-static`) with its own title and meta tags — no client-side-only routing.

---

## Run locally

```bash
npm install
npm run dev
```

```bash
npm test             # unit tests
npm run test:e2e     # E2E tests
npm run build        # prerender → docs/
npm run preview      # serve the production build locally
```
