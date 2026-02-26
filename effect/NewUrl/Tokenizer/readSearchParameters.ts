/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { TokenizerState } from './state.js';

import addToken from './addToken.js';
import isNotEnd from './isNotEnd.js';
import readCharacter from './readCharacter.js';

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

        state = addToken({
          parameter: [key, decodeURIComponent(value).replace(/\+/g, ' ')],
          type: 'SEARCH_PARAMETER',
          value: `${key}=${value}`,
        })(state);

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
