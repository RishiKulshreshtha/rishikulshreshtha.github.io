<script>
  import Seo from '$lib/Seo.svelte';
</script>

<Seo
  title="Accessibility Statement — Rishi Kulshreshtha"
  description="Accessibility conformance statement for rishikulshreshtha.github.io — target level, known limitations, third-party services, and how to report an issue."
  path="/accessibility-statement"
/>

<section class="a11y section" aria-label="Accessibility statement">
  <div class="container">
    <div class="section__header">
      <span class="section__label">// CONFORMANCE</span>
      <h1 class="section__title">ACCESSIBILITY STATEMENT</h1>
    </div>

    <div class="a11y__body prose">
      <p>This site targets WCAG 2.1 Level AA conformance. That means: full keyboard operability,
      sufficient color contrast in both light and dark themes, proper landmarks and heading
      structure, and visible focus indicators throughout.</p>

      <h2>Known limitation</h2>
      <p>The five games on the <a href="/playground">Playground</a> page are visual, mouse/keyboard/touch-driven
      arcade minigames (two use HTML canvas). They are not operable or meaningful via screen reader, and that's
      disclosed on that page rather than hidden. Nothing on the rest of the site — About, Projects, Talks,
      Writing, or Home — depends on them; they're an optional curiosity, not gated content.</p>

      <h2>Third-party services</h2>
      <p>This site loads Google Tag Manager (basic page-view analytics) on every page, and the
      "Say Hello" contact form on the homepage is embedded from Fillout. Neither is used to
      collect anything beyond standard analytics and whatever you voluntarily submit in the
      contact form; both are outside this statement's direct control, so their own accessibility
      and privacy practices may differ from the rest of this site.</p>

      <h2>Last reviewed</h2>
      <p>This statement was last reviewed alongside the site's SvelteKit rebuild. If you hit a barrier
      anywhere on the site outside the Playground page, that's a bug, not a known limitation — please
      report it.</p>

      <h2>Reporting an issue</h2>
      <p>Open an issue on <a href="https://github.com/RishiKulshreshtha/rishikulshreshtha.github.io" target="_blank" rel="noopener">GitHub</a>,
      or reach out via the contact form on the <a href="/">homepage</a>.</p>
    </div>
  </div>
</section>

<style>
  .a11y__body {
    max-width: 700px;
    margin: 0 auto;
  }

  .a11y__body p {
    color: var(--text-dim);
    font-size: 1.0625rem;
    line-height: 1.8;
    margin-bottom: 1.25rem;
  }

  .a11y__body h2 {
    font-family: var(--font-heading);
    font-size: 0.6875rem;
    letter-spacing: 0.05em;
    color: var(--accent-gold);
    margin: 2rem 0 1rem;
  }

  .a11y__body a {
    color: var(--accent-blue);
    text-decoration: underline;
  }
</style>
