/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 01.10.2025
 */

import React from 'react';

import type { RouterRequest, RouterResponse } from '../Router/index.js';

type RouterContext = {
  request: RouterRequest;
  response: RouterResponse<{}>;
};

const routerContext = React.createContext<RouterContext>({} as RouterContext);

export type { RouterContext };

export default routerContext;
