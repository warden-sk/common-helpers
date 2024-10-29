/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 29.10.2024
 */

import isNull from './isNull';
import isUndefined from './isUndefined';

function isNullOrUndefined(input: unknown): input is null | undefined {
  return isNull(input) || isUndefined(input);
}

export default isNullOrUndefined;
