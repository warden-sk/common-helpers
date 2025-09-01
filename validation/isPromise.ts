/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */

function isPromise(input: unknown): input is Promise<unknown> {
  return Object.prototype.toString.call(input) === '[object Promise]';
}

export default isPromise;
