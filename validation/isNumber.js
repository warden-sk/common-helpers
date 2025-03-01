/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */
function isNumber(input) {
    return Object.prototype.toString.call(input) === '[object Number]';
}
export default isNumber;
