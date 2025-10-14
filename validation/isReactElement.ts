/*
 * Copyright 2025 Marek Kobida
 */

import React from 'react';

function isReactElement(input: unknown): input is React.ReactElement {
  return React.isValidElement(input);
}

export default isReactElement;
