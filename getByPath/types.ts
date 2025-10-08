/*
 * Copyright 2025 Marek Kobida
 */

type ArrayKey = number;

//                     ↓ KĽÚČOVÉ
type IsTuple<T extends readonly unknown[]> = number extends T['length'] ? false : true;

type Path<T> =
  //        ↓ KĽÚČOVÉ
  T extends readonly (infer V)[] ?
    IsTuple<T> extends true ?
      {
        [K in TupleKeys<T>]-?: PathConcatenate<K & string, T[K]>;
      }[TupleKeys<T>]
    : PathConcatenate<ArrayKey, V>
  : {
      [K in keyof T]-?: PathConcatenate<K & string, T[K]>;
    }[keyof T];

type PathConcatenate<TKey extends number | string, TValue> =
  TValue extends Primitive ? `${TKey}` : `${TKey}.${Path<TValue>}` | `${TKey}`;

// DOKONČIŤ
type PathValue<T, TPath extends Path<T>> =
  // DISTRIBUTIVE CONDITIONAL TYPES
  T extends unknown ?
    TPath extends `${infer K}.${infer R}` ?
      K extends keyof T ?
        R extends Path<T[K]> ?
          undefined extends T[K] ?
            PathValue<T[K], R> | undefined
          : PathValue<T[K], R>
        : never
      : K extends `${ArrayKey}` ?
        //        ↓ KĽÚČOVÉ
        T extends readonly (infer V)[] ?
          PathValue<V, Path<V> & R>
        : never
      : never
    : TPath extends keyof T ? T[TPath]
    : TPath extends `${ArrayKey}` ?
      //        ↓ KĽÚČOVÉ
      T extends readonly (infer V)[] ?
        V
      : never
    : never
  : never;

// https://developer.mozilla.org/en-US/docs/Glossary/Primitive
type Primitive = bigint | boolean | null | number | string | symbol | undefined;

//                       ↓ KĽÚČOVÉ
type TupleKeys<T extends readonly unknown[]> = Extract<keyof T, `${number}`>;

//                          ↓ KĽÚČOVÉ
// type TupleKeys<T extends readonly unknown[]> = Exclude<keyof T, keyof unknown[]>;

export type { Path, PathValue };
