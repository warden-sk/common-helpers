/*
 * Copyright 2026 Marek Kobida
 */

type HostToken = {
  readonly type: 'HOST';
  readonly value: string;
};

type NewUrlError = TokenizerError;

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

type TokenizerError =
  | InvalidCharacterError
  | InvalidHostError
  | InvalidParameterizedPathError
  | InvalidSchemeError
  | MissingCharacterError;

class InvalidCharacterError extends Error {
  readonly _tag = 'InvalidCharacterError';

  constructor(readonly character: string) {
    super(`The character "${character}" is not valid.`);
  }
}

class InvalidHostError extends Error {
  readonly _tag = 'InvalidHostError';

  constructor() {
    super('The host is not valid.');
  }
}

class InvalidParameterizedPathError extends Error {
  readonly _tag = 'InvalidParameterizedPathError';

  constructor() {
    super('The parameterized path is not valid.');
  }
}

class InvalidSchemeError extends Error {
  readonly _tag = 'InvalidSchemeError';

  constructor() {
    super('The scheme is not valid.');
  }
}

class MissingCharacterError extends Error {
  readonly _tag = 'MissingCharacterError';

  constructor(readonly character: string) {
    super(`The character "${character}" does not exist.`);
  }
}

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
  TokenizerError,
};

export {
  InvalidCharacterError,
  InvalidHostError,
  InvalidParameterizedPathError,
  InvalidSchemeError,
  MissingCharacterError,
};
