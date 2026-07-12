<script>
  import '../app.css';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import Nav from '$lib/Nav.svelte';
  import Footer from '$lib/Footer.svelte';
  import Cursor from '$lib/Cursor.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <meta name="author" content="Rishi Kulshreshtha" />
  <meta name="keywords" content="Drupal developer, web accessibility, WCAG, Section 508, ADA compliance, AI-ready content, llms.txt, higher education, government websites, open source, PHP, Maine" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rishi Kulshreshtha",
    "jobTitle": "Senior Drupal Engineer",
    "url": "https://rishikulshreshtha.github.io/",
    "image": "https://rishikulshreshtha.github.io/img/profile.webp",
    "worksFor": { "@type": "Organization", "name": "Redfin Solutions, LLC" },
    "knowsAbout": ["Drupal", "Web Accessibility", "WCAG", "Section 508", "AI-Ready Content", "PHP", "Open Source", "Web Development"],
    "sameAs": [
      "https://www.linkedin.com/in/rishikulshreshtha/",
      "https://github.com/RishiKulshreshtha/",
      "https://www.drupal.org/u/rishikulshreshtha",
      "https://x.com/RishiShreshtha"
    ]
  }
  </script>
</svelte:head>

<Cursor />
<Nav />

<main id="main-content">
  {@render children()}
</main>

<Footer />

<style>
  main {
    padding-top: var(--nav-height);
  }
</style>
