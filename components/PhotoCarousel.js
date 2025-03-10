/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 10.03.2025
 */
class PhotoCarousel {
    element;
    photos;
    rowElement;
    state = {
        currentIndex: 0,
        currentTranslateX: 0,
        isAnimating: false,
        isMouseDown: false,
        isStarted: false,
        mouseDownTranslateX: 0,
        mouseDownX: 0,
        mouseMoveX: 0,
        mouseUpX: 0,
        transitionDuration: 500,
        transitionTimingFunction: n => n * (2 - n),
    };
    whereAmIElement;
    constructor({ id, photos }) {
        const parentElement = window.document.getElementById(id);
        this.element = parentElement.querySelector('.PhotoCarousel');
        this.photos = photos;
        this.rowElement = this.element.querySelector('.PhotoCarouselRow');
        this.whereAmIElement = parentElement.querySelector('.WhereAmI');
        /**
         * CSS
         */
        this.element.style.cursor = 'grab';
        this.element.style.overflow = 'hidden';
        this.element.style.touchAction = 'pan-y';
        this.rowElement.style.display = 'flex';
        this.rowElement.style.height = '100%';
    }
    moveCurrent() {
        if (!this.state.isStarted || this.state.isAnimating)
            return;
        this.setTranslateX(-100, () => { });
    }
    moveLeft() {
        if (!this.state.isStarted || this.state.isAnimating)
            return;
        this.setTranslateX(0, () => {
            this.#setCurrentIndex(this.state.currentIndex - 1);
        });
    }
    moveRight() {
        if (!this.state.isStarted || this.state.isAnimating)
            return;
        this.setTranslateX(-200, () => {
            this.#setCurrentIndex(this.state.currentIndex + 1);
        });
    }
    onDown = (e) => {
        if (!this.state.isStarted)
            return;
        this.element.style.cursor = 'grabbing';
        this.state.isAnimating = false;
        this.state.isMouseDown = true;
        this.state.mouseDownTranslateX = this.state.currentTranslateX;
        this.state.mouseDownX = this.#getMouseX(e);
    };
    onMove = (e) => {
        if (!this.state.isMouseDown)
            return;
        this.state.mouseMoveX = this.#getMouseX(e);
        const $1 = this.state.mouseMoveX - this.state.mouseDownX;
        const $2 = ($1 * 100) / this.element.clientWidth;
        this.setTranslateX(this.state.mouseDownTranslateX + $2);
    };
    onUp = (e) => {
        if (!this.state.isMouseDown)
            return;
        this.element.style.cursor = 'grab';
        this.state.isMouseDown = false;
        this.state.mouseUpX = this.#getMouseX(e);
        const isLeft = this.state.mouseUpX > this.state.mouseDownX;
        const shouldMoveLeft = this.state.currentTranslateX > -100;
        if (isLeft) {
            shouldMoveLeft ? this.moveLeft() : this.moveCurrent();
        }
        else {
            shouldMoveLeft ? this.moveCurrent() : this.moveRight();
        }
    };
    setTranslateX(translateX, onTransitionEnd) {
        this.state.isAnimating = true;
        if (onTransitionEnd) {
            const startTime = performance.now();
            const { currentTranslateX, transitionDuration, transitionTimingFunction } = this.state;
            const animate = (currentTime) => {
                if (!this.state.isAnimating)
                    return;
                const λ = Math.min(1, (currentTime - startTime) / transitionDuration);
                this.state.currentTranslateX =
                    currentTranslateX + (translateX - currentTranslateX) * transitionTimingFunction(λ);
                this.rowElement.style.transform = `translateX(${this.state.currentTranslateX}%)`;
                this.setWhereAmI();
                λ < 1 ? requestAnimationFrame(animate) : (onTransitionEnd(), (this.state.isAnimating = false));
            };
            requestAnimationFrame(animate);
        }
        else {
            this.state.currentTranslateX = translateX;
            this.state.isAnimating = false;
            this.rowElement.style.transform = `translateX(${this.state.currentTranslateX}%)`;
            this.setWhereAmI();
        }
    }
    setWhereAmI() {
        const photoCount = this.photos.length - 1;
        const $1 = (this.state.currentTranslateX + 100) / photoCount;
        const $2 = (this.state.currentIndex * 100) / photoCount;
        const $3 = Math.min(100, Math.max(0, $2 - $1));
        this.whereAmIElement.style.width = `${$3}%`;
    }
    start() {
        if (this.state.isStarted)
            return;
        this.state.isStarted = true;
        this.#setCurrentIndex(0);
    }
    #createHtmlImageElement(i) {
        const j = this.#getIndex(i);
        const img = window.document.createElement('img');
        img.draggable = false;
        img.src = this.photos[j];
        img.style.minWidth = '100%';
        img.setAttribute('data-index', j.toString());
        return img;
    }
    #getIndex(i) {
        return (i + this.photos.length) % this.photos.length;
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
        this.state.currentIndex = this.#getIndex(i);
        this.rowElement.replaceChildren(this.#createHtmlImageElement(this.state.currentIndex - 1), this.#createHtmlImageElement(this.state.currentIndex), this.#createHtmlImageElement(this.state.currentIndex + 1));
        this.setTranslateX(-100);
    }
}
export default PhotoCarousel;
