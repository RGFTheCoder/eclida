import { IClonable } from '../Interfaces/Clonable.js';
import { IDrawable } from '../Interfaces/Drawable.js';
import { IEqu } from '../Interfaces/Equ.js';
import { ISerializeable } from '../Interfaces/Serializeable.js';
import { ITagged, splitTag } from '../Interfaces/Tagged.js';
import { register, registry } from '../registry/registry.js';
import { generatePathString } from '../util/cross.js';
import { Point } from '../util/points.js';
import { hex, randomToken } from '../util/random.js';

export interface ITile {
	u: Tile;
	r: Tile;
	d: Tile;
	l: Tile;
	solid: boolean;
	id: string;
}

export class Tile
	implements IEqu, ITagged, IClonable<Tile>, ISerializeable, IDrawable, ITile {
	_u: Tile = null;
	get u() {
		return this._u;
	}
	set u(tile) {
		this._u = tile;
	}
	_d: Tile = null;
	get d() {
		return this._d;
	}
	set d(tile) {
		this._d = tile;
	}
	_l: Tile = null;
	get l() {
		return this._l;
	}
	set l(tile) {
		this._l = tile;
	}
	_r: Tile = null;
	get r() {
		return this._r;
	}
	set r(tile) {
		this._r = tile;
	}

	solid = false;

	id: string;

	constructor(id = randomToken()) {
		register('world', id, this);
		this.id = id;
	}

	getTileAt(relative: Point, respectSolid = false): Tile {
		const pathstring: ('u' | 'd' | 'l' | 'r')[] = generatePathString(
			[0, 0],
			relative
		).split('') as ('u' | 'd' | 'l' | 'r')[];
		return pathstring.reduce(
			(p, c) => (respectSolid ? (p?.[c]?.solid ? p : p?.[c]) : p?.[c]),
			this
		);
	}

	equals(x) {
		if (x.constructor !== this.constructor) return false;

		return true;
	}

	tags: string[] = [];
	matchesTag(tag: string) {
		return this.tags.flatMap(splitTag).includes(tag);
	}

	clone() {
		return new Tile();
	}

	serialize() {
		return {
			type: 'tile',
			id: this.id,
			u: this.u.id,
			d: this.d.id,
			l: this.l.id,
			r: this.r.id,
		};
	}
	deserialize(data) {
		this.u = registry['world'][data.u];
		this.d = registry['world'][data.d];
		this.l = registry['world'][data.l];
		this.r = registry['world'][data.r];
		return true;
	}

	image = document.createElement('canvas');
	drawn = false;
	drawCachedImage() {
		this.image.width = 32 * 3;
		this.image.height = 32 * 3;
		this.image.style.imageRendering = 'pixelated';

		const ctx = this.image.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.save();
		ctx.scale(32, 32);
		ctx.fillStyle = '#' + randomToken(6, hex) + '30';
		ctx.fillRect(1, 1, 1, 1);
		ctx.restore();

		this.drawn = true;
	}

	drawCount = 1;
	draw(ctx: CanvasRenderingContext2D) {
		if (!this.drawn) {
			this.drawCachedImage();
		}
		ctx.drawImage(this.image, -1, -1, 3, 3);
	}

	draw1(ctx) {
		if (!this.solid) {
			ctx.fillStyle = '#00000060';
			ctx.fillRect(0, 0, 1, 1);
		}
	}
}

register('tile', 'tile', Tile);
