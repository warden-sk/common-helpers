/*
 * Copyright 2025 Marek Kobida
 */
function isUndefined(input) {
    return Object.prototype.toString.call(input) === '[object Undefined]';
}
export default isUndefined;
