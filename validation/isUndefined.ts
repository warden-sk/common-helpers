/*
 * Copyright 2025 Marek Kobida
 */

function isUndefined(input: unknown): input is undefined {
  return Object.prototype.toString.call(input) === '[object Undefined]';
}

export default isUndefined;
