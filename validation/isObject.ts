/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 19.04.2025
 */

function isObject(input: unknown): input is { [key: string]: unknown } {
  return Object.prototype.toString.call(input) === '[object Object]';
}

export default isObject;
