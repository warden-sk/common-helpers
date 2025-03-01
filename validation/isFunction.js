/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */
function isFunction(input) {
    return (Object.prototype.toString.call(input) === '[object AsyncFunction]' ||
        Object.prototype.toString.call(input) === '[object Function]');
}
export default isFunction;
