/*
 * Copyright 2026 Marek Kobida
 */

import { expect, test } from 'bun:test';
import { Effect } from 'effect';

import { parseNewUrl, testNewUrl, toStringNewUrl } from '../index.js';

test('[1]', () => {
  const state = Effect.runSync(parseNewUrl('https://kobida.sk:443/test.html'));

  expect(state.host).toBe('https://kobida.sk:443');
  expect(state.path).toBe('/test.html');

  const result = Effect.runSync(testNewUrl(state, 'https://kobida.sk:443/{fileName?}'));

  expect(result.matches).toBe(true);
  expect(result.parameters).toEqual({
    fileName: 'test.html',
  });
});

test('[2]', () => {
  const state = Effect.runSync(parseNewUrl('https://kobida.sk:443/test.html'));

  const url = toStringNewUrl(state, {
    searchParameters: {
      ...state.searchParameters,
      page: '1',
    },
  });

  expect(url).toBe('https://kobida.sk/test.html?page=1');
});
