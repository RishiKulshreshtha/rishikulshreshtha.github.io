<script>
  import Nav from './lib/Nav.svelte';
  import Hero from './lib/Hero.svelte';
  import MemoryGame from './lib/games/MemoryGame.svelte';
  import About from './lib/About.svelte';
  import SlidingPuzzle from './lib/games/SlidingPuzzle.svelte';
  import Skills from './lib/Skills.svelte';
  import WhackAMole from './lib/games/WhackAMole.svelte';
  import Achievements from './lib/Achievements.svelte';
  import Contact from './lib/Contact.svelte';
  import Footer from './lib/Footer.svelte';

  let game1Won = $state(false);
  let game2Won = $state(false);
  let game3Won = $state(false);
  let cheatActivated = $state(false);

  function unlockAll() {
    cheatActivated = true;
    setTimeout(() => {
      game1Won = true;
      game2Won = true;
      game3Won = true;
    }, 800);
  }

  function scrollTo(id) {
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  let allWon = $derived(game1Won && game2Won && game3Won);
</script>

<Nav {game1Won} {game2Won} {game3Won} />

<main id="main-content">
  <Hero {game1Won} {game3Won} />
  <MemoryGame onwin={() => { game1Won = true; scrollTo('about'); }} />

  {#if !allWon}
    <div class="skip-gate">
      {#if cheatActivated}
        <p class="skip-gate__flash">// CHEAT CODE ACTIVATED — UNLOCKING ALL SECTIONS...</p>
      {:else}
        <p class="skip-gate__prompt">
          <span class="skip-gate__caret">&gt;</span>
          here on business?
          <button class="skip-gate__btn" onclick={unlockAll}>./skip_games.sh</button>
        </p>
      {/if}
    </div>
  {/if}

  {#if game1Won}
    <About />
    <SlidingPuzzle onwin={() => { game2Won = true; scrollTo('skills'); }} />
  {/if}

  {#if game2Won}
    <Skills />
    <WhackAMole onwin={() => { game3Won = true; scrollTo('achievements'); }} />
  {/if}

  {#if game3Won}
    <Achievements />
    <Contact />
  {/if}
</main>

{#if game3Won}
  <Footer />
{/if}

<style>
  .skip-gate {
    text-align: center;
    padding: 1.5rem 1rem 2.5rem;
  }

  .skip-gate__prompt {
    font-family: var(--font-pixel);
    font-size: 0.5rem;
    color: var(--text-dim);
    letter-spacing: 0.05em;
    display: inline-flex;
    align-items: center;
    gap: 0.6em;
  }

  .skip-gate__caret { color: var(--accent-green); }

  .skip-gate__btn {
    background: none;
    border: none;
    font-family: var(--font-pixel);
    font-size: 0.5rem;
    color: var(--accent-blue);
    letter-spacing: 0.05em;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color var(--transition);
  }

  .skip-gate__btn:hover { color: var(--accent-gold); }

  .skip-gate__flash {
    font-family: var(--font-pixel);
    font-size: 0.5rem;
    color: var(--accent-green);
    letter-spacing: 0.05em;
    animation: blink 0.5s step-end infinite;
  }
</style>
