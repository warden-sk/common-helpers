/*
 * Copyright 2024 Marek Kobida
 */
import invariant from './invariant.js';
import isString from './isString.js';
const allowedCharacters = new Set([
    0x010c,
    0x010d,
    0x010e,
    0x010f,
    0x011a,
    0x011b,
    0x0139,
    0x013a,
    0x013d,
    0x013e,
    0x0147,
    0x0148,
    0x0154,
    0x0155,
    0x0158,
    0x0159,
    0x0160,
    0x0161,
    0x0164,
    0x0165,
    0x016e,
    0x016f,
    0x017d,
    0x017e,
    0x20,
    0x21,
    0x22,
    0x23,
    0x24,
    0x25,
    0x26,
    0x27,
    0x28,
    0x29,
    0x2a,
    0x2b,
    0x2c,
    0x2d,
    0x2e,
    0x2f,
    0x30,
    0x31,
    0x32,
    0x33,
    0x34,
    0x35,
    0x36,
    0x37,
    0x38,
    0x39,
    0x3a,
    0x3b,
    0x3c,
    0x3d,
    0x3e,
    0x3f,
    0x40,
    0x41,
    0x42,
    0x43,
    0x44,
    0x45,
    0x46,
    0x47,
    0x48,
    0x49,
    0x4a,
    0x4b,
    0x4c,
    0x4d,
    0x4e,
    0x4f,
    0x50,
    0x51,
    0x52,
    0x53,
    0x54,
    0x55,
    0x56,
    0x57,
    0x58,
    0x59,
    0x5a,
    0x5b,
    0x5c,
    0x5d,
    0x5e,
    0x5f,
    0x60,
    0x61,
    0x62,
    0x63,
    0x64,
    0x65,
    0x66,
    0x67,
    0x68,
    0x69,
    0x6a,
    0x6b,
    0x6c,
    0x6d,
    0x6e,
    0x6f,
    0x70,
    0x71,
    0x72,
    0x73,
    0x74,
    0x75,
    0x76,
    0x77,
    0x78,
    0x79,
    0x7a,
    0x7b,
    0x7c,
    0x7d,
    0x7e,
    0xc1,
    0xc4,
    0xc9,
    0xcd,
    0xd3,
    0xd4,
    0xda,
    0xdd,
    0xe1,
    0xe4,
    0xe9,
    0xed,
    0xf3,
    0xf4,
    0xfa,
    0xfd, // ý
]);
function isInputValid(input) {
    try {
        const validatedInput = validateInput(input);
        return input === validatedInput;
    }
    catch {
        return false;
    }
}
function validateInput(input) {
    invariant(isString(input), '');
    const $ = input.normalize(); // from a [0x0061] ◌́ [0x0301] to á [0x00E1]
    // if ($.charCodeAt(0) === 0x20 || $.charCodeAt($.length - 1) === 0x20) {
    //   throw new Error('');
    // }
    for (const character of $) {
        if (!allowedCharacters.has(character.charCodeAt(0))) {
            throw new Error(`Znak „${character}“ nie je platný.`);
        }
    }
    return $;
}
export { allowedCharacters, isInputValid, validateInput };
