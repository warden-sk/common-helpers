/*
 * Copyright 2026 Marek Kobida
 */

import isArray from './isArray';
import isObject from './isObject';

// ✅
function isIndexable(input: unknown): input is Record<string, unknown> {
  return isObject(input) || isArray(input);
}

export default isIndexable;
