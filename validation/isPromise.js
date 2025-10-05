/*
 * Copyright 2025 Marek Kobida
 */
function isPromise(input) {
    return Object.prototype.toString.call(input) === '[object Promise]';
}
export default isPromise;
