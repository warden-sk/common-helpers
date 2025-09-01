/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */

import type React from 'react';

import type NewUrl from '../NewUrl/index.js';

import isError from '../validation/isError.js';
import isFunction from '../validation/isFunction.js';
import isString from '../validation/isString.js';
import * as λ from '../λ.js';

type HtmlOptions = {
  description?: string;
  keywords?: string;
  openGraph?: {
    description?: string;
    image?:
      | {
          alt?: string;
          height?: number;
          url: string;
          width?: number;
        }
      | string;
    site_name?: string; // DOKONČIŤ - `siteName` or `site_name`
    title?: string;
    url?: string;
  };
  title: string;
};

/**
 * Route
 */
type Route = {
  action: RouteAction;
  method: string;
  url: string;
};

type RouteAction = (request: RouterRequest, response: RouterResponse) => Promise<void> | void;

/**
 * Router
 */
type RouterRequest = {
  formData: FormData;
  headers: Headers;
  method: string;
  url: NewUrl;
};

type RouterResponse = {
  bytes: Uint8Array;
  component?: () => React.ReactNode;
  headers: Headers;
  html: (input: React.ReactNode) => void;
  json: (input: unknown) => void;
  statusCode: number;
  text: (input: string) => void;
};

class Router {
  routes: Route[] = [];

  addRoute(method: string, url: string, action: RouteAction): this {
    this.routes.push({
      action,
      method,
      url,
    });

    return this;
  }

  async getResponse(request: RouterRequest): Promise<RouterResponse> {
    const response: RouterResponse = {
      bytes: new Uint8Array(),
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
      html: input => {
        if (isString(input)) {
          response.bytes = new TextEncoder().encode(input);
        } else {
          response.component = async () => input;
        }

        response.headers.set('Content-Type', 'text/html');
      },
      json: input => {
        response.bytes = new TextEncoder().encode(λ.encodeJSON(input));
        response.headers.set('Content-Type', 'application/json');
      },
      statusCode: 200,
      text: input => {
        response.bytes = new TextEncoder().encode(input);
        response.headers.set('Content-Type', 'text/plain');
      },
    };

    try {
      for (const route of this.routes) {
        const newRouteUrl = `${request.url.host}${route.url}`;

        if (request.url.test(newRouteUrl) && route.method === request.method) {
          await route.action(request, response);

          if (response.bytes.length || isFunction(response.component)) {
            return response;
          }
        }
      }

      response.statusCode = 404;
      response.html('The page does not exist.');
    } catch (error) {
      response.statusCode = 500;
      response.html(isError(error) ? error.message : 'The request is not valid.');
    }

    return response;
  }
}

export type { HtmlOptions, RouteAction, RouterRequest, RouterResponse };

export default Router;
