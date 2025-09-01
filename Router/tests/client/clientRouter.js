/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */
import Router from 'common-helpers/Router/Router.js';
import React from 'react';
const clientRouter = new Router();
function Product({ id }) {
    return React.createElement("div", { onClick: () => alert('test') },
        "Product ID: ",
        id);
}
/**
 * ROUTE(S)
 */
clientRouter.addRoute('GET', '/product/{id}', (request, response) => {
    response.html(React.createElement(Product, { id: request.url.parameters.id }));
});
export default clientRouter;
