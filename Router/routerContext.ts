/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.09.2025
 */

import type { RouterRequest, RouterResponse } from 'common-helpers/Router/index.js';

import React from 'react';

type RouterContext = {
  request: RouterRequest;
  response: RouterResponse;
};

const routerContext = React.createContext<RouterContext>({} as RouterContext);

export type { RouterContext };

export default routerContext;
