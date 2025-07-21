/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 21.07.2025
 */
function isObject(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
}
export default isObject;
