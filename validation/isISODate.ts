/*
 * Copyright 2025 Marek Kobida
 */

import isString from './isString.js';

// ✅
function isISODate(input: unknown): input is string {
  //                        ↓ 2024-12-31T23:00:00.000Z
  return isString(input) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(input);
}

export default isISODate;
