/*
 * Copyright 2025 Marek Kobida
 */
import { expect, test } from 'bun:test';
import Tokenizer from '../Tokenizer.js';
test('[1] SCHEME + HOST', () => {
    const tokenizer = new Tokenizer('https://kobida.sk');
    expect(tokenizer.tokens).toEqual([
        {
            type: 'SCHEME',
            value: 'https://',
        },
        {
            type: 'HOST',
            value: 'kobida.sk',
        },
    ]);
});
test('[2] SCHEME + HOST + PORT', () => {
    const tokenizer = new Tokenizer('https://kobida.sk:443');
    expect(tokenizer.tokens).toEqual([
        {
            type: 'SCHEME',
            value: 'https://',
        },
        {
            type: 'HOST',
            value: 'kobida.sk',
        },
        {
            type: 'PORT',
            value: '443',
        },
    ]);
});
test('[3] SCHEME + HOST + PORT + PARAMETERIZED_PATH', () => {
    const tokenizer = new Tokenizer('https://kobida.sk:443/{test?}');
    expect(tokenizer.tokens).toEqual([
        {
            type: 'SCHEME',
            value: 'https://',
        },
        {
            type: 'HOST',
            value: 'kobida.sk',
        },
        {
            type: 'PORT',
            value: '443',
        },
        {
            parameter: ['test', true],
            type: 'PARAMETERIZED_PATH',
            value: '{test?}',
        },
    ]);
});
test('[4] SCHEME + HOST + PORT + PATH', () => {
    const tokenizer = new Tokenizer('https://kobida.sk:443/test');
    expect(tokenizer.tokens).toEqual([
        {
            type: 'SCHEME',
            value: 'https://',
        },
        {
            type: 'HOST',
            value: 'kobida.sk',
        },
        {
            type: 'PORT',
            value: '443',
        },
        {
            type: 'PATH',
            value: 'test',
        },
    ]);
});
test('[4] SCHEME + HOST + PORT + PATH + SEARCH_PARAMETER', () => {
    const tokenizer = new Tokenizer('https://kobida.sk:443/test?page=1');
    expect(tokenizer.tokens).toEqual([
        {
            type: 'SCHEME',
            value: 'https://',
        },
        {
            type: 'HOST',
            value: 'kobida.sk',
        },
        {
            type: 'PORT',
            value: '443',
        },
        {
            type: 'PATH',
            value: 'test',
        },
        {
            parameter: ['page', '1'],
            type: 'SEARCH_PARAMETER',
            value: 'page=1',
        },
    ]);
});
test('[5] SCHEME + HOST + PORT + PATH + SEARCH_PARAMETER', () => {
    const tokenizer = new Tokenizer('https://kobida.sk:443/test?search=Ako+sa+m%C3%A1%C5%A1%3F');
    expect(tokenizer.tokens).toEqual([
        {
            type: 'SCHEME',
            value: 'https://',
        },
        {
            type: 'HOST',
            value: 'kobida.sk',
        },
        {
            type: 'PORT',
            value: '443',
        },
        {
            type: 'PATH',
            value: 'test',
        },
        {
            parameter: ['search', 'Ako sa máš?'],
            type: 'SEARCH_PARAMETER',
            value: 'search=Ako+sa+m%C3%A1%C5%A1%3F',
        },
    ]);
});
