/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { TokenizerState } from './types.js';

import addToken from './helpers/addToken.js';
import isAllowedCharacter, { ALLOWED_CHARACTERS, ALLOWED_NUMBERS } from './helpers/isAllowedCharacter.js';
import isNotEnd from './helpers/isNotEnd.js';
import readCharacter from './helpers/readCharacter.js';

function readHost(state: TokenizerState): Effect.Effect<TokenizerState, Error> {
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

      if (!isAllowedCharacter(character, ['.', ...ALLOWED_CHARACTERS, ...ALLOWED_NUMBERS])) {
        return yield* Effect.fail(new Error(`The character "${character}" is not valid.`));
      }

      value += character;

      state.cursor++;
    }

    if (!value.length) {
      return yield* Effect.fail(new Error('The host is not valid.'));
    }

    return addToken({ type: 'HOST', value })(state);
  });
}

export default readHost;
