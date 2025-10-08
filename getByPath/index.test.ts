/*
 * Copyright 2025 Marek Kobida
 */

import type { Path, PathValue } from './types.js';

import getByPath from './index.js';

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

getByPath(testRow, 'style.backgroundColor'); // string (#f00)
