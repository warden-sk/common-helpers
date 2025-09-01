/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */

import React from 'react';

import type { HtmlOptions, RouterRequest, RouterResponse } from './Router.js';

import isString from '../validation/isString.js';
import * as λ from '../λ.js';

type I = {
  children: React.ReactNode;
  htmlOptions: HtmlOptions;
  request: RouterRequest;
  response: RouterResponse;
};

type O = React.ReactNode;

function RouterHtmlTemplate({ children, htmlOptions, request, response }: I): O {
  if (htmlOptions.useHtmlTemplate ?? true) {
    return (
      <html lang="sk">
        <head>
          <meta charSet="utf-8" />
          <meta content="Marek Kobida" name="author" />

          {isString(htmlOptions.description) && <meta content={htmlOptions.description} name="description" />}
          {isString(htmlOptions.keywords) && <meta content={htmlOptions.description} name="keywords" />}

          {/* OPEN GRAPH */}
          {isString(htmlOptions.openGraph?.description) && (
            <meta content={htmlOptions.openGraph.description} property="og:description" />
          )}
          {isString(htmlOptions.openGraph?.image) && <meta content={htmlOptions.openGraph.image} property="og:image" />}
          {isString(htmlOptions.openGraph?.site_name) && (
            <meta content={htmlOptions.openGraph.site_name} property="og:site_name" />
          )}
          {isString(htmlOptions.openGraph?.title) && <meta content={htmlOptions.openGraph.title} property="og:title" />}
          {isString(htmlOptions.openGraph?.url) && <meta content={htmlOptions.openGraph.url} property="og:url" />}

          <meta content="initial-scale=1, maximum-scale=1, width=device-width" name="viewport" />

          <script type="importmap">
            {
              '{"imports":{"common-helpers/":"https://warden-sk.github.io/common-helpers/","react":"https://esm.sh/react@19.1.0","react-dom":"https://esm.sh/react-dom@19.1.0","react-dom/client":"https://esm.sh/react-dom@19.1.0/client","react-dom/server":"https://esm.sh/react-dom@19.1.0/server"}}'
            }
          </script>

          <script>{`window.request = ${λ.encodeJSON(request)};`}</script>
          <script>{`window.response = ${λ.encodeJSON(response)};`}</script>

          <title>{htmlOptions.title}</title>
        </head>
        <body>
          <div id="client">{children}</div>

          <script src="/index.js" type="module"></script>
        </body>
      </html>
    );
  }

  return children;
}

export default RouterHtmlTemplate;
