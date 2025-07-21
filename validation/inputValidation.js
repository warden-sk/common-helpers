/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 21.07.2025
 */
import invariant from './invariant.js';
import isString from './isString.js';
const allowedCharacters = new Set([
    0x64, // d
    0x65, // e
    0x66, // f
    0x67, // g
    0x68, // h
    0x69, // i
    0x6a, // j
    0x6b, // k
    0x6c, // l
    0x6d, // m
    0x6e, // n
    0x6f, // o
    0x70, // p
    0x71, // q
    0x72, // r
    0x73, // s
    0x74, // t
    0x75, // u
    0x76, // v
    0x77, // w
    0x78, // x
    0x79, // y
    0x7a, // z
    0x7b, // {
    0x7c, // |
    0x7d, // }
    0x7e, // ~
    0xc1, // Á
    0xc4, // Ä
    0xc9, // É
    0xcd, // Í
    0xd3, // Ó
    0xd4, // Ô
    0xda, // Ú
    0xdd, // Ý
    0xe1, // á
    0xe4, // ä
    0xe9, // é
    0xed, // í
    0xf3, // ó
    0xf4, // ô
    0xfa, // ú
    0xfd, // ý
    0x010c, // Č
    0x010d, // č
    0x010e, // Ď
    0x010f, // ď
    0x011a, // Ě
    0x011b, // ě
    0x0139, // Ĺ
    0x013a, // ĺ
    0x013d, // Ľ
    0x013e, // ľ
    0x20, // space
    0x0147, // Ň
    0x0148, // ň
    0x21, // !
    0x22, // "
    0x0154, // Ŕ
    0x0155, // ŕ
    0x0158, // Ř
    0x0159, // ř
    0x23, // #
    0x0160, // Š
    0x0161, // š
    0x0164, // Ť
    0x0165, // ť
    0x24, // $
    0x016e, // Ů
    0x016f, // ů
    0x25, // %
    0x26, // &
    0x017d, // Ž
    0x017e, // ž
    0x27, // '
    0x28, // (
    0x29, // )
    0x2a, // *
    0x2b, // +
    0x2c, // ,
    0x2d, // -
    0x2e, // .
    0x2f, // /
    0x30, // 0
    0x31, // 1
    0x32, // 2
    0x33, // 3
    0x34, // 4
    0x35, // 5
    0x36, // 6
    0x37, // 7
    0x38, // 8
    0x39, // 9
    0x3a, // :
    0x3b, // ;
    0x3c, // <
    0x3d, // =
    0x3e, // >
    0x3f, // ?
    0x40, // @
    0x41, // A
    0x42, // B
    0x43, // C
    0x44, // D
    0x45, // E
    0x46, // F
    0x47, // G
    0x48, // H
    0x49, // I
    0x4a, // J
    0x4b, // K
    0x4c, // L
    0x4d, // M
    0x4e, // N
    0x4f, // O
    0x50, // P
    0x51, // Q
    0x52, // R
    0x53, // S
    0x54, // T
    0x55, // U
    0x56, // V
    0x57, // W
    0x58, // X
    0x59, // Y
    0x5a, // Z
    0x5b, // [
    0x5c, // \
    0x5d, // ]
    0x5e, // ^
    0x5f, // _
    0x60, // `
    0x61, // a
    0x62, // b
    0x63, // c
]);
function isInputValid(input) {
    try {
        return input === validateInput(input);
    }
    catch {
        return false;
    }
}
function validateInput(input) {
    invariant(isString(input), 'Vstup nie je platný.');
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
