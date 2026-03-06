export const SYMBOLS = [
  { icon: 'fas fa-robot', label: 'AI' },
  { icon: 'fab fa-drupal', label: 'Drupal' },
  { icon: 'fab fa-python', label: 'Python' },
  { icon: 'fab fa-docker', label: 'Docker' },
  { icon: 'fas fa-shield-halved', label: 'Security' },
  { icon: 'fas fa-bolt', label: 'Speed' },
  { icon: 'fas fa-gamepad', label: 'Game' },
  { icon: 'fas fa-rocket', label: 'Deploy' },
];

export function createDeck() {
  const pairs = [...SYMBOLS, ...SYMBOLS].map((s, i) => ({
    id: i,
    ...s,
    flipped: false,
    matched: false,
  }));
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}
