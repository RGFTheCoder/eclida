import { loop } from '../util/loop.js';
import { randomToken } from '../util/random.js';
export function generate(type, size = 4) {
    const grid = [];
    const r = randomToken(16);
    for (let dx = 0; dx < size; dx++) {
        grid[dx] = [];
        for (let dy = 0; dy < size; dy++) {
            grid[dx][dy] = new type(`x${dx}y${dy}r${r}`);
        }
    }
    for (let dx = 0; dx < size; dx++) {
        for (let dy = 0; dy < size; dy++) {
            grid[dx][dy].u = grid[loop(dx + 0, 0, size)][loop(dy - 1, 0, size)];
            grid[dx][dy].d = grid[loop(dx + 0, 0, size)][loop(dy + 1, 0, size)];
            grid[dx][dy].l = grid[loop(dx - 1, 0, size)][loop(dy + 0, 0, size)];
            grid[dx][dy].r = grid[loop(dx + 1, 0, size)][loop(dy + 0, 0, size)];
        }
    }
    return grid[0][0];
}
//# sourceMappingURL=repeating.js.map