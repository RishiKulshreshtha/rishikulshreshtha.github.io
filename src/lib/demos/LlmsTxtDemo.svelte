<script>
  const SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head>
  <title>Acme University — Financial Aid Office</title>
  <meta name="description" content="Apply for financial aid, scholarships, and student loans at Acme University.">
</head>
<body>
  <h1>Financial Aid Office</h1>
  <p>We help students find and apply for aid.</p>
  <h2>Scholarships</h2>
  <p>Browse merit and need-based scholarships.</p>
  <h2>Loans &amp; Grants</h2>
  <p>Federal and state loan programs explained.</p>
  <h2>Contact Us</h2>
  <p>Office hours and drop-in advising.</p>
</body>
</html>`;

  let source = $state(SAMPLE_HTML);
  let output = $state('');
  let generated = $state(false);

  function escapeMd(str = '') {
    return str.replace(/\s+/g, ' ').trim();
  }

  function generate() {
    generated = true;
    const doc = new DOMParser().parseFromString(source, 'text/html');
    const title = escapeMd(doc.querySelector('title')?.textContent || 'Untitled Page');
    const description = escapeMd(doc.querySelector('meta[name="description"]')?.getAttribute('content') || '');
    const headings = Array.from(doc.querySelectorAll('h1, h2'))
      .map((h) => escapeMd(h.textContent))
      .filter(Boolean);

    let text = `# ${title}\n`;
    if (description) text += `\n> ${description}\n`;
    if (headings.length) {
      text += `\n## Sections\n\n`;
      text += headings.map((h) => `- ${h}`).join('\n');
      text += '\n';
    }
    output = text;
  }
</script>

<div class="llms-demo">
  <p class="llms-demo__note">
    Paste a page's HTML source below and generate an llms.txt summary — this is a simplified,
    client-side approximation of what the <a href="https://www.drupal.org/project/llms_txt_gen" target="_blank" rel="noopener">LLMs.txt Gen</a>
    Drupal module does server-side against a real site. (A true paste-a-URL version needs a server to
    fetch cross-origin pages, which this static site doesn't have yet.)
  </p>

  <label class="llms-demo__field">
    <span>HTML source</span>
    <textarea bind:value={source} rows="10" spellcheck="false"></textarea>
  </label>

  <button class="btn btn--primary" onclick={generate}>GENERATE LLMS.TXT</button>

  {#if generated}
    <div class="llms-demo__output">
      <span class="llms-demo__output-label">// llms.txt</span>
      <pre>{output}</pre>
    </div>
  {/if}
</div>

<style>
  .llms-demo {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .llms-demo__note {
    color: var(--text-dim);
    font-size: 0.9375rem;
    line-height: 1.7;
  }

  .llms-demo__note a {
    color: var(--accent-blue);
    text-decoration: underline;
  }

  .llms-demo__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.9375rem;
    color: var(--text-dim);
  }

  textarea {
    background: var(--bg-dark);
    border: 2px solid var(--border-color);
    color: var(--text);
    padding: 0.75rem;
    font-family: monospace;
    font-size: 0.875rem;
    resize: vertical;
  }

  .llms-demo__output {
    border: 3px solid var(--accent-green);
    padding: 1rem;
  }

  .llms-demo__output-label {
    display: block;
    font-family: var(--font-heading);
    font-size: 0.75rem;
    color: var(--accent-green);
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
    font-family: monospace;
    font-size: 0.875rem;
    color: var(--text);
    margin: 0;
  }
</style>
