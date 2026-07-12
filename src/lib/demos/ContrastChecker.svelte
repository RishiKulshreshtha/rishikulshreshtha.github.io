<script>
  let fg = $state('#1a1c2c');
  let bg = $state('#f7f3eb');

  function hexToRgb(hex) {
    const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (!m) return null;
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
  }

  function channelLuminance(c) {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }

  function relativeLuminance({ r, g, b }) {
    return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
  }

  function contrastRatio(hexA, hexB) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    if (!a || !b) return null;
    const la = relativeLuminance(a);
    const lb = relativeLuminance(b);
    const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
    return (lighter + 0.05) / (darker + 0.05);
  }

  let ratio = $derived(contrastRatio(fg, bg));
  let ratioText = $derived(ratio ? ratio.toFixed(2) : '—');

  function passes(threshold) {
    return ratio !== null && ratio >= threshold;
  }
</script>

<div class="contrast-checker">
  <div class="contrast-checker__inputs">
    <label class="contrast-checker__field">
      <span>Text color</span>
      <span class="contrast-checker__swatch">
        <input type="color" bind:value={fg} aria-label="Text color picker" />
        <input type="text" bind:value={fg} class="contrast-checker__hex" aria-label="Text color hex value" />
      </span>
    </label>
    <label class="contrast-checker__field">
      <span>Background color</span>
      <span class="contrast-checker__swatch">
        <input type="color" bind:value={bg} aria-label="Background color picker" />
        <input type="text" bind:value={bg} class="contrast-checker__hex" aria-label="Background color hex value" />
      </span>
    </label>
  </div>

  <div class="contrast-checker__preview" style="color: {fg}; background: {bg};">
    <p class="contrast-checker__preview-large">Large text sample (24px)</p>
    <p class="contrast-checker__preview-small">Normal text sample (16px) — the ratio below applies to both, but the pass thresholds differ by size.</p>
  </div>

  <div class="contrast-checker__result" aria-live="polite">
    <span class="contrast-checker__ratio">{ratioText}:1</span>
    <ul class="contrast-checker__grades" role="list">
      <li class:pass={passes(4.5)} class:fail={!passes(4.5)}>AA — normal text {passes(4.5) ? 'PASS' : 'FAIL'}</li>
      <li class:pass={passes(3)} class:fail={!passes(3)}>AA — large text {passes(3) ? 'PASS' : 'FAIL'}</li>
      <li class:pass={passes(7)} class:fail={!passes(7)}>AAA — normal text {passes(7) ? 'PASS' : 'FAIL'}</li>
      <li class:pass={passes(4.5)} class:fail={!passes(4.5)}>AAA — large text {passes(4.5) ? 'PASS' : 'FAIL'}</li>
    </ul>
  </div>
</div>

<style>
  .contrast-checker {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contrast-checker__inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .contrast-checker__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.9375rem;
    color: var(--text-dim);
  }

  .contrast-checker__swatch {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .contrast-checker__swatch input[type='color'] {
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid var(--border-color);
    padding: 0;
    background: none;
    cursor: pointer;
  }

  .contrast-checker__hex {
    width: 7rem;
    background: var(--bg-dark);
    border: 2px solid var(--border-color);
    color: var(--text);
    padding: 0.5rem;
    font-family: monospace;
  }

  .contrast-checker__preview {
    padding: 1.5rem;
    border: 3px solid var(--border-color);
  }

  .contrast-checker__preview-large {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .contrast-checker__preview-small {
    font-size: 1rem;
    line-height: 1.6;
  }

  .contrast-checker__result {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contrast-checker__ratio {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    color: var(--accent-gold);
  }

  .contrast-checker__grades {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    font-family: var(--font-heading);
    font-size: 0.8125rem;
    letter-spacing: 0.05em;
  }

  .contrast-checker__grades li {
    padding: 0.6em 0.75em;
    border: 2px solid var(--border-color);
  }

  .contrast-checker__grades li.pass {
    color: var(--accent-green);
    border-color: var(--accent-green);
  }

  .contrast-checker__grades li.fail {
    color: var(--accent-orange);
    border-color: var(--accent-orange);
  }
</style>
