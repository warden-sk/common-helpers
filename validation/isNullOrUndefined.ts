/*
 * Copyright 2023 Marek Kobida
 */

import isNull from './isNull';
import isUndefined from './isUndefined';

function isNullOrUndefined(input: unknown): input is null | undefined {
  return isNull(input) || isUndefined(input);
}

export default isNullOrUndefined;
