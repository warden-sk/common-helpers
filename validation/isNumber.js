/*
 * Copyright 2025 Marek Kobida
 */
function isNumber(input) {
    return Object.prototype.toString.call(input) === '[object Number]';
}
export default isNumber;
