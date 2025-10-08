/*
 * Copyright 2025 Marek Kobida
 */

// ✅
function decodeBase64Url(input: string): string {
  return new TextDecoder().decode(
    Uint8Array.fromBase64(input, {
      alphabet: 'base64url',
    }),
  );
}

// ✅
function encodeBase64Url(input: string): string {
  return new TextEncoder().encode(input).toBase64({
    alphabet: 'base64url',
    omitPadding: true,
  });
}

export { decodeBase64Url, encodeBase64Url };
