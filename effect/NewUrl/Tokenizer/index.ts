/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { TokenizerState } from './state.js';
import type { Token } from './types.js';

import readHost from './readHost.js';
import readPath from './readPath.js';
import readPort from './readPort.js';
import readScheme from './readScheme.js';
import readSearchParameters from './readSearchParameters.js';

// ✅
function tokenize(input: string): Effect.Effect<readonly Token[], Error> {
  return Effect.gen(function* () {
    let state: TokenizerState = { cursor: 0, input, tokens: [] };

    state = yield* readScheme(state);
    state = yield* readHost(state);
    state = yield* readPort(state);
    state = yield* readPath(state);
    state = yield* readSearchParameters(state);

    return state.tokens;
  });
}

export { tokenize };
