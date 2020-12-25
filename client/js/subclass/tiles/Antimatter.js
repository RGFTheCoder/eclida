import { register } from '../../registry/registry.js';
import { Tile } from '../../class/Tile.js';
import { weightedRandom } from '../../util/random.js';
const min = 0x80;
const max = 0xff;
export class Antimatter extends Tile {
    constructor() {
        super(...arguments);
        this.color = `hsl(${Math.random() * 360}, 50%, ${weightedRandom(75, 95)}%)`;
        this.image = document.createElement('canvas');
        this.drawn = false;
        this.solid = true;
    }
    get u() {
        if (this._u == null) {
            this._u = new Antimatter();
            this._u.d = this;
        }
        return this._u;
    }
    set u(tile) {
        this._u = tile;
    }
    get d() {
        if (this._d == null) {
            this._d = new Antimatter();
            this._d.u = this;
        }
        return this._d;
    }
    set d(tile) {
        this._d = tile;
    }
    get l() {
        if (this._l == null) {
            this._l = new Antimatter();
            this._l.r = this;
        }
        return this._l;
    }
    set l(tile) {
        this._l = tile;
    }
    get r() {
        if (this._r == null) {
            this._r = new Antimatter();
            this._r.l = this;
        }
        return this._r;
    }
    set r(tile) {
        this._r = tile;
    }
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
        return true;
    }
    serialize() {
        return {
            ...super.serialize(),
            type: 'antimatter',
        };
    }
}
register('tile', 'antimatter', Antimatter);
//# sourceMappingURL=Antimatter.js.map