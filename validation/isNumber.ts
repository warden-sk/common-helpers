/*
 * Copyright 2023 Marek Kobida
 */

function isNumber(input: unknown): input is number {
  return Object.prototype.toString.call(input) === '[object Number]';
}

export default isNumber;
