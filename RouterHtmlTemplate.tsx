/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */

import React from 'react';

import type { RouterRequest, RouterResponse } from './Router.js';

import isString from './validation/isString.js';
import * as λ from './λ.js';

type I = {
  $: React.ReactNode;
  request: RouterRequest;
  response: RouterResponse;
};

type O = React.ReactNode;

function RouterHtmlTemplate({ $, request, response }: I): O {
  if (response.htmlOptions.useHtmlTemplate) {
    return (
      <html lang="sk">
        <head>
          <link as="script" fetchPriority="low" href="/react/index.js" rel="preload" />
          <meta charSet="utf-8" />
          <meta content="Marek Kobida" name="author" />

          {isString(response.htmlOptions.description) && (
            <meta content={response.htmlOptions.description} name="description" />
          )}
          {isString(response.htmlOptions.keywords) && (
            <meta content={response.htmlOptions.description} name="keywords" />
          )}

          {isString(response.htmlOptions.openGraph?.description) && (
            <meta content={response.htmlOptions.openGraph.description} property="og:description" />
          )}
          {isString(response.htmlOptions.openGraph?.image) && (
            <meta content={response.htmlOptions.openGraph.image} property="og:image" />
          )}
          {isString(response.htmlOptions.openGraph?.site_name) && (
            <meta content={response.htmlOptions.openGraph.site_name} property="og:site_name" />
          )}
          {isString(response.htmlOptions.openGraph?.title) && (
            <meta content={response.htmlOptions.openGraph.title} property="og:title" />
          )}
          {isString(response.htmlOptions.openGraph?.url) && (
            <meta content={response.htmlOptions.openGraph.url} property="og:url" />
          )}

          <meta content="initial-scale=1, maximum-scale=1, width=device-width" name="viewport" />

          <script type="importmap">
            {
              '{"common-helpers/":"https://warden-sk.github.io/common-helpers/","react":"https://esm.sh/react@19.1.0","react-dom":"https://esm.sh/react-dom@19.1.0","react-dom/client":"https://esm.sh/react-dom@19.1.0/client"}}'
            }
          </script>

          <script>{`window.request = ${λ.encodeJSON(request)};`}</script>
          <script>{`window.response = ${λ.encodeJSON(response)};`}</script>

          {isString(response.htmlOptions.title) && <title>{response.htmlOptions.title}</title>}
        </head>
        <body>
          <div id="root">Ahoj</div>

          <script src="/react/index.js" type="module"></script>
        </body>
      </html>
    );
  }

  return $;
}

export default RouterHtmlTemplate;
