import { describe, it, expect } from 'vitest';
import { SOLVED, getAdjacent, shuffle, isSolvable } from './slidingLogic.js';

describe('SOLVED', () => {
  it('is [1,2,3,4,5,6,7,8,0]', () => {
    expect(SOLVED).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  });
});

describe('getAdjacent', () => {
  it('top-left corner (pos 0) has 2 neighbors: right and below', () => {
    expect(getAdjacent(0).sort()).toEqual([1, 3]);
  });

  it('top-right corner (pos 2) has 2 neighbors', () => {
    expect(getAdjacent(2).sort()).toEqual([1, 5]);
  });

  it('bottom-left corner (pos 6) has 2 neighbors', () => {
    expect(getAdjacent(6).sort()).toEqual([3, 7]);
  });

  it('bottom-right corner (pos 8) has 2 neighbors', () => {
    expect(getAdjacent(8).sort()).toEqual([5, 7]);
  });

  it('center (pos 4) has 4 neighbors', () => {
    expect(getAdjacent(4).sort()).toEqual([1, 3, 5, 7]);
  });

  it('top-center edge (pos 1) has 3 neighbors', () => {
    expect(getAdjacent(1).sort()).toEqual([0, 2, 4]);
  });

  it('left-center edge (pos 3) has 3 neighbors', () => {
    expect(getAdjacent(3).sort()).toEqual([0, 4, 6]);
  });
});

describe('shuffle', () => {
  it('returns exactly 9 tiles', () => {
    expect(shuffle([...SOLVED])).toHaveLength(9);
  });

  it('contains all values 0 through 8', () => {
    const result = shuffle([...SOLVED]);
    for (let i = 0; i <= 8; i++) expect(result).toContain(i);
  });

  it('contains 0 (the empty tile)', () => {
    expect(shuffle([...SOLVED])).toContain(0);
  });

  it('is not always in solved order', () => {
    const anyDifferent = Array.from({ length: 10 }, () =>
      shuffle([...SOLVED]).join(',') !== SOLVED.join(',')
    ).some(Boolean);
    expect(anyDifferent).toBe(true);
  });

  it('produces a solvable puzzle', () => {
    for (let i = 0; i < 5; i++) {
      expect(isSolvable(shuffle([...SOLVED]))).toBe(true);
    }
  });
});

describe('isSolvable', () => {
  it('returns true for the solved state', () => {
    expect(isSolvable(SOLVED)).toBe(true);
  });

  it('returns false for a known unsolvable arrangement', () => {
    // Swap tiles 1 and 2 creates an unsolvable state
    const unsolvable = [2, 1, 3, 4, 5, 6, 7, 8, 0];
    expect(isSolvable(unsolvable)).toBe(false);
  });
});
