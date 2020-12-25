export function objKeys<T>(obj: T): (keyof T)[] {
	return Object.keys(obj) as (keyof T)[];
}

export function zipObj<T extends string, J>(
	keys: T[],
	values: J[]
): { [key in T]: J } {
	const out: Partial<{ [key in T]: J }> = {};

	for (let i = 0; i < Math.min(keys.length, values.length); i++) {
		out[keys[i]] = values[i];
	}

	return out as { [key in T]: J };
}
