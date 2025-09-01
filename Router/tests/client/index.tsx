/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */

import type { RouterRequest } from 'common-helpers/Router/Router.js';

import NewUrl from 'common-helpers/NewUrl/index.js';
import clientRouter from 'common-helpers/Router/tests/client/clientRouter.js';

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

  clientRouter.getResponse(request).then(response => {
    console.log(response);
  });
}
