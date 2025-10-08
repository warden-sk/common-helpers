/*
 * Copyright 2025 Marek Kobida
 */

class InvariantError extends Error {}

function invariant(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}

export { InvariantError };

export default invariant;
