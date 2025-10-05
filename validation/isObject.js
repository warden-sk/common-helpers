/*
 * Copyright 2025 Marek Kobida
 */
function isObject(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
}
export default isObject;
