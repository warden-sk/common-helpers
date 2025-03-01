/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */
function isDate(input) {
    return Object.prototype.toString.call(input) === '[object Date]';
}
export default isDate;
