/*
 * Copyright 2026 Marek Kobida
 */

import type { Effect, Option } from 'effect';

import type { Where } from './testWhere.js';

type Filter<T extends Row> = {
  readonly where: Where<T>;
};

type Repository<T extends Row> = {
  readonly create: (row: Omit<T, '_id'>) => Effect.Effect<T, Error>;
  readonly deleteAll: () => Effect.Effect<void>;
  readonly deleteById: (id: string) => Effect.Effect<void>;
  readonly read: (filter: Filter<T>) => Effect.Effect<readonly T[]>;
  readonly readAll: () => Effect.Effect<readonly T[]>;
  readonly readById: (id: string) => Effect.Effect<Option.Option<T>>;
  readonly update: (row: T) => Effect.Effect<T, Error>;
};

type Row = {
  readonly _id: string;
};

export type { Filter, Repository, Row };
