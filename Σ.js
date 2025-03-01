/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 17.10.2024
 */
function Σ(a, ab, bc, cd, de, ef) {
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
