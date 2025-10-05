/*
 * Copyright 2025 Marek Kobida
 */

function isArray(input: unknown): input is unknown[] {
  return Object.prototype.toString.call(input) === '[object Array]';
}

export default isArray;
