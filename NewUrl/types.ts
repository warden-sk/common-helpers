/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 24.03.2025
 */

type HostToken = {
  type: 'HOST';
  value: string;
};

type ParameterizedPathToken = {
  //                  ↓ je voliteľný?
  parameter: [string, boolean];
  type: 'PARAMETERIZED_PATH';
  value: string;
};

type PathToken = {
  type: 'PATH';
  value: string;
};

type PortToken = {
  type: 'PORT';
  value: string;
};

type SchemeToken = {
  type: 'SCHEME';
  value: string;
};

type SearchParameterToken = {
  parameter: [string, string];
  type: 'SEARCH_PARAMETER';
  value: string;
};

type Token = HostToken | ParameterizedPathToken | PathToken | PortToken | SchemeToken | SearchParameterToken;

export type { HostToken, ParameterizedPathToken, PathToken, PortToken, SchemeToken, SearchParameterToken, Token };
