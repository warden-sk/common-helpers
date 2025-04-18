/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 29.10.2024
 */

class InvariantError extends Error {}

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}

export { InvariantError };

export default invariant;
