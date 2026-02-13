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

const $ = Effect.gen(function* () {
  const lastCreatedAccount = yield* accountRepository.create({
    name: 'Marek Kobida',
  });

  yield* Effect.log('LAST CREATED ACCOUNT', lastCreatedAccount);

  const allCreatedAccounts = yield* accountRepository.readAll();

  yield* Effect.log('ALL CREATED ACCOUNTS', allCreatedAccounts);

  const lastUpdatedAccount = yield* accountRepository.update({
    _id: lastCreatedAccount._id,
    name: 'Kobida Marek',
  });

  yield* Effect.log('LAST UPDATED ACCOUNT', lastUpdatedAccount);
});

Effect.runSync($.pipe(Effect.provide(accountRepository.layer)));
