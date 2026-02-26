/*
 * Copyright 2026 Marek Kobida
 */

type HostToken = {
  readonly type: 'HOST';
  readonly value: string;
};

type NewUrlError = Error;

type NewUrlState = {
  readonly host: string;
  readonly input: string;
  readonly path: string;
  readonly searchParameters: Readonly<Record<string, string>>;
  readonly tokens: readonly Token[];
};

type ParameterizedPathToken = {
  //                  ↓ je voliteľný?
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

type TestResult = {
  readonly matches: boolean;
  readonly parameters: Readonly<Record<string, string>>;
  readonly testTokens: readonly Token[];
};

type Token = HostToken | ParameterizedPathToken | PathToken | PortToken | SchemeToken | SearchParameterToken;

export type {
  HostToken,
  NewUrlError,
  NewUrlState,
  ParameterizedPathToken,
  PathToken,
  PortToken,
  SchemeToken,
  SearchParameterToken,
  TestResult,
  Token,
};
