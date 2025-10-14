/*
 * Copyright 2025 Marek Kobida
 */
import { expect, test } from 'bun:test';
import getByPath, { setByPath } from './index.js';
const testRow = {
    _id: '384455ed-95a0-49d5-91e1-becc94c556c7',
    allergens: [1],
    name: 'Marek Kobida',
    style: {
        backgroundColor: '#f00',
    },
};
test('getByPath', () => {
    expect(getByPath(testRow, '_id')).toEqual('384455ed-95a0-49d5-91e1-becc94c556c7');
    expect(getByPath(testRow, 'allergens')).toEqual([1]);
    expect(getByPath(testRow, 'allergens.0')).toBe(1);
    expect(getByPath(testRow, 'name')).toBe('Marek Kobida');
    expect(getByPath(testRow, 'style')).toEqual({
        backgroundColor: '#f00',
    });
    expect(getByPath(testRow, 'style.backgroundColor')).toBe('#f00');
});
test('setByPath', () => {
    setByPath(testRow, 'style.backgroundColor', '#0f0');
    // expect(getByPath(testRow, 'style.backgroundColor')).toBe('#0f0');
});
