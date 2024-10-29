/*
 * Copyright 2023 Marek Kobida
 */

function isString(input: unknown): input is string {
  return Object.prototype.toString.call(input) === '[object String]';
}

export default isString;
