/*
 * Copyright 2025 Marek Kobida
 */
import getByPath from '../getByPath/index.js';
import invariant from '../validation/invariant.js';
import isArray from '../validation/isArray.js';
import isBoolean from '../validation/isBoolean.js';
import isNumber from '../validation/isNumber.js';
import isObject from '../validation/isObject.js';
import isString from '../validation/isString.js';
import AbstractRepository from './AbstractRepository.js';
// ✅
class MemoryRepository extends AbstractRepository {
    #rows = new Map();
    // ✅
    constructor(validator, initialRows) {
        super(validator);
        if (isArray(initialRows)) {
            for (const row of initialRows) {
                this.validate(row);
                this.#rows.set(row._id, row);
            }
        }
    }
    // ✅
    async create(row) {
        const newRow = {
            ...row,
            _id: crypto.randomUUID(),
        };
        this.validate(newRow);
        this.#rows.set(newRow._id, newRow);
        return newRow;
    }
    // ✅
    async deleteAll() {
        this.#rows.clear();
    }
    // ✅
    async deleteById(id) {
        this.#rows.delete(id);
    }
    // ✅
    async read(filter) {
        return (await this.readAll()).filter(row => {
            return this.#testWhere(row, filter.where);
        });
    }
    // ✅
    async readAll() {
        return [...this.#rows.values()];
    }
    // ✅
    async readById(id) {
        return this.#rows.get(id);
    }
    // ✅
    async update(row) {
        invariant(this.#rows.has(row._id), 'The row does not exist.');
        this.validate(row);
        this.#rows.set(row._id, row);
    }
    // ✅
    #isComparable(input) {
        return isBoolean(input) || isNumber(input) || isString(input);
    }
    // ✅
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
