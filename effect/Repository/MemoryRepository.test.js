/*
 * Copyright 2025 Marek Kobida
 */
import { Effect, Schema } from 'effect';
import MemoryRepository from './MemoryRepository.js';
const accountSchema = Schema.Struct({
    _id: Schema.UUID,
    name: Schema.String,
});
const accountRepository = new MemoryRepository(accountSchema);
const $ = Effect.gen(function* () {
    const lastCreatedAccount = yield* accountRepository.create({
        name: 'Marek Kobida',
    });
    yield* Effect.log(lastCreatedAccount);
    const allAccounts = yield* accountRepository.readAll();
    yield* Effect.log(allAccounts);
});
Effect.runSync($);
