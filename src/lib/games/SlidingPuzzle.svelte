<script>
  import { SOLVED, getAdjacent, shuffle } from './slidingLogic.js';
  import { playTick, playWin } from '../sound.js';

  let { onwin = () => {} } = $props();

  let tiles = $state(shuffle([...SOLVED]));
  let moves = $state(0);
  let won = $derived(tiles.every((t, i) => t === SOLVED[i]));

  let winTriggered = $state(false);

  $effect(() => {
    if (won && !winTriggered) {
      winTriggered = true;
      playWin();
      setTimeout(() => onwin(), 1600);
    }
  });

  function move(pos) {
    if (won) return;
    const emptyPos = tiles.indexOf(0);
    if (!getAdjacent(pos).includes(emptyPos)) return;
    const t = [...tiles];
    [t[emptyPos], t[pos]] = [t[pos], t[emptyPos]];
    tiles = t;
    moves++;
    playTick();
  }

  function reset() {
    tiles = shuffle([...SOLVED]);
    moves = 0;
    winTriggered = false;
  }
</script>

<section class="section section--game" id="game-sliding" aria-label="Sliding Puzzle game — win to unlock the next section">
  <div class="container">
    <div class="game">
      <div class="game__header">
        <h2 class="game__title">SLIDING PUZZLE</h2>
        <p class="game__hint">Arrange tiles in order to unlock the next section!</p>
      </div>

      {#if won}
        <div class="game__win-overlay" aria-live="assertive" role="status">
          <p class="game__win-title">PUZZLE SOLVED!</p>
          <p class="game__win-msg">BRILLIANT MOVE SEQUENCE!<br>LOADING YOUR SKILL TREE...</p>
        </div>
      {:else}
        <div class="game__stats" aria-live="polite" role="status">
          <span class="game__stat">MOVES: {moves}</span>
        </div>

        <div class="puzzle">
          {#each tiles as tile, i}
            <button
              class="puzzle__tile"
              class:puzzle__tile--empty={tile === 0}
              class:puzzle__tile--movable={tile !== 0 && getAdjacent(i).includes(tiles.indexOf(0))}
              onclick={() => move(i)}
              disabled={tile === 0}
              aria-label={tile === 0 ? 'Empty' : `Tile ${tile}`}
            >
              {#if tile !== 0}
                {tile}
              {/if}
            </button>
          {/each}
        </div>

        <button class="btn btn--outline game__restart" onclick={reset}>
          SHUFFLE <i class="fas fa-random"></i>
        </button>
      {/if}
    </div>
  </div>
</section>

<style>
  .game {
    max-width: 360px;
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

  .puzzle {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .puzzle__tile {
    aspect-ratio: 1;
    background: var(--bg-light);
    border: 3px solid var(--border-color);
    color: var(--text);
    font-family: var(--font-pixel);
    font-size: 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s ease;
    letter-spacing: 0.05em;
  }

  .puzzle__tile--empty {
    background: transparent;
    border-color: transparent;
    cursor: default;
  }

  .puzzle__tile--movable {
    border-color: var(--accent-blue);
    color: var(--accent-blue);
    cursor: pointer;
  }

  .puzzle__tile--movable:hover {
    background: var(--bg-mid);
    border-color: var(--accent-gold);
    color: var(--accent-gold);
  }
</style>
