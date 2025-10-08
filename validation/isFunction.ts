/*
 * Copyright 2025 Marek Kobida
 */

function isFunction(input: any): input is Function {
  return (
    Object.prototype.toString.call(input) === '[object AsyncFunction]' ||
    Object.prototype.toString.call(input) === '[object Function]'
  );
}

export default isFunction;
