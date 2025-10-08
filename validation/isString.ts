/*
 * Copyright 2025 Marek Kobida
 */

function isString(input: any): input is string {
  return Object.prototype.toString.call(input) === '[object String]';
}

export default isString;
