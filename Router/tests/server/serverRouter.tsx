/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.09.2025
 */

import Router from '../../index.js';

const serverRouter = new Router();

/**
 * ROUTE(S)
 */
serverRouter.addRoute('GET', '/', (request, response) => {
  response.context = {
    message: 'Hello',
  };
});

export default serverRouter;
