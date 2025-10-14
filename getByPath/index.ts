/*
 * Copyright 2025 Marek Kobida
 */

import type { Path, PathValue } from './types.js';

// ✅
function getByPath<
  T extends {
    [key: string]: any;
  },
  TPath extends Path<T>,
>(input: T, path: TPath): PathValue<T, TPath> {
  const keys = path.split('.');

  return keys.reduce(($, key) => {
    return $[key];
  }, input) as PathValue<T, TPath>;
}

function setByPath<
  T extends {
    [key: string]: any;
  },
  TPath extends Path<T>,
>(input: T, path: TPath, value: PathValue<T, TPath>): T {
  return input;
}

export { setByPath };

export default getByPath;
