<script>
  import { fadeIn } from './fadeIn.js';

  const projects = [
    {
      href: 'https://www.drupal.org/project/llms_txt_gen',
      icon: 'fas fa-robot',
      name: 'LLMs.txt Gen',
      type: 'AI meets Drupal',
    },
    {
      href: 'https://www.drupal.org/project/hover_card',
      icon: 'fab fa-drupal',
      name: 'Hover Card',
      type: 'Drupal Module',
    },
    {
      href: 'https://www.drupal.org/project/siteinfo',
      icon: 'fab fa-drupal',
      name: 'SiteInfo',
      type: 'Drupal Module',
    },
  ];

  const badges = [
    { icon: 'fas fa-shield-halved', text: 'Security Advisory Credits' },
    { icon: 'fas fa-code-branch', text: 'Issue Queue Contributions' },
    { icon: 'fas fa-book', text: 'Documentation (10+ edits)' },
    { icon: 'fas fa-vial', text: 'Automated Testing' },
    { icon: 'fas fa-graduation-cap', text: 'Community Mentoring' },
    { icon: 'fas fa-comments', text: 'Slack, IRC & Forums' },
    { icon: 'fas fa-magnifying-glass', text: 'Project App Reviews' },
    { icon: 'fas fa-robot', text: 'AI/LLM Integration Pioneer' },
  ];
</script>

<section class="section" id="achievements" aria-label="Open source achievements">
  <div class="container">
    <div class="section__header">
      <span class="section__label">// ACHIEVEMENTS</span>
      <h2 class="section__title">OPEN SOURCE</h2>
    </div>

    <h3 class="subsection-title">MAINTAINED PROJECTS</h3>
    <div class="projects" use:fadeIn>
      {#each projects as proj}
        <a class="project" href={proj.href} target="_blank" rel="noopener">
          <i class="{proj.icon} project__icon"></i>
          <div class="project__info">
            <span class="project__name">{proj.name}</span>
            <span class="project__type">{proj.type}</span>
          </div>
        </a>
      {/each}
    </div>

    <h3 class="subsection-title">UNLOCKED</h3>
    <div class="badges" use:fadeIn>
      {#each badges as badge}
        <div class="badge">
          <i class="{badge.icon} badge__icon"></i>
          <span class="badge__text">{badge.text}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .projects {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .project {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: var(--bg-mid);
    border: 3px solid var(--border-color);
    text-decoration: none;
    color: var(--text);
    transition: all var(--transition);
  }

  .project:hover {
    border-color: var(--accent-gold);
    transform: translateY(-2px);
    box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.2);
    color: var(--text);
  }

  :global(.project__icon) {
    font-size: 2rem;
    color: var(--accent-blue);
    flex-shrink: 0;
  }

  .project__info {
    display: flex;
    flex-direction: column;
  }

  .project__name {
    font-family: var(--font-pixel);
    font-size: 0.5rem;
    letter-spacing: 0.05em;
    line-height: 1.6;
  }

  .project__type {
    font-size: 1rem;
    color: var(--text-muted);
  }

  .badges {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--bg-mid);
    border: 2px solid var(--border-color);
    transition: all var(--transition);
  }

  .badge:hover {
    border-color: var(--accent-green);
  }

  :global(.badge__icon) {
    color: var(--accent-gold);
    font-size: 1.125rem;
    flex-shrink: 0;
    width: 1.5rem;
    text-align: center;
  }

  .badge__text {
    color: var(--text-dim);
    font-size: 1.125rem;
  }

  @media (min-width: 480px) {
    .projects {
      grid-template-columns: repeat(2, 1fr);
    }

    .badges {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 768px) {
    .projects {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .badges {
      grid-template-columns: repeat(4, 1fr);
    }

    .project__name {
      font-size: 0.5625rem;
    }

    .project__type {
      font-size: 1.125rem;
    }

    .badge__text {
      font-size: 1.25rem;
    }
  }

  @media (min-width: 1280px) {
    .project__name {
      font-size: 0.625rem;
    }
  }
</style>
