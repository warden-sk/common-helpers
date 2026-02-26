/*
 * Copyright 2026 Marek Kobida
 */

import type { Token } from '../types.js';

type TokenizerState = {
  cursor: number;

  readonly input: string;

  readonly tokens: readonly Token[];
};

export type { TokenizerState };
