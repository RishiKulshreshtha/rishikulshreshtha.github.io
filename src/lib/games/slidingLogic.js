export const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0];

export function getAdjacent(pos) {
  const row = Math.floor(pos / 3);
  const col = pos % 3;
  const adj = [];
  if (row > 0) adj.push(pos - 3);
  if (row < 2) adj.push(pos + 3);
  if (col > 0) adj.push(pos - 1);
  if (col < 2) adj.push(pos + 1);
  return adj;
}

export function shuffle(tiles) {
  const t = [...tiles];
  let emptyPos = t.indexOf(0);
  for (let i = 0; i < 300; i++) {
    const adj = getAdjacent(emptyPos);
    const next = adj[Math.floor(Math.random() * adj.length)];
    [t[emptyPos], t[next]] = [t[next], t[emptyPos]];
    emptyPos = next;
  }
  return t;
}

export function isSolvable(tiles) {
  // A puzzle shuffled via random valid moves is always solvable.
  // This checks inversions as a sanity guard.
  const flat = tiles.filter(t => t !== 0);
  let inversions = 0;
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inversions++;
    }
  }
  return inversions % 2 === 0;
}
