/*
 * Copyright 2025 Marek Kobida
 */

import { expect, test } from 'bun:test';

import type { Path, PathValue } from './types.js';

import getByPath, { setByPath } from './index.js';

type TestA = Path<TestRow>; // "_id" | "allergens" | "name" | "style" | "style.backgroundColor" | `allergens.${number}`

type TestB = PathValue<TestRow, 'allergens'>; // number[]

type TestC = PathValue<TestRow, 'allergens.0'>; // number

type TestD = PathValue<TestRow, 'style.backgroundColor'>; // string

type TestRow = {
  _id: string;
  allergens: number[];
  name: string;
  style: {
    backgroundColor: string;
    isCurrent?: boolean;
  };
};

const testRow: TestRow = {
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
