/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 19.04.2025
 */
import { expect, test } from 'bun:test';
import NewUrl from './index.js';
test('[1]', () => {
    const newUrl = new NewUrl('https://kobida.sk:443/test.html');
    expect(newUrl.host).toBe('https://kobida.sk:443');
    expect(newUrl.path).toBe('/test.html');
    newUrl.test('https://kobida.sk:443/{fileName?}');
    expect(newUrl.parameters).toEqual({ fileName: 'test.html' });
});
