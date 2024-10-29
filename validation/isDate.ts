/*
 * Copyright 2023 Marek Kobida
 */

function isDate(input: unknown): input is Date {
  return Object.prototype.toString.call(input) === '[object Date]';
}

export default isDate;
