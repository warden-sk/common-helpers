/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 24.03.2025
 */
const ALLOWED_CHARACTERS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];
const ALLOWED_NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
function isAllowedCharacter(character, allowedCharacters = ALLOWED_CHARACTERS) {
    for (const allowedCharacter of allowedCharacters) {
        if (allowedCharacter === character) {
            return true;
        }
    }
    return false;
}
export { ALLOWED_CHARACTERS, ALLOWED_NUMBERS };
export default isAllowedCharacter;
