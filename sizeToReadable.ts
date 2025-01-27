/*
 * Copyright 2025 Marek Kobida
 */

//                      ↓ IEC
const units: string[] = ['bajtov', 'kB', 'MB', 'GB', 'TB'];

function sizeToReadable(size: number): string {
  let unitIndex = 0;

  while (size >= 1000 && unitIndex < units.length - 1) {
    size /= 1000;

    unitIndex++;
  }

  return `${size.toFixed(3)} ${units[unitIndex]}`;
}

export default sizeToReadable;
