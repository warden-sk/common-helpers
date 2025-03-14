/*
 * Copyright 2025 Marek Kobida
 */

function plural(n: number, words: [string, string, string]): string {
  let word: string;

  if (n === 1) {
    word = words[0];
  } else if (n > 1 && n < 5) {
    word = words[1];
  } else {
    word = words[2];
  }

  return `${n} ${word}`;
}

export default plural;
