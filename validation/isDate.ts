/*
 * Copyright 2025 Marek Kobida
 */

function isDate(input: any): input is Date {
  return Object.prototype.toString.call(input) === '[object Date]';
}

export default isDate;
