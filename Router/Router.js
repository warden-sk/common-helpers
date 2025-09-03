/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 03.09.2025
 */
import isError from '../validation/isError.js';
import isString from '../validation/isString.js';
import * as λ from '../λ.js';
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
    async getResponse(request) {
        const response = {
            body: {
                $: new Uint8Array(),
                type: 'bytes',
            },
            headers: new Headers({
                'Content-Type': 'text/plain',
            }),
            html: input => {
                if (isString(input)) {
                    response.body = { $: new TextEncoder().encode(input), type: 'bytes' };
                }
                else {
                    response.body = { $: input, type: 'react' };
                }
                response.headers.set('Content-Type', 'text/html');
            },
            htmlOptions: {},
            json: input => {
                response.body = { $: new TextEncoder().encode(λ.encodeJSON(input)), type: 'bytes' };
                response.headers.set('Content-Type', 'application/json');
            },
            statusCode: 200,
            text: input => {
                response.body = { $: new TextEncoder().encode(input), type: 'bytes' };
                response.headers.set('Content-Type', 'text/plain');
            },
        };
        try {
            for (const route of this.routes) {
                const newRouteUrl = `${request.url.host}${route.url}`;
                if (request.url.test(newRouteUrl) && route.method === request.method) {
                    await route.action(request, response);
                    if ((response.body.type === 'bytes' && response.body.$.length > 0) || response.body.type === 'react') {
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
