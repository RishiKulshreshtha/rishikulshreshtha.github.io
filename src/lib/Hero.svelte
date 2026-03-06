<script>
  import { playError } from './sound.js';

  let { game1Won = false, game3Won = false } = $props();

  let lockedMsg = $state('');
  let msgTimer = null;

  function showMsg(msg, scrollTarget) {
    lockedMsg = msg;
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => { lockedMsg = ''; }, 3000);
    document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
  }

  function explore(e) {
    e.preventDefault();
    if (!game1Won) {
      playError();
      showMsg('// WIN MEMORY MATCH FIRST — OR USE ./skip_games.sh BELOW', 'game-memory');
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function sayHello(e) {
    e.preventDefault();
    if (!game3Won) {
      playError();
      showMsg('// CLEAR ALL 3 GAMES TO UNLOCK CONTACT — OR USE ./skip_games.sh BELOW', 'game-memory');
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<section class="hero section" id="hero" aria-label="Introduction">
  <div class="hero__inner container">
    <div class="hero__content">
      <p class="hero__greeting">HELLO WORLD!<span class="hero__cursor"></span></p>
      <h1 class="hero__name">RISHI<br>KULSHRESHTHA</h1>
      <div class="hero__lines">
        <p class="hero__line">AI Enthusiast & Builder</p>
        <p class="hero__line">Senior Drupal Developer</p>
        <p class="hero__line">Open Source Advocate</p>
      </div>
      <div class="hero__actions">
        <button class="btn btn--primary" onclick={explore} aria-label={game1Won ? 'Explore portfolio' : 'Explore — locked until Memory Match is won'}>
          EXPLORE <i class="fas fa-arrow-down" aria-hidden="true"></i>
        </button>
        <button class="btn btn--outline" onclick={sayHello} aria-label={game3Won ? 'Say hello' : 'Say hello — locked until all games are won'}>
          SAY HELLO
        </button>
      </div>
      {#if lockedMsg}
        <p class="hero__locked-msg" aria-live="polite">
          <span class="hero__locked-caret">&gt;</span> {lockedMsg}
        </p>
      {/if}
    </div>
    <div class="hero__image">
      <picture>
        <source srcset="/img/profile.webp" type="image/webp">
        <img class="hero__avatar" src="/img/profile.jpg" alt="Rishi Kulshreshtha" width="340" height="340" />
      </picture>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: var(--nav-height);
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 20%;
    right: -20%;
    width: 50%;
    height: 60%;
    background: radial-gradient(circle, rgba(65, 166, 246, 0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero__inner {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 2.5rem;
    text-align: center;
    padding: 2rem 0;
  }

  .hero__greeting {
    font-family: var(--font-pixel);
    font-size: 0.625rem;
    color: var(--accent-green);
    margin-bottom: 1rem;
    letter-spacing: 0.05em;
    opacity: 0;
    animation: fadeInUp 0.4s ease forwards;
    animation-delay: 0.2s;
  }

  .hero__cursor {
    display: inline-block;
    width: 0.6em;
    height: 1em;
    background: var(--accent-green);
    margin-left: 0.25em;
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }

  .hero__name {
    font-family: var(--font-pixel);
    font-size: 1.5rem;
    line-height: 1.8;
    letter-spacing: 0.02em;
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: fadeInUp 0.4s ease forwards;
    animation-delay: 0.5s;
  }

  .hero__lines {
    margin-bottom: 2rem;
  }

  .hero__line {
    font-family: var(--font-retro);
    font-size: 1.375rem;
    color: var(--text-dim);
    line-height: 1.8;
    opacity: 0;
    animation: fadeInUp 0.4s ease forwards;
  }

  .hero__line::before {
    content: '> ';
    color: var(--accent-gold);
  }

  .hero__line:nth-child(1) { animation-delay: 0.8s; }
  .hero__line:nth-child(2) { animation-delay: 1.1s; }
  .hero__line:nth-child(3) { animation-delay: 1.4s; }

  .hero__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    opacity: 0;
    animation: fadeInUp 0.4s ease forwards;
    animation-delay: 1.8s;
  }

  .hero__image {
    opacity: 0;
    animation: fadeInUp 0.5s ease forwards;
    animation-delay: 0.1s;
  }

  .hero__avatar {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border: 4px solid var(--accent-gold);
    box-shadow:
      0 0 0 4px var(--bg-dark),
      0 0 0 8px var(--accent-blue),
      0 0 40px rgba(65, 166, 246, 0.15);
    border-radius: 4px;
  }

  @media (min-width: 480px) {
    .hero__avatar {
      width: 220px;
      height: 220px;
    }
  }

  @media (min-width: 768px) {
    .hero__greeting {
      font-size: 0.75rem;
    }

    .hero__name {
      font-size: 2rem;
    }

    .hero__line {
      font-size: 1.625rem;
    }
  }

  @media (min-width: 1024px) {
    .hero__inner {
      flex-direction: row;
      text-align: left;
      gap: 5rem;
      padding: 4rem 0;
    }

    .hero__content {
      flex: 1;
    }

    .hero__image {
      flex-shrink: 0;
    }

    .hero__actions {
      justify-content: flex-start;
    }

    .hero__greeting {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }

    .hero__name {
      font-size: 2.75rem;
    }

    .hero__line {
      font-size: 1.875rem;
    }

    .hero__avatar {
      width: 300px;
      height: 300px;
    }
  }

  .hero__locked-msg {
    margin-top: 1rem;
    font-family: var(--font-pixel);
    font-size: 0.4rem;
    color: var(--accent-orange);
    letter-spacing: 0.05em;
    line-height: 1.8;
    animation: fadeInUp 0.2s ease forwards;
  }

  .hero__locked-caret {
    color: var(--accent-green);
  }

  @media (min-width: 768px) {
    .hero__locked-msg { font-size: 0.45rem; }
  }

  @media (min-width: 1280px) {
    .hero__name {
      font-size: 3.25rem;
    }

    .hero__greeting {
      font-size: 1rem;
    }

    .hero__line {
      font-size: 2rem;
    }

    .hero__avatar {
      width: 340px;
      height: 340px;
    }
  }
</style>
