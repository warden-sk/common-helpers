/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 08.05.2024
 */

function isArray(input: unknown): input is unknown[] {
  return Object.prototype.toString.call(input) === '[object Array]';
}

export default isArray;
