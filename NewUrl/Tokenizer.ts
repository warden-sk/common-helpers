/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 24.03.2025
 */

import invariant from '../validation/invariant.js';
import isAllowedCharacter, { ALLOWED_CHARACTERS, ALLOWED_NUMBERS } from './isAllowedCharacter.js';
import type { Token } from './types.js';

const schemes: string[] = ['http://', 'https://'];

// RFC 1738
class Tokenizer {
  cursor = 0;
  readonly input: string;
  tokens: Token[] = [];

  constructor(input: string) {
    this.input = input;

    this.readScheme().readHost().readPort().readPath().readSearchParameters();
  }

  addToken(token: Token): this {
    this.tokens.push(token);

    return this;
  }

  isNotEnd(): boolean {
    return this.cursor < this.input.length;
  }

  readCharacter(cursor: number = this.cursor): string {
    return this.input[cursor]!;
  }

  readCharacters(cursor: number, length: number): string {
    let characters = '';

    for (let i = cursor; i < length; i++) {
      const character = this.readCharacter(i);

      characters += character;
    }

    return characters;
  }

  readHost(): this {
    let value = '';

    //                        ↓ PATH                          ↓ PORT
    while (this.isNotEnd() && this.readCharacter() !== '/' && this.readCharacter() !== ':') {
      const character = this.readCharacter();

      invariant(
        character === '.' || isAllowedCharacter(character, [...ALLOWED_CHARACTERS, ...ALLOWED_NUMBERS]),
        `The character "${character}" is not valid.`,
      );

      value += character;

      this.cursor++;
    }

    invariant(value.length, 'The host is not valid.');

    return this.addToken({ type: 'HOST', value });
  }

  readPath(): this {
    while (this.isNotEnd() && this.readCharacter() === '/') {
      let value = '';

      this.cursor++;

      if (this.isNotEnd() && this.readCharacter() === '{') {
        this.cursor++;

        //                      ↓ je voliteľný?
        let parameter: [string, boolean] = ['', false];

        while (this.isNotEnd() && this.readCharacter() !== '}') {
          const character = this.readCharacter();

          if (character === '?' && this.readCharacter(this.cursor + 1) === '}') {
            parameter[1] = true;
          } else {
            // isAllowedCharacter

            parameter[0] += character;
          }

          this.cursor++;
        }

        invariant(this.readCharacter() === '}', 'The character "}" does not exist.');

        this.cursor++;

        value += `{${parameter[0]}${parameter[1] ? '?' : ''}}`;

        this.addToken({ parameter, type: 'PARAMETERIZED_PATH', value });
      } else {
        while (
          this.isNotEnd() &&
          this.readCharacter() !== '#' &&
          this.readCharacter() !== '&' &&
          this.readCharacter() !== '/' &&
          this.readCharacter() !== '?'
        ) {
          const character = this.readCharacter();

          invariant(
            isAllowedCharacter(character, ['-', '.', ...ALLOWED_CHARACTERS, ...ALLOWED_NUMBERS]),
            `The character "${character}" is not valid.`,
          );

          value += character;

          this.cursor++;
        }

        this.addToken({ type: 'PATH', value });
      }
    }

    return this;
  }

  readPort(): this {
    if (this.readCharacter() === ':') {
      let value = '';

      this.cursor++;

      while (isAllowedCharacter(this.readCharacter(), ALLOWED_NUMBERS) && this.isNotEnd()) {
        value += this.readCharacter();

        this.cursor++;
      }

      return this.addToken({ type: 'PORT', value });
    }

    return this;
  }

  readScheme(): this {
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

  // DOKONČIŤ
  readSearchParameters(): this {
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
          } else {
            hasKey ? (value += character) : (key += character);
          }

          this.cursor++;
        }

        this.addToken({ parameter: [key, value], type: 'SEARCH_PARAMETER', value: `${key}=${value}` });

        if (this.readCharacter() === '&') {
          this.cursor++;
        } else {
          break;
        }
      }
    }

    return this;
  }
}

export default Tokenizer;
