<script>
  import Seo from '$lib/Seo.svelte';
  import { fadeIn } from '$lib/fadeIn.js';

  let { data } = $props();
  const posts = $derived(data.posts);
</script>

<Seo
  title="Writing — Rishi Kulshreshtha"
  description="Notes on Drupal, web accessibility, and AI-readiness from Rishi Kulshreshtha."
  path="/writing"
  noindex={true}
/>

<section class="blog section" aria-label="Writing">
  <div class="container">
    <div class="section__header">
      <span class="section__label">// WRITING</span>
      <h1 class="section__title">WRITING</h1>
    </div>

    {#if posts.length === 0}
      <div class="blog__empty">
        <p class="blog__coming-soon">COMING SOON</p>
        <p class="blog__sub">Notes on Drupal, accessibility, and AI-readiness — in progress.</p>
      </div>
    {:else}
      <ul class="blog__list" role="list">
        {#each posts as post}
          <li class="blog__card">
            <a class="blog__link" href="/writing/{post.slug}" use:fadeIn>
              <span class="blog__date">{post.date}</span>
              <h2 class="blog__title">{post.title}</h2>
              <p class="blog__desc">{post.description}</p>
              {#if post.tags.length}
                <ul class="blog__tags" role="list" aria-label="Tags">
                  {#each post.tags as tag}
                    <li class="blog__tag">{tag}</li>
                  {/each}
                </ul>
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</section>

<style>
  .blog {
    padding: 4rem 0;
  }

  .blog__empty {
    text-align: center;
    padding: 4rem 1rem;
  }

  .blog__coming-soon {
    font-family: var(--font-heading);
    font-size: 1rem;
    color: var(--accent-green);
    letter-spacing: 0.1em;
    animation: blink 1s step-end infinite;
    margin-bottom: 1rem;
  }

  .blog__sub {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--text-dim);
  }

  .blog__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .blog__card {
    border: 2px solid var(--border-color);
    transition: border-color var(--transition), transform var(--transition);
  }

  .blog__card:hover {
    border-color: var(--accent-gold);
    transform: translateX(4px);
  }

  .blog__link {
    display: block;
    width: 100%;
    text-align: left;
    text-decoration: none;
    padding: 1.5rem;
    color: inherit;
  }

  .blog__date {
    font-family: var(--font-heading);
    font-size: 0.45rem;
    color: var(--accent-green);
    letter-spacing: 0.05em;
    display: block;
    margin-bottom: 0.5rem;
  }

  .blog__title {
    font-family: var(--font-heading);
    font-size: 0.5625rem;
    color: var(--text);
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem;
    line-height: 1.6;
  }

  .blog__desc {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--text-dim);
    margin: 0 0 1rem;
    line-height: 1.6;
  }

  .blog__tags {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .blog__tag {
    font-family: var(--font-heading);
    font-size: 0.4rem;
    color: var(--accent-blue);
    border: 1px solid var(--accent-blue);
    padding: 0.2em 0.5em;
    letter-spacing: 0.05em;
  }

  @media (min-width: 768px) {
    .blog__coming-soon {
      font-size: 1.25rem;
    }

    .blog__date { font-size: 0.5rem; }
    .blog__title { font-size: 0.625rem; }
    .blog__tag { font-size: 0.45rem; }
  }
</style>
