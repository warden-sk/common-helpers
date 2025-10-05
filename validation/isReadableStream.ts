/*
 * Copyright 2025 Marek Kobida
 */

function isReadableStream(input: unknown): input is ReadableStream {
  return Object.prototype.toString.call(input) === '[object ReadableStream]';
}

export default isReadableStream;
