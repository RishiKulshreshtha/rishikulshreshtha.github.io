<script>
  let { onwin = () => {} } = $props();

  const GOAL = 12;
  const TIME = 30;
  const MOLE_DURATION = 1100;

  let score = $state(0);
  let timeLeft = $state(TIME);
  let activeMole = $state(-1);
  let started = $state(false);
  let won = $state(false);
  let lost = $state(false);

  let moleTimer = null;
  let countdownTimer = null;

  function startGame() {
    score = 0;
    timeLeft = TIME;
    activeMole = -1;
    won = false;
    lost = false;
    started = true;
    spawnMole();
    countdownTimer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) endGame(score >= GOAL);
    }, 1000);
  }

  function spawnMole() {
    let next;
    do { next = Math.floor(Math.random() * 9); } while (next === activeMole);
    activeMole = next;
    moleTimer = setTimeout(() => {
      activeMole = -1;
      if (started) spawnMole();
    }, MOLE_DURATION);
  }

  function whack(i) {
    if (!started || activeMole !== i) return;
    clearTimeout(moleTimer);
    activeMole = -1;
    score++;
    if (score >= GOAL) {
      endGame(true);
    } else {
      spawnMole();
    }
  }

  function endGame(success) {
    started = false;
    clearTimeout(moleTimer);
    clearInterval(countdownTimer);
    activeMole = -1;
    if (success) {
      won = true;
      setTimeout(() => onwin(), 1600);
    } else {
      lost = true;
    }
  }

  $effect(() => {
    return () => {
      clearTimeout(moleTimer);
      clearInterval(countdownTimer);
    };
  });
</script>

<section class="section game-section" id="game-whack" aria-label="Whack-a-Bug game — win to unlock the final sections">
  <div class="container">
    <div class="game">
      <div class="game__header">
        <h2 class="game__title">WHACK-A-BUG</h2>
        <p class="game__hint">Squash {GOAL} bugs before time runs out!</p>
      </div>

      {#if won}
        <div class="game__win-overlay" aria-live="assertive" role="status">
          <p class="game__win-title">ALL BUGS SQUASHED!</p>
          <p class="game__win-msg">LEGENDARY DEBUGGER!<br>UNLOCKING ACHIEVEMENTS + CONTACT...</p>
        </div>
      {:else if !started && !lost}
        <button class="btn btn--primary game__start" onclick={startGame}>
          START <i class="fas fa-bug"></i>
        </button>
      {:else}
        <div class="game__stats" aria-live="polite" role="status">
          <span class="game__stat">BUGS: {score}/{GOAL}</span>
          <span class="game__stat" class:game__stat--danger={timeLeft <= 10}>TIME: {timeLeft}s</span>
          {#if lost}
            <span class="game__stat game__stat--lose">ESCAPED!</span>
          {/if}
        </div>

        {#if !lost}
          <div class="moles">
            {#each Array(9) as _, i}
              <button
                class="mole__hole"
                class:mole__hole--active={activeMole === i}
                onclick={() => whack(i)}
                aria-label={activeMole === i ? 'Bug! Click to whack!' : 'Empty hole'}
              >
                {#if activeMole === i}
                  <i class="fas fa-bug mole__bug"></i>
                {/if}
              </button>
            {/each}
          </div>
        {/if}

        {#if lost}
          <button class="btn btn--outline game__restart" onclick={startGame}>
            TRY AGAIN <i class="fas fa-redo"></i>
          </button>
        {/if}
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

  .game__start {
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

  .game__stat--lose {
    color: var(--accent-orange);
    animation: blink 0.6s step-end infinite;
  }

  .game__stat--danger {
    color: var(--accent-orange);
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

  .moles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .mole__hole {
    aspect-ratio: 1;
    background: var(--bg-light);
    border: 3px solid var(--border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.1s ease;
    position: relative;
    overflow: hidden;
  }

  .mole__hole:hover {
    border-color: var(--border-color);
  }

  .mole__hole--active {
    background: var(--bg-mid);
    border-color: var(--accent-orange);
    cursor: crosshair;
  }

  .mole__hole--active:hover {
    background: rgba(245, 132, 66, 0.15);
    border-color: var(--accent-gold);
  }

  .mole__bug {
    font-size: 1.75rem;
    color: var(--accent-orange);
    animation: popUp 0.15s ease;
  }

  @keyframes popUp {
    from { transform: scale(0) translateY(50%); }
    to { transform: scale(1) translateY(0); }
  }
</style>
