/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 02.09.2025
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import NewUrl from '../../../NewUrl/index.js';
import RouterHtmlTemplate from '../../RouterHtmlTemplate.js';
import clientRouter from '../client/clientRouter.js';
import serverRouter from './serverRouter.js';
Bun.serve({
    async fetch({ headers, method, url }) {
        // [1] REQUEST
        const request = {
            formData: new FormData(),
            headers,
            method,
            url: new NewUrl(url),
        };
        const file = Bun.file(`/Users/marekkobida/Documents/warden/common-helpers/Router/tests/client${request.url.path}`);
        if (await file.exists()) {
            return new Response(file);
        }
        // [2] RESPONSE
        const response = await serverRouter.getResponse(request);
        // [2.1] IF THE SERVER RESPONSE IS NOT VALID, USE THE CLIENT ONE
        if (response.statusCode !== 200) {
            const clientResponse = await clientRouter.getResponse(request);
            // READABLE STREAM
            const html = await ReactDOMServer.renderToReadableStream(React.createElement(RouterHtmlTemplate, { request: request, response: clientResponse }));
            return new Response(html, { headers: response.headers, status: clientResponse.statusCode });
        }
        return new Response('lol', { headers: response.headers, status: response.statusCode });
    },
    port: 8080,
});
