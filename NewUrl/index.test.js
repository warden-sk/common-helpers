/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 24.03.2025
 */
import NewUrl from './index.js';
import { expect, test } from 'bun:test';
test('[1]', () => {
    const newUrl = new NewUrl('https://kobida.sk:443/test.html');
    expect(newUrl.host).toBe('https://kobida.sk:443');
    expect(newUrl.path).toBe('/test.html');
    newUrl.test('https://kobida.sk:443/{fileName?}');
    expect(newUrl.parameters).toEqual({ fileName: 'test.html' });
});
