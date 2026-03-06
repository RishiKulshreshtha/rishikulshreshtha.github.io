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
            <span class="player__detail-value">AI Enthusiast & Senior Drupal Developer</span>
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
            <span class="player__detail-value">14+ Years</span>
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
        <p>I'm an AI enthusiast and seasoned Drupal developer who's passionate about bridging open-source CMS with AI/LLM technologies. With 14+ years building enterprise web solutions, I now focus on how AI can transform the way we build, manage, and interact with the web.</p>
        <p>From crafting Drupal modules like LLMs.txt Gen that make sites AI-friendly, to experimenting with LLM agents and intelligent automation &mdash; I believe the future of the web is AI-augmented, and open-source is the way to build it.</p>
        <p>When I'm not coding, you'll find me mentoring fellow developers, contributing to the Drupal community, or diving into the latest AI research and tooling.</p>
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
    font-family: var(--font-pixel);
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
    font-family: var(--font-pixel);
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
    font-family: var(--font-pixel);
    font-size: 0.4375rem;
    color: var(--text);
    min-width: 5rem;
    letter-spacing: 0.05em;
  }

  .player__bio p {
    font-family: var(--font-retro);
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
