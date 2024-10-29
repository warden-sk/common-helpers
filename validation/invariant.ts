/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 13.09.2024
 */

class InvariantError extends Error {}

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}

export { InvariantError };

export default invariant;
