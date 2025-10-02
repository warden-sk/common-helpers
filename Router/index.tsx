/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 02.10.2025
 */

import type { Route, RouteAction, RouterRequest, RouterResponse } from './types.js';

import isError from '../validation/isError.js';
import isString from '../validation/isString.js';
import * as λ from '../λ.js';

class Router<Context> {
  routes: Route<Context>[] = [];

  useAction?: RouteAction<Context>;

  addRoute(method: string | string[], url: string, action: RouteAction<Context>): this {
    this.routes.push({
      action,
      method,
      url,
    });

    return this;
  }

  async getResponse(request: RouterRequest, initialContext: Context): Promise<RouterResponse<Context>> {
    const response: RouterResponse<Context> = {
      body: {
        $: new Uint8Array(),
        type: 'bytes',
      },
      context: initialContext,
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
      html: input => {
        if (isString(input)) {
          response.body = {
            $: new TextEncoder().encode(input),
            type: 'bytes',
          };
        } else {
          response.body = {
            $: input,
            type: 'react',
          };
        }

        response.headers.set('Content-Type', 'text/html');
      },
      htmlOptions: {},
      json: input => {
        response.body = {
          $: new TextEncoder().encode(λ.encodeJSON(input)),
          type: 'bytes',
        };

        response.headers.set('Content-Type', 'application/json');
      },
      redirect: input => {
        response.body = {
          $: new TextEncoder().encode(`<a href="${input}">${input}</a>`),
          type: 'bytes',
        };

        response.headers.set('Cache-Control', 'no-cache');
        response.headers.set('Content-Type', 'text/html');
        response.headers.set('Location', input);

        response.statusCode = 302;
      },
      statusCode: 200,
      text: input => {
        response.body = {
          $: new TextEncoder().encode(input),
          type: 'bytes',
        };

        response.headers.set('Content-Type', 'text/plain');
      },
    };

    try {
      await this.useAction?.(request, response);

      for (const route of this.routes) {
        const newRouteUrl = `${request.url.host}${route.url}`;

        if (
          request.url.test(newRouteUrl) &&
          (isString(route.method) ? route.method === request.method : route.method.includes(request.method))
        ) {
          await route.action(request, response);

          if (response.body.type === 'bytes' && response.body.$.length > 0) {
            return response;
          }

          if (response.body.type === 'react') {
            return response;
          }
        }
      }

      response.statusCode = 404;
      response.text('The page does not exist.');
    } catch (error) {
      response.statusCode = 500;
      response.text(isError(error) ? error.message : 'The request is not valid.');
    }

    return response;
  }

  use(action: RouteAction<Context>): this {
    this.useAction = action;

    return this;
  }
}

export default Router;
