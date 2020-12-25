import { register, registry } from '../../registry/registry.js';
import { Tile } from '../../class/Tile.js';
import { hex, sample, weightedRandom } from '../../util/random.js';
const minLimit = 25;
const maxLimit = 55;
const centerLimit = minLimit + 5;

export class Grass extends Tile {
	color = `hsl(120, 65%, ${weightedRandom(minLimit, maxLimit, centerLimit)}%)`;

	drawCachedImage() {
		this.image.width = 32 * 3;
		this.image.height = 32 * 3;
		this.image.style.imageRendering = 'pixelated';

		const ctx = this.image.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.save();
		ctx.scale(32, 32);
		ctx.fillStyle = this.color;
		ctx.fillRect(1, 1, 1, 1);
		ctx.restore();

		this.drawn = true;
	}

	deserialize(data) {
		super.deserialize(data);
		this.color = data.color;

		return true;
	}

	serialize() {
		return {
			...super.serialize(),
			type: 'grass',
			color: this.color,
		};
	}
}

register('tile', 'grass', Grass);
