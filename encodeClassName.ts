/*
 * Copyright 2025 Marek Kobida
 */

import isArray from 'common-helpers/validation/isArray.js';
import isNumber from 'common-helpers/validation/isNumber.js';
import isObject from 'common-helpers/validation/isObject.js';
import isString from 'common-helpers/validation/isString.js';

type DecodedClassName =
  | {
      [key: string]: boolean | Falsy;
    }
  | boolean
  | DecodedClassName[]
  | Falsy
  | number
  | string;

type EncodedClassName = string | undefined;

// https://developer.mozilla.org/en-US/docs/Glossary/Falsy
type Falsy = '' | 0 | false | null | undefined;

// ✅
function encodeClassName(...decodedClassNames: DecodedClassName[]): EncodedClassName {
  const encodedClassNames: EncodedClassName[] = [];

  for (const decodedClassName of decodedClassNames) {
    // Array
    if (isArray(decodedClassName)) {
      const encodedClassName = encodeClassName(...decodedClassName);

      if (isString(encodedClassName)) {
        encodedClassNames.push(encodedClassName);
      }
    }

    // Number
    else if (isNumber(decodedClassName)) {
      encodedClassNames.push(`${decodedClassName}`);
    }

    // Object
    else if (isObject(decodedClassName)) {
      for (const encodedClassName in decodedClassName) {
        if (decodedClassName[encodedClassName]) {
          encodedClassNames.push(encodedClassName);
        }
      }
    }

    // String
    else if (isString(decodedClassName)) {
      encodedClassNames.push(decodedClassName);
    }
  }

  if (encodedClassNames.length > 0) {
    return encodedClassNames.join(' ');
  }
}

export type { DecodedClassName, EncodedClassName };

export default encodeClassName;
