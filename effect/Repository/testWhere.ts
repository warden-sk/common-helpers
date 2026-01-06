/*
 * Copyright 2026 Marek Kobida
 */

import { Option } from 'effect';

import type { Row, Where } from './types.js';

import isArray from '../../validation/isArray.js';
import isBoolean from '../../validation/isBoolean.js';
import isNumber from '../../validation/isNumber.js';
import isObject from '../../validation/isObject.js';
import isString from '../../validation/isString.js';
import getByPath from './getByPath.js';

function isComparable(input: unknown): input is boolean | number | string {
  return isBoolean(input) || isNumber(input) || isString(input);
}

function testWhere<T extends Row>(row: T, where: Where<T>): boolean {
  const { $and, $or, ...$ } = where;

  if (
    isArray($and) &&
    !$and.every(where => {
      return testWhere(row, where);
    })
  ) {
    return false;
  }

  if (
    isArray($or) &&
    !$or.some(where => {
      return testWhere(row, where);
    })
  ) {
    return false;
  }

  if (isObject($)) {
    const paths = Object.keys($) as (keyof typeof $)[];

    for (const path of paths) {
      // Z-A
      const value = $[path]!;
      const rowValueOption = getByPath(row, path);

      if (Option.isNone(rowValueOption)) {
        return false;
      }

      const rowValue = rowValueOption.value;

      if (isComparable(value) && !(value === rowValue)) {
        return false;
      }

      if (isObject(value)) {
        if (isComparable(value.$eq) && !(value.$eq === rowValue)) {
          return false;
        }

        if (isComparable(value.$gt) && !(value.$gt < rowValue)) {
          return false;
        }

        if (isComparable(value.$gte) && !(value.$gte <= rowValue)) {
          return false;
        }

        if (isComparable(value.$lt) && !(value.$lt > rowValue)) {
          return false;
        }

        if (isComparable(value.$lte) && !(value.$lte >= rowValue)) {
          return false;
        }

        if (isComparable(value.$ne) && !(value.$ne !== rowValue)) {
          return false;
        }
      }
    }
  }

  return true;
}

export default testWhere;
