/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 02.09.2025
 */
import Router from 'common-helpers/Router/Router.js'; // KĽÚČOVÉ
import React from 'react';
const clientRouter = new Router();
/**
 * REACT COMPONENT
 */
function Product({ id }) {
    return React.createElement("h1", null, id);
}
/**
 * ROUTE(S)
 */
clientRouter.addRoute('GET', '/product/{id}', (request, response) => {
    const { id } = request.url.parameters;
    response.html(React.createElement(Product, { id: id }));
    response.htmlOptions = { title: 'Product' };
});
export default clientRouter;
