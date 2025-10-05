/*
 * Copyright 2025 Marek Kobida
 */
import React from 'react';
import isArray from '../validation/isArray.js';
import isString from '../validation/isString.js';
import * as λ from '../λ.js';
import routerContext from './routerContext.js';
function RouterHtmlTemplate({ aliases, css, js, request, response }) {
    const newAliases = {
        ...aliases,
        'common-helpers/': 'https://warden-sk.github.io/common-helpers/',
        react: 'https://esm.sh/react@19.1.0?dev',
        'react-dom': 'https://esm.sh/react-dom@19.1.0?dev',
        'react-dom/client': 'https://esm.sh/react-dom@19.1.0/client?dev',
    };
    return (React.createElement("html", { lang: "sk" },
        React.createElement("head", null,
            React.createElement("meta", { content: "noindex", name: "robots" }),
            isArray(css) &&
                css.map($ => {
                    return React.createElement("link", { href: $, key: $, rel: "stylesheet" });
                }),
            React.createElement("link", { href: `${request.url.host}/index.css`, rel: "stylesheet" }),
            React.createElement("meta", { charSet: "utf-8" }),
            React.createElement("meta", { content: "Marek Kobida", name: "author" }),
            isString(response.htmlOptions.description) && (React.createElement("meta", { content: response.htmlOptions.description, name: "description" })),
            isString(response.htmlOptions.keywords) && React.createElement("meta", { content: response.htmlOptions.description, name: "keywords" }),
            isString(response.htmlOptions.openGraph?.description) && (React.createElement("meta", { content: response.htmlOptions.openGraph.description, property: "og:description" })),
            isString(response.htmlOptions.openGraph?.image) && (React.createElement("meta", { content: response.htmlOptions.openGraph.image, property: "og:image" })),
            isString(response.htmlOptions.openGraph?.site_name) && (React.createElement("meta", { content: response.htmlOptions.openGraph.site_name, property: "og:site_name" })),
            isString(response.htmlOptions.openGraph?.title) && (React.createElement("meta", { content: response.htmlOptions.openGraph.title, property: "og:title" })),
            isString(response.htmlOptions.openGraph?.url) && (React.createElement("meta", { content: response.htmlOptions.openGraph.url, property: "og:url" })),
            React.createElement("meta", { content: "initial-scale=1, maximum-scale=1, width=device-width", name: "viewport" }),
            React.createElement("script", { type: "importmap" }, λ.encodeJSON({
                imports: newAliases,
            })),
            isArray(js) &&
                js.map($ => {
                    if (isString($)) {
                        return React.createElement("script", { key: $, src: $ });
                    }
                    return React.createElement("script", { async: $.async, fetchPriority: $.fetchPriority, key: $.url, src: $.url, type: $.type });
                }),
            React.createElement("script", null, `window.request = ${λ.encodeJSON(request)};`),
            React.createElement("script", null, `window.response = ${λ.encodeJSON(response)};`),
            isString(response.htmlOptions.title) && React.createElement("title", null, response.htmlOptions.title)),
        React.createElement("body", null,
            React.createElement("div", { id: "client" },
                React.createElement(routerContext.Provider, { value: {
                        request,
                        response,
                    } }, response.body.$)),
            React.createElement("script", { src: `${request.url.host}/index.js`, type: "module" }))));
}
export default RouterHtmlTemplate;
