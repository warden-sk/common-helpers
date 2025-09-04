/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.09.2025
 */

import Router from 'common-helpers/Router/index.js'; // KĽÚČOVÉ
import React from 'react';

const clientRouter = new Router();

/**
 * REACT
 */
function Product({ id }: { id: string }): React.ReactNode {
  return <h1>{id}</h1>;
}

/**
 * ROUTE(S)
 */
clientRouter.addRoute('GET', '/product/{id}', (request, response) => {
  const { id } = request.url.parameters;

  response.html(<Product id={id!} />);

  response.htmlOptions = { title: 'Product' };
});

export default clientRouter;
