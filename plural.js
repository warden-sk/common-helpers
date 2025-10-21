/*
 * Copyright 2025 Marek Kobida
 */
function plural(n, words) {
    let word;
    if (n === 1) {
        word = words[0];
    }
    else if (n > 1 && n < 5) {
        word = words[1];
    }
    else {
        word = words[2];
    }
    return `${new Intl.NumberFormat('sk-SK', {
        maximumFractionDigits: 0,
        roundingMode: 'floor',
    }).format(n)} ${word}`;
}
export default plural;
