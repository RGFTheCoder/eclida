export type Point = [x: number, y: number];
export type Area = [tl: Point, br: Point];

export function addPoint(a: Point, b: Point): Point {
	return [a[0] + b[0], a[1] + b[1]];
}
export function subPoint(a: Point, b: Point): Point {
	return [a[0] - b[0], a[1] - b[1]];
}
export function mulPoint(a: Point, b: number): Point {
	return [a[0] * b, a[1] * b];
}
export function divPoint(a: Point, b: number): Point {
	return [a[0] / b, a[1] / b];
}
export function invPoint(a: Point): Point {
	return [1 / a[0], 1 / a[1]];
}
export function equPoint(a: Point, b: Point): boolean {
	return a[0] == b[0] && a[1] == b[1];
}
export function floorPoint(a: Point): Point {
	return [Math.floor(a[0]), Math.floor(a[1])];
}

export function lenPoint(a: Point): number {
	return (a[0] ** 2 + a[1] ** 2) ** 0.5;
}
