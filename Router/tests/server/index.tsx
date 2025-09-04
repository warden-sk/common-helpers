/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.09.2025
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import type { RouterRequest } from '../../index.js';

import NewUrl from '../../../NewUrl/index.js';
import RouterHtmlTemplate from '../../RouterHtmlTemplate.js';
import clientRouter from '../client/clientRouter.js';
import serverRouter from './serverRouter.js';

Bun.serve({
  async fetch({ headers, method, url }) {
    const request: RouterRequest = {
      formData: new FormData(),
      headers,
      method,
      url: new NewUrl(url),
    };

    const file = Bun.file(`./client${request.url.path}`);

    if (await file.exists()) {
      return new Response(file);
    }

    const response = await serverRouter.getResponse(request);

    // IF THE SERVER RESPONSE IS NOT VALID, USE THE CLIENT ONE
    if (response.statusCode !== 200) {
      const clientResponse = await clientRouter.getResponse(request);

      if (clientResponse.body.type === 'bytes') {
        return new Response(clientResponse.body.$, {
          headers: clientResponse.headers,
          status: clientResponse.statusCode,
        });
      }

      const html = await ReactDOMServer.renderToReadableStream(
        <RouterHtmlTemplate request={request} response={clientResponse} />,
      );

      return new Response(html, { headers: clientResponse.headers, status: clientResponse.statusCode });
    }

    if (response.body.type === 'bytes') {
      return new Response(response.body.$, { headers: response.headers, status: response.statusCode });
    }

    const html = await ReactDOMServer.renderToReadableStream(
      <RouterHtmlTemplate request={request} response={response} />,
    );

    return new Response(html, { headers: response.headers, status: response.statusCode });
  },
  port: 8080,
});
