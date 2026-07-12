<script>
  import Seo from '$lib/Seo.svelte';
  import Hero from '$lib/Hero.svelte';
  import Highlights from '$lib/Highlights.svelte';
  import Contact from '$lib/Contact.svelte';
  import LlmsTxtDemo from '$lib/demos/LlmsTxtDemo.svelte';
  import ContrastChecker from '$lib/demos/ContrastChecker.svelte';

  let { data } = $props();
</script>

<Seo
  title="Rishi Kulshreshtha | Web Accessibility & AI-Ready Infrastructure · Senior Drupal Engineer"
  description="Senior Drupal engineer focused on web accessibility (WCAG, Section 508, ADA) and AI-readiness of public-interest websites — higher education, research, and government. Maintainer of LLMs.txt Gen and other open-source Drupal modules. Building with Drupal since 2011."
  path="/"
/>

<Hero />
<Highlights latestPost={data.latestPost} />

<section class="demos section section--alt" aria-label="Try it yourself">
  <div class="container">
    <div class="section__header">
      <span class="section__label">// TRY IT</span>
      <h2 class="section__title">TWO SMALL TOOLS</h2>
    </div>

    <div class="demos__grid">
      <div class="demos__card dialog-box">
        <h3 class="demos__title">LLMs.txt Generator</h3>
        <LlmsTxtDemo />
      </div>
      <div class="demos__card dialog-box">
        <h3 class="demos__title">WCAG Contrast Checker</h3>
        <ContrastChecker />
      </div>
    </div>
  </div>
</section>

<Contact />

<style>
  .demos__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .demos__title {
    font-family: var(--font-heading);
    font-size: 1.125rem;
    letter-spacing: 0.02em;
    color: var(--accent-gold);
    margin-bottom: 1.25rem;
  }

  @media (min-width: 1024px) {
    .demos__grid {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
  }
</style>
