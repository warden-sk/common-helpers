/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.09.2025
 */

import React from 'react';

import type { RouterRequest, RouterResponse } from './index.js';

import isObject from '../validation/isObject.js';
import isString from '../validation/isString.js';
import * as λ from '../λ.js';

type I = {
  request: RouterRequest;
  response: RouterResponse;
};

type O = React.ReactNode;

function RouterHtmlTemplate({ request, response }: I): O {
  response.headers.set('Content-Type', 'text/html');

  return (
    <html lang="sk">
      <head>
        <link href="/index.css" rel="stylesheet" />

        <meta charSet="utf-8" />
        <meta content="Marek Kobida" name="author" />

        {isString(response.htmlOptions.description) && (
          <meta content={response.htmlOptions.description} name="description" />
        )}
        {isString(response.htmlOptions.keywords) && <meta content={response.htmlOptions.description} name="keywords" />}

        {/* OPEN GRAPH */}
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
            '{"imports":{"common-helpers/":"https://warden-sk.github.io/common-helpers/","react":"https://esm.sh/react@19.1.0?dev","react-dom":"https://esm.sh/react-dom@19.1.0?dev","react-dom/client":"https://esm.sh/react-dom@19.1.0/client?dev"}}'
          }
        </script>

        {isObject(response.htmlOptions.json) && (
          <script>{`window.json = ${λ.encodeJSON(response.htmlOptions.json)};`}</script>
        )}

        <script>{`window.request = ${λ.encodeJSON(request)};`}</script>
        <script>{`window.response = ${λ.encodeJSON(response)};`}</script>

        {isString(response.htmlOptions.title) && <title>{response.htmlOptions.title}</title>}
      </head>
      <body>
        <div id="client">{response.body.$}</div>

        <script src="/index.js" type="module"></script>
      </body>
    </html>
  );
}

export default RouterHtmlTemplate;
