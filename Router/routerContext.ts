/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 02.10.2025
 */

import React from 'react';

import type { RouterRequest, RouterResponse } from '../Router/types.js';

type RouterContext<Context> = {
  request: RouterRequest;
  response: RouterResponse<Context>;
};

// @ts-ignore
const routerContext = React.createContext<RouterContext<{}>>({});

export type { RouterContext };

export default routerContext;
