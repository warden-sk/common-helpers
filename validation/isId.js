/*
 * Copyright 2025 Marek Kobida
 */
import * as λ from '../λ.js';
import isString from './isString.js';
// ✅
function isId(input) {
    return isString(input) && λ.ID_PATTERN.test(input);
}
export default isId;
