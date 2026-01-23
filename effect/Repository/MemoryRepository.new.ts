/*
 * Copyright 2026 Marek Kobida
 */

import { Context, Effect, Layer, Option, Ref, Schema } from 'effect';

import type { Filter, Repository, Row } from './types.js';

import testWhere from './testWhere.js';

type MakeMemoryRepositoryOptions<T extends Row> = {
  readonly id: string;
  readonly initialRows?: readonly T[];
  readonly schema: Schema.Schema<T>;
};

function makeMemoryRepository<T extends Row>(options: MakeMemoryRepositoryOptions<T>) {
  const { id, initialRows = [], schema } = options;

  const MemoryRepository = Context.GenericTag<Repository<T>>(id);

  const layer = Layer.effect(
    MemoryRepository,
    Effect.gen(function* () {
      const initialState = new Map<string, T>();

      for (const row of initialRows) {
        initialState.set(row._id, row);
      }

      const state = yield* Ref.make(initialState);

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
              Ref.update(state, oldState => {
                const newState = new Map(oldState);
                newState.set(validRow._id, validRow);
                return newState;
              }),
            ),
          ),

        deleteAll: () => Ref.set(state, new Map()),

        deleteById: (id: string) =>
          Ref.update(state, oldState => {
            const newState = new Map(oldState);
            newState.delete(id);
            return newState;
          }),

        read: (filter: Filter<T>) =>
          Ref.get(state).pipe(
            Effect.map(oldState => {
              const filteredRows: T[] = [];

              for (const row of oldState.values()) {
                if (testWhere(row, filter.where)) {
                  filteredRows.push(row);
                }
              }

              return filteredRows;
            }),
          ),

        readAll: () => Ref.get(state).pipe(Effect.map(oldState => [...oldState.values()])),

        readById: (id: string) => Ref.get(state).pipe(Effect.map(oldState => Option.fromNullable(oldState.get(id)))),

        update: (row: T) =>
          Schema.decodeUnknown(schema)(row).pipe(
            Effect.mapError(
              error =>
                new Error('The row is not valid.', {
                  cause: error,
                }),
            ),
            Effect.flatMap(validRow =>
              Ref.modify(state, oldState => {
                if (!oldState.has(validRow._id)) {
                  return [false, oldState];
                }

                const newState = new Map(oldState);
                newState.set(validRow._id, validRow);

                return [true, newState];
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

  const create = (row: Omit<T, '_id'>) => Effect.flatMap(MemoryRepository, repository => repository.create(row));
  const deleteAll = () => Effect.flatMap(MemoryRepository, repository => repository.deleteAll());
  const deleteById = (id: string) => Effect.flatMap(MemoryRepository, repository => repository.deleteById(id));
  const read = (filter: Filter<T>) => Effect.flatMap(MemoryRepository, repository => repository.read(filter));
  const readAll = () => Effect.flatMap(MemoryRepository, repository => repository.readAll());
  const readById = (id: string) => Effect.flatMap(MemoryRepository, repository => repository.readById(id));
  const update = (row: T) => Effect.flatMap(MemoryRepository, repository => repository.update(row));

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
