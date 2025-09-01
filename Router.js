/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RouterHtmlTemplate from './RouterHtmlTemplate.js';
import isError from './validation/isError.js';
import isPromise from './validation/isPromise.js';
import isReadableStream from './validation/isReadableStream.js';
import isString from './validation/isString.js';
import * as λ from './λ.js';
class Router {
    routes = [];
    addRoute(method, url, action) {
        this.routes.push({
            action,
            method,
            url,
        });
        return this;
    }
    getReadableStream(input) {
        return new ReadableStream({
            start($) {
                $.enqueue(new TextEncoder().encode(input));
                $.close();
            },
        });
    }
    async getResponse(request) {
        const response = {
            headers: new Headers({
                'Content-Type': 'text/plain',
            }),
            html: (input, htmlOptions) => {
                response.headers.set('Content-Type', 'text/html');
                response.readableStream =
                    isString(input) ?
                        this.getReadableStream(input)
                        //             ↓ "&" → "&amp;"
                        : ReactDOMServer.renderToReadableStream(React.createElement(RouterHtmlTemplate, { htmlOptions: htmlOptions, request: request, response: response }, input));
            },
            json: input => {
                response.headers.set('Content-Type', 'application/json');
                response.readableStream = this.getReadableStream(λ.encodeJSON(input));
            },
            statusCode: 200,
            text: input => {
                response.headers.set('Content-Type', 'text/plain');
                response.readableStream = this.getReadableStream(input);
            },
        };
        try {
            for (const route of this.routes) {
                const newRouteUrl = `${request.url.host}${route.url}`;
                if (request.url.test(newRouteUrl) && route.method === request.method) {
                    await route.action(request, response);
                    if (isPromise(response.readableStream) || isReadableStream(response.readableStream)) {
                        return response;
                    }
                }
            }
            response.statusCode = 404;
            response.text('The page does not exist.');
        }
        catch (error) {
            response.statusCode = 500;
            response.text(isError(error) ? error.message : 'The request is not valid.');
        }
        return response;
    }
}
export default Router;
