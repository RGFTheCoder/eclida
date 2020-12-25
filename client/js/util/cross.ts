import { Dict } from '../Interfaces/TS.js';
import { equPoint, Point, subPoint } from './points.js';

function tilesOnLine(startTilePos: Point, endTilePos: Point): Point[] {
	const startTile = startTilePos;
	const endTile = endTilePos;
	// http://playtechs.blogspot.com/2007/03/raytracing-on-grid.html
	let x0 = startTile[0];
	let y0 = startTile[1];
	let x1 = endTile[0];
	let y1 = endTile[1];

	let dx = Math.abs(x1 - x0);
	let dy = Math.abs(y1 - y0);
	let x = x0;
	let y = y0;
	let n = 1 + dx + dy;
	let x_inc = x1 > x0 ? 1 : -1;
	let y_inc = y1 > y0 ? 1 : -1;
	let error = dx - dy;
	dx *= 2;
	dy *= 2;

	const ret: Point[] = [];

	for (; n > 0; --n) {
		ret.push([x, y]);

		if (error > 0) {
			x += x_inc;
			error -= dy;
		} else if (error <= 0) {
			y += y_inc;
			error += dx;
		}
		//	else if (error == 0) {
		//		x += x_inc;
		//		y += y_inc;
		//		error -= dy;
		//		error += dx;
		//		--n;
		//	}
	}
	return ret;
}

const generatePathStringCache: Dict<string> = {};
export function generatePathString(
	startTilePos: Point,
	endTilePos: Point
): string {
	const id = subPoint(endTilePos, startTilePos).join(',');

	if (id in generatePathStringCache) return generatePathStringCache[id];

	const res = tilesOnLine(startTilePos, endTilePos)
		.map((x, i, a) => {
			if (i === a.length - 1) return '';

			const vel = subPoint(x, a[i + 1]);
			if (equPoint(vel, [0, -1])) return 'u';
			else if (equPoint(vel, [0, 1])) return 'd';
			else if (equPoint(vel, [-1, 0])) return 'l';
			else if (equPoint(vel, [1, 0])) return 'r';
		})
		.join('');

	generatePathStringCache[id] = res;

	return res;
}
