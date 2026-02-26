/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { TokenizerState } from './state.js';

import addToken from './addToken.js';
import readCharacters from './readCharacters.js';

const schemes: readonly string[] = ['http://', 'https://'];

function readScheme(state: TokenizerState): Effect.Effect<TokenizerState, Error> {
  return Effect.gen(function* () {
    let value = '';

    for (const scheme of schemes) {
      if (scheme === readCharacters(state, state.cursor, scheme.length)) {
        value = scheme;
        state.cursor += scheme.length;
      }
    }

    if (!value.length) {
      return yield* Effect.fail(new Error('The scheme is not valid.'));
    }

    return addToken({ type: 'SCHEME', value })(state);
  });
}

export default readScheme;
