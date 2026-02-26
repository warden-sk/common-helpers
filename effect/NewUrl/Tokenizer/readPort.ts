/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { TokenizerError } from '../types.js';
import type { TokenizerState } from './state.js';

import isAllowedCharacter, { ALLOWED_NUMBERS } from '../isAllowedCharacter.js';
import { InvalidPortError } from '../types.js';
import addToken from './addToken.js';
import isNotEnd from './isNotEnd.js';
import readCharacter from './readCharacter.js';

function readPort(state: TokenizerState): Effect.Effect<TokenizerState, TokenizerError> {
  return Effect.gen(function* () {
    if (readCharacter(state) === ':') {
      let value = '';

      state.cursor++;

      while (isNotEnd(state) && isAllowedCharacter(readCharacter(state), ALLOWED_NUMBERS)) {
        value += readCharacter(state);
        state.cursor++;
      }

      if (!value.length) {
        return yield* Effect.fail(new InvalidPortError());
      }

      return addToken({ type: 'PORT', value })(state);
    }

    return state;
  });
}

export default readPort;
