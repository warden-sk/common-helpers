/*
 * Copyright 2025 Marek Kobida
 */

import type { Filter, Repository, Row } from './types.js';

// ✅
abstract class AbstractRepository<T extends Row> implements Repository<T> {
  abstract create(row: Omit<T, '_id'>): Promise<T>;

  abstract deleteAll(): Promise<void>;

  abstract deleteById(id: string): Promise<void>;

  abstract read(filter: Filter<T>): Promise<T[]>;

  abstract readAll(): Promise<T[]>;

  abstract readById(id: string): Promise<T | undefined>;

  abstract update(row: T): Promise<void>;
}

export default AbstractRepository;
