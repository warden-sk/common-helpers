/*
 * Copyright 2025 Marek Kobida
 */
function isString(input) {
    return Object.prototype.toString.call(input) === '[object String]';
}
export default isString;
