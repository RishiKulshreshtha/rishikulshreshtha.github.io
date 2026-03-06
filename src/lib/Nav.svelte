<script>
  let { game1Won = false, game2Won = false, game3Won = false } = $props();

  let menuOpen = $state(false);
  let activeSection = $state('hero');
  let theme = $state(document.documentElement.getAttribute('data-theme') || 'dark');

  const links = [
    { id: 'about',        label: 'ABOUT',        gate: 'game-memory'  },
    { id: 'skills',       label: 'SKILLS',        gate: 'game-sliding' },
    { id: 'achievements', label: 'ACHIEVEMENTS',  gate: 'game-whack'   },
    { id: 'contact',      label: 'CONTACT',       gate: 'game-whack'   },
  ];

  function isLocked(id) {
    if (id === 'about') return !game1Won;
    if (id === 'skills') return !game2Won;
    if (id === 'achievements' || id === 'contact') return !game3Won;
    return false;
  }

  function navigate(e, link) {
    e.preventDefault();
    if (isLocked(link.id)) {
      document.getElementById(link.gate)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
    }
    menuOpen = false;
  }

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rk-theme', theme);
  }

  $effect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const y = window.scrollY + 120;
      for (const s of sections) {
        if (y >= s.offsetTop - 120 && y < s.offsetTop - 120 + s.offsetHeight) {
          activeSection = s.id;
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<nav class="nav" aria-label="Main navigation">
  <div class="nav__inner container">

    <a class="nav__logo" href="#hero" aria-label="RK_ — back to top">RK_</a>

    <!-- Links: absolute dropdown on mobile, inline row on desktop -->
    <ul class="nav__links" class:nav__links--open={menuOpen} id="nav-links" role="list">
      {#each links as link}
        <li>
          <a
            class="nav__link"
            class:nav__link--active={activeSection === link.id}
            class:nav__link--locked={isLocked(link.id)}
            href={`#${link.id}`}
            onclick={(e) => navigate(e, link)}
            aria-label={isLocked(link.id) ? `${link.label} — locked, win the game to unlock` : link.label}
            aria-current={activeSection === link.id ? 'true' : undefined}
          >
            {link.label}
            {#if isLocked(link.id)}
              <i class="fas fa-lock nav__lock" aria-hidden="true"></i>
            {/if}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Right side: theme toggle always visible, hamburger only on mobile -->
    <div class="nav__end">
      <button
        class="nav__theme"
        onclick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        <i class={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'} aria-hidden="true"></i>
      </button>

      <button
        class="nav__toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        onclick={() => menuOpen = !menuOpen}
      >
        <i class={menuOpen ? 'fas fa-times' : 'fas fa-bars'} aria-hidden="true"></i>
      </button>
    </div>

  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--nav-height);
    background: rgba(26, 28, 44, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 3px solid var(--border-color);
    z-index: 1000;
    transition: background var(--transition), border-color var(--transition);
  }

  :global([data-theme="light"]) .nav {
    background: rgba(247, 243, 235, 0.97);
  }

  .nav__inner {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav__logo {
    font-family: var(--font-pixel);
    font-size: 0.75rem;
    color: var(--accent-gold);
    text-decoration: none;
    letter-spacing: 0.05em;
    flex-shrink: 0;
  }

  .nav__logo:hover {
    color: var(--accent-orange);
  }

  /* ── Mobile: dropdown ── */
  .nav__links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-mid);
    border-bottom: 3px solid var(--border-color);
    flex-direction: column;
    list-style: none;
    padding: 0.5rem;
    margin: 0;
  }

  .nav__links--open {
    display: flex;
  }

  .nav__link {
    font-family: var(--font-pixel);
    font-size: 0.5rem;
    color: var(--text-dim);
    text-decoration: none;
    padding: 0.875rem 1rem;
    transition: all var(--transition);
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 0.5em;
    white-space: nowrap;
  }

  .nav__link:hover,
  .nav__link--active {
    color: var(--accent-gold);
  }

  .nav__link--locked {
    color: var(--text-muted);
    opacity: 0.65;
  }

  .nav__link--locked:hover {
    color: var(--accent-orange);
    opacity: 1;
  }

  .nav__lock {
    font-size: 0.45rem;
  }

  /* Right-side controls */
  .nav__end {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .nav__theme,
  .nav__toggle {
    background: none;
    border: 2px solid var(--border-color);
    color: var(--text-dim);
    cursor: pointer;
    padding: 0.4rem 0.6rem;
    line-height: 1;
    transition: all var(--transition);
  }

  .nav__theme { font-size: 0.9rem; }
  .nav__toggle { font-size: 1.1rem; color: var(--text); }

  .nav__theme:hover,
  .nav__toggle:hover {
    border-color: var(--accent-gold);
    color: var(--accent-gold);
  }

  /* ── Desktop (768px+) ── */
  @media (min-width: 768px) {
    .nav {
      --nav-height: 68px;
    }

    .nav__toggle {
      display: none;
    }

    /* Links become an inline row, pushed right before theme toggle */
    .nav__links {
      display: flex;
      position: static;
      background: none;
      border: none;
      flex-direction: row;
      padding: 0;
      flex: 1;
      justify-content: flex-end;
      gap: 0.125rem;
    }

    .nav__link {
      font-size: 0.5625rem;
      padding: 0.5rem 0.875rem;
    }

    .nav__logo {
      font-size: 0.875rem;
    }

    .nav__end {
      margin-left: 1rem;
    }

    .nav__theme {
      font-size: 1rem;
      padding: 0.45rem 0.7rem;
    }
  }

  @media (min-width: 1280px) {
    .nav__link {
      font-size: 0.625rem;
      padding: 0.5rem 1.125rem;
    }

    .nav__logo {
      font-size: 1rem;
    }
  }
</style>
