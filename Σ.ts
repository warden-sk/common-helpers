/*
 * Copyright 2023 Marek Kobida
 */

function Σ<A>(a: A): A;
function Σ<A, B>(a: A, ab: (a: A) => B): B;
function Σ<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
function Σ<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
function Σ<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E;
function Σ<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
): F;
function Σ(a: unknown, ab?: Function, bc?: Function, cd?: Function, de?: Function, ef?: Function): unknown {
  if (ab && bc && cd && de && ef) {
    return ef(de(cd(bc(ab(a)))));
  }

  if (ab && bc && cd && de) {
    return de(cd(bc(ab(a))));
  }

  if (ab && bc && cd) {
    return cd(bc(ab(a)));
  }

  if (ab && bc) {
    return bc(ab(a));
  }

  if (ab) {
    return ab(a);
  }

  return a;
}

export default Σ;
