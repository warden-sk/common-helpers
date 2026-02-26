/*
 * Copyright 2026 Marek Kobida
 */

import type { Token } from '../types.js';
import type { TokenizerState } from './state.js';

const addToken =
  (token: Token) =>
  (state: TokenizerState): TokenizerState => ({
    ...state,
    tokens: [...state.tokens, token],
  });

export default addToken;
