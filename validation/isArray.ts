/*
 * Copyright 2026 Marek Kobida
 */

function isArray(input: unknown): input is readonly unknown[] {
  return Object.prototype.toString.call(input) === '[object Array]';
}

export default isArray;
