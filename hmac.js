/*
 * Copyright 2025 Marek Kobida
 */
import { decodeBase64Url, encodeBase64Url } from './base64.js';
class Hmac {
    // https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey
    #key;
    constructor(key, algorithm = 'SHA-256') {
        this.#key = crypto.subtle.importKey('raw', new TextEncoder().encode(key), 
        // https://developer.mozilla.org/en-US/docs/Web/API/HmacImportParams
        {
            hash: algorithm,
            name: 'HMAC',
        }, false, ['sign', 'verify']);
    }
    //                                 ↓ KĽÚČOVÉ
    async sign(input) {
        return new Uint8Array(
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
        await crypto.subtle.sign('HMAC', await this.#key, new TextEncoder().encode(input)));
    }
    async signBase64Url(input) {
        return encodeBase64Url(await this.sign(input));
    }
    async verify(input, signature) {
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify
        return crypto.subtle.verify('HMAC', await this.#key, signature, new TextEncoder().encode(input));
    }
    async verifyBase64Url(input, signature) {
        return this.verify(input, decodeBase64Url(signature));
    }
}
function hmac(key, algorithm = 'SHA-256') {
    return new Hmac(key, algorithm);
}
export default hmac;
