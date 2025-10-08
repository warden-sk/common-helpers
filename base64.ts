/*
 * Copyright 2025 Marek Kobida
 */

import isString from './validation/isString.js';

// ✅
function decodeBase64Url(input: string): Uint8Array<ArrayBuffer> {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromBase64
  const bytes = Uint8Array.fromBase64(input, {
    alphabet: 'base64url',
  });

  bytes.toString = () => {
    return new TextDecoder().decode(bytes);
  };

  return bytes;
}

// ✅
function encodeBase64Url(input: string | Uint8Array<ArrayBuffer>): string {
  const bytes = isString(input) ? new TextEncoder().encode(input) : input;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toBase64
  return bytes.toBase64({
    alphabet: 'base64url',
    omitPadding: true,
  });
}

export { decodeBase64Url, encodeBase64Url };
