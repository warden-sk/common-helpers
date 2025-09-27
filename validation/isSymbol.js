/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 27.09.2025
 */
function isSymbol(input) {
    return Object.prototype.toString.call(input) === '[object Symbol]';
}
export default isSymbol;
