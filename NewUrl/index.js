/*
 * Copyright 2025 Marek Kobida
 */
import Tokenizer from './Tokenizer.js';
class NewUrl {
    host = '';
    input;
    parameters = {};
    path = '';
    searchParameters = {};
    testTokenizer;
    tokenizer;
    // ✅
    constructor(input) {
        this.input = input;
        this.tokenizer = new Tokenizer(this.input);
        for (const token of this.tokenizer.tokens) {
            // Sort: SCHEME, HOST, PORT, PATH, SEARCH_PARAMETER
            if (token.type === 'SCHEME') {
                this.host += token.value;
            }
            if (token.type === 'HOST') {
                this.host += token.value;
            }
            if (token.type === 'PORT') {
                this.host += `:${token.value}`;
            }
            if (token.type === 'PATH') {
                this.path += `/${token.value}`;
            }
            if (token.type === 'SEARCH_PARAMETER') {
                this.searchParameters[token.parameter[0]] = token.parameter[1];
            }
        }
    }
    // DOKONČIŤ
    test(input) {
        this.testTokenizer = new Tokenizer(input);
        for (let i = 0; i < this.testTokenizer.tokens.length; i++) {
            const token1 = this.tokenizer.tokens[i];
            const token2 = this.testTokenizer.tokens[i];
            if (token2.type === 'HOST' || token2.type === 'PATH' || token2.type === 'PORT' || token2.type === 'SCHEME') {
                if (!(token1 && token1.type === token2.type && token1.value === token2.value)) {
                    return false;
                }
            }
            if (token2.type === 'PARAMETERIZED_PATH') {
                //         ↓ je voliteľný?
                if (token2.parameter[1]) {
                    if (token1 && token1.type !== 'SEARCH_PARAMETER') {
                        if (token1.type !== 'PATH') {
                            return false;
                        }
                        this.parameters[token2.parameter[0]] = token1.value;
                    }
                }
                else {
                    if (!(token1 && token1.type === 'PATH')) {
                        return false;
                    }
                    this.parameters[token2.parameter[0]] = token1.value;
                }
            }
        }
        return true;
    }
    // DOKONČIŤ
    toString() {
        let url = `${this.host}${this.path}`;
        const keys = Object.entries(this.searchParameters);
        if (keys.length > 0) {
            url += `?${keys.map(([key, value]) => `${key}=${value}`).join('&')}`;
        }
        return url;
    }
}
export default NewUrl;
