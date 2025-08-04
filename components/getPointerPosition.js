/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.08.2025
 */
function getPointerPosition(e) {
    if (e instanceof MouseEvent) {
        return {
            x: e.clientX,
            y: e.clientY,
        };
    }
    /**
     * DOKONČIŤ
     * 1. changedTouches
     * 2. targetTouches
     * 3. touches
     */
    if (e instanceof TouchEvent) {
        return {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };
    }
    return {
        x: 0,
        y: 0,
    };
}
export default getPointerPosition;
