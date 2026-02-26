/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { TokenizerError } from '../types.js';
import type { TokenizerState } from './state.js';

import isAllowedCharacter, { ALLOWED_CHARACTERS, ALLOWED_NUMBERS } from '../isAllowedCharacter.js';
import { InvalidCharacterError, InvalidHostError } from '../types.js';
import addToken from './addToken.js';
import isNotEnd from './isNotEnd.js';
import readCharacter from './readCharacter.js';

// ✅
function readHost(state: TokenizerState): Effect.Effect<TokenizerState, TokenizerError> {
  return Effect.gen(function* () {
    let value = '';

    while (
      isNotEnd(state) &&
      readCharacter(state) !== '#' &&
      readCharacter(state) !== '&' &&
      readCharacter(state) !== '/' &&
      readCharacter(state) !== ':' &&
      readCharacter(state) !== '?'
    ) {
      const character = readCharacter(state);

      if (!(character === '.' || isAllowedCharacter(character, [...ALLOWED_CHARACTERS, ...ALLOWED_NUMBERS]))) {
        return yield* Effect.fail(new InvalidCharacterError(character));
      }

      value += character;
      state.cursor++;
    }

    if (!value.length) {
      return yield* Effect.fail(new InvalidHostError());
    }

    return addToken({
      type: 'HOST',
      value,
    })(state);
  });
}

export default readHost;
