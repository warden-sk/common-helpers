/*
 * Copyright 2026 Marek Kobida
 */

import type { Token } from './Tokenizer/types.js';

type NewUrlState = {
  readonly host: string;
  readonly input: string;
  readonly path: string;
  readonly searchParameters: Readonly<Record<string, string>>;
  readonly tokens: readonly Token[];
};

type TestResult = {
  readonly matches: boolean;
  readonly parameters: Readonly<Record<string, string>>;
  readonly testTokens: readonly Token[];
};

export type { NewUrlState, TestResult };
