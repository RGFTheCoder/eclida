import { Tile } from '../class/Tile.js';
import { Returns, SDict } from '../Interfaces/TS.js';
import { range } from '../util/loop.js';
import { createNoise } from '../util/noise.js';
import { Point } from '../util/points.js';
import { randomToken } from '../util/random.js';
import { Grassland } from './biomes/grassland.js';
import { IGenerator } from './biomes/IGenerator.js';

type complexDefiner<T extends string> = {
	noiseLayers: {
		[key in T]: null;
	};
	biomes: {
		generator: IGenerator;
		noiseLocation: {
			[key in T]: number;
		};
	}[];
};

export function complexGenerate<T extends string>(
	definition: complexDefiner<T>,
	size: Point = [10, 10]
) {
	const tok = randomToken();
	const noises: Partial<SDict<T, Returns<typeof createNoise>>> = {};

	for (const id in definition.noiseLayers) noises[id] = createNoise();

	// Create grid
	for (const x of range(-size[0], size[0], 1, true)) {
		for (const y of range(-size[1], size[1], 1, true)) {
		}
	}

	// Connect grid
	for (const x of range(-size[0], size[0], 1, true)) {
		for (const y of range(-size[1], size[1], 1, true)) {
		}
	}

	return new Tile();
}
