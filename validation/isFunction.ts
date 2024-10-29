/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 15.07.2024
 */

function isFunction(input: unknown): input is Function {
  return (
    Object.prototype.toString.call(input) === '[object AsyncFunction]' ||
    Object.prototype.toString.call(input) === '[object Function]'
  );
}

export default isFunction;
