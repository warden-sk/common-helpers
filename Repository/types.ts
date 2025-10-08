/*
 * Copyright 2025 Marek Kobida
 */

import type { Path, PathValue } from '../getByPath/types.js';

// ✅
type Filter<T extends Row> = {
  where: Where<T>;
};

// ✅
type Repository<T extends Row> = {
  create(row: Omit<T, '_id'>): Promise<T>;

  deleteAll(): Promise<void>;

  deleteById(id: string): Promise<void>;

  read(filter: Filter<T>): Promise<T[]>;

  readAll(): Promise<T[]>;

  readById(id: string): Promise<T | undefined>;

  update(row: T): Promise<void>;
};

// ✅
type Row = {
  _id: string;
};

// ✅
type Validator<T extends Row> = (row: unknown) => row is T;

// ✅
type Where<T extends Row> = {
  [TPath in Path<T>]?:
    | {
        $eq?: PathValue<T, TPath>; // EQUAL TO (=)
        // $exists?: boolean;
        $gt?: PathValue<T, TPath>; // GREATER THAN (>)
        $gte?: PathValue<T, TPath>; // GREATER THAN OR EQUAL TO (>=)
        $lt?: PathValue<T, TPath>; // LESS THAN (<)
        $lte?: PathValue<T, TPath>; // LESS THAN OR EQUAL TO (<=)
        $ne?: PathValue<T, TPath>; // NOT EQUAL TO (!=)
      }
    | PathValue<T, TPath>;
} & {
  $and?: Where<T>[];
  $or?: Where<T>[];
};

export type { Filter, Repository, Row, Validator, Where };
