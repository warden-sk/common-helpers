/*
 * Copyright 2025 Marek Kobida
 */
function isDate(input) {
    return Object.prototype.toString.call(input) === '[object Date]';
}
export default isDate;
