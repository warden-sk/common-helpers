/*
 * Copyright 2025 Marek Kobida
 */
const ID_PATTERN = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/;
const decodeJSON = JSON.parse;
const encodeJSON = JSON.stringify;
const keys = Object.keys;
export { decodeJSON, encodeJSON, ID_PATTERN, keys };
