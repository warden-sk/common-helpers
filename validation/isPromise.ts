/*
 * Copyright 2025 Marek Kobida
 */

function isPromise(input: any): input is Promise<any> {
  return Object.prototype.toString.call(input) === '[object Promise]';
}

export default isPromise;
