/*
 * Copyright 2025 Marek Kobida
 */

// 🟢
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
