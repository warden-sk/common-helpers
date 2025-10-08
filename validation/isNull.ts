/*
 * Copyright 2025 Marek Kobida
 */

function isNull(input: any): input is null {
  return Object.prototype.toString.call(input) === '[object Null]';
}

export default isNull;
