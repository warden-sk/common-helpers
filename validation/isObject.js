/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */
function isObject(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
}
export default isObject;
