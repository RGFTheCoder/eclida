import { register } from '../../registry/registry.js';
import { Tile } from '../../class/Tile.js';
import { weightedRandom } from '../../util/random.js';
const lMin = 15;
const lMax = 25;
const sMin = 45;
const sMax = 60;
export class Planks extends Tile {
    constructor() {
        super(...arguments);
        this.color1 = `hsl(25, ${weightedRandom(sMin, sMax)}%, ${weightedRandom(lMin, lMax)}%)`;
        this.color2 = `hsl(25, ${weightedRandom(sMin, sMax)}%, ${weightedRandom(lMin, lMax)}%)`;
        this.color3 = `hsl(25, ${weightedRandom(sMin, sMax)}%, ${weightedRandom(lMin, lMax)}%)`;
        this.color4 = `hsl(25, ${weightedRandom(sMin, sMax)}%, ${weightedRandom(lMin, lMax)}%)`;
        this.image = document.createElement('canvas');
        this.drawn = false;
    }
    drawCachedImage() {
        this.image.width = 32 * 3;
        this.image.height = 32 * 3;
        this.image.style.imageRendering = 'pixelated';
        const ctx = this.image.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.save();
        ctx.scale(32, 32);
        ctx.fillStyle = this.color1;
        ctx.fillRect(0, 1.0, 1, 0.25);
        ctx.fillStyle = this.color2;
        ctx.fillRect(0.75, 1.25, 1, 0.25);
        ctx.fillStyle = this.color3;
        ctx.fillRect(0.5, 1.5, 1, 0.25);
        ctx.fillStyle = this.color4;
        ctx.fillRect(0.25, 1.75, 1, 0.25);
        ctx.restore();
        this.drawn = true;
    }
    deserialize(data) {
        super.deserialize(data);
        this.color1 = data.color1;
        this.color2 = data.color2;
        this.color3 = data.color3;
        this.color4 = data.color4;
        return true;
    }
    serialize() {
        return {
            ...super.serialize(),
            type: 'planks',
            color1: this.color1,
            color2: this.color2,
            color3: this.color3,
            color4: this.color4,
        };
    }
}
register('tile', 'planks', Planks);
//# sourceMappingURL=Planks.js.map