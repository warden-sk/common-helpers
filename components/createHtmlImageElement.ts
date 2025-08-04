/*
 * Copyright 2025 Marek Kobida
 * Last Updated: 04.08.2025
 */

import type { PhotoCarouselPhoto } from './types.js';

import isNumber from '../validation/isNumber.js';
import isString from '../validation/isString.js';

type I = PhotoCarouselPhoto;

type O = HTMLImageElement;

function createHtmlImageElement(photo: I): O {
  const img = window.document.createElement('img');

  //                           ↓ KĽÚČOVÉ
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

  if (isNumber(photo.index)) {
    img.setAttribute('data-index', photo.index.toString());
  }

  if (isNumber(photo.width)) {
    img.setAttribute('data-width', photo.width.toString());

    img.style.width = `${photo.width}px`;
  }

  return img;
}

export default createHtmlImageElement;
