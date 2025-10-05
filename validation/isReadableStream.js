/*
 * Copyright 2025 Marek Kobida
 */
function isReadableStream(input) {
    return Object.prototype.toString.call(input) === '[object ReadableStream]';
}
export default isReadableStream;
