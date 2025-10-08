/*
 * Copyright 2025 Marek Kobida
 */
import invariant from '../validation/invariant.js';
class AbstractRepository {
    #validator;
    constructor(validator) {
        this.#validator = validator;
    }
    validate(row) {
        invariant(this.#validator(row), 'The row is not valid.');
    }
}
export default AbstractRepository;
