/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 24.03.2025
 */
import invariant from '../validation/invariant.js';
import isAllowedCharacter, { ALLOWED_CHARACTERS, ALLOWED_NUMBERS } from './isAllowedCharacter.js';
const schemes = ['http://', 'https://'];
// RFC 1738
class Tokenizer {
    cursor = 0;
    input;
    tokens = [];
    constructor(input) {
        this.input = input;
        this.readScheme().readHost().readPort().readPath().readSearchParameters();
    }
    // ✅
    addToken(token) {
        this.tokens.push(token);
        return this;
    }
    // ✅
    isNotEnd() {
        return this.cursor < this.input.length;
    }
    // ✅
    readCharacter(cursor = this.cursor) {
        return this.input[cursor];
    }
    // ✅
    readCharacters(cursor, length) {
        let characters = '';
        for (let i = cursor; i < length; i++) {
            const character = this.readCharacter(i);
            characters += character;
        }
        return characters;
    }
    // ✅
    readHost() {
        let value = '';
        while (this.isNotEnd() &&
            this.readCharacter() !== '#' &&
            this.readCharacter() !== '&' &&
            this.readCharacter() !== '/' && // PATH
            this.readCharacter() !== ':' && // PORT
            this.readCharacter() !== '?') {
            const character = this.readCharacter();
            // 127.0.0.1
            invariant(character === '.' || isAllowedCharacter(character, [...ALLOWED_CHARACTERS, ...ALLOWED_NUMBERS]), `The character "${character}" is not valid.`);
            value += character;
            this.cursor++;
        }
        invariant(value.length, 'The host is not valid.');
        return this.addToken({ type: 'HOST', value });
    }
    // ✅
    readPath() {
        if (this.readCharacter() === '/') {
            while (this.isNotEnd() && this.readCharacter() === '/') {
                let value = '';
                this.cursor++;
                if (this.readCharacter() === '{') {
                    this.cursor++;
                    //                      ↓ je voliteľný?
                    let parameter = ['', false];
                    while (this.isNotEnd() && this.readCharacter() !== '}') {
                        const character = this.readCharacter();
                        if (character === '?' && this.readCharacter(this.cursor + 1) === '}') {
                            parameter[1] = true;
                        }
                        else {
                            parameter[0] += character;
                        }
                        this.cursor++;
                    }
                    invariant(parameter[0].length, 'The parameterized path is not valid.');
                    invariant(this.readCharacter() === '}', 'The character "}" does not exist.');
                    this.cursor++;
                    value += `{${parameter[0]}${parameter[1] ? '?' : ''}}`;
                    this.addToken({ parameter, type: 'PARAMETERIZED_PATH', value });
                }
                else {
                    while (this.isNotEnd() &&
                        this.readCharacter() !== '#' &&
                        this.readCharacter() !== '&' &&
                        this.readCharacter() !== '/' &&
                        this.readCharacter() !== '?') {
                        const character = this.readCharacter();
                        invariant(isAllowedCharacter(character, ['-', '.', ...ALLOWED_CHARACTERS, ...ALLOWED_NUMBERS]), `The character "${character}" is not valid.`);
                        value += character;
                        this.cursor++;
                    }
                    // invariant(value.length, 'The path is not valid.');
                    this.addToken({ type: 'PATH', value });
                }
            }
        }
        return this;
    }
    // ✅
    readPort() {
        if (this.readCharacter() === ':') {
            let value = '';
            this.cursor++;
            while (isAllowedCharacter(this.readCharacter(), ALLOWED_NUMBERS) && this.isNotEnd()) {
                value += this.readCharacter();
                this.cursor++;
            }
            invariant(value.length, 'The port is not valid.');
            return this.addToken({ type: 'PORT', value });
        }
        return this;
    }
    // ✅
    readScheme() {
        let value = '';
        for (const scheme of schemes) {
            if (scheme === this.readCharacters(this.cursor, scheme.length)) {
                value = scheme;
                this.cursor += scheme.length;
            }
        }
        invariant(value.length, 'The scheme is not valid.');
        return this.addToken({ type: 'SCHEME', value });
    }
    // ✅
    readSearchParameters() {
        if (this.readCharacter() === '?') {
            this.cursor++;
            while (this.isNotEnd()) {
                let hasKey = false;
                let key = '';
                let value = '';
                while (this.isNotEnd() && this.readCharacter() !== '&') {
                    const character = this.readCharacter();
                    if (character === '=') {
                        hasKey = true;
                    }
                    else {
                        hasKey ? (value += character) : (key += character);
                    }
                    this.cursor++;
                }
                this.addToken({ parameter: [key, value], type: 'SEARCH_PARAMETER', value: `${key}=${value}` });
                if (this.readCharacter() === '&') {
                    this.cursor++;
                }
                else {
                    break;
                }
            }
        }
        return this;
    }
}
export default Tokenizer;
