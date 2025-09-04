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
  response.html(<p>Name: {response.context.name}</p>);

  response.htmlOptions = { title: 'Index' };
});

export default clientRouter;
