/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */

function isError(input: unknown): input is Error {
  return Object.prototype.toString.call(input) === '[object Error]';
}

export default isError;
