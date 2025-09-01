/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 02.09.2025
 */
import Router from 'common-helpers/Router/Router.js';
import React from 'react';
const clientRouter = new Router();
/**
 * ROUTE(S)
 */
clientRouter.addRoute('GET', '/product/{id}', (request, response) => {
    function Product() {
        return React.createElement("h1", null, request.url.parameters.id);
    }
    response.html(React.createElement(Product, null));
    response.htmlOptions = { title: 'Product' };
});
export default clientRouter;
