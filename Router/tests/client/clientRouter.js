/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.09.2025
 */
import Router from 'common-helpers/Router/index.js'; // KĽÚČOVÉ
import React from 'react';
const clientRouter = new Router();
/**
 * ROUTE(S)
 */
clientRouter.addRoute('GET', '/', (request, response) => {
    response.html(React.createElement("h1", null, "Index"));
    response.htmlOptions = { title: 'Index' };
});
export default clientRouter;
