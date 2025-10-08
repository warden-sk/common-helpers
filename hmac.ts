/*
 * Copyright 2025 Marek Kobida
 */

import { decodeBase64Url, encodeBase64Url } from './base64.js';

type Algorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

class Hmac {
  // https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey
  #key: Promise<CryptoKey>;

  constructor(key: string, algorithm: Algorithm = 'SHA-256') {
    this.#key = crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(key),
      // https://developer.mozilla.org/en-US/docs/Web/API/HmacImportParams
      {
        hash: algorithm,
        name: 'HMAC',
      },
      false,
      ['sign', 'verify'],
    );
  }

  //                                 ↓ KĽÚČOVÉ
  async sign(input: string): Promise<Uint8Array<ArrayBuffer>> {
    return new Uint8Array(
      // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
      await crypto.subtle.sign('HMAC', await this.#key, new TextEncoder().encode(input)),
    );
  }

  async signBase64Url(input: string): Promise<string> {
    return encodeBase64Url(await this.sign(input));
  }

  async verify(input: string, signature: Uint8Array<ArrayBuffer>): Promise<boolean> {
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify
    return crypto.subtle.verify('HMAC', await this.#key, signature, new TextEncoder().encode(input));
  }

  async verifyBase64Url(input: string, signature: string): Promise<boolean> {
    return this.verify(input, decodeBase64Url(signature));
  }
}

function hmac(key: string, algorithm: Algorithm = 'SHA-256'): Hmac {
  return new Hmac(key, algorithm);
}

export type { Algorithm, Hmac };

export default hmac;
