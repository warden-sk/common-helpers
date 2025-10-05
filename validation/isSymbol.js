/*
 * Copyright 2025 Marek Kobida
 */
function isSymbol(input) {
    return Object.prototype.toString.call(input) === '[object Symbol]';
}
export default isSymbol;
