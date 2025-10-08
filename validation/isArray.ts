/*
 * Copyright 2025 Marek Kobida
 */

function isArray(input: any): input is any[] {
  return Object.prototype.toString.call(input) === '[object Array]';
}

export default isArray;
