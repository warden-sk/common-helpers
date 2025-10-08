/*
 * Copyright 2025 Marek Kobida
 */

function isPromise(input: unknown): input is Promise<unknown> {
  return Object.prototype.toString.call(input) === '[object Promise]';
}

export default isPromise;
