/*
 * Copyright 2025 Marek Kobida
 */

import type { Effect } from 'effect';

import type { Path, PathValue } from '../../getByPath/types.js';

type Filter<T extends Row> = {
  readonly where: Where<T>;
};

type Repository<T extends Row> = {
  readonly create: (row: Omit<T, '_id'>) => Effect.Effect<T, Error>;

  readonly deleteAll: () => Effect.Effect<void>;

  readonly deleteById: (id: string) => Effect.Effect<void>;

  readonly read: (filter: Filter<T>) => Effect.Effect<readonly T[]>;

  readonly readAll: () => Effect.Effect<readonly T[]>;

  readonly readById: (id: string) => Effect.Effect<T | undefined>;

  readonly update: (row: T) => Effect.Effect<T, Error>;
};

type Row = {
  readonly _id: string;
};

type Where<T extends Row> = {
  // DOKONČIŤ
  //        ↓ TPath in Exclude<Path<T>, '$and' | '$or'>
  readonly [TPath in Path<T>]?:
    | PathValue<T, TPath>
    | {
        readonly $eq?: PathValue<T, TPath>; // EQUAL TO (=)
        readonly $gt?: PathValue<T, TPath>; // GREATER THAN (>)
        readonly $gte?: PathValue<T, TPath>; // GREATER THAN OR EQUAL TO (>=)
        readonly $lt?: PathValue<T, TPath>; // LESS THAN (<)
        readonly $lte?: PathValue<T, TPath>; // LESS THAN OR EQUAL TO (<=)
        readonly $ne?: PathValue<T, TPath>; // NOT EQUAL TO (!=)
      };
} & {
  readonly $and?: readonly Where<T>[];
  readonly $or?: readonly Where<T>[];
};

export type { Filter, Repository, Row, Where };
