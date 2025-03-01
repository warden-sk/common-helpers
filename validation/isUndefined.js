/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */
function isUndefined(input) {
    return Object.prototype.toString.call(input) === '[object Undefined]';
}
export default isUndefined;
