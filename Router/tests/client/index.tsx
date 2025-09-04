/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.09.2025
 */

import type { RouterRequest } from 'common-helpers/Router/index.js'; // KĽÚČOVÉ

import NewUrl from 'common-helpers/NewUrl/index.js'; // KĽÚČOVÉ
import ReactDOM from 'react-dom/client';

import clientRouter from './clientRouter.js';

if (typeof window !== 'undefined') {
  const request: RouterRequest = {
    formData: new FormData(),
    // @ts-ignore
    headers: new Headers(window.request.headers),
    // @ts-ignore
    method: window.request.method,
    // @ts-ignore
    url: new NewUrl(window.request.url.input),
  };

  const response = await clientRouter.getResponse(request);

  // ReactDOM.hydrateRoot();
}
