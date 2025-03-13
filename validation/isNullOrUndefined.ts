/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 29.10.2024
 */

import isNull from './isNull.js';
import isUndefined from './isUndefined.js';

function isNullOrUndefined(input: unknown): input is null | undefined {
  return isNull(input) || isUndefined(input);
}

export default isNullOrUndefined;
