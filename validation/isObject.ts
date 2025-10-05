/*
 * Copyright 2025 Marek Kobida
 */

function isObject(input: unknown): input is { [key: string]: unknown } {
  return Object.prototype.toString.call(input) === '[object Object]';
}

export default isObject;
