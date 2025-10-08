/*
 * Copyright 2025 Marek Kobida
 */

function isObject(input: any): input is { [key: string]: any } {
  return Object.prototype.toString.call(input) === '[object Object]';
}

export default isObject;
