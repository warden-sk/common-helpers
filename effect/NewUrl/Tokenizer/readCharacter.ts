/*
 * Copyright 2026 Marek Kobida
 */

import type { TokenizerState } from './state.js';

const readCharacter = (state: TokenizerState, cursor: number = state.cursor): string => state.input[cursor]!;

export default readCharacter;
