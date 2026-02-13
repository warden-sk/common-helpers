/*
 * Copyright 2026 Marek Kobida
 */

import type { Effect, Option, Schema } from 'effect';

import type { Where } from './testWhere.js';

type Filter<T extends Row> = {
  readonly where: Where<T>;
};

type MakeMemoryRepositoryOptions<T extends Row> = {
  readonly id: string;
  readonly initialRows?: readonly T[];
  readonly schema: Schema.Schema<T>;
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
  //       ↓ MongoDB
  readonly _id: string;
};

export type { Filter, MakeMemoryRepositoryOptions, Repository, Row };
