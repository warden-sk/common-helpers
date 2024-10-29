/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 04.03.2024
 */

function isError(input: unknown): input is Error {
  return Object.prototype.toString.call(input) === '[object Error]';
}

export default isError;
