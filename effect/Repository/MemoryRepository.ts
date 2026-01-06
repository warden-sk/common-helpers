/*
 * Copyright 2026 Marek Kobida
 */

import { Effect, Option, Schema } from 'effect';

import type { Filter, Row } from './types.js';

import isArray from '../../validation/isArray.js';
import AbstractRepository from './AbstractRepository.js';
import testWhere from './testWhere.js';

class MemoryRepository<T extends Row> extends AbstractRepository<T> {
  #rows = new Map<string, T>();

  #schema: Schema.Schema<T>;

  constructor(schema: Schema.Schema<T>, initialRows?: readonly T[]) {
    super();

    this.#schema = schema;

    if (isArray(initialRows)) {
      for (const row of initialRows) {
        this.#rows.set(row._id, row);
      }
    }
  }

  create(row: Omit<T, '_id'>) {
    return Schema.decodeUnknown(this.#schema)({
      ...row,
      _id: crypto.randomUUID(),
    }).pipe(
      Effect.mapError(
        error =>
          new Error('The row is not valid.', {
            cause: error,
          }),
      ),
      Effect.tap(validRow => Effect.sync(() => this.#rows.set(validRow._id, validRow))),
    );
  }

  deleteAll() {
    return Effect.sync(() => {
      this.#rows.clear();
    });
  }

  deleteById(id: string) {
    return Effect.sync(() => {
      this.#rows.delete(id);
    });
  }

  read(filter: Filter<T>) {
    return this.readAll().pipe(Effect.map(rows => rows.filter(row => testWhere(row, filter.where))));
  }

  readAll() {
    return Effect.sync(() => [...this.#rows.values()]);
  }

  readById(id: string) {
    return Effect.sync(() => Option.fromNullable(this.#rows.get(id)));
  }

  update(row: T) {
    return Schema.decodeUnknown(this.#schema)(row).pipe(
      Effect.mapError(
        error =>
          new Error('The row is not valid.', {
            cause: error,
          }),
      ),
      Effect.flatMap(validRow => {
        if (!this.#rows.has(validRow._id)) {
          return Effect.fail(new Error('The row does not exist.'));
        }

        return Effect.sync(() => {
          this.#rows.set(validRow._id, validRow);

          return validRow;
        });
      }),
    );
  }
}

export default MemoryRepository;
