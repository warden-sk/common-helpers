/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 02.09.2025
 */

import type { RouterRequest } from 'common-helpers/Router/Router.js';

import NewUrl from 'common-helpers/NewUrl/index.js';
import ReactDOM from 'react-dom/client';

import clientRouter from './clientRouter.js';

if (typeof window !== 'undefined') {
  // [1]
  const container = window.document.getElementById('client')!;

  // [2] REQUEST
  const request: RouterRequest = {
    formData: new FormData(),
    // @ts-ignore
    headers: new Headers(window.request.headers),
    // @ts-ignore
    method: window.request.method,
    // @ts-ignore
    url: new NewUrl(window.request.url.input),
  };

  // [3] RESPONSE
  const response = await clientRouter.getResponse(request);

  // [4]
  ReactDOM.hydrateRoot(container, response.component ?? new TextDecoder().decode(response.bytes));
}
