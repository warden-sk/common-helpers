/*
 * Copyright 2025 Marek Kobida
 */

function isBoolean(input: any): input is boolean {
  return Object.prototype.toString.call(input) === '[object Boolean]';
}

export default isBoolean;
