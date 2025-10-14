/*
 * Copyright 2025 Marek Kobida
 */

import type React from 'react';

import type NewUrl from '../NewUrl/index.js';

type HtmlOptions = {
  description?: string;
  keywords?: string;
  openGraph?: {
    description?: string;
    image?:
      | {
          alt?: string;
          height?: number;
          url: string;
          width?: number;
        }
      | string;
    site_name?: string; // DOKONČIŤ - `siteName` or `site_name`
    title?: string;
    url?: string;
  };
  title?: string;
};

type Route<Context> = {
  action: RouteAction<Context>;
  method: string | string[];
  url: string;
};

type RouteAction<Context> = (request: RouterRequest, response: RouterResponse<Context>) => Promise<void> | void;

type RouterRequest = {
  formData: FormData;
  headers: Headers;
  method: string;
  url: NewUrl;
};

type RouterResponse<Context> = {
  body: React.ReactElement | Uint8Array<ArrayBuffer>;
  context: Context;
  headers: Headers;
  html: (input: React.ReactElement | string) => void;
  htmlOptions: HtmlOptions;
  json: (input: unknown) => void;
  redirect: (input: string) => void;
  statusCode: number;
  text: (input: string) => void;
};

export type { HtmlOptions, Route, RouteAction, RouterRequest, RouterResponse };
