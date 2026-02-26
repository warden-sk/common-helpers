/*
 * Copyright 2026 Marek Kobida
 */

import type { TokenizerState } from './state.js';

import readCharacter from './readCharacter.js';

function readCharacters(state: TokenizerState, cursor: number, length: number): string {
  let characters = '';

  for (let i = cursor; i < length; i++) {
    const character = readCharacter(state, i);
    characters += character;
  }

  return characters;
}

export default readCharacters;
