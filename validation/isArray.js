/*
 * Copyright 2025 Marek Kobida
 */
function isArray(input) {
    return Object.prototype.toString.call(input) === '[object Array]';
}
export default isArray;
