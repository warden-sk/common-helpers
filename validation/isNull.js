/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */
function isNull(input) {
    return Object.prototype.toString.call(input) === '[object Null]';
}
export default isNull;
