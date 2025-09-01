/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */
import React from 'react';
import isString from '../validation/isString.js';
import * as λ from '../λ.js';
function RouterHtmlTemplate({ children, htmlOptions, request, response }) {
    if (htmlOptions.useHtmlTemplate ?? true) {
        return (React.createElement("html", { lang: "sk" },
            React.createElement("head", null,
                React.createElement("meta", { charSet: "utf-8" }),
                React.createElement("meta", { content: "Marek Kobida", name: "author" }),
                isString(htmlOptions.description) && React.createElement("meta", { content: htmlOptions.description, name: "description" }),
                isString(htmlOptions.keywords) && React.createElement("meta", { content: htmlOptions.description, name: "keywords" }),
                isString(htmlOptions.openGraph?.description) && (React.createElement("meta", { content: htmlOptions.openGraph.description, property: "og:description" })),
                isString(htmlOptions.openGraph?.image) && React.createElement("meta", { content: htmlOptions.openGraph.image, property: "og:image" }),
                isString(htmlOptions.openGraph?.site_name) && (React.createElement("meta", { content: htmlOptions.openGraph.site_name, property: "og:site_name" })),
                isString(htmlOptions.openGraph?.title) && React.createElement("meta", { content: htmlOptions.openGraph.title, property: "og:title" }),
                isString(htmlOptions.openGraph?.url) && React.createElement("meta", { content: htmlOptions.openGraph.url, property: "og:url" }),
                React.createElement("meta", { content: "initial-scale=1, maximum-scale=1, width=device-width", name: "viewport" }),
                React.createElement("script", { type: "importmap" }, '{"imports":{"common-helpers/":"https://warden-sk.github.io/common-helpers/","react":"https://esm.sh/react@19.1.0","react-dom":"https://esm.sh/react-dom@19.1.0","react-dom/client":"https://esm.sh/react-dom@19.1.0/client","react-dom/server":"https://esm.sh/react-dom@19.1.0/server"}}'),
                React.createElement("script", null, `window.request = ${λ.encodeJSON(request)};`),
                React.createElement("script", null, `window.response = ${λ.encodeJSON(response)};`),
                React.createElement("title", null, htmlOptions.title)),
            React.createElement("body", null,
                React.createElement("div", { id: "client" }, children),
                React.createElement("script", { src: "/index.js", type: "module" }))));
    }
    return children;
}
export default RouterHtmlTemplate;
