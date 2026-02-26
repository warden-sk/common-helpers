/*
 * Copyright 2026 Marek Kobida
 */

import { Effect } from 'effect';

import type { Token } from './Tokenizer/types.js';
import type { NewUrlState, TestResult } from './types.js';

import { tokenize } from './Tokenizer/index.js';

const buildState = (input: string, tokens: readonly Token[]): NewUrlState => {
  let host = '';
  let path = '';
  const searchParameters: Record<string, string> = {};

  for (const token of tokens) {
    if (token.type === 'SCHEME') {
      host += token.value;
    }

    if (token.type === 'HOST') {
      host += token.value;
    }

    if (token.type === 'PORT') {
      host += `:${token.value}`;
    }

    if (token.type === 'PATH') {
      path += `/${token.value}`;
    }

    if (token.type === 'SEARCH_PARAMETER') {
      searchParameters[token.parameter[0]] = token.parameter[1];
    }
  }

  return {
    host,
    input,
    path,
    searchParameters,
    tokens,
  };
};

const parseNewUrl = (input: string): Effect.Effect<NewUrlState, Error> =>
  tokenize(input).pipe(Effect.map(tokens => buildState(input, tokens)));

const testNewUrl = (state: NewUrlState, input: string): Effect.Effect<TestResult, Error> =>
  tokenize(input).pipe(
    Effect.map(testTokens => {
      const parameters: Record<string, string> = {};
      let matches = true;

      for (let i = 0; i < testTokens.length; i++) {
        const token1 = state.tokens[i];
        const token2 = testTokens[i]!;

        if (token2.type === 'HOST' || token2.type === 'PATH' || token2.type === 'PORT' || token2.type === 'SCHEME') {
          if (!(token1 && token1.type === token2.type && token1.value === token2.value)) {
            matches = false;
            break;
          }
        }

        if (token2.type === 'PARAMETERIZED_PATH') {
          if (token2.parameter[1]) {
            if (token1 && token1.type !== 'SEARCH_PARAMETER') {
              if (token1.type !== 'PATH') {
                matches = false;
                break;
              }

              parameters[token2.parameter[0]] = token1.value;
            }
          } else {
            if (!(token1?.type === 'PATH')) {
              matches = false;
              break;
            }

            parameters[token2.parameter[0]] = token1.value;
          }
        }
      }

      return {
        matches,
        parameters,
        testTokens,
      };
    }),
  );

const toStringNewUrl = (
  state: NewUrlState,
  overrides?: Partial<Pick<NewUrlState, 'path' | 'searchParameters'>>,
): string => {
  const path = overrides?.path ?? state.path;
  const searchParameters = overrides?.searchParameters ?? state.searchParameters;

  const url = new URL(path, state.host);
  url.search = new URLSearchParams(searchParameters).toString();

  return url.toString();
};

export { parseNewUrl, testNewUrl, toStringNewUrl };
