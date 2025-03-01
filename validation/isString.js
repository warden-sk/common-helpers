/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */
function isString(input) {
    return Object.prototype.toString.call(input) === '[object String]';
}
export default isString;
