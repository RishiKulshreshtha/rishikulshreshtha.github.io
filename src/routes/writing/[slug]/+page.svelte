<script>
  import Seo from '$lib/Seo.svelte';

  let { data } = $props();
  const post = $derived(data.post);
</script>

<Seo
  title="{post.title} — Rishi Kulshreshtha"
  description={post.description}
  path="/writing/{post.slug}"
  noindex={true}
/>

<article class="post section container" aria-label="Blog post: {post.title}">
  <nav class="post__nav" aria-label="Blog navigation">
    <a class="post__back" href="/writing">
      <i class="fas fa-arrow-left" aria-hidden="true"></i> BACK
    </a>
  </nav>

  <header class="post__header">
    <p class="post__date">{post.date}</p>
    <h1 class="post__title">{post.title}</h1>
    {#if post.tags.length}
      <ul class="post__tags" role="list" aria-label="Tags">
        {#each post.tags as tag}
          <li class="post__tag">{tag}</li>
        {/each}
      </ul>
    {/if}
  </header>

  <div class="post__body prose">
    {@html post.html}
  </div>

  <div class="post__footer">
    <a class="post__back" href="/writing">
      <i class="fas fa-arrow-left" aria-hidden="true"></i> BACK TO WRITING
    </a>
  </div>
</article>

<style>
  .post {
    padding: 4rem 0;
    max-width: 740px;
  }

  .post__nav {
    margin-bottom: 2rem;
  }

  .post__back {
    font-family: var(--font-heading);
    font-size: 0.45rem;
    background: none;
    border: 2px solid var(--border-color);
    color: var(--text-dim);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.6em 0.9em;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all var(--transition);
  }

  .post__back:hover {
    border-color: var(--accent-gold);
    color: var(--accent-gold);
  }

  .post__header {
    margin-bottom: 2.5rem;
  }

  .post__date {
    font-family: var(--font-heading);
    font-size: 0.45rem;
    color: var(--accent-green);
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  .post__title {
    font-family: var(--font-heading);
    font-size: 1rem;
    letter-spacing: 0.05em;
    line-height: 1.6;
    margin: 0 0 1rem;
  }

  .post__tags {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .post__tag {
    font-family: var(--font-heading);
    font-size: 0.4rem;
    color: var(--accent-blue);
    border: 1px solid var(--accent-blue);
    padding: 0.2em 0.5em;
    letter-spacing: 0.05em;
  }

  .post__footer {
    margin-top: 3rem;
  }

  .post__body :global(h2) {
    font-family: var(--font-heading);
    font-size: 0.6875rem;
    letter-spacing: 0.05em;
    color: var(--accent-gold);
    margin: 2rem 0 1rem;
  }

  .post__body :global(p) {
    color: var(--text-dim);
    font-size: 1.0625rem;
    line-height: 1.8;
    margin-bottom: 1.25rem;
  }

  .post__body :global(a) {
    color: var(--accent-blue);
    text-decoration: underline;
  }

  .post__body :global(ul),
  .post__body :global(ol) {
    color: var(--text-dim);
    font-size: 1.0625rem;
    line-height: 1.8;
    margin: 0 0 1.25rem 1.25rem;
  }

  .post__body :global(code) {
    background: var(--bg-mid);
    padding: 0.15em 0.4em;
    font-size: 0.9em;
  }

  @media (min-width: 768px) {
    .post__title { font-size: 1.25rem; }
    .post__date { font-size: 0.5rem; }
  }
</style>
