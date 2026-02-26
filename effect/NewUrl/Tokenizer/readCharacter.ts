/*
 * Copyright 2026 Marek Kobida
 */

import type { TokenizerState } from './types.js';

// ✅
function readCharacter(state: TokenizerState, cursor: number = state.cursor): string {
  return state.input[cursor]!;
}

export default readCharacter;
