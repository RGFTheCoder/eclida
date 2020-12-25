import { splitTag } from '../Interfaces/Tagged.js';
import { register, registry } from '../registry/registry.js';
import { generatePathString } from '../util/cross.js';
import { hex, randomToken } from '../util/random.js';
export class Tile {
    constructor(id = randomToken()) {
        this._u = null;
        this._d = null;
        this._l = null;
        this._r = null;
        this.solid = false;
        this.tags = [];
        this.image = document.createElement('canvas');
        this.drawn = false;
        this.drawCount = 1;
        register('world', id, this);
        this.id = id;
    }
    get u() {
        return this._u;
    }
    set u(tile) {
        this._u = tile;
    }
    get d() {
        return this._d;
    }
    set d(tile) {
        this._d = tile;
    }
    get l() {
        return this._l;
    }
    set l(tile) {
        this._l = tile;
    }
    get r() {
        return this._r;
    }
    set r(tile) {
        this._r = tile;
    }
    getTileAt(relative, respectSolid = false) {
        const pathstring = generatePathString([0, 0], relative).split('');
        return pathstring.reduce((p, c) => (respectSolid ? (p?.[c]?.solid ? p : p?.[c]) : p?.[c]), this);
    }
    equals(x) {
        if (x.constructor !== this.constructor)
            return false;
        return true;
    }
    matchesTag(tag) {
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
    draw(ctx) {
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
//# sourceMappingURL=Tile.js.map