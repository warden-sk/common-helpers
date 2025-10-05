/*
 * Copyright 2025 Marek Kobida
 */

class InvariantError extends Error {}

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}

export { InvariantError };

export default invariant;
