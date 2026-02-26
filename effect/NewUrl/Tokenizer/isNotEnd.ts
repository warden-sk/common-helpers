/*
 * Copyright 2026 Marek Kobida
 */

import type { TokenizerState } from './state.js';

// ✅
function isNotEnd(state: TokenizerState): boolean {
  return state.cursor < state.input.length;
}

export default isNotEnd;
