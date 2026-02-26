/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { TokenizerError } from '../types.js';
import type { TokenizerState } from './state.js';

import isAllowedCharacter, { ALLOWED_CHARACTERS, ALLOWED_NUMBERS } from '../isAllowedCharacter.js';
import { InvalidCharacterError, InvalidParameterizedPathError, MissingCharacterError } from '../types.js';
import addToken from './addToken.js';
import isNotEnd from './isNotEnd.js';
import readCharacter from './readCharacter.js';

function readPath(state: TokenizerState): Effect.Effect<TokenizerState, TokenizerError> {
  return Effect.gen(function* () {
    if (readCharacter(state) !== '/') {
      return state;
    }

    while (isNotEnd(state) && readCharacter(state) === '/') {
      let value = '';

      state.cursor++;

      if (readCharacter(state) === '{') {
        state.cursor++;

        const parameter: [string, boolean] = ['', false];

        while (isNotEnd(state) && readCharacter(state) !== '}') {
          const character = readCharacter(state);

          if (character === '?' && readCharacter(state, state.cursor + 1) === '}') {
            parameter[1] = true;
          } else {
            parameter[0] += character;
          }

          state.cursor++;
        }

        if (!parameter[0].length) {
          return yield* Effect.fail(new InvalidParameterizedPathError());
        }

        if (readCharacter(state) !== '}') {
          return yield* Effect.fail(new MissingCharacterError('}'));
        }

        state.cursor++;

        value += `{${parameter[0]}${parameter[1] ? '?' : ''}}`;

        state = addToken({ parameter, type: 'PARAMETERIZED_PATH', value })(state);
        continue;
      }

      while (
        isNotEnd(state) &&
        readCharacter(state) !== '#' &&
        readCharacter(state) !== '&' &&
        readCharacter(state) !== '/' &&
        readCharacter(state) !== '?'
      ) {
        const character = readCharacter(state);

        if (!isAllowedCharacter(character, ['-', '.', ...ALLOWED_CHARACTERS, ...ALLOWED_NUMBERS])) {
          return yield* Effect.fail(new InvalidCharacterError(character));
        }

        value += character;
        state.cursor++;
      }

      state = addToken({ type: 'PATH', value })(state);
    }

    return state;
  });
}

export default readPath;
