/*
 * Copyright 2025 Marek Kobida
 */
function isUint8Array(input) {
    return Object.prototype.toString.call(input) === '[object Uint8Array]';
}
export default isUint8Array;
