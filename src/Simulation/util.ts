import { XY } from '../types';

export function advanceTowardsDest(
  from: XY,
  to: XY,
  delta: number,
  speed: number = 0
) {
  const dir = { x: to.x - from.x, y: to.y - from.y };
  const distToDest = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
  const dirAsUnit =
    distToDest !== 0
      ? { x: dir.x / distToDest, y: dir.y / distToDest }
      : { x: 0, y: 0 };
  const distToGo = (delta * speed) / 1000;
  let partial = Math.min(distToDest / distToGo, 1);
  return {
    dir: {
      x: dirAsUnit.x * distToGo * partial,
      y: dirAsUnit.y * distToGo * partial,
    },
    remainder: delta * (1 - partial),
    completed: distToGo >= distToDest,
  };
}

export function randomItem<T>(array: T[]): T {
  let rand = Math.random();
  return array[Math.floor(rand * array.length)];
}
