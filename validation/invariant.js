/*
 * Copyright 2025 Marek Kobida
 */
class InvariantError extends Error {
}
function invariant(condition, message) {
    if (!condition) {
        throw new InvariantError(message);
    }
}
export { InvariantError };
export default invariant;
