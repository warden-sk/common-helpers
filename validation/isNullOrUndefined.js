/*
 * Copyright 2025 Marek Kobida
 */
import isNull from './isNull.js';
import isUndefined from './isUndefined.js';
function isNullOrUndefined(input) {
    return isNull(input) || isUndefined(input);
}
export default isNullOrUndefined;
