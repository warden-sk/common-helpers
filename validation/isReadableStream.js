/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */
function isReadableStream(input) {
    return Object.prototype.toString.call(input) === '[object ReadableStream]';
}
export default isReadableStream;
