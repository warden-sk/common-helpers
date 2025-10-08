/*
 * Copyright 2025 Marek Kobida
 */
import getByPath from './index.js';
const testRow = {
    _id: '384455ed-95a0-49d5-91e1-becc94c556c7',
    allergens: [1],
    name: 'Marek Kobida',
    style: {
        backgroundColor: '#f00',
    },
};
getByPath(testRow, 'style.backgroundColor'); // string (#f00)
