/*
 * Copyright 2026 Marek Kobida
 */

import { Option } from 'effect';

import type { Path, PathValue } from './getByPath.types.js';

import isIndexable from '../../validation/isIndexable.js';
import isNullOrUndefined from '../../validation/isNullOrUndefined.js';

function getByPath<T, TPath extends Path<T>>(input: T, path: TPath): Option.Option<PathValue<T, TPath>> {
  // "a.b.c" → ["a", "b", "c"]
  const keys = path.split('.');

  let current: unknown = input;

  for (const key of keys) {
    if (isNullOrUndefined(current)) {
      return Option.none();
    }

    if (!isIndexable(current)) {
      return Option.none();
    }

    if (!Object.hasOwn(current, key)) {
      return Option.none();
    }

    current = current[key];
  }

  return Option.some(current as PathValue<T, TPath>);
}

export default getByPath;
