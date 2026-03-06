<script>
  import { getPost } from './blog/posts.js';

  let { slug, onback } = $props();

  const post = $derived(getPost(slug));
</script>

{#if post}
  <article class="post section container" aria-label="Blog post: {post.title}">
    <nav class="post__nav" aria-label="Blog navigation">
      <button class="post__back" onclick={onback} aria-label="Back to blog list">
        <i class="fas fa-arrow-left" aria-hidden="true"></i> BACK
      </button>
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
      <button class="post__back" onclick={onback} aria-label="Back to blog list">
        <i class="fas fa-arrow-left" aria-hidden="true"></i> BACK TO BLOG
      </button>
    </div>
  </article>
{:else}
  <div class="post section container post--notfound" aria-label="Post not found">
    <p class="post__error">// POST NOT FOUND</p>
    <button class="post__back" onclick={onback}>BACK TO BLOG</button>
  </div>
{/if}

<style>
  .post {
    padding: 4rem 0;
    max-width: 740px;
  }

  .post__nav {
    margin-bottom: 2rem;
  }

  .post__back {
    font-family: var(--font-pixel);
    font-size: 0.45rem;
    background: none;
    border: 2px solid var(--border-color);
    color: var(--text-dim);
    cursor: pointer;
    padding: 0.5em 1em;
    letter-spacing: 0.05em;
    transition: all var(--transition);
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
  }

  .post__back:hover {
    border-color: var(--accent-gold);
    color: var(--accent-gold);
  }

  .post__date {
    font-family: var(--font-pixel);
    font-size: 0.45rem;
    color: var(--accent-green);
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem;
  }

  .post__title {
    font-family: var(--font-pixel);
    font-size: 0.75rem;
    color: var(--text);
    letter-spacing: 0.05em;
    line-height: 1.8;
    margin: 0 0 1rem;
  }

  .post__tags {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .post__tag {
    font-family: var(--font-pixel);
    font-size: 0.4rem;
    color: var(--accent-blue);
    border: 1px solid var(--accent-blue);
    padding: 0.2em 0.5em;
    letter-spacing: 0.05em;
  }

  .post__body {
    margin: 2rem 0;
  }

  /* Prose styling for rendered markdown */
  .prose :global(h1),
  .prose :global(h2),
  .prose :global(h3) {
    font-family: var(--font-pixel);
    color: var(--text);
    letter-spacing: 0.05em;
    line-height: 1.8;
    margin: 2rem 0 0.75rem;
  }

  .prose :global(h1) { font-size: 0.75rem; }
  .prose :global(h2) { font-size: 0.625rem; color: var(--accent-gold); }
  .prose :global(h3) { font-size: 0.5625rem; color: var(--accent-green); }

  .prose :global(p) {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--text-dim);
    line-height: 1.75;
    margin: 0 0 1.25rem;
  }

  .prose :global(a) {
    color: var(--accent-blue);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .prose :global(a:hover) {
    color: var(--accent-gold);
  }

  .prose :global(ul),
  .prose :global(ol) {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--text-dim);
    line-height: 1.75;
    margin: 0 0 1.25rem;
    padding-left: 1.5rem;
  }

  .prose :global(li) {
    margin-bottom: 0.5rem;
  }

  .prose :global(strong) {
    color: var(--text);
    font-weight: 500;
  }

  .prose :global(code) {
    font-family: var(--font-retro);
    font-size: 1.1em;
    background: var(--bg-mid);
    color: var(--accent-green);
    padding: 0.1em 0.4em;
    border-radius: 2px;
  }

  .prose :global(pre) {
    background: var(--bg-mid);
    border: 2px solid var(--border-color);
    padding: 1rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .prose :global(pre code) {
    background: none;
    padding: 0;
    font-size: 0.9rem;
  }

  .prose :global(blockquote) {
    border-left: 4px solid var(--accent-gold);
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;
    color: var(--text-dim);
    font-style: italic;
  }

  .post__footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 2px solid var(--border-color);
  }

  .post--notfound {
    text-align: center;
    padding: 4rem 0;
  }

  .post__error {
    font-family: var(--font-pixel);
    font-size: 0.75rem;
    color: var(--accent-orange);
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    .post__title { font-size: 1rem; }
    .post__back { font-size: 0.5rem; }
  }
</style>
