<script>
  import { fadeIn } from './fadeIn.js';
</script>

<section class="section section--alt" id="about" aria-label="About me">
  <div class="container">
    <div class="section__header">
      <span class="section__label">// PLAYER SELECT</span>
      <h2 class="section__title">ABOUT ME</h2>
    </div>

    <div class="player">
      <div class="player__card" use:fadeIn>
        <div class="player__details">
          <div class="player__detail">
            <span class="player__detail-label">CLASS</span>
            <span class="player__detail-value">Senior Drupal Engineer — Accessibility & AI-Ready Infrastructure</span>
          </div>
          <div class="player__detail">
            <span class="player__detail-label">GUILD</span>
            <span class="player__detail-value">Redfin Solutions, LLC</span>
          </div>
          <div class="player__detail">
            <span class="player__detail-label">BASE</span>
            <span class="player__detail-value">Maine, USA</span>
          </div>
          <div class="player__detail">
            <span class="player__detail-label">XP</span>
            <span class="player__detail-value">Drupal since 2011</span>
          </div>
        </div>
      </div>

      <div class="player__languages" use:fadeIn>
        <h3 class="player__subtitle">LANGUAGES</h3>
        <div class="player__lang">
          <span class="player__lang-name">HINDI</span>
          <div class="bar"><div class="bar__fill bar__fill--full"></div></div>
          <span class="bar__label">Native</span>
        </div>
        <div class="player__lang">
          <span class="player__lang-name">ENGLISH</span>
          <div class="bar"><div class="bar__fill bar__fill--high"></div></div>
          <span class="bar__label">Professional</span>
        </div>
        <div class="player__lang">
          <span class="player__lang-name">MARATHI</span>
          <div class="bar"><div class="bar__fill bar__fill--high"></div></div>
          <span class="bar__label">Fluent</span>
        </div>
      </div>

      <div class="player__bio dialog-box" use:fadeIn>
        <p>I'm a senior Drupal engineer focused on web accessibility and AI-readiness for public-interest websites — higher education, research, and government. I've been building with Drupal since 2011.</p>
        <p>I maintain LLMs.txt Gen and other open-source Drupal modules that make sites easier for both people using assistive technology and AI systems to understand and use &mdash; accessibility (WCAG, Section 508, ADA) and AI-readiness solve overlapping problems, and open source is how I build for both.</p>
        <p>When I'm not coding, you'll find me mentoring fellow developers or contributing to the Drupal community.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .player {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .player__card {
    background: var(--bg-dark);
    border: 3px solid var(--border-color);
    padding: 1.5rem;
  }

  .player__details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .player__detail {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
    padding-bottom: 0.75rem;
    border-bottom: 1px dashed var(--bg-light);
  }

  .player__detail:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .player__detail-label {
    font-family: var(--font-heading);
    font-size: 0.5rem;
    color: var(--accent-gold);
    min-width: 5rem;
    letter-spacing: 0.05em;
    line-height: 2;
  }

  .player__detail-value {
    color: var(--text);
    flex: 1;
  }

  .player__subtitle {
    font-family: var(--font-heading);
    font-size: 0.5625rem;
    color: var(--accent-gold);
    margin-bottom: 1rem;
    letter-spacing: 0.05em;
  }

  .player__languages {
    background: var(--bg-dark);
    border: 3px solid var(--border-color);
    padding: 1.5rem;
  }

  .player__lang {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.625rem;
  }

  .player__lang:last-child {
    margin-bottom: 0;
  }

  .player__lang-name {
    font-family: var(--font-heading);
    font-size: 0.4375rem;
    color: var(--text);
    min-width: 5rem;
    letter-spacing: 0.05em;
  }

  .player__bio p {
    font-family: var(--font-mono);
    font-size: 1.1875rem;
    color: var(--text-dim);
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  .player__bio p:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    .player {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .player__bio {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 1024px) {
    .player__detail-label {
      font-size: 0.5625rem;
    }

    .player__subtitle {
      font-size: 0.625rem;
    }

    .player__lang-name {
      font-size: 0.5rem;
    }

    .player__bio p {
      font-size: 1.25rem;
    }
  }
</style>
