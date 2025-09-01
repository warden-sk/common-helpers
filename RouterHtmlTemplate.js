/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */
import React from 'react';
import isString from './validation/isString.js';
import * as λ from './λ.js';
function RouterHtmlTemplate({ $, request, response }) {
    if (response.htmlOptions.useHtmlTemplate) {
        return (React.createElement("html", { lang: "sk" },
            React.createElement("head", null,
                React.createElement("link", { as: "script", fetchPriority: "low", href: "/react/index.js", rel: "preload" }),
                React.createElement("meta", { charSet: "utf-8" }),
                React.createElement("meta", { content: "Marek Kobida", name: "author" }),
                isString(response.htmlOptions.description) && (React.createElement("meta", { content: response.htmlOptions.description, name: "description" })),
                isString(response.htmlOptions.keywords) && (React.createElement("meta", { content: response.htmlOptions.description, name: "keywords" })),
                isString(response.htmlOptions.openGraph?.description) && (React.createElement("meta", { content: response.htmlOptions.openGraph.description, property: "og:description" })),
                isString(response.htmlOptions.openGraph?.image) && (React.createElement("meta", { content: response.htmlOptions.openGraph.image, property: "og:image" })),
                isString(response.htmlOptions.openGraph?.site_name) && (React.createElement("meta", { content: response.htmlOptions.openGraph.site_name, property: "og:site_name" })),
                isString(response.htmlOptions.openGraph?.title) && (React.createElement("meta", { content: response.htmlOptions.openGraph.title, property: "og:title" })),
                isString(response.htmlOptions.openGraph?.url) && (React.createElement("meta", { content: response.htmlOptions.openGraph.url, property: "og:url" })),
                React.createElement("meta", { content: "initial-scale=1, maximum-scale=1, width=device-width", name: "viewport" }),
                React.createElement("script", { type: "importmap" }, '{"common-helpers/":"https://warden-sk.github.io/common-helpers/","react":"https://esm.sh/react@19.1.0","react-dom":"https://esm.sh/react-dom@19.1.0","react-dom/client":"https://esm.sh/react-dom@19.1.0/client"}}'),
                React.createElement("script", null, `window.request = ${λ.encodeJSON(request)};`),
                React.createElement("script", null, `window.response = ${λ.encodeJSON(response)};`),
                isString(response.htmlOptions.title) && React.createElement("title", null, response.htmlOptions.title)),
            React.createElement("body", null,
                React.createElement("div", { id: "root" }, "Ahoj"),
                React.createElement("script", { src: "/react/index.js", type: "module" }))));
    }
    return $;
}
export default RouterHtmlTemplate;
