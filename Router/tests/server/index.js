/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.09.2025
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import NewUrl from '../../../NewUrl/index.js';
import RouterHtmlTemplate from '../../RouterHtmlTemplate.js';
import clientRouter from '../client/clientRouter.js';
import serverRouter from './serverRouter.js';
Bun.serve({
    async fetch({ headers, method, url }) {
        const serverRequest = {
            formData: new FormData(),
            headers,
            method,
            url: new NewUrl(url),
        };
        const file = Bun.file(`./client${serverRequest.url.path}`);
        if (await file.exists()) {
            return new Response(file);
        }
        const serverResponse = await serverRouter.getResponse(serverRequest, {});
        if (serverResponse.statusCode !== 200) {
            const clientResponse = await clientRouter.getResponse(serverRequest, serverResponse.context);
            if (clientResponse.body.type === 'bytes') {
                return new Response(clientResponse.body.$, {
                    headers: clientResponse.headers,
                    status: clientResponse.statusCode,
                });
            }
            const html = await ReactDOMServer.renderToReadableStream(React.createElement(RouterHtmlTemplate, { request: serverRequest, response: clientResponse }));
            return new Response(html, {
                headers: clientResponse.headers,
                status: clientResponse.statusCode,
            });
        }
        if (serverResponse.body.type === 'bytes') {
            return new Response(serverResponse.body.$, {
                headers: serverResponse.headers,
                status: serverResponse.statusCode,
            });
        }
        const html = await ReactDOMServer.renderToReadableStream(React.createElement(RouterHtmlTemplate, { request: serverRequest, response: serverResponse }));
        return new Response(html, {
            headers: serverResponse.headers,
            status: serverResponse.statusCode,
        });
    },
    port: 8080,
});
