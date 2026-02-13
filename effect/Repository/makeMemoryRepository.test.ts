/*
 * Copyright 2026 Marek Kobida
 */

import { Effect, Schema } from 'effect';

import makeMemoryRepository from './makeMemoryRepository.js';

const accountSchema = Schema.Struct({
  _id: Schema.UUID,
  name: Schema.String,
});

const accountRepository = makeMemoryRepository({
  id: 'AccountRepository',
  schema: accountSchema,
});

const test = Effect.gen(function* () {
  const lastCreatedAccount = yield* accountRepository.create({
    name: 'MAREK KOBIDA',
  });

  yield* Effect.log('LAST CREATED ACCOUNT', lastCreatedAccount);

  const allCreatedAccounts = yield* accountRepository.readAll();

  yield* Effect.log('ALL CREATED ACCOUNTS', allCreatedAccounts);

  const lastUpdatedAccount = yield* accountRepository.update({
    _id: lastCreatedAccount._id,
    name: 'PETER MASÁR',
  });

  yield* Effect.log('LAST UPDATED ACCOUNT', lastUpdatedAccount);
});

Effect.runSync(test.pipe(Effect.provide(accountRepository.layer)));
