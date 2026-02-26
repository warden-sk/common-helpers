/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { TokenizerError } from '../types.js';
import type { TokenizerState } from './state.js';

import { InvalidSchemeError } from '../types.js';
import addToken from './addToken.js';
import readCharacters from './readCharacters.js';

function readScheme(state: TokenizerState, schemes: readonly string[]): Effect.Effect<TokenizerState, TokenizerError> {
  return Effect.gen(function* () {
    let value = '';

    for (const scheme of schemes) {
      if (scheme === readCharacters(state, state.cursor, scheme.length)) {
        value = scheme;
        state.cursor += scheme.length;
      }
    }

    if (!value.length) {
      return yield* Effect.fail(new InvalidSchemeError());
    }

    return addToken({
      type: 'SCHEME',
      value,
    })(state);
  });
}

export default readScheme;
