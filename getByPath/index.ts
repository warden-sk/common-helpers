/*
 * Copyright 2025 Marek Kobida
 */

import type { Path, PathValue } from './types.js';

// ✅
function getByPath<T extends Record<string, any>, TPath extends Path<T>>(input: T, path: TPath): PathValue<T, TPath> {
  const keys = path.split('.');

  return keys.reduce(($, key) => {
    return $[key];
  }, input) as PathValue<T, TPath>;
}

export default getByPath;
