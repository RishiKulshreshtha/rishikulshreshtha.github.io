<script>
  import { fadeIn } from './fadeIn.js';

  let { latestPost = null } = $props();

  const cards = [
    {
      href: 'https://www.drupal.org/project/llms_txt_gen',
      icon: 'fas fa-robot',
      label: '// MODULE',
      title: 'LLMs.txt Gen',
      desc: 'A Drupal module that generates llms.txt so AI agents can read a site the way it actually works, not a scraped guess. Try the live demo below.',
      cta: 'View on Drupal.org',
    },
    {
      href: '/about',
      icon: 'fas fa-universal-access',
      label: '// PRACTICE',
      title: 'Accessibility',
      desc: 'WCAG, Section 508, and ADA work for universities and public agencies — building sites that hold up for every visitor, not just the demo.',
      cta: 'More about the work',
    },
  ];
</script>

<section class="highlights section" id="highlights" aria-label="Highlights">
  <div class="container">
    <h2 class="visually-hidden">Highlights</h2>
    <div class="highlights__grid">
      {#each cards as card}
        <a class="highlight-card" href={card.href} use:fadeIn target={card.href.startsWith('http') ? '_blank' : undefined} rel={card.href.startsWith('http') ? 'noopener' : undefined}>
          <i class="{card.icon} highlight-card__icon" aria-hidden="true"></i>
          <span class="highlight-card__label">{card.label}</span>
          <h3 class="highlight-card__title">{card.title}</h3>
          <p class="highlight-card__desc">{card.desc}</p>
          <span class="highlight-card__cta">{card.cta} <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
        </a>
      {/each}

      <a class="highlight-card" href="/writing" use:fadeIn>
        <i class="fas fa-pen-nib highlight-card__icon" aria-hidden="true"></i>
        <span class="highlight-card__label">// WRITING</span>
        {#if latestPost}
          <h3 class="highlight-card__title">{latestPost.title}</h3>
          <p class="highlight-card__desc">{latestPost.description}</p>
        {:else}
          <h3 class="highlight-card__title">Latest writing</h3>
          <p class="highlight-card__desc">Notes on Drupal, accessibility, and AI-readiness.</p>
        {/if}
        <span class="highlight-card__cta">Read the writing <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
      </a>
    </div>
  </div>
</section>

<style>
  .highlights {
    padding: 3rem 0 4rem;
  }

  .highlights__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .highlight-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.75rem;
    background: var(--bg-mid);
    border: 3px solid var(--border-color);
    text-decoration: none;
    color: var(--text);
    transition: all var(--transition);
  }

  .highlight-card:hover {
    border-color: var(--accent-gold);
    transform: translateY(-3px);
  }

  :global(.highlight-card__icon) {
    font-size: 1.75rem;
    color: var(--accent-blue);
  }

  .highlight-card__label {
    font-family: var(--font-heading);
    font-size: 0.75rem;
    color: var(--accent-green);
    letter-spacing: 0.05em;
  }

  .highlight-card__title {
    font-family: var(--font-heading);
    font-size: 1.125rem;
    letter-spacing: 0.02em;
    line-height: 1.4;
    margin: 0.25rem 0;
  }

  .highlight-card__desc {
    color: var(--text-dim);
    font-size: 1rem;
    line-height: 1.6;
    flex: 1;
  }

  .highlight-card__cta {
    font-family: var(--font-heading);
    font-size: 0.75rem;
    color: var(--accent-gold);
    letter-spacing: 0.05em;
    margin-top: 0.5rem;
  }

  @media (min-width: 768px) {
    .highlights__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
