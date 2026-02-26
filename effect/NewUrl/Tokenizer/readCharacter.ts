/*
 * Copyright 2026 Marek Kobida
 */

import type { TokenizerState } from './state.js';

// ✅
function readCharacter(state: TokenizerState, cursor: number = state.cursor): string {
  return state.input[cursor]!;
}

export default readCharacter;
