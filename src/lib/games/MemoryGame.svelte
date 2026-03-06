<script>
  import { createDeck } from './memoryLogic.js';

  let { onwin = () => {} } = $props();

  let cards = $state(createDeck());
  let flippedIndices = $state([]);
  let moves = $state(0);
  let checking = $state(false);
  let won = $derived(cards.every((c) => c.matched));

  let winTriggered = $state(false);

  $effect(() => {
    if (won && !winTriggered) {
      winTriggered = true;
      setTimeout(() => onwin(), 1600);
    }
  });

  function flip(index) {
    if (checking || cards[index].flipped || cards[index].matched || flippedIndices.length >= 2) return;

    cards[index].flipped = true;
    const next = [...flippedIndices, index];
    flippedIndices = next;

    if (next.length === 2) {
      moves++;
      checking = true;
      const [a, b] = next;

      if (cards[a].icon === cards[b].icon) {
        cards[a].matched = true;
        cards[b].matched = true;
        flippedIndices = [];
        checking = false;
      } else {
        setTimeout(() => {
          cards[a].flipped = false;
          cards[b].flipped = false;
          flippedIndices = [];
          checking = false;
        }, 700);
      }
    }
  }

  function reset() {
    cards = createDeck();
    flippedIndices = [];
    moves = 0;
    checking = false;
    winTriggered = false;
  }
</script>

<section class="section game-section" id="game-memory" aria-label="Memory Match game — win to unlock the next section">
  <div class="container">
    <div class="game">
      <div class="game__header">
        <h2 class="game__title">MEMORY MATCH</h2>
        <p class="game__hint">Find all matching pairs!</p>
      </div>

      {#if won}
        <div class="game__win-overlay" aria-live="assertive" role="status">
          <p class="game__win-title">MEMORY CLEARED!</p>
          <p class="game__win-msg">NICE MOVES, DEVELOPER!<br>UNLOCKING YOUR PROFILE...</p>
        </div>
      {:else}
        <div class="game__stats" aria-live="polite" role="status">
          <span class="game__stat">MOVES: {moves}</span>
        </div>

        <div class="memory">
          {#each cards as card, i}
            <button
              class="memory__card"
              class:memory__card--flipped={card.flipped || card.matched}
              class:memory__card--matched={card.matched}
              onclick={() => flip(i)}
              aria-label={card.flipped || card.matched ? card.label : 'Hidden card'}
            >
              {#if card.flipped || card.matched}
                <i class={card.icon}></i>
              {:else}
                <span class="memory__card-back">?</span>
              {/if}
            </button>
          {/each}
        </div>

        <button class="btn btn--outline game__restart" onclick={reset}>
          RESTART <i class="fas fa-redo"></i>
        </button>
      {/if}
    </div>
  </div>
</section>

<style>
  .game {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  .game__header {
    margin-bottom: 1rem;
  }

  .game__title {
    font-family: var(--font-pixel);
    font-size: 0.875rem;
    color: var(--accent-gold);
    margin-top: 0.5rem;
    letter-spacing: 0.05em;
  }

  .game__hint {
    font-family: var(--font-retro);
    font-size: 1.125rem;
    color: var(--text-dim);
    margin-top: 0.5rem;
  }

  .game__stats {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .game__stat {
    font-family: var(--font-pixel);
    font-size: 0.5rem;
    color: var(--text-dim);
    letter-spacing: 0.05em;
  }

  .game__stat--win {
    color: var(--accent-green);
    animation: blink 0.6s step-end infinite;
  }

  .game__restart {
    margin-top: 1.25rem;
  }

  .game__win-overlay {
    padding: 2.5rem 1rem;
    text-align: center;
  }

  .game__win-title {
    font-family: var(--font-pixel);
    font-size: 0.75rem;
    color: var(--accent-green);
    letter-spacing: 0.1em;
    animation: blink 0.6s step-end infinite;
    margin-bottom: 1.25rem;
  }

  .game__win-msg {
    font-family: var(--font-retro);
    font-size: 1.375rem;
    color: var(--text-dim);
    line-height: 1.8;
    letter-spacing: 0.05em;
  }

  .memory {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }

  .memory__card {
    aspect-ratio: 1;
    background: var(--bg-light);
    border: 3px solid var(--border-color);
    color: var(--text-muted);
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
    font-family: var(--font-pixel);
  }

  .memory__card:hover:not(.memory__card--flipped):not(.memory__card--matched) {
    border-color: var(--accent-blue);
    background: var(--bg-mid);
  }

  .memory__card--flipped {
    background: var(--bg-mid);
    border-color: var(--accent-blue);
    color: var(--accent-blue);
    animation: cardReveal 0.2s ease;
  }

  .memory__card--matched {
    border-color: var(--accent-green);
    color: var(--accent-green);
    background: rgba(56, 183, 100, 0.1);
  }

  .memory__card-back {
    font-family: var(--font-pixel);
    font-size: 0.75rem;
  }

  @keyframes cardReveal {
    0% { transform: scale(0.8); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
</style>
