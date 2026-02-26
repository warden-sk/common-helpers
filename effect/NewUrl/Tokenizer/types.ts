/*
 * Copyright 2026 Marek Kobida
 */

type HostToken = {
  readonly type: 'HOST';
  readonly value: string;
};

type ParameterizedPathToken = {
  //                                    ↓ je voliteľný?
  readonly parameter: readonly [string, boolean];
  readonly type: 'PARAMETERIZED_PATH';
  readonly value: string;
};

type PathToken = {
  readonly type: 'PATH';
  readonly value: string;
};

type PortToken = {
  readonly type: 'PORT';
  readonly value: string;
};

type SchemeToken = {
  readonly type: 'SCHEME';
  readonly value: string;
};

type SearchParameterToken = {
  readonly parameter: readonly [string, string];
  readonly type: 'SEARCH_PARAMETER';
  readonly value: string;
};

type Token = HostToken | ParameterizedPathToken | PathToken | PortToken | SchemeToken | SearchParameterToken;

export type { HostToken, ParameterizedPathToken, PathToken, PortToken, SchemeToken, SearchParameterToken, Token };
