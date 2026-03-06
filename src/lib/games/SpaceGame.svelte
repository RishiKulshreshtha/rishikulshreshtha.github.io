<script>
  import { onMount } from 'svelte';

  let canvas;
  let score = $state(0);
  let highScore = $state(0);
  let gameState = $state('idle');

  const W = 240, H = 200;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    let ship, bullets, asteroids, stars, particles;
    let spawnTimer, shootTimer, frameCount, animFrame;
    let keys = {};

    function initStars() {
      const s = [];
      for (let i = 0; i < 40; i++) {
        s.push({
          x: Math.random() * W,
          y: Math.random() * H,
          speed: 0.3 + Math.random() * 1.2,
          size: Math.random() > 0.7 ? 2 : 1,
        });
      }
      return s;
    }

    function reset() {
      ship = { x: W / 2 - 7, y: H - 22, w: 14, h: 10 };
      bullets = [];
      asteroids = [];
      particles = [];
      spawnTimer = 0;
      shootTimer = 0;
      frameCount = 0;
      score = 0;
      if (!stars || stars.length === 0) stars = initStars();
    }

    reset();
    stars = initStars();

    function start() {
      if (gameState === 'idle' || gameState === 'over') {
        gameState = 'running';
        reset();
      }
    }

    function addParticles(x, y, color, count) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 15 + Math.random() * 10,
          color,
          size: 1 + Math.floor(Math.random() * 2),
        });
      }
    }

    function onKey(e) {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space', 'a', 'd', 'w'].includes(e.key === ' ' ? 'Space' : e.key)) {
        e.preventDefault();
      }
      keys[e.code] = true;
      if (gameState !== 'running') start();
    }

    function onKeyUp(e) {
      keys[e.code] = false;
    }

    // Touch controls
    let touchX = null;

    function onTouchStart(e) {
      e.preventDefault();
      if (gameState !== 'running') { start(); return; }
      const rect = canvas.getBoundingClientRect();
      const scale = W / rect.width;
      touchX = (e.touches[0].clientX - rect.left) * scale;
    }

    function onTouchMove(e) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scale = W / rect.width;
      touchX = (e.touches[0].clientX - rect.left) * scale;
    }

    function onTouchEnd() {
      touchX = null;
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('click', start);
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKeyUp);

    function update() {
      // Stars always animate
      for (const s of stars) {
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
      }

      // Particles always animate
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
      }
      particles = particles.filter((p) => p.life > 0);

      if (gameState !== 'running') return;

      frameCount++;

      // Ship movement
      const shipSpeed = 3;
      if (keys['ArrowLeft'] || keys['KeyA']) ship.x -= shipSpeed;
      if (keys['ArrowRight'] || keys['KeyD']) ship.x += shipSpeed;

      // Touch movement
      if (touchX !== null) {
        const target = touchX - ship.w / 2;
        const diff = target - ship.x;
        ship.x += Math.sign(diff) * Math.min(Math.abs(diff), shipSpeed + 1);
      }

      ship.x = Math.max(0, Math.min(W - ship.w, ship.x));

      // Auto-shoot
      shootTimer++;
      const canShoot = keys['Space'] || keys['ArrowUp'] || keys['KeyW'] || touchX !== null || true;
      if (canShoot && shootTimer > 8) {
        bullets.push({ x: ship.x + ship.w / 2 - 1, y: ship.y - 4, w: 2, h: 6 });
        shootTimer = 0;
      }

      // Bullets
      for (const b of bullets) b.y -= 4;
      bullets = bullets.filter((b) => b.y > -b.h);

      // Spawn asteroids
      spawnTimer++;
      const rate = Math.max(15, 40 - frameCount / 200);
      if (spawnTimer > rate) {
        const size = 6 + Math.floor(Math.random() * 14);
        asteroids.push({
          x: Math.floor(Math.random() * (W - size)),
          y: -size,
          size,
          speed: 0.8 + Math.random() * 1.5 + frameCount / 2000,
          color: ['#b13e53', '#ef7d57', '#5d275d', '#566c86', '#38b764'][
            Math.floor(Math.random() * 5)
          ],
        });
        spawnTimer = 0;
      }

      for (const a of asteroids) a.y += a.speed;
      asteroids = asteroids.filter((a) => a.y < H + a.size);

      // Bullet-asteroid collision
      for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
          const b = bullets[i];
          const a = asteroids[j];
          if (b && a && b.x + b.w > a.x && b.x < a.x + a.size && b.y < a.y + a.size && b.y + b.h > a.y) {
            addParticles(a.x + a.size / 2, a.y + a.size / 2, a.color, 6);
            bullets.splice(i, 1);
            asteroids.splice(j, 1);
            score += 10;
            break;
          }
        }
      }

      // Ship-asteroid collision
      for (const a of asteroids) {
        if (
          ship.x + ship.w - 2 > a.x && ship.x + 2 < a.x + a.size &&
          ship.y + ship.h > a.y && ship.y < a.y + a.size
        ) {
          addParticles(ship.x + ship.w / 2, ship.y + ship.h / 2, '#ffcd75', 12);
          gameState = 'over';
          if (score > highScore) highScore = score;
          return;
        }
      }

      score = Math.floor(frameCount / 6) + score;
      // Recalculate score simply
      score = 0;
      // Use a running score approach instead
    }

    // Fix score: track separately
    let destroyScore = 0;

    // Override update's score handling
    const origReset = reset;
    reset = function () {
      origReset();
      destroyScore = 0;
    };

    function updateFixed() {
      for (const s of stars) {
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
      }
      particles = particles.filter((p) => p.life > 0);

      if (gameState !== 'running') return;

      frameCount++;

      const shipSpeed = 3;
      if (keys['ArrowLeft'] || keys['KeyA']) ship.x -= shipSpeed;
      if (keys['ArrowRight'] || keys['KeyD']) ship.x += shipSpeed;

      if (touchX !== null) {
        const target = touchX - ship.w / 2;
        const diff = target - ship.x;
        ship.x += Math.sign(diff) * Math.min(Math.abs(diff), shipSpeed + 1);
      }

      ship.x = Math.max(0, Math.min(W - ship.w, ship.x));

      shootTimer++;
      if (shootTimer > 8) {
        bullets.push({ x: ship.x + ship.w / 2 - 1, y: ship.y - 4, w: 2, h: 6 });
        shootTimer = 0;
      }

      for (const b of bullets) b.y -= 4;
      bullets = bullets.filter((b) => b.y > -b.h);

      spawnTimer++;
      const rate = Math.max(15, 40 - frameCount / 200);
      if (spawnTimer > rate) {
        const size = 6 + Math.floor(Math.random() * 14);
        asteroids.push({
          x: Math.floor(Math.random() * (W - size)),
          y: -size,
          size,
          speed: 0.8 + Math.random() * 1.5 + frameCount / 2000,
          color: ['#b13e53', '#ef7d57', '#5d275d', '#566c86', '#38b764'][
            Math.floor(Math.random() * 5)
          ],
        });
        spawnTimer = 0;
      }

      for (const a of asteroids) a.y += a.speed;
      asteroids = asteroids.filter((a) => a.y < H + a.size);

      for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
          const b = bullets[i];
          const a = asteroids[j];
          if (b && a && b.x + b.w > a.x && b.x < a.x + a.size && b.y < a.y + a.size && b.y + b.h > a.y) {
            addParticles(a.x + a.size / 2, a.y + a.size / 2, a.color, 6);
            bullets.splice(i, 1);
            asteroids.splice(j, 1);
            destroyScore += 10;
            break;
          }
        }
      }

      score = destroyScore + Math.floor(frameCount / 10);

      for (const a of asteroids) {
        if (
          ship.x + ship.w - 2 > a.x && ship.x + 2 < a.x + a.size &&
          ship.y + ship.h > a.y && ship.y < a.y + a.size
        ) {
          addParticles(ship.x + ship.w / 2, ship.y + ship.h / 2, '#ffcd75', 12);
          gameState = 'over';
          if (score > highScore) highScore = score;
          return;
        }
      }
    }

    function draw() {
      // Background
      ctx.fillStyle = '#0d0d1a';
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (const s of stars) {
        ctx.fillStyle = s.size > 1 ? '#94b0c2' : '#566c86';
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
      }

      // Particles
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 25;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }
      ctx.globalAlpha = 1;

      if (gameState === 'running' || gameState === 'over') {
        // Bullets
        ctx.fillStyle = '#73eff7';
        for (const b of bullets) ctx.fillRect(Math.floor(b.x), Math.floor(b.y), b.w, b.h);

        // Asteroids
        for (const a of asteroids) {
          ctx.fillStyle = a.color;
          ctx.fillRect(Math.floor(a.x), Math.floor(a.y), a.size, a.size);
          // Detail
          ctx.fillStyle = 'rgba(0,0,0,0.25)';
          ctx.fillRect(Math.floor(a.x) + 2, Math.floor(a.y) + 2, Math.max(2, a.size - 6), Math.max(2, a.size - 6));
        }

        // Ship (only when running)
        if (gameState === 'running') {
          const sx = Math.floor(ship.x);
          const sy = Math.floor(ship.y);
          // Engine glow
          ctx.fillStyle = frameCount % 4 < 2 ? '#ef7d57' : '#ffcd75';
          ctx.fillRect(sx + 5, sy + ship.h, 4, 3);
          // Hull
          ctx.fillStyle = '#41a6f6';
          ctx.fillRect(sx + 4, sy, 6, ship.h);
          // Wings
          ctx.fillStyle = '#3b5dc9';
          ctx.fillRect(sx, sy + 4, 14, 4);
          // Cockpit
          ctx.fillStyle = '#73eff7';
          ctx.fillRect(sx + 5, sy + 1, 4, 3);
        }
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
        ctx.fillText('TAP OR ANY KEY TO LAUNCH', W / 2, H / 2 - 4);
        ctx.fillStyle = '#94b0c2';
        ctx.font = '7px monospace';
        ctx.fillText('ARROWS / TOUCH TO STEER', W / 2, H / 2 + 10);
      } else if (gameState === 'over') {
        ctx.fillStyle = '#b13e53';
        ctx.font = '10px monospace';
        ctx.fillText('DESTROYED', W / 2, H / 2 - 12);
        ctx.font = '8px monospace';
        ctx.fillStyle = '#94b0c2';
        ctx.fillText('TAP OR KEY TO RELAUNCH', W / 2, H / 2 + 4);
      }
    }

    function loop() {
      updateFixed();
      draw();
      animFrame = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('click', start);
    };
  });
</script>

<section class="section game-section" id="game-space">
  <div class="container">
    <div class="game">
      <div class="game__header">
        <span class="section__label">// MINI GAME</span>
        <h3 class="game__title">ASTEROID DODGE</h3>
        <p class="game__hint">Destroy asteroids and survive! Arrows / Touch to steer. Auto-fires.</p>
      </div>
      <div class="game__viewport game__viewport--space">
        <canvas bind:this={canvas} width={240} height={200}></canvas>
      </div>
    </div>
  </div>
</section>

<style>
  .game {
    max-width: 500px;
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

  .game__viewport--space {
    border: 3px solid var(--border-color);
    background: #0d0d1a;
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
    touch-action: none;
  }
</style>
