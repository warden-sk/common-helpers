/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 11.04.2025
 */
import isFunction from '../validation/isFunction.js';
import isNumber from '../validation/isNumber.js';
import isString from '../validation/isString.js';
class PhotoCarousel {
    PhotoCarouselElement;
    PhotoCarouselRowElement;
    WhereAmIElement1;
    WhereAmIElement2;
    element;
    photos;
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
    constructor({ id, photos }) {
        this.element = window.document.getElementById(id);
        this.PhotoCarouselElement = this.element.querySelector('.PhotoCarousel');
        this.PhotoCarouselRowElement = this.PhotoCarouselElement.querySelector('.PhotoCarouselRow');
        this.WhereAmIElement1 = this.element.querySelector('.WhereAmI1');
        this.WhereAmIElement2 = this.element.querySelector('.WhereAmI2');
        this.photos = photos;
        // CSS
        this.PhotoCarouselElement.style.cursor = 'grab';
        this.PhotoCarouselElement.style.overflow = 'hidden';
        this.PhotoCarouselElement.style.touchAction = 'pan-y';
    }
    moveCurrent() {
        if (!this.#state.isStarted || isNumber(this.#state.animationId))
            return;
        this.startAnimation(-100, () => { });
    }
    moveLeft() {
        if (!this.#state.isStarted || isNumber(this.#state.animationId))
            return;
        this.startAnimation(0, () => {
            this.#setCurrentIndex(this.#state.currentIndex - 1);
        });
    }
    moveRight() {
        if (!this.#state.isStarted || isNumber(this.#state.animationId))
            return;
        this.startAnimation(-200, () => {
            this.#setCurrentIndex(this.#state.currentIndex + 1);
        });
    }
    onDown = (e) => {
        if (!this.#state.isStarted)
            return;
        this.stopAnimation();
        this.PhotoCarouselElement.style.cursor = 'grabbing';
        this.#state.isMouseDown = true;
        this.#state.mouseDown = this.#getMouse(e);
        this.#state.mouseDownTranslateX = this.#state.currentTranslateX;
    };
    onMove = (e) => {
        if (!this.#state.isMouseDown)
            return;
        e.stopPropagation();
        this.#state.mouseMove = this.#getMouse(e);
        // DOKONČIŤ
        const $1 = this.#state.mouseMove.x - this.#state.mouseDown.x;
        const $2 = ($1 * 100) / this.PhotoCarouselElement.clientWidth;
        this.startAnimation(this.#state.mouseDownTranslateX + $2);
    };
    onUp = (e) => {
        if (!this.#state.isMouseDown)
            return;
        this.PhotoCarouselElement.style.cursor = 'grab';
        this.#state.isMouseDown = false;
        this.#state.mouseUp = this.#getMouse(e);
        // KĽÚČOVÉ
        if (this.#state.mouseUp.x === this.#state.mouseDown.x)
            return;
        const isLeft = this.#state.mouseUp.x > this.#state.mouseDown.x;
        const shouldMoveLeft = this.#state.currentTranslateX > -100;
        if (isLeft) {
            shouldMoveLeft ? this.moveLeft() : this.moveCurrent();
        }
        else {
            shouldMoveLeft ? this.moveCurrent() : this.moveRight();
        }
    };
    start() {
        if (this.#state.isStarted)
            return;
        this.#state.isStarted = true;
        this.#setCurrentIndex(0);
    }
    startAnimation(translateX, onTransitionEnd) {
        if (isFunction(onTransitionEnd)) {
            const startTime = performance.now();
            const { currentTranslateX, transitionDuration, transitionTimingFunction } = this.#state;
            // DOKONČIŤ
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
    stopAnimation() {
        if (isNumber(this.#state.animationId)) {
            window.cancelAnimationFrame(this.#state.animationId);
            this.#state.animationId = undefined;
        }
    }
    #createHtmlImageElement(i) {
        const j = this.#getIndex(i);
        const photo = this.photos[j];
        const img = window.document.createElement('img');
        img.addEventListener('load', function () {
            this.style.backgroundImage = '';
            this.style.backgroundSize = '';
        });
        img.draggable = false;
        img.src = photo.url;
        if (isString(photo.backgroundImage)) {
            img.style.backgroundImage = photo.backgroundImage;
            img.style.backgroundSize = 'cover';
        }
        if (isString(photo.brand)) {
            img.setAttribute('data-brand', photo.brand);
        }
        if (isNumber(photo.height)) {
            img.setAttribute('data-height', photo.height.toString());
            img.style.height = `${photo.height}px`;
        }
        img.setAttribute('data-index', j.toString());
        if (isNumber(photo.width)) {
            img.setAttribute('data-width', photo.width.toString());
            img.style.width = `${photo.width}px`;
        }
        return img;
    }
    #getIndex(i) {
        return (i + this.photos.length) % this.photos.length;
    }
    #getMouse(e) {
        if (e instanceof MouseEvent) {
            return {
                x: e.clientX,
                y: e.clientY,
            };
        }
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
    #setCurrentIndex(i) {
        this.#state.currentIndex = this.#getIndex(i);
        this.PhotoCarouselRowElement.replaceChildren(this.#createHtmlImageElement(this.#state.currentIndex - 1), this.#createHtmlImageElement(this.#state.currentIndex), this.#createHtmlImageElement(this.#state.currentIndex + 1));
        this.startAnimation(-100);
    }
    // DOKONČIŤ
    #setWhereAmI() {
        const photoCount = this.photos.length - 1;
        const $1 = (this.#state.currentTranslateX + 100) / photoCount;
        const $2 = (this.#state.currentIndex * 100) / photoCount;
        const $3 = Math.min(100, Math.max(0, $2 - $1));
        this.WhereAmIElement1.style.width = `${$3}%`;
        if (this.photos.length > 20)
            return;
        this.WhereAmIElement2.replaceChildren(...this.photos.map((photo, i) => {
            const div = window.document.createElement('div');
            div.setAttribute('data-index', i.toString());
            div.style.opacity = i === this.#state.currentIndex ? '1' : '0.5';
            return div;
        }));
    }
}
export default PhotoCarousel;
