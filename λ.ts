/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 26.10.2024
 */

export const ID_PATTERN = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/;

export const decodeJSON = JSON.parse as <T = unknown>(input: string) => T;

export const encodeJSON = JSON.stringify as (input: unknown) => string;

export const keys = Object.keys as <T>(of: T) => Exclude<keyof T, number | symbol>[];
