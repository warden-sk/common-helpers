/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */

import * as bun from 'bun:test';
import React from 'react';

import type { RouterRequest } from './Router.js';

import NewUrl from '../NewUrl/index.js';
import isPromise from '../validation/isPromise.js';
import isReadableStream from '../validation/isReadableStream.js';
import Router from './Router.js';

// [1] ROUTER
const router = new Router();

const testUrl = async (input: string, output: string, statusCode: number): Promise<void> => {
  // [3] REQUEST
  const request: RouterRequest = {
    formData: new FormData(),
    headers: new Headers(),
    json: {},
    method: 'GET',
    url: new NewUrl(input),
  };

  // [4] RESPONSE
  const response = await router.getResponse(request);

  bun.expect(response.statusCode).toStrictEqual(statusCode);

  // [4.1] RESPONSE / READABLE STREAM
  let readableStream = response.readableStream;

  if (isPromise(readableStream)) {
    readableStream = await readableStream;
  }

  if (isReadableStream(readableStream)) {
    const text = await new Response(readableStream).text();

    bun.expect(text).toStrictEqual(output);
  }
};

bun.test('[1] HTML & JSON & TEXT', async () => {
  // [2] ROUTE(S)
  router.addRoute('GET', '/html', (request, response) => {
    //            ↓ React (JSX)
    response.html(<h1>{request.url.input}</h1>, { useHtmlTemplate: false });

    // OR
    // await response.html(`<h1>${request.url.input}</h1>`);
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
  router.addRoute('GET', '/test/1', () => {});

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
