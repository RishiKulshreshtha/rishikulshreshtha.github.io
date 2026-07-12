<script>
  import Seo from '$lib/Seo.svelte';
</script>

<Seo
  title="Talks — Rishi Kulshreshtha"
  description="Talks and presentations by Rishi Kulshreshtha on Drupal, web accessibility, and AI-readiness."
  path="/talks"
  noindex={true}
/>

<section class="section" aria-label="Talks">
  <div class="container">
    <div class="section__header">
      <span class="section__label">// SPEAKING</span>
      <h1 class="section__title">TALKS</h1>
    </div>

    <div class="talk-card">
      <span class="talk-card__status">UPCOMING</span>
      <h2 class="talk-card__title">NEDCamp</h2>
      <p class="talk-card__date">November 2026</p>
      <p class="talk-card__desc">Details, slides, and a recording will land here after the talk.</p>
    </div>
  </div>
</section>

<style>
  .talk-card {
    max-width: 640px;
    margin: 0 auto;
    padding: 2rem;
    background: var(--bg-mid);
    border: 3px solid var(--border-color);
    text-align: center;
  }

  .talk-card__status {
    font-family: var(--font-heading);
    font-size: 0.4375rem;
    color: var(--accent-green);
    letter-spacing: 0.1em;
  }

  .talk-card__title {
    font-family: var(--font-heading);
    font-size: 0.875rem;
    color: var(--accent-gold);
    margin: 0.75rem 0 0.25rem;
    letter-spacing: 0.05em;
  }

  .talk-card__date {
    color: var(--text-muted);
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .talk-card__desc {
    color: var(--text-dim);
    font-size: 1.0625rem;
    line-height: 1.7;
  }
</style>
