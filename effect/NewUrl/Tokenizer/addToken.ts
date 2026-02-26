/*
 * Copyright 2026 Marek Kobida
 */

import type { TokenizerState } from './state.js';
import type { Token } from './types.js';

// ✅
function addToken(token: Token) {
  return (state: TokenizerState): TokenizerState => {
    return {
      ...state,
      tokens: [...state.tokens, token],
    };
  };
}

export default addToken;
