/*
 * Copyright 2025 Marek Kobida
 */

import React from 'react';

import type { RouterRequest, RouterResponse } from './types.js';

import isArray from '../validation/isArray.js';
import isString from '../validation/isString.js';
import * as λ from '../λ.js';
import routerContext from './routerContext.js';

type I = {
  aliases?: {
    [key: string]: string;
  };
  css?: string[];
  js?: (
    | {
        async?: boolean;
        fetchPriority?: 'auto' | 'high' | 'low';
        type?: 'module';
        url: string;
      }
    | string
  )[];
  request: RouterRequest;
  response: RouterResponse<{}>; // DOKONČIŤ
};

type O = React.ReactElement;

function RouterHtmlTemplate({ aliases, css, js, request, response }: I): O {
  const newAliases = {
    ...aliases,
    'common-helpers/': 'https://warden-sk.github.io/common-helpers/',
    react: 'https://esm.sh/react@19.2.0',
    'react-dom': 'https://esm.sh/react-dom@19.2.0',
    'react-dom/client': 'https://esm.sh/react-dom@19.2.0/client',
  };

  return (
    <html lang="sk">
      <head>
        <meta content="noindex" name="robots" />

        {isArray(css) &&
          css.map($ => {
            return <link href={$} key={$} rel="stylesheet" />;
          })}

        <link href={`${request.url.host}/index.css`} rel="stylesheet" />

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
          {λ.encodeJSON({
            imports: newAliases,
          })}
        </script>

        {isArray(js) &&
          js.map($ => {
            if (isString($)) {
              return <script key={$} src={$} />;
            }

            return <script async={$.async} fetchPriority={$.fetchPriority} key={$.url} src={$.url} type={$.type} />;
          })}

        <script>{`window.request = ${λ.encodeJSON(request)};`}</script>
        <script>{`window.response = ${λ.encodeJSON(response)};`}</script>

        {isString(response.htmlOptions.title) && <title>{response.htmlOptions.title}</title>}
      </head>
      <body>
        <div id="client">
          <routerContext.Provider
            value={{
              request,
              response,
            }}
          >
            {response.body}
          </routerContext.Provider>
        </div>

        <script src={`${request.url.host}/index.js`} type="module"></script>
      </body>
    </html>
  );
}

export default RouterHtmlTemplate;
