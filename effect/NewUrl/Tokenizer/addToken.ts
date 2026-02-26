/*
 * Copyright 2026 Marek Kobida
 */

import type { Token } from '../types.js';
import type { TokenizerState } from './state.js';

// ✅
function addToken(token: Token) {
  return function (state: TokenizerState): TokenizerState {
    return {
      ...state,
      tokens: [...state.tokens, token],
    };
  };
}

export default addToken;
