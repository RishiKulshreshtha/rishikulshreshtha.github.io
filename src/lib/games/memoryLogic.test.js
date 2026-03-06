import { describe, it, expect } from 'vitest';
import { SYMBOLS, createDeck } from './memoryLogic.js';

describe('SYMBOLS', () => {
  it('contains exactly 8 unique symbols', () => {
    expect(SYMBOLS).toHaveLength(8);
    const icons = new Set(SYMBOLS.map(s => s.icon));
    expect(icons.size).toBe(8);
  });

  it('each symbol has an icon and a label', () => {
    for (const s of SYMBOLS) {
      expect(s.icon).toBeTruthy();
      expect(s.label).toBeTruthy();
    }
  });
});

describe('createDeck', () => {
  it('returns 16 cards (8 pairs)', () => {
    expect(createDeck()).toHaveLength(16);
  });

  it('each symbol appears exactly twice', () => {
    const deck = createDeck();
    for (const sym of SYMBOLS) {
      const count = deck.filter(c => c.icon === sym.icon).length;
      expect(count).toBe(2);
    }
  });

  it('all cards start unflipped and unmatched', () => {
    for (const card of createDeck()) {
      expect(card.flipped).toBe(false);
      expect(card.matched).toBe(false);
    }
  });

  it('all card ids are unique', () => {
    const ids = createDeck().map(c => c.id);
    expect(new Set(ids).size).toBe(16);
  });

  it('shuffles the deck (not always in original order)', () => {
    const base = createDeck().map(c => c.icon).join(',');
    const isDifferent = Array.from({ length: 10 }, () =>
      createDeck().map(c => c.icon).join(',') !== base
    ).some(Boolean);
    expect(isDifferent).toBe(true);
  });
});
