/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { TokenizerState } from './types.js';

import addToken from './helpers/addToken.js';
import isNotEnd from './helpers/isNotEnd.js';
import readCharacter from './helpers/readCharacter.js';

function readSearchParameters(state: TokenizerState): Effect.Effect<TokenizerState, Error> {
  return Effect.sync(() => {
    if (readCharacter(state) === '?') {
      state.cursor++;

      while (isNotEnd(state)) {
        let hasKey = false;

        let key = '';
        let value = '';

        while (isNotEnd(state) && readCharacter(state) !== '&') {
          const character = readCharacter(state);

          if (character === '=') {
            hasKey = true;
          } else {
            hasKey ? (value += character) : (key += character);
          }

          state.cursor++;
        }

        state = addToken({ parameter: [key, value], type: 'SEARCH_PARAMETER', value: `${key}=${value}` })(state);

        if (readCharacter(state) === '&') {
          state.cursor++;
        } else {
          break;
        }
      }
    }

    return state;
  });
}

export default readSearchParameters;
