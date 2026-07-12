<script>
  let { title, description, path = '', noindex = false } = $props();

  const siteUrl = 'https://rishikulshreshtha.github.io';
  const canonical = $derived(`${siteUrl}${path}`);
  const image = `${siteUrl}/img/profile.webp`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={image} />
  <meta property="og:image:alt" content="Rishi Kulshreshtha" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@RishiShreshtha" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</svelte:head>
