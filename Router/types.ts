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

type Route = {
  action: RouteAction;
  method: string | string[];
  url: string;
};

type RouteAction = (request: RouterRequest, response: RouterResponse) => Promise<void> | void;

type RouterRequest = {
  formData: FormData;
  headers: Headers;
  method: string;
  url: NewUrl;
};

type RouterResponse = {
  body:
    | {
        $: React.ReactNode;
        type: 'react';
      }
    | {
        $: Uint8Array<ArrayBuffer>;
        type: 'bytes';
      };
  headers: Headers;
  html: (input: React.ReactNode) => void;
  htmlOptions: HtmlOptions;
  json: (input: unknown) => void;
  redirect: (input: string) => void;
  statusCode: number;
  text: (input: string) => void;
};

export type { HtmlOptions, Route, RouteAction, RouterRequest, RouterResponse };
