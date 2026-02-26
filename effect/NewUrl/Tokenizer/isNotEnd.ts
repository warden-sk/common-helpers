/*
 * Copyright 2026 Marek Kobida
 */

import type { TokenizerState } from './state.js';

const isNotEnd = (state: TokenizerState): boolean => state.cursor < state.input.length;

export default isNotEnd;
