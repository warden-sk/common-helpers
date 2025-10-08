/*
 * Copyright 2025 Marek Kobida
 */

import type { Filter, Repository, Row, Validator } from './types.js';

import invariant from '../validation/invariant.js';

abstract class AbstractRepository<T extends Row> implements Repository<T> {
  #validator: Validator<T>;

  constructor(validator: Validator<T>) {
    this.#validator = validator;
  }

  abstract create(row: Omit<T, '_id'>): Promise<T>;

  abstract deleteAll(): Promise<void>;

  abstract deleteById(id: string): Promise<void>;

  abstract read(filter: Filter<T>): Promise<T[]>;

  abstract readAll(): Promise<T[]>;

  abstract readById(id: string): Promise<T | undefined>;

  abstract update(row: T): Promise<void>;

  validate(row: any): asserts row is T {
    invariant(this.#validator(row), 'The row is not valid.');
  }
}

export default AbstractRepository;
