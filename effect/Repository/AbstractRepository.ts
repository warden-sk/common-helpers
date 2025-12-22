/*
 * Copyright 2025 Marek Kobida
 */

import type { Effect, Option } from 'effect';

import type { Filter, Repository, Row } from './types.js';

abstract class AbstractRepository<T extends Row> implements Repository<T> {
  abstract create(row: Omit<T, '_id'>): Effect.Effect<T, Error>;

  abstract deleteAll(): Effect.Effect<void>;

  abstract deleteById(id: string): Effect.Effect<void>;

  abstract read(filter: Filter<T>): Effect.Effect<readonly T[]>;

  abstract readAll(): Effect.Effect<readonly T[]>;

  abstract readById(id: string): Effect.Effect<Option.Option<T>>;

  abstract update(row: T): Effect.Effect<T, Error>;
}

export default AbstractRepository;
