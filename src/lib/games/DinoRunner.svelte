<script>
  import { onMount } from 'svelte';

  let canvas;
  let score = $state(0);
  let highScore = $state(0);
  let gameState = $state('idle');

  const W = 300, H = 100;
  const GROUND = H - 16;
  const GRAVITY = 0.55;
  const JUMP = -8.5;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    let player, obstacles, spawnTimer, speed, groundOffset, frameScore, animFrame;

    function reset() {
      player = { x: 30, y: GROUND - 16, vy: 0, jumping: false, w: 14, h: 16 };
      obstacles = [];
      spawnTimer = 0;
      speed = 2.5;
      groundOffset = 0;
      frameScore = 0;
      score = 0;
    }

    reset();

    function jump() {
      if (gameState === 'idle' || gameState === 'over') {
        gameState = 'running';
        reset();
        player.jumping = true;
        player.vy = JUMP;
      } else if (gameState === 'running' && !player.jumping) {
        player.jumping = true;
        player.vy = JUMP;
      }
    }

    function onKey(e) {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    }

    function onClick() {
      jump();
    }

    canvas.addEventListener('click', onClick);
    window.addEventListener('keydown', onKey);

    function update() {
      if (gameState !== 'running') return;

      if (player.jumping) {
        player.vy += GRAVITY;
        player.y += player.vy;
        if (player.y >= GROUND - player.h) {
          player.y = GROUND - player.h;
          player.jumping = false;
          player.vy = 0;
        }
      }

      groundOffset = (groundOffset + speed) % 8;

      spawnTimer++;
      const rate = Math.max(40, 80 - frameScore / 60);
      if (spawnTimer > rate) {
        obstacles.push({
          x: W + 4,
          w: 8 + Math.floor(Math.random() * 10),
          h: 12 + Math.floor(Math.random() * 22),
        });
        spawnTimer = Math.floor(Math.random() * 15);
      }

      for (const o of obstacles) o.x -= speed;
      obstacles = obstacles.filter((o) => o.x > -o.w - 4);

      for (const o of obstacles) {
        if (
          player.x + player.w - 3 > o.x &&
          player.x + 3 < o.x + o.w &&
          player.y + player.h > GROUND - o.h
        ) {
          gameState = 'over';
          if (score > highScore) highScore = score;
          return;
        }
      }

      frameScore++;
      score = Math.floor(frameScore / 6);
      speed = 2.5 + frameScore / 500;
    }

    function drawPlayer(px, py) {
      // Body
      ctx.fillStyle = '#ffcd75';
      ctx.fillRect(px + 2, py, 10, 4);    // head
      ctx.fillRect(px, py + 4, 14, 8);     // torso
      // Legs (alternate when running)
      const legFrame = gameState === 'running' && !player.jumping
        ? Math.floor(frameScore / 6) % 2
        : 0;
      if (legFrame === 0) {
        ctx.fillRect(px + 2, py + 12, 4, 4);
        ctx.fillRect(px + 8, py + 12, 4, 4);
      } else {
        ctx.fillRect(px + 1, py + 12, 4, 4);
        ctx.fillRect(px + 9, py + 12, 4, 4);
      }
      // Eye
      ctx.fillStyle = '#1a1c2c';
      ctx.fillRect(px + 9, py + 1, 2, 2);
    }

    function draw() {
      ctx.fillStyle = '#1a1c2c';
      ctx.fillRect(0, 0, W, H);

      // Ground line
      ctx.strokeStyle = '#566c86';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.lineDashOffset = -groundOffset;
      ctx.beginPath();
      ctx.moveTo(0, GROUND);
      ctx.lineTo(W, GROUND);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ground dots
      ctx.fillStyle = '#333c57';
      for (let i = 0; i < W; i += 20) {
        const x = ((i - groundOffset * 2.5) % W + W) % W;
        ctx.fillRect(Math.floor(x), GROUND + 4, 2, 2);
      }

      // Player
      drawPlayer(Math.floor(player.x), Math.floor(player.y));

      // Obstacles (bug-like)
      for (const o of obstacles) {
        const ox = Math.floor(o.x);
        const oy = GROUND - o.h;
        ctx.fillStyle = '#b13e53';
        ctx.fillRect(ox, oy, o.w, o.h);
        // Highlight stripe
        ctx.fillStyle = '#ef7d57';
        ctx.fillRect(ox + 2, oy + 2, o.w - 4, 2);
        // Base
        ctx.fillStyle = '#5d275d';
        ctx.fillRect(ox, GROUND - 2, o.w, 2);
      }

      // HUD
      ctx.fillStyle = '#94b0c2';
      ctx.font = '8px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('SCORE ' + score, 4, 10);
      if (highScore > 0) {
        ctx.textAlign = 'right';
        ctx.fillText('HI ' + highScore, W - 4, 10);
      }

      // Messages
      ctx.textAlign = 'center';
      if (gameState === 'idle') {
        ctx.fillStyle = '#ffcd75';
        ctx.fillText('TAP OR SPACE TO START', W / 2, H / 2 - 4);
      } else if (gameState === 'over') {
        ctx.fillStyle = '#b13e53';
        ctx.font = '10px monospace';
        ctx.fillText('GAME OVER', W / 2, H / 2 - 12);
        ctx.font = '8px monospace';
        ctx.fillStyle = '#94b0c2';
        ctx.fillText('TAP OR SPACE TO RETRY', W / 2, H / 2 + 4);
      }
    }

    function loop() {
      update();
      draw();
      animFrame = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('click', onClick);
    };
  });
</script>

<section class="section game-section" id="game-runner">
  <div class="container">
    <div class="game">
      <div class="game__header">
        <span class="section__label">// MINI GAME</span>
        <h3 class="game__title">BUG RUNNER</h3>
        <p class="game__hint">Jump over the bugs! Space / Tap to jump.</p>
      </div>
      <div class="game__viewport">
        <canvas bind:this={canvas} width={300} height={100}></canvas>
      </div>
    </div>
  </div>
</section>

<style>
  .game {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  .game__header {
    margin-bottom: 1.5rem;
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
    color: var(--text-muted);
    margin-top: 0.5rem;
  }

  .game__viewport {
    border: 3px solid var(--border-color);
    background: #1a1c2c;
    display: flex;
    justify-content: center;
  }

  canvas {
    width: 100%;
    height: auto;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    cursor: pointer;
    display: block;
  }
</style>
