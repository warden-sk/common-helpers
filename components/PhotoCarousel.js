/*
 * Copyright 2025 Marek Kobida
 */
import Σ from '../Σ.js';
import createHtmlImageElement from './createHtmlImageElement.js';
import getPointerPosition from './getPointerPosition.js';
import PhotoCarouselAnimation from './PhotoCarouselAnimation.js';
class PhotoCarousel {
    animation;
    element;
    PhotoCarouselElement;
    PhotoCarouselRowElement;
    state = {
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
        photos: [],
        transitionDuration: 500,
        transitionTimingFunction: n => n * (2 - n),
    };
    WhereAmIElement1;
    WhereAmIElement2;
    // 🟢
    constructor({ id, photos }) {
        // ELEMENT(S)
        this.element = document.getElementById(id);
        if (this.element instanceof HTMLAnchorElement) {
            this.element.addEventListener('click', e => {
                // e.preventDefault();
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
                this.start();
            }
            else {
                this.stop();
            }
        });
        __TEST__1__.observe(this.element);
        // PHOTO(S) & ANIMATION
        this.state.photos = photos;
        this.animation = new PhotoCarouselAnimation(this);
    }
    // 🟢
    moveCurrent() {
        if (!this.state.isStarted || this.animation.hasId())
            return;
        this.animation.start({
            onTransitionEnd: () => { },
            translateX: -100,
        });
    }
    // 🟢
    moveLeft() {
        if (!this.state.isStarted || this.animation.hasId())
            return;
        this.animation.start({
            onTransitionEnd: () => {
                this.#setCurrentIndex(this.state.currentIndex - 1);
            },
            translateX: 0,
        });
    }
    // 🟢
    moveRight() {
        if (!this.state.isStarted || this.animation.hasId())
            return;
        this.animation.start({
            onTransitionEnd: () => {
                this.#setCurrentIndex(this.state.currentIndex + 1);
            },
            translateX: -200,
        });
    }
    onClick = (e) => {
        if (this.state.__TEST__) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    // 🟢
    onDown = (e) => {
        if (!this.state.isStarted)
            return;
        this.state.__TEST__ = false;
        this.animation.stop();
        this.PhotoCarouselElement.style.cursor = 'grabbing';
        this.state.isMouseDown = true;
        this.state.mouseDown = getPointerPosition(e);
        this.state.mouseDownTranslateX = this.state.currentTranslateX;
    };
    // 🟢
    onMove = (e) => {
        if (!this.state.isMouseDown)
            return;
        this.state.__TEST__ = true;
        e.stopPropagation(); // DOKONČIŤ
        this.state.mouseMove = getPointerPosition(e);
        // ANIMÁCIA
        Σ(this.state.mouseMove.x - this.state.mouseDown.x, n => (n * 100) / this.PhotoCarouselElement.clientWidth, n => n + this.state.mouseDownTranslateX, n => this.animation.start({
            translateX: n,
        }));
    };
    // 🟢
    onUp = (e) => {
        if (!this.state.isMouseDown)
            return;
        this.PhotoCarouselElement.style.cursor = 'grab';
        this.state.isMouseDown = false;
        this.state.mouseUp = getPointerPosition(e);
        // KĽÚČOVÉ
        if (this.state.mouseUp.x === this.state.mouseDown.x)
            return;
        // ANIMÁCIA
        const isLeft = this.state.mouseUp.x > this.state.mouseDown.x;
        const shouldMoveLeft = this.state.currentTranslateX > -100;
        if (isLeft) {
            shouldMoveLeft ? this.moveLeft() : this.moveCurrent();
        }
        else {
            shouldMoveLeft ? this.moveCurrent() : this.moveRight();
        }
    };
    // 🟢
    start() {
        // [1/2]
        if (this.state.isStarted)
            return;
        this.state.isStarted = true;
        // [2/2]
        this.#setCurrentIndex(0);
    }
    // 🟢
    stop() {
        // [1/2]
        if (!this.state.isStarted)
            return;
        this.state.isStarted = false;
        // [2/2]
        this.PhotoCarouselRowElement.replaceChildren();
        this.WhereAmIElement1.style.width = '0';
        this.WhereAmIElement2.replaceChildren();
    }
    // 🟢
    #getIndex(i) {
        return (i + this.state.photos.length) % this.state.photos.length;
    }
    // 🟢
    #getPhotoAtIndex(i) {
        const j = this.#getIndex(i);
        return {
            ...this.state.photos[j],
            index: j,
        };
    }
    // 🟢
    #setCurrentIndex(i) {
        // [1/3]
        this.state.currentIndex = this.#getIndex(i);
        // [2/3]
        this.PhotoCarouselRowElement.replaceChildren(createHtmlImageElement(this.#getPhotoAtIndex(this.state.currentIndex - 1)), createHtmlImageElement(this.#getPhotoAtIndex(this.state.currentIndex)), createHtmlImageElement(this.#getPhotoAtIndex(this.state.currentIndex + 1)));
        // [3/3]
        this.animation.start({
            translateX: -100,
        });
    }
}
export default PhotoCarousel;
