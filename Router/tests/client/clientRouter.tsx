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
  function Product(): React.ReactNode {
    return <h1>{request.url.parameters.id!}</h1>;
  }

  response.html(<Product />);

  response.htmlOptions = { title: 'Product' };
});

export default clientRouter;
