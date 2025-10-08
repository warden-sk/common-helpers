/*
 * Copyright 2025 Marek Kobida
 */

function isReadableStream(input: any): input is ReadableStream {
  return Object.prototype.toString.call(input) === '[object ReadableStream]';
}

export default isReadableStream;
