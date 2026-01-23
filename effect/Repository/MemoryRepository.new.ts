/*
 * Copyright 2026 Marek Kobida
 */

import { Context, Effect, Layer, Option, Ref, Schema } from 'effect';

import type { Filter, Repository, Row } from './types.js';

import isArray from '../../validation/isArray.js';
import testWhere from './testWhere.js';

type MakeMemoryRepositoryOptions<T extends Row> = {
  readonly id: string;
  readonly initialRows?: readonly T[];
  readonly schema: Schema.Schema<T>;
};

function makeMemoryRepository<T extends Row>(options: MakeMemoryRepositoryOptions<T>) {
  const { id, initialRows, schema } = options;

  const MemoryRepository = Context.GenericTag<Repository<T>>(id);

  const layer = Layer.effect(
    MemoryRepository,
    Effect.gen(function* () {
      const rows = new Map<string, T>();

      if (isArray(initialRows)) {
        for (const row of initialRows) {
          rows.set(row._id, row);
        }
      }

      const rowsRef = yield* Ref.make(rows);

      const service: Repository<T> = {
        create: (row: Omit<T, '_id'>) =>
          Schema.decodeUnknown(schema)({
            ...row,
            _id: crypto.randomUUID(),
          }).pipe(
            Effect.mapError(
              error =>
                new Error('The row is not valid.', {
                  cause: error,
                }),
            ),
            Effect.tap(validRow =>
              Ref.update(rowsRef, rows => {
                const next = new Map(rows);
                next.set(validRow._id, validRow);
                return next;
              }),
            ),
          ),

        deleteAll: () => Ref.set(rowsRef, new Map()),

        deleteById: (id: string) =>
          Ref.update(rowsRef, rows => {
            const next = new Map(rows);
            next.delete(id);
            return next;
          }),

        read: (filter: Filter<T>) =>
          Ref.get(rowsRef).pipe(
            Effect.map(rows => [...rows.values()]),
            Effect.map(rs => rs.filter(row => testWhere(row, filter.where))),
          ),

        readAll: () => Ref.get(rowsRef).pipe(Effect.map(rows => [...rows.values()])),

        readById: (id: string) => Ref.get(rowsRef).pipe(Effect.map(rows => Option.fromNullable(rows.get(id)))),

        update: (row: T) =>
          Schema.decodeUnknown(schema)(row).pipe(
            Effect.mapError(
              error =>
                new Error('The row is not valid.', {
                  cause: error,
                }),
            ),
            Effect.flatMap(validRow =>
              Ref.modify(rowsRef, rows => {
                if (!rows.has(validRow._id)) {
                  return [false as const, rows] as const;
                }

                const next = new Map(rows);
                next.set(validRow._id, validRow);

                return [true as const, next] as const;
              }).pipe(
                Effect.flatMap(updated =>
                  updated ? Effect.succeed(validRow) : Effect.fail(new Error('The row does not exist.')),
                ),
              ),
            ),
          ),
      };

      return service;
    }),
  );

  const create = (row: Omit<T, '_id'>) => Effect.flatMap(MemoryRepository, repo => repo.create(row));
  const deleteAll = () => Effect.flatMap(MemoryRepository, repo => repo.deleteAll());
  const deleteById = (id: string) => Effect.flatMap(MemoryRepository, repo => repo.deleteById(id));
  const read = (filter: Filter<T>) => Effect.flatMap(MemoryRepository, repo => repo.read(filter));
  const readAll = () => Effect.flatMap(MemoryRepository, repo => repo.readAll());
  const readById = (id: string) => Effect.flatMap(MemoryRepository, repo => repo.readById(id));
  const update = (row: T) => Effect.flatMap(MemoryRepository, repo => repo.update(row));

  return {
    create,
    deleteAll,
    deleteById,
    layer,
    MemoryRepository,
    read,
    readAll,
    readById,
    update,
  } as const;
}

export default makeMemoryRepository;
