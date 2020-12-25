export function addPoint(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
}
export function subPoint(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
}
export function mulPoint(a, b) {
    return [a[0] * b, a[1] * b];
}
export function divPoint(a, b) {
    return [a[0] / b, a[1] / b];
}
export function invPoint(a) {
    return [1 / a[0], 1 / a[1]];
}
export function equPoint(a, b) {
    return a[0] == b[0] && a[1] == b[1];
}
export function floorPoint(a) {
    return [Math.floor(a[0]), Math.floor(a[1])];
}
export function lenPoint(a) {
    return (a[0] ** 2 + a[1] ** 2) ** 0.5;
}
//# sourceMappingURL=points.js.map