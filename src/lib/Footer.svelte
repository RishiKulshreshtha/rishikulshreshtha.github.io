<script>
  const year = new Date().getFullYear();

  const socials = [
    { href: 'https://www.linkedin.com/in/rishikulshreshtha/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://github.com/RishiKulshreshtha/', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://www.drupal.org/u/rishikulshreshtha', icon: 'fab fa-drupal', label: 'Drupal.org' },
    { href: 'https://git.drupalcode.org/RishiKulshreshtha', icon: 'fab fa-gitlab', label: 'GitLab' },
    { href: 'https://stackexchange.com/users/941018/rishi-kulshreshtha', icon: 'fab fa-stack-exchange', label: 'StackExchange' },
    { href: 'https://x.com/RishiShreshtha', icon: 'fab fa-x-twitter', label: 'X' },
  ];
</script>

<footer class="footer">
  <div class="footer__inner container">
    <div class="footer__social">
      {#each socials as s}
        <a class="footer__link" href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
          <i class={s.icon}></i>
        </a>
      {/each}
    </div>
    <nav class="footer__meta" aria-label="Footer">
      <a class="footer__meta-link" href="/playground">// PLAYGROUND</a>
      <a class="footer__meta-link" href="/accessibility-statement">// ACCESSIBILITY STATEMENT</a>
    </nav>
    <p class="footer__copy">&copy; 2011&ndash;{year} Rishi Kulshreshtha</p>
  </div>
</footer>

<style>
  .footer {
    padding: 2.5rem 0;
    border-top: 3px solid var(--border-color);
    text-align: center;
  }

  .footer__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .footer__social {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 2px solid var(--border-color);
    color: var(--text-dim);
    font-size: 1.125rem;
    transition: all var(--transition);
  }

  .footer__link:hover {
    color: var(--accent-gold);
    border-color: var(--accent-gold);
    transform: translateY(-2px);
  }

  .footer__copy {
    font-size: 1rem;
    color: var(--text-muted);
  }

  .footer__meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;
  }

  .footer__meta-link {
    font-family: var(--font-heading);
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    line-height: 1.8;
    text-decoration: none;
    transition: color var(--transition);
  }

  .footer__meta-link:hover {
    color: var(--accent-gold);
  }
</style>
