/*
 * Copyright 2025 Marek Kobida
 */

import type { Algorithm } from './hmac.js';

import { decodeBase64Url, encodeBase64Url } from './base64.js';
import hmac from './hmac.js';
import invariant from './validation/invariant.js';
import isISODate from './validation/isISODate.js';
import isNumber from './validation/isNumber.js';
import isObject from './validation/isObject.js';
import isString from './validation/isString.js';
import * as λ from './λ.js';

class Authentication {
  #algorithm: Algorithm;

  #key: string;

  constructor(key: string, algorithm: Algorithm = 'SHA-256') {
    this.#algorithm = algorithm;

    this.#key = key;
  }

  async decodeKey(input: string): Promise<unknown> {
    const [jsonBase64Url, signatureBase64Url] = input.split('.');

    invariant(isString(jsonBase64Url) && isString(signatureBase64Url), 'Kľúč nie je platný.');

    invariant(
      await hmac(this.#key, this.#algorithm).verifyBase64Url(jsonBase64Url, signatureBase64Url),
      'Kľúč nie je platný.',
    );

    const json = λ.decodeJSON(decodeBase64Url(jsonBase64Url).toString());

    if (isObject(json)) {
      invariant(isISODate(json.createdAt), 'Kľúč nie je platný.');

      if ('expiresAt' in json) {
        invariant(isISODate(json.expiresAt), 'Kľúč nie je platný.');

        invariant(+new Date(json.expiresAt) > +new Date(), 'Platnosť kľúča vypršala.');
      }
    }

    return json;
  }

  async encodeKey(input: unknown, expiresAt?: number): Promise<string> {
    const newInput =
      isObject(input) ?
        {
          ...input,
          createdAt: new Date().toISOString(),
          ...(isNumber(expiresAt) ?
            {
              expiresAt: new Date(+new Date() + expiresAt * 3_600_000).toISOString(),
            }
          : {}),
        }
      : input;

    const json = λ.encodeJSON(newInput);
    const jsonBase64Url = encodeBase64Url(json);
    const signatureBase64Url = await hmac(this.#key, this.#algorithm).signBase64Url(jsonBase64Url);

    return `${jsonBase64Url}.${signatureBase64Url}`;
  }
}

function authentication(key: string, algorithm: Algorithm = 'SHA-256'): Authentication {
  return new Authentication(key, algorithm);
}

export { Authentication };

export default authentication;
