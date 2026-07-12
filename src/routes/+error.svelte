<script>
  import { page } from '$app/stores';
  import Seo from '$lib/Seo.svelte';
</script>

<Seo
  title="Page Not Found — Rishi Kulshreshtha"
  description="The page you're looking for doesn't exist."
  path={$page.url.pathname}
/>

<section class="error section" aria-label="Page not found">
  <div class="container">
    <div class="section__header">
      <span class="section__label">// {$page.status}</span>
      <h1 class="section__title">PAGE NOT FOUND</h1>
    </div>

    <div class="error__body">
      <p class="error__message">
        {$page.error?.message || "That page doesn't exist, or it moved."}
      </p>
      <a class="btn btn--primary" href="/">BACK HOME</a>
    </div>
  </div>
</section>

<style>
  .error {
    min-height: calc(100vh - var(--nav-height));
    display: flex;
    align-items: center;
  }

  .error__body {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }

  .error__message {
    color: var(--text-dim);
    font-size: 1.0625rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }
</style>
