<script>
  import { fadeIn } from './fadeIn.js';

  const categories = [
    {
      icon: 'fas fa-robot',
      title: 'AI & LLMs',
      items: [
        { name: 'LLM Integration', legendary: true },
        { name: 'AI Agents' },
        { name: 'Prompt Engineering' },
        { name: 'LLMs.txt' },
        { name: 'AI-Augmented Dev' },
      ],
    },
    {
      icon: 'fab fa-drupal',
      title: 'CMS Mastery',
      items: [
        { name: 'Drupal', legendary: true },
        { name: 'Site Building' },
        { name: 'Custom Modules' },
        { name: 'Contrib Modules' },
        { name: 'Theming' },
      ],
    },
    {
      icon: 'fas fa-server',
      title: 'Backend',
      items: [{ name: 'PHP' }, { name: 'Python' }, { name: 'MySQL' }],
    },
    {
      icon: 'fas fa-palette',
      title: 'Frontend',
      items: [{ name: 'JavaScript' }, { name: 'HTML5' }, { name: 'CSS3 / SCSS' }, { name: 'Twig' }],
    },
    {
      icon: 'fas fa-terminal',
      title: 'DevOps',
      items: [{ name: 'Docker' }, { name: 'DDEV' }, { name: 'Git' }, { name: 'Drush' }, { name: 'CI/CD' }],
    },
    {
      icon: 'fas fa-shield-halved',
      title: 'Security',
      items: [{ name: 'Security Auditing' }, { name: 'Code Review' }, { name: 'Best Practices' }],
    },
  ];
</script>

<section class="section section--alt" id="skills" aria-label="Skills and abilities">
  <div class="container">
    <div class="section__header">
      <span class="section__label">// SKILL TREE</span>
      <h2 class="section__title">ABILITIES</h2>
    </div>

    <div class="skills">
      {#each categories as cat}
        <div class="skill-category" use:fadeIn>
          <h3 class="skill-category__title"><i class={cat.icon}></i> {cat.title}</h3>
          <div class="skill-category__items">
            {#each cat.items as item}
              <span class="skill-tag" class:skill-tag--legendary={item.legendary}>{item.name}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .skills {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .skill-category {
    background: var(--bg-dark);
    border: 3px solid var(--border-color);
    padding: 1.5rem;
    transition: all var(--transition);
  }

  .skill-category:hover {
    border-color: var(--accent-blue);
  }

  .skill-category__title {
    font-family: var(--font-pixel);
    font-size: 0.5625rem;
    color: var(--accent-blue);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    letter-spacing: 0.05em;
    line-height: 1.6;
  }

  .skill-category__title i {
    font-size: 1.25rem;
    width: 1.5rem;
    text-align: center;
  }

  .skill-category__items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    font-family: var(--font-retro);
    font-size: 1.125rem;
    padding: 0.25rem 0.75rem;
    background: var(--bg-mid);
    border: 2px solid var(--border-color);
    color: var(--text-dim);
    transition: all var(--transition);
  }

  .skill-tag:hover {
    border-color: var(--accent-gold);
    color: var(--accent-gold);
  }

  .skill-tag--legendary {
    border-color: var(--accent-gold);
    color: var(--accent-gold);
    text-shadow: 0 0 8px rgba(255, 205, 117, 0.4);
  }

  @media (min-width: 480px) {
    .skills {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .skills {
      grid-template-columns: repeat(3, 1fr);
    }

    .skill-category__title {
      font-size: 0.625rem;
    }

    .skill-tag {
      font-size: 1.25rem;
    }
  }

  @media (min-width: 1280px) {
    .skill-category__title {
      font-size: 0.6875rem;
    }
  }
</style>
