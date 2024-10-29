/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */

function isUndefined(input: unknown): input is undefined {
  return Object.prototype.toString.call(input) === '[object Undefined]';
}

export default isUndefined;
