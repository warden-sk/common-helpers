/*
 * Copyright 2025 Marek Kobida
 */

function isBoolean(input: unknown): input is boolean {
  return Object.prototype.toString.call(input) === '[object Boolean]';
}

export default isBoolean;
