import { Tile } from '../class/Tile.js';
import { range } from '../util/loop.js';
import { createNoise } from '../util/noise.js';
import { randomToken } from '../util/random.js';
export function complexGenerate(definition, size = [10, 10]) {
    const tok = randomToken();
    const noises = {};
    for (const id in definition.noiseLayers)
        noises[id] = createNoise();
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
//# sourceMappingURL=complex.js.map