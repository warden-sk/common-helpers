/*
 * Copyright 2025 Marek Kobida
 */

const ID_PATTERN = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/;

const decodeJSON = JSON.parse as <T = unknown>(input: string) => T;

const encodeJSON = JSON.stringify as (input: unknown) => string;

const keys = Object.keys as <T>(of: T) => Exclude<keyof T, number | symbol>[];

export { decodeJSON, encodeJSON, ID_PATTERN, keys };
