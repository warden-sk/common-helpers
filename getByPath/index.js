/*
 * Copyright 2025 Marek Kobida
 */
// ✅
function getByPath(input, path) {
    return path.split('.').reduce(($, key) => {
        return $[key];
    }, input);
}
export default getByPath;
