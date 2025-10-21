/*
 * Copyright 2025 Marek Kobida
 */
import isArray from 'common-helpers/validation/isArray.js';
import isNumber from 'common-helpers/validation/isNumber.js';
import isObject from 'common-helpers/validation/isObject.js';
import isString from 'common-helpers/validation/isString.js';
// ✅
function encodeClassName(...decodedClassNames) {
    const encodedClassNames = [];
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
export default encodeClassName;
