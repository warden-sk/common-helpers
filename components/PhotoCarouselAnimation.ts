/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 05.08.2025
 */

import type PhotoCarousel from './PhotoCarousel.js';
import type { PhotoCarouselState } from './types.js';

import isFunction from '../validation/isFunction.js';
import isNumber from '../validation/isNumber.js';

class PhotoCarouselAnimation {
  readonly PhotoCarouselRowElement: HTMLDivElement;

  state: PhotoCarouselState;

  readonly WhereAmIElement1: HTMLDivElement;

  readonly WhereAmIElement2: HTMLDivElement;

  // ✅
  constructor($: PhotoCarousel) {
    this.PhotoCarouselRowElement = $.PhotoCarouselRowElement;

    this.state = $.state;

    this.WhereAmIElement1 = $.WhereAmIElement1;

    this.WhereAmIElement2 = $.WhereAmIElement2;
  }

  // DOKONČIŤ
  $test({ translateX }: { translateX: number }): void {
    this.state.currentTranslateX = translateX;

    this.PhotoCarouselRowElement.style.transform = `translateX(${this.state.currentTranslateX}%)`;

    const photoCount = this.state.photos.length - 1;

    const $1 = (this.state.currentTranslateX + 100) / photoCount;

    const $2 = (this.state.currentIndex * 100) / photoCount;

    const $3 = Math.min(100, Math.max(0, $2 - $1));

    this.WhereAmIElement1.style.width = `${$3}%`;

    this.WhereAmIElement2.replaceChildren(
      ...this.state.photos.map((photo, i) => {
        const div = window.document.createElement('div');

        div.style.opacity = i === this.state.currentIndex ? '1' : '0.5';

        return div;
      }),
    );
  }

  // ✅
  start({ onTransitionEnd, translateX }: { onTransitionEnd?: () => void; translateX: number }): void {
    if (isFunction(onTransitionEnd)) {
      const { currentTranslateX, transitionDuration, transitionTimingFunction } = this.state;

      const startTime = window.performance.now();

      const $1 = (currentTime: number): void => {
        // RELATÍVNY ČAS OD ZAČIATKU ANIMÁCIE
        const t = Math.max(0, Math.min(1, (currentTime - startTime) / transitionDuration));

        // LINEÁRNA INTERPOLÁCIA
        const newTranslateX = currentTranslateX + (translateX - currentTranslateX) * transitionTimingFunction(t);

        this.$test({ translateX: newTranslateX });

        if (t < 1) {
          this.state.animationId = window.requestAnimationFrame($1);
        } else {
          this.stop();

          onTransitionEnd();
        }
      };

      this.state.animationId = window.requestAnimationFrame($1);
    } else {
      this.stop();

      this.$test({ translateX });
    }
  }

  // ✅
  stop(): void {
    if (!isNumber(this.state.animationId)) return;

    window.cancelAnimationFrame(this.state.animationId);

    this.state.animationId = undefined;
  }
}

export default PhotoCarouselAnimation;
