/*
 * Copyright 2025 Marek Kobida
 */
function isNull(input) {
    return Object.prototype.toString.call(input) === '[object Null]';
}
export default isNull;
