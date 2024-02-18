export function fade (p) {
    let p1 = p * (1 - p);
    let p2 = p1 * (1 + -1.4168 * p1);
    return (p2 + p) ** 2
}