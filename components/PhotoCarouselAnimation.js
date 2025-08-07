/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 07.08.2025
 */
import isFunction from '../validation/isFunction.js';
import isNumber from '../validation/isNumber.js';
class PhotoCarouselAnimation {
    PhotoCarouselRowElement;
    state;
    WhereAmIElement1;
    WhereAmIElement2;
    // 🟢
    constructor($) {
        this.PhotoCarouselRowElement = $.PhotoCarouselRowElement;
        this.state = $.state;
        this.WhereAmIElement1 = $.WhereAmIElement1;
        this.WhereAmIElement2 = $.WhereAmIElement2;
    }
    // DOKONČIŤ
    $test({ translateX }) {
        this.state.currentTranslateX = translateX;
        this.PhotoCarouselRowElement.style.transform = `translateX(${this.state.currentTranslateX}%)`;
        const photoCount = this.state.photos.length - 1;
        const $1 = (this.state.currentTranslateX + 100) / photoCount;
        const $2 = (this.state.currentIndex * 100) / photoCount;
        const $3 = Math.min(100, Math.max(0, $2 - $1));
        this.WhereAmIElement1.style.width = `${$3}%`;
        if (this.state.photos.length > 20)
            return;
        this.WhereAmIElement2.replaceChildren(...this.state.photos.map((photo, i) => {
            const div = window.document.createElement('div');
            div.style.opacity = i === this.state.currentIndex ? '1' : '0.5';
            return div;
        }));
    }
    // 🟢
    start({ onTransitionEnd, translateX }) {
        if (isFunction(onTransitionEnd)) {
            const { currentTranslateX, transitionDuration, transitionTimingFunction } = this.state;
            const startTime = performance.now();
            const $1 = (currentTime) => {
                // RELATÍVNY ČAS OD ZAČIATKU ANIMÁCIE
                const t = Math.max(0, Math.min(1, (currentTime - startTime) / transitionDuration));
                // LINEÁRNA INTERPOLÁCIA
                const newTranslateX = currentTranslateX + (translateX - currentTranslateX) * transitionTimingFunction(t);
                this.$test({
                    translateX: newTranslateX,
                });
                if (t < 1) {
                    this.state.animationId = requestAnimationFrame($1);
                }
                else {
                    this.stop();
                    onTransitionEnd();
                }
            };
            this.state.animationId = requestAnimationFrame($1);
        }
        else {
            this.stop();
            this.$test({
                translateX,
            });
        }
    }
    // 🟢
    stop() {
        if (!isNumber(this.state.animationId))
            return;
        cancelAnimationFrame(this.state.animationId);
        this.state.animationId = undefined;
    }
}
export default PhotoCarouselAnimation;
