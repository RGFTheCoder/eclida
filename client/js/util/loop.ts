export function loop(x: number, min = 0, max = 1) {
	while (x < min) x += max - min;

	return ((x - min) % (max - min)) + min;
}

/** Range from 0 (inclusive) to {end} (exclusive) in increments of 1 */
export function range(end: number): Generator<number, void, void>;
/** Range from {start} (inclusive) to {end} (exclusive) in increments of 1 */
export function range(
	start: number,
	end: number
): Generator<number, void, void>;
/** Range from {start} (inclusive) to {end} (exclusive) in increments of {increment} */
export function range(
	start: number,
	end: number,
	increment: number
): Generator<number, void, void>;
/** Range from {start} (inclusive) to {end} ({inclusive}?inclusive:exclusive) in increments of {increment} */
export function range(
	start: number,
	end: number,
	increment: number,
	inclusive: boolean
): Generator<number, void, void>;
export function* range(
	startend: number,
	end?: number,
	increment = 1,
	inclusive = false
): Generator<number, void, void> {
	const adjustedRange = {
		start: end == null ? 0 : startend,
		end: end == null ? startend : end,
		increment,
		inclusive,
	};

	if (adjustedRange.inclusive) {
		for (
			let i = adjustedRange.start;
			i <= adjustedRange.end;
			i += adjustedRange.increment
		)
			yield i;
	} else {
		for (
			let i = adjustedRange.start;
			i < adjustedRange.end;
			i += adjustedRange.increment
		)
			yield i;
	}
}
