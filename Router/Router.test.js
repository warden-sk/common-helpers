/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 03.09.2025
 */
import * as bun from 'bun:test';
import NewUrl from '../NewUrl/index.js';
import Router from './Router.js';
// [1] ROUTER
const router = new Router();
const testUrl = async (input, output, statusCode) => {
    // [3] REQUEST
    const request = {
        formData: new FormData(),
        headers: new Headers(),
        method: 'GET',
        url: new NewUrl(input),
    };
    // [4] RESPONSE
    const response = await router.getResponse(request);
    bun.expect(response.body).toStrictEqual({ $: new TextEncoder().encode(output), type: 'bytes' });
    bun.expect(response.statusCode).toStrictEqual(statusCode);
};
bun.test('[1] HTML & JSON & TEXT', async () => {
    // [2] ROUTE(S)
    router.addRoute('GET', '/html', (request, response) => {
        response.html(`<h1>${request.url.input}</h1>`);
        //               ↓ React (JSX)
        // response.html(<h1>{request.url.input}</h1>);
    });
    router.addRoute('GET', '/json', (request, response) => {
        response.json({ url: request.url.input });
    });
    router.addRoute('GET', '/text', (request, response) => {
        response.text(request.url.input);
    });
    await testUrl('https://test.sk/html', '<h1>https://test.sk/html</h1>', 200);
    await testUrl('https://test.sk/json', '{"url":"https://test.sk/json"}', 200);
    await testUrl('https://test.sk/text', 'https://test.sk/text', 200);
});
bun.test('[2] ERROR(S)', async () => {
    // NO RESPONSE
    router.addRoute('GET', '/test/1', () => { });
    // isError(error) ? error.message : 'The request is not valid.'
    router.addRoute('GET', '/test/2', () => {
        throw new Error('💫');
    });
    router.addRoute('GET', '/test/3', () => {
        throw '';
    });
    await testUrl('https://test.sk/test/1', 'The page does not exist.', 404);
    await testUrl('https://test.sk/test/2', '💫', 500);
    await testUrl('https://test.sk/test/3', 'The request is not valid.', 500);
});
