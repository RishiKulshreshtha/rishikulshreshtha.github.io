<script>
  let dotEl = $state(null);
  let ringEl = $state(null);
  let hovered = $state(false);
  let clicked = $state(false);

  $effect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let rafId;

    function tick() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (dotEl) dotEl.style.transform = `translate(${mx}px, ${my}px)`;
      if (ringEl) ringEl.style.transform = `translate(${Math.round(rx)}px, ${Math.round(ry)}px)`;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const onOver = (e) => {
      hovered = !!e.target.closest('button, a, input, textarea, [role="button"], .memory__card, .puzzle__tile, .mole__hole');
    };

    const onClick = () => {
      clicked = true;
      setTimeout(() => { clicked = false; }, 180);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
    };
  });
</script>

<div
  bind:this={dotEl}
  class="cursor-dot"
  class:cursor-dot--hover={hovered}
  class:cursor-dot--click={clicked}
  aria-hidden="true"
></div>
<div
  bind:this={ringEl}
  class="cursor-ring"
  class:cursor-ring--hover={hovered}
  aria-hidden="true"
></div>

<style>
  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 99999;
    will-change: transform;
  }

  /* Pixel dot — follows mouse exactly */
  .cursor-dot {
    width: 6px;
    height: 6px;
    background: var(--accent-gold);
    margin-left: -3px;
    margin-top: -3px;
    transition: background 0.15s, width 0.15s, height 0.15s, margin 0.15s;
  }

  .cursor-dot--hover {
    background: var(--accent-orange);
    width: 8px;
    height: 8px;
    margin-left: -4px;
    margin-top: -4px;
  }

  .cursor-dot--click {
    background: var(--accent-green);
    width: 12px;
    height: 12px;
    margin-left: -6px;
    margin-top: -6px;
  }

  /* Outlined ring — lags behind */
  .cursor-ring {
    width: 22px;
    height: 22px;
    border: 2px solid var(--accent-blue);
    margin-left: -11px;
    margin-top: -11px;
    opacity: 0.7;
    transition: border-color 0.2s, width 0.2s, height 0.2s, margin 0.2s, opacity 0.2s;
  }

  .cursor-ring--hover {
    width: 32px;
    height: 32px;
    margin-left: -16px;
    margin-top: -16px;
    border-color: var(--accent-gold);
    opacity: 1;
  }
</style>
