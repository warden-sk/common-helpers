/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 22.07.2025
 */

import { expect, test } from 'bun:test';

import Tokenizer from '../Tokenizer.js';

test('[1] SCHEME + HOST', () => {
  const tokenizer = new Tokenizer('https://kobida.sk');

  expect(tokenizer.tokens).toEqual([
    {
      type: 'SCHEME',
      value: 'https://',
    },
    {
      type: 'HOST',
      value: 'kobida.sk',
    },
  ]);
});

test('[2] SCHEME + HOST + PORT', () => {
  const tokenizer = new Tokenizer('https://kobida.sk:443');

  expect(tokenizer.tokens).toEqual([
    {
      type: 'SCHEME',
      value: 'https://',
    },
    {
      type: 'HOST',
      value: 'kobida.sk',
    },
    {
      type: 'PORT',
      value: '443',
    },
  ]);
});

test('[3] SCHEME + HOST + PORT + PARAMETERIZED_PATH', () => {
  const tokenizer = new Tokenizer('https://kobida.sk:443/{test?}');

  expect(tokenizer.tokens).toEqual([
    {
      type: 'SCHEME',
      value: 'https://',
    },
    {
      type: 'HOST',
      value: 'kobida.sk',
    },
    {
      type: 'PORT',
      value: '443',
    },
    {
      parameter: ['test', true],
      type: 'PARAMETERIZED_PATH',
      value: '{test?}',
    },
  ]);
});

test('[4] SCHEME + HOST + PORT + PATH', () => {
  const tokenizer = new Tokenizer('https://kobida.sk:443/test');

  expect(tokenizer.tokens).toEqual([
    {
      type: 'SCHEME',
      value: 'https://',
    },
    {
      type: 'HOST',
      value: 'kobida.sk',
    },
    {
      type: 'PORT',
      value: '443',
    },
    {
      type: 'PATH',
      value: 'test',
    },
  ]);
});

test('[4] SCHEME + HOST + PORT + PATH + SEARCH_PARAMETER', () => {
  const tokenizer = new Tokenizer('https://kobida.sk:443/test?page=1');

  expect(tokenizer.tokens).toEqual([
    {
      type: 'SCHEME',
      value: 'https://',
    },
    {
      type: 'HOST',
      value: 'kobida.sk',
    },
    {
      type: 'PORT',
      value: '443',
    },
    {
      type: 'PATH',
      value: 'test',
    },
    {
      parameter: ['page', '1'],
      type: 'SEARCH_PARAMETER',
      value: 'page=1',
    },
  ]);
});
