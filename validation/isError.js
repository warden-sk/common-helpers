/*
 * Copyright 2025 Marek Kobida
 */
function isError(input) {
    return Object.prototype.toString.call(input) === '[object Error]';
}
export default isError;
