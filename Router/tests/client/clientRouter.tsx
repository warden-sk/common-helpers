/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.09.2025
 */

import Router from 'common-helpers/Router/Router.js';
import React from 'react';

const clientRouter = new Router();

function Product({ id }: { id: string }): React.ReactNode {
  return <div onClick={() => alert('test')}>Product ID: {id}</div>;
}

/**
 * ROUTE(S)
 */
clientRouter.addRoute('GET', '/product/{id}', (request, response) => {
  response.html(<Product id={request.url.parameters.id!} />);
});

export default clientRouter;
