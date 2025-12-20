/*
 * Copyright 2025 Marek Kobida
 */
import { Effect, Schema } from 'effect';
import getByPath from '../../getByPath/index.js';
import isArray from '../../validation/isArray.js';
import isBoolean from '../../validation/isBoolean.js';
import isNumber from '../../validation/isNumber.js';
import isObject from '../../validation/isObject.js';
import isString from '../../validation/isString.js';
import AbstractRepository from './AbstractRepository.js';
class MemoryRepository extends AbstractRepository {
    #rows = new Map();
    #schema;
    constructor(schema, initialRows) {
        super();
        this.#schema = schema;
        if (isArray(initialRows)) {
            for (const row of initialRows) {
                this.#rows.set(row._id, row);
            }
        }
    }
    create(row) {
        return Schema.decodeUnknown(this.#schema)({
            ...row,
            _id: crypto.randomUUID(),
        }).pipe(Effect.mapError(error => new Error('The input row is not valid.', {
            cause: error,
        })), Effect.tap(validRow => Effect.sync(() => this.#rows.set(validRow._id, validRow))));
    }
    deleteAll() {
        return Effect.sync(() => {
            this.#rows.clear();
        });
    }
    deleteById(id) {
        return Effect.sync(() => {
            this.#rows.delete(id);
        });
    }
    read(filter) {
        return this.readAll().pipe(Effect.map(rows => rows.filter(row => this.#testWhere(row, filter.where))));
    }
    readAll() {
        return Effect.sync(() => [...this.#rows.values()]);
    }
    readById(id) {
        return Effect.sync(() => this.#rows.get(id));
    }
    update(row) {
        return Schema.decodeUnknown(this.#schema)(row).pipe(Effect.mapError(error => new Error('The input row is not valid.', {
            cause: error,
        })), Effect.tap(validRow => Effect.sync(() => this.#rows.set(validRow._id, validRow))));
    }
    #isComparable(input) {
        return isBoolean(input) || isNumber(input) || isString(input);
    }
    #testWhere(row, where) {
        const { $and, $or, ...$ } = where;
        if (isArray($and) &&
            !$and.every(where => {
                return this.#testWhere(row, where);
            })) {
            return false;
        }
        if (isArray($or) &&
            !$or.some(where => {
                return this.#testWhere(row, where);
            })) {
            return false;
        }
        if (isObject($)) {
            const paths = Object.keys($);
            for (const path of paths) {
                // Z-A
                const value = $[path];
                const rowValue = getByPath(row, path);
                if (this.#isComparable(value) && !(value === rowValue)) {
                    return false;
                }
                if (isObject(value)) {
                    if (this.#isComparable(value.$eq) && !(value.$eq === rowValue)) {
                        return false;
                    }
                    if (this.#isComparable(value.$gt) && !(value.$gt < rowValue)) {
                        return false;
                    }
                    if (this.#isComparable(value.$gte) && !(value.$gte <= rowValue)) {
                        return false;
                    }
                    if (this.#isComparable(value.$lt) && !(value.$lt > rowValue)) {
                        return false;
                    }
                    if (this.#isComparable(value.$lte) && !(value.$lte >= rowValue)) {
                        return false;
                    }
                    if (this.#isComparable(value.$ne) && !(value.$ne !== rowValue)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
export default MemoryRepository;
