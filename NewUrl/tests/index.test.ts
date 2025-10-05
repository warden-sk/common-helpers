/*
 * Copyright 2025 Marek Kobida
 */

import { expect, test } from 'bun:test';

import NewUrl from '../index.js';

test('[1]', () => {
  const newUrl = new NewUrl('https://kobida.sk:443/test.html');

  expect(newUrl.host).toBe('https://kobida.sk:443');
  expect(newUrl.path).toBe('/test.html');

  expect(newUrl.test('https://kobida.sk:443/{fileName?}')).toEqual(true);

  expect(newUrl.parameters).toEqual({
    fileName: 'test.html',
  });
});
