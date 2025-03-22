/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 22.03.2025
 */
import isNumber from '../validation/isNumber.js';
import isString from '../validation/isString.js';
class PhotoCarousel {
    PhotoCarouselElement;
    PhotoCarouselRowElement;
    WhereAmIElement;
    element;
    #photos;
    #state = {
        currentIndex: 0,
        currentTranslateX: 0,
        isMouseDown: false,
        isStarted: false,
        mouseDownTranslateX: 0,
        mouseDownX: 0,
        mouseMoveX: 0,
        mouseUpX: 0,
        transitionDuration: 500,
        transitionTimingFunction: n => n * (2 - n),
    };
    constructor({ id, photos }) {
        this.element = window.document.getElementById(id);
        this.PhotoCarouselElement = this.element.querySelector('.PhotoCarousel');
        this.PhotoCarouselRowElement = this.PhotoCarouselElement.querySelector('.PhotoCarouselRow');
        this.WhereAmIElement = this.element.querySelector('.WhereAmI');
        this.#photos = photos;
        /**
         * CSS
         */
        this.PhotoCarouselElement.style.cursor = 'grab';
        this.PhotoCarouselElement.style.overflow = 'hidden';
        this.PhotoCarouselElement.style.touchAction = 'pan-y';
    }
    moveCurrent() {
        if (!this.#state.isStarted || isNumber(this.#state.animationId))
            return;
        this.setTranslateX(-100, () => { });
    }
    moveLeft() {
        if (!this.#state.isStarted || isNumber(this.#state.animationId))
            return;
        this.setTranslateX(0, () => {
            this.#setCurrentIndex(this.#state.currentIndex - 1);
        });
    }
    moveRight() {
        if (!this.#state.isStarted || isNumber(this.#state.animationId))
            return;
        this.setTranslateX(-200, () => {
            this.#setCurrentIndex(this.#state.currentIndex + 1);
        });
    }
    onDown = (e) => {
        if (!this.#state.isStarted)
            return;
        this.stopAnimation();
        // DOKONČIŤ
        if (this.element instanceof HTMLAnchorElement) {
            const onClick = (e) => {
                if (this.#state.mouseDownX !== this.#state.mouseUpX) {
                    e.preventDefault();
                }
                this.element.removeEventListener('click', onClick, true);
            };
            this.element.addEventListener('click', onClick, true);
        }
        this.PhotoCarouselElement.style.cursor = 'grabbing';
        this.#state.isMouseDown = true;
        this.#state.mouseDownTranslateX = this.#state.currentTranslateX;
        this.#state.mouseDownX = this.#getMouseX(e);
    };
    onMove = (e) => {
        if (!this.#state.isMouseDown)
            return;
        this.#state.mouseMoveX = this.#getMouseX(e);
        // DOKONČIŤ
        const $1 = this.#state.mouseMoveX - this.#state.mouseDownX;
        const $2 = ($1 * 100) / this.PhotoCarouselElement.clientWidth;
        this.setTranslateX(this.#state.mouseDownTranslateX + $2);
    };
    onUp = (e) => {
        if (!this.#state.isMouseDown)
            return;
        this.PhotoCarouselElement.style.cursor = 'grab';
        this.#state.isMouseDown = false;
        this.#state.mouseUpX = this.#getMouseX(e);
        const isLeft = this.#state.mouseUpX > this.#state.mouseDownX;
        const shouldMoveLeft = this.#state.currentTranslateX > -100;
        if (isLeft) {
            shouldMoveLeft ? this.moveLeft() : this.moveCurrent();
        }
        else {
            shouldMoveLeft ? this.moveCurrent() : this.moveRight();
        }
    };
    setTranslateX(translateX, onTransitionEnd) {
        if (onTransitionEnd) {
            const startTime = performance.now();
            const { currentTranslateX, transitionDuration, transitionTimingFunction } = this.#state;
            const animate = (currentTime) => {
                // DOKONČIŤ
                const $1 = Math.min(1, (currentTime - startTime) / transitionDuration);
                this.#state.currentTranslateX =
                    currentTranslateX + (translateX - currentTranslateX) * transitionTimingFunction($1);
                this.PhotoCarouselRowElement.style.transform = `translateX(${this.#state.currentTranslateX}%)`;
                this.#setWhereAmI();
                if ($1 < 1) {
                    this.#state.animationId = window.requestAnimationFrame(animate);
                }
                else {
                    this.stopAnimation();
                    onTransitionEnd();
                }
            };
            this.#state.animationId = window.requestAnimationFrame(animate);
        }
        else {
            this.stopAnimation();
            this.#state.currentTranslateX = translateX;
            this.PhotoCarouselRowElement.style.transform = `translateX(${this.#state.currentTranslateX}%)`;
            this.#setWhereAmI();
        }
    }
    start() {
        if (this.#state.isStarted)
            return;
        this.#state.isStarted = true;
        this.#setCurrentIndex(0);
    }
    stopAnimation() {
        if (isNumber(this.#state.animationId)) {
            window.cancelAnimationFrame(this.#state.animationId);
        }
        this.#state.animationId = undefined;
    }
    #createHtmlImageElement(i) {
        const j = this.#getIndex(i);
        const photo = this.#photos[j];
        const img = window.document.createElement('img');
        img.draggable = false;
        img.src = photo.url;
        if (isString(photo.brand)) {
            img.setAttribute('data-brand', photo.brand);
        }
        if (isNumber(photo.height)) {
            img.setAttribute('data-height', photo.height.toString());
        }
        img.setAttribute('data-index', j.toString());
        if (isNumber(photo.width)) {
            img.setAttribute('data-width', photo.width.toString());
        }
        return img;
    }
    #getIndex(i) {
        return (i + this.#photos.length) % this.#photos.length;
    }
    #getMouseX(e) {
        if (e instanceof MouseEvent) {
            return e.clientX;
        }
        if (e instanceof TouchEvent) {
            return e.changedTouches[0].clientX;
        }
        return 0;
    }
    #setCurrentIndex(i) {
        this.#state.currentIndex = this.#getIndex(i);
        this.PhotoCarouselRowElement.replaceChildren(this.#createHtmlImageElement(this.#state.currentIndex - 1), this.#createHtmlImageElement(this.#state.currentIndex), this.#createHtmlImageElement(this.#state.currentIndex + 1));
        this.setTranslateX(-100);
    }
    #setWhereAmI() {
        const photoCount = this.#photos.length - 1;
        // DOKONČIŤ
        const $1 = (this.#state.currentTranslateX + 100) / photoCount;
        const $2 = (this.#state.currentIndex * 100) / photoCount;
        const $3 = Math.min(100, Math.max(0, $2 - $1));
        this.WhereAmIElement.style.width = `${$3}%`;
    }
}
export default PhotoCarousel;
