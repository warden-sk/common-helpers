/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */
function isBoolean(input) {
    return Object.prototype.toString.call(input) === '[object Boolean]';
}
export default isBoolean;
