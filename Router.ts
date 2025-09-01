/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */

import type React from 'react';

import ReactDOMServer from 'react-dom/server';

import type NewUrl from './NewUrl/index.js';

import RouterHtmlTemplate from './RouterHtmlTemplate.js';
import isError from './validation/isError.js';
import isPromise from './validation/isPromise.js';
import isReadableStream from './validation/isReadableStream.js';
import isString from './validation/isString.js';
import * as λ from './λ.js';

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
  title?: string;
  useHtmlTemplate?: boolean;
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
  json: {
    [key: string]: unknown;
  };
  method: string;
  url: NewUrl;
};

type RouterResponse = {
  headers: Headers;
  html: (input: React.ReactNode, htmlOptions?: HtmlOptions) => void;
  json: (input: unknown) => void;
  readableStream?: Promise<ReadableStream> | ReadableStream; // DOKONČIŤ
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

  getReadableStream(input: string): ReadableStream {
    return new ReadableStream({
      start($) {
        $.enqueue(new TextEncoder().encode(input));

        $.close();
      },
    });
  }

  async getResponse(request: RouterRequest): Promise<RouterResponse> {
    const response: RouterResponse = {
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
      html: (input, htmlOptions) => {
        response.headers.set('Content-Type', 'text/html');

        response.readableStream =
          isString(input) ?
            this.getReadableStream(input)
            //             ↓ "&" → "&amp;"
          : ReactDOMServer.renderToReadableStream(
              RouterHtmlTemplate({
                $: input,
                htmlOptions,
                request,
                response,
              }),
            );
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
    } catch (error) {
      response.statusCode = 500;
      response.text(isError(error) ? error.message : 'The request is not valid.');
    }

    return response;
  }
}

export type { HtmlOptions, RouteAction, RouterRequest, RouterResponse };

export default Router;
