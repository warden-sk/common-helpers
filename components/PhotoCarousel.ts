/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 10.03.2025
 */

type PhotoCarouselState = {
  currentIndex: number;
  currentTranslateX: number; // %
  isAnimating: boolean;
  isMouseDown: boolean;
  isStarted: boolean;
  mouseDownTranslateX: number;
  mouseDownX: number;
  mouseMoveX: number;
  mouseUpX: number;
  transitionDuration: number; // ms
  transitionTimingFunction: (n: number) => number;
};

class PhotoCarousel {
  element: HTMLDivElement;

  #photos: string[];

  #rowElement: HTMLDivElement;

  #state: PhotoCarouselState = {
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

  #whereAmIElement: HTMLDivElement;

  constructor({ id, photos }: { id: string; photos: string[] }) {
    const parentElement = window.document.getElementById(id)!;

    this.element = parentElement.querySelector('.PhotoCarousel')!;

    this.#photos = photos;
    this.#rowElement = this.element.querySelector('.PhotoCarouselRow')!;
    this.#whereAmIElement = parentElement.querySelector('.WhereAmI')!;

    /**
     * CSS
     */
    this.element.style.cursor = 'grab';
    this.element.style.overflow = 'hidden';
    this.element.style.touchAction = 'pan-y';
  }

  moveCurrent(): void {
    if (!this.#state.isStarted || this.#state.isAnimating) return;

    this.setTranslateX(-100, () => {});
  }

  moveLeft(): void {
    if (!this.#state.isStarted || this.#state.isAnimating) return;

    this.setTranslateX(0, () => {
      this.#setCurrentIndex(this.#state.currentIndex - 1);
    });
  }

  moveRight(): void {
    if (!this.#state.isStarted || this.#state.isAnimating) return;

    this.setTranslateX(-200, () => {
      this.#setCurrentIndex(this.#state.currentIndex + 1);
    });
  }

  onDown = (e: MouseEvent | TouchEvent): void => {
    if (!this.#state.isStarted) return;

    this.element.style.cursor = 'grabbing';

    this.#state.isAnimating = false;
    this.#state.isMouseDown = true;
    this.#state.mouseDownTranslateX = this.#state.currentTranslateX;
    this.#state.mouseDownX = this.#getMouseX(e);
  };

  onMove = (e: MouseEvent | TouchEvent): void => {
    if (!this.#state.isMouseDown) return;

    this.#state.mouseMoveX = this.#getMouseX(e);

    // DOKONČIŤ
    const $1 = this.#state.mouseMoveX - this.#state.mouseDownX;

    const $2 = ($1 * 100) / this.element.clientWidth;

    this.setTranslateX(this.#state.mouseDownTranslateX + $2);
  };

  onUp = (e: MouseEvent | TouchEvent): void => {
    if (!this.#state.isMouseDown) return;

    this.element.style.cursor = 'grab';

    this.#state.isMouseDown = false;
    this.#state.mouseUpX = this.#getMouseX(e);

    const isLeft = this.#state.mouseUpX > this.#state.mouseDownX;
    const shouldMoveLeft = this.#state.currentTranslateX > -100;

    if (isLeft) {
      shouldMoveLeft ? this.moveLeft() : this.moveCurrent();
    } else {
      shouldMoveLeft ? this.moveCurrent() : this.moveRight();
    }
  };

  setTranslateX(translateX: number, onTransitionEnd?: () => void): void {
    this.#state.isAnimating = true;

    if (onTransitionEnd) {
      const startTime = performance.now();

      const { currentTranslateX, transitionDuration, transitionTimingFunction } = this.#state;

      const animate = (currentTime: number): void => {
        if (!this.#state.isAnimating) return;

        // DOKONČIŤ
        const $1 = Math.min(1, (currentTime - startTime) / transitionDuration);

        this.#state.currentTranslateX =
          currentTranslateX + (translateX - currentTranslateX) * transitionTimingFunction($1);

        this.#rowElement.style.transform = `translateX(${this.#state.currentTranslateX}%)`;

        this.#setWhereAmI();

        $1 < 1 ? requestAnimationFrame(animate) : (onTransitionEnd(), (this.#state.isAnimating = false));
      };

      requestAnimationFrame(animate);
    } else {
      this.#state.currentTranslateX = translateX;
      this.#state.isAnimating = false;

      this.#rowElement.style.transform = `translateX(${this.#state.currentTranslateX}%)`;

      this.#setWhereAmI();
    }
  }

  start(): void {
    if (this.#state.isStarted) return;

    this.#state.isStarted = true;

    this.#setCurrentIndex(0);
  }

  #createHtmlImageElement(i: number): HTMLImageElement {
    const j = this.#getIndex(i);

    const img = window.document.createElement('img');

    img.draggable = false;
    img.src = this.#photos[j]!;

    img.setAttribute('data-index', j.toString());

    return img;
  }

  #getIndex(i: number): number {
    return (i + this.#photos.length) % this.#photos.length;
  }

  #getMouseX(e: MouseEvent | TouchEvent): number {
    if (e instanceof MouseEvent) {
      return e.clientX;
    }

    if (e instanceof TouchEvent) {
      return e.changedTouches[0]!.clientX;
    }

    return 0;
  }

  #setCurrentIndex(i: number): void {
    this.#state.currentIndex = this.#getIndex(i);

    this.#rowElement.replaceChildren(
      this.#createHtmlImageElement(this.#state.currentIndex - 1),
      this.#createHtmlImageElement(this.#state.currentIndex),
      this.#createHtmlImageElement(this.#state.currentIndex + 1),
    );

    this.setTranslateX(-100);
  }

  #setWhereAmI(): void {
    const photoCount = this.#photos.length - 1;

    // DOKONČIŤ
    const $1 = (this.#state.currentTranslateX + 100) / photoCount;

    const $2 = (this.#state.currentIndex * 100) / photoCount;

    const $3 = Math.min(100, Math.max(0, $2 - $1));

    this.#whereAmIElement.style.width = `${$3}%`;
  }
}

export type { PhotoCarouselState };

export default PhotoCarousel;
