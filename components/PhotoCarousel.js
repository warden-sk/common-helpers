/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.08.2025
 */
import isFunction from '../validation/isFunction.js';
import isNumber from '../validation/isNumber.js';
import Σ from '../Σ.js';
import createHtmlImageElement from './createHtmlImageElement.js';
import getPointerPosition from './getPointerPosition.js';
class PhotoCarousel {
    element;
    PhotoCarouselElement;
    PhotoCarouselRowElement;
    photos;
    WhereAmIElement1;
    WhereAmIElement2;
    #state = {
        currentIndex: 0,
        currentTranslateX: 0,
        isMouseDown: false,
        isStarted: false,
        mouseDown: {
            x: 0,
            y: 0,
        },
        mouseDownTranslateX: 0,
        mouseMove: {
            x: 0,
            y: 0,
        },
        mouseUp: {
            x: 0,
            y: 0,
        },
        transitionDuration: 500,
        transitionTimingFunction: n => n * (2 - n),
    };
    // ✅
    constructor({ id, photos }) {
        this.photos = photos;
        // ELEMENT(S)
        this.element = window.document.getElementById(id);
        if (this.element instanceof HTMLAnchorElement) {
            this.element.addEventListener('click', e => {
                e.preventDefault();
            });
            this.element.draggable = false;
        }
        this.PhotoCarouselElement = this.element.querySelector('.PhotoCarousel');
        this.PhotoCarouselRowElement = this.PhotoCarouselElement.querySelector('.PhotoCarouselRow');
        this.WhereAmIElement1 = this.element.querySelector('.WhereAmI1');
        this.WhereAmIElement2 = this.element.querySelector('.WhereAmI2');
        // CSS
        this.PhotoCarouselElement.style.cursor = 'grab';
        this.PhotoCarouselElement.style.overflow = 'hidden';
        this.PhotoCarouselElement.style.touchAction = 'pan-y';
        /**
         * DOKONČIŤ
         * Intersection Observer API
         */
        const __TEST__1__ = new IntersectionObserver(__TEST__2__ => {
            const __TEST__3__ = __TEST__2__[0];
            if (__TEST__3__.isIntersecting) {
                // this.start();
            }
            else {
                this.stop();
            }
        });
        __TEST__1__.observe(this.element);
    }
    // ✅
    moveCurrent() {
        if (!this.#state.isStarted || isNumber(this.#state.animationId))
            return;
        this.startAnimation(-100, () => { });
    }
    // ✅
    moveLeft() {
        if (!this.#state.isStarted || isNumber(this.#state.animationId))
            return;
        this.startAnimation(0, () => {
            this.#setCurrentIndex(this.#state.currentIndex - 1);
        });
    }
    // ✅
    moveRight() {
        if (!this.#state.isStarted || isNumber(this.#state.animationId))
            return;
        this.startAnimation(-200, () => {
            this.#setCurrentIndex(this.#state.currentIndex + 1);
        });
    }
    // ✅
    onDown = (e) => {
        if (!this.#state.isStarted)
            return;
        this.stopAnimation();
        this.PhotoCarouselElement.style.cursor = 'grabbing';
        this.#state.isMouseDown = true;
        this.#state.mouseDown = getPointerPosition(e);
        this.#state.mouseDownTranslateX = this.#state.currentTranslateX;
    };
    // ✅
    onMove = (e) => {
        if (!this.#state.isMouseDown)
            return;
        e.stopPropagation();
        this.#state.mouseMove = getPointerPosition(e);
        // ANIMÁCIA
        Σ(this.#state.mouseMove.x - this.#state.mouseDown.x, n => (n * 100) / this.PhotoCarouselElement.clientWidth, n => n + this.#state.mouseDownTranslateX, n => this.startAnimation(n));
    };
    // ✅
    onUp = (e) => {
        if (!this.#state.isMouseDown)
            return;
        this.PhotoCarouselElement.style.cursor = 'grab';
        this.#state.isMouseDown = false;
        this.#state.mouseUp = getPointerPosition(e);
        // KĽÚČOVÉ
        if (this.#state.mouseUp.x === this.#state.mouseDown.x)
            return;
        // ANIMÁCIA
        const isLeft = this.#state.mouseUp.x > this.#state.mouseDown.x;
        const shouldMoveLeft = this.#state.currentTranslateX > -100;
        if (isLeft) {
            shouldMoveLeft ? this.moveLeft() : this.moveCurrent();
        }
        else {
            shouldMoveLeft ? this.moveCurrent() : this.moveRight();
        }
    };
    // ✅
    start() {
        // [1/2]
        if (this.#state.isStarted)
            return;
        this.#state.isStarted = true;
        // [2/2]
        this.#setCurrentIndex(0);
    }
    // DOKONČIŤ
    startAnimation(translateX, onTransitionEnd) {
        if (isFunction(onTransitionEnd)) {
            const startTime = performance.now();
            const { currentTranslateX, transitionDuration, transitionTimingFunction } = this.#state;
            const $1 = (currentTime) => {
                const $2 = Math.min(1, (currentTime - startTime) / transitionDuration);
                this.#state.currentTranslateX =
                    currentTranslateX + (translateX - currentTranslateX) * transitionTimingFunction($2);
                this.PhotoCarouselRowElement.style.transform = `translateX(${this.#state.currentTranslateX}%)`;
                this.#setWhereAmI();
                if ($2 < 1) {
                    this.#state.animationId = window.requestAnimationFrame($1);
                }
                else {
                    this.stopAnimation();
                    onTransitionEnd();
                }
            };
            this.#state.animationId = window.requestAnimationFrame($1);
        }
        else {
            this.stopAnimation();
            this.#state.currentTranslateX = translateX;
            this.PhotoCarouselRowElement.style.transform = `translateX(${this.#state.currentTranslateX}%)`;
            this.#setWhereAmI();
        }
    }
    // ✅
    stop() {
        // [1/2]
        if (!this.#state.isStarted)
            return;
        this.#state.isStarted = false;
        // [2/2]
        this.PhotoCarouselRowElement.replaceChildren();
        this.WhereAmIElement1.style.width = '0';
        this.WhereAmIElement2.replaceChildren();
    }
    // ✅
    stopAnimation() {
        if (!isNumber(this.#state.animationId))
            return;
        window.cancelAnimationFrame(this.#state.animationId);
        this.#state.animationId = undefined;
    }
    // ✅
    #getIndex(i) {
        return (i + this.photos.length) % this.photos.length;
    }
    // ✅
    #getPhotoAtIndex(i) {
        const j = this.#getIndex(i);
        return { ...this.photos[j], index: j };
    }
    // ✅
    #setCurrentIndex(i) {
        // [1/3]
        this.#state.currentIndex = this.#getIndex(i);
        // [2/3]
        this.PhotoCarouselRowElement.replaceChildren(createHtmlImageElement(this.#getPhotoAtIndex(this.#state.currentIndex - 1)), createHtmlImageElement(this.#getPhotoAtIndex(this.#state.currentIndex)), createHtmlImageElement(this.#getPhotoAtIndex(this.#state.currentIndex + 1)));
        // [3/3]
        this.startAnimation(-100);
    }
    // DOKONČIŤ
    #setWhereAmI() {
        const photoCount = this.photos.length - 1;
        const $1 = (this.#state.currentTranslateX + 100) / photoCount;
        const $2 = (this.#state.currentIndex * 100) / photoCount;
        const $3 = Math.min(100, Math.max(0, $2 - $1));
        this.WhereAmIElement1.style.width = `${$3}%`;
        this.WhereAmIElement2.replaceChildren(...this.photos.map((photo, i) => {
            const div = window.document.createElement('div');
            div.setAttribute('data-index', i.toString());
            div.style.opacity = i === this.#state.currentIndex ? '1' : '0.5';
            return div;
        }));
    }
}
export default PhotoCarousel;
