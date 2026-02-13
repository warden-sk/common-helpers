/*
 * Copyright 2026 Marek Kobida
 */

import { expect, test } from 'bun:test';
import { Effect, Schema } from 'effect';

import makeMemoryRepository from './makeMemoryRepository.js';

test('makeMemoryRepository', () => {
  const accountRepository = makeMemoryRepository({
    id: 'AccountRepository',
    schema: Schema.Struct({
      _id: Schema.UUID,
      name: Schema.String,
    }),
  });

  const effect = Effect.gen(function* () {
    const lastCreatedAccount = yield* accountRepository.create({
      name: 'MAREK KOBIDA',
    });

    const allCreatedAccounts = yield* accountRepository.readAll();

    const lastUpdatedAccount = yield* accountRepository.update({
      _id: lastCreatedAccount._id,
      name: 'PETER MASÁR',
    });

    return {
      allCreatedAccounts,
      lastCreatedAccount,
      lastUpdatedAccount,
    };
  });

  const { allCreatedAccounts, lastCreatedAccount, lastUpdatedAccount } = Effect.runSync(
    effect.pipe(Effect.provide(accountRepository.layer)),
  );

  expect(allCreatedAccounts).toHaveLength(1);

  expect(lastUpdatedAccount._id).toBe(lastCreatedAccount._id);
  expect(lastUpdatedAccount.name).toBe('PETER MASÁR');
});
