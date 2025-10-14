/*
 * Copyright 2025 Marek Kobida
 */
// ✅
function getByPath(input, path) {
    const keys = path.split('.');
    return keys.reduce(($, key) => {
        return $[key];
    }, input);
}
function setByPath(input, path, value) {
    return input;
}
export { setByPath };
export default getByPath;
