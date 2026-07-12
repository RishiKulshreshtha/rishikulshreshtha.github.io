<script>
  import Seo from '$lib/Seo.svelte';
  import MemoryGame from '$lib/games/MemoryGame.svelte';
  import SlidingPuzzle from '$lib/games/SlidingPuzzle.svelte';
  import WhackAMole from '$lib/games/WhackAMole.svelte';
  import DinoRunner from '$lib/games/DinoRunner.svelte';
  import SpaceGame from '$lib/games/SpaceGame.svelte';
</script>

<Seo
  title="Playground — Rishi Kulshreshtha"
  description="Five small games built while testing Svelte 5, Canvas, and Web Audio — no reason to be here except curiosity."
  path="/playground"
/>

<section class="playground-intro section" aria-label="Playground introduction">
  <div class="container">
    <span class="section__label">// PLAYGROUND</span>
    <h1 class="section__title">PLAYGROUND</h1>
    <p class="playground-intro__desc">
      Five games I built to test Svelte 5, Canvas, and the Web Audio API. None of this is required
      reading — it's here purely because building small, weird things is part of how I stay sharp.
      The games are visual and mouse/keyboard-driven, so they aren't screen-reader accessible; that's
      a fair trade for a curiosity page, but not one I'd make on the rest of this site.
    </p>
  </div>
</section>

<MemoryGame />
<SlidingPuzzle />
<WhackAMole />
<DinoRunner />
<SpaceGame />

<style>
  .playground-intro {
    padding-bottom: 1rem;
    text-align: center;
  }

  .playground-intro__desc {
    max-width: 640px;
    margin: 1rem auto 0;
    color: var(--text-dim);
    font-size: 1.0625rem;
    line-height: 1.7;
  }
</style>
