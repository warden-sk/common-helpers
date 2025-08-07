/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 05.08.2025
 */

type PhotoCarouselPhoto = {
  backgroundImage?: string;
  brand?: string; // FIVE STAR LIVING
  height?: number;
  index?: number;
  url: string; // KĽÚČOVÉ
  width?: number;
};

/**
 * DOKONČIŤ
 * `mouse` → `pointer`
 */
type PhotoCarouselState = {
  animationId?: number;
  currentIndex: number;
  currentTranslateX: number; // %
  isMouseDown: boolean;
  isStarted: boolean;
  mouseDown: {
    x: number;
    y: number;
  };
  mouseDownTranslateX: number;
  mouseMove: {
    x: number;
    y: number;
  };
  mouseUp: {
    x: number;
    y: number;
  };
  photos: PhotoCarouselPhoto[];
  transitionDuration: number; // ms
  transitionTimingFunction: (n: number) => number;
};

export type { PhotoCarouselPhoto, PhotoCarouselState };
