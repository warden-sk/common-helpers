/*
 * Copyright 2025 Marek Kobida
 */
class Hmac {
    // https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey
    key;
    constructor(algorithm, key) {
        this.key = crypto.subtle.importKey('raw', new TextEncoder().encode(key), 
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
        await crypto.subtle.sign('HMAC', await this.key, new TextEncoder().encode(input)));
    }
    async signBase64Url(input) {
        const bytes = await this.sign(input);
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toBase64
        return bytes.toBase64({
            alphabet: 'base64url',
            omitPadding: true,
        });
    }
    async verify(input, signature) {
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify
        return crypto.subtle.verify('HMAC', await this.key, signature, new TextEncoder().encode(input));
    }
    async verifyBase64Url(input, signature) {
        return this.verify(input, 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/setFromBase64
        Uint8Array.fromBase64(signature, {
            alphabet: 'base64url',
        }));
    }
}
function hmac(key) {
    return new Hmac('SHA-256', key);
}
export default hmac;
