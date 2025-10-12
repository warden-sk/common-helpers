/*
 * Copyright 2025 Marek Kobida
 */

import React from 'react';

import type { RouterRequest, RouterResponse } from '../Router/types.js';

import NewUrl from '../NewUrl/index.js';

type RouterContext = {
  request: RouterRequest;
  response: RouterResponse;
};

const routerContext = React.createContext<RouterContext>({
  request: {
    formData: new FormData(),
    headers: new Headers(),
    method: 'GET',
    url: new NewUrl('http://127.0.0.1'),
  },
  response: {
    body: {
      $: new Uint8Array(),
      type: 'bytes',
    },
    headers: new Headers({
      'Content-Type': 'text/plain',
    }),
    html: () => {
      throw new Error('');
    },
    htmlOptions: {},
    json: () => {
      throw new Error('');
    },
    redirect: () => {
      throw new Error('');
    },
    statusCode: 200,
    text: () => {
      throw new Error('');
    },
  },
});

export type { RouterContext };

export default routerContext;
