import { Tile } from '../class/Tile.js';
import { range } from '../util/loop.js';
import { addPoint, divPoint, floorPoint, lenPoint, subPoint, } from '../util/points.js';
import { Player } from '../class/Player.js';
import { KeyHandler } from '../util/input/keyHandler.js';
import { MouseHandler } from '../util/input/mouseHandler.js';
const fader = (percent) => `hsla(0, 0%, 0%, ${percent * 100}%)`;
export class Renderer {
    constructor({ canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), tileSize = 32, baseTile = new Tile(), } = {}) {
        this.mouseHandle = new MouseHandler();
        this.keyHandle = new KeyHandler({
            mod: 'Control',
            reload: 'r',
            stop: 't',
        });
        this.camOffset = [0, 0];
        this.zoom = 2;
        this.prevTime = Date.now();
        this.prevTimes = [];
        this.player = new Player();
        this.player.renderer = this;
        this.player.baseTile = baseTile;
        this.player.mouseHandle = this.mouseHandle;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
        });
        this.mouseHandle.addEventListener('drag', async (e) => {
            const scaleFactor = this.tileSize * this.zoom;
            const conv = divPoint([e.dx, e.dy], scaleFactor);
            this.camOffset[0] -= conv[0];
            this.camOffset[1] -= conv[1];
        });
        this.mouseHandle.addEventListener('holdDrag', async (e) => {
            const conv = this.convertMouse([e.x, e.y]);
            const tile = this.player.baseTile.getTileAt(conv);
            tile.color = 'gray';
            tile.solid = true;
            tile.drawn = false;
        });
        this.mouseHandle.addEventListener('click', async (e) => {
            const conv = this.convertMouse([e.x, e.y]);
            const tile = this.player.baseTile.getTileAt(conv);
            tile.solid = !tile.solid;
            tile.drawn = false;
        });
        this.mouseHandle.addEventListener('scroll', async (e) => {
            const mouseBefore = this.convertMouse([this.mouseHandle.mouseDatum.x, this.mouseHandle.mouseDatum.y], false);
            this.zoom = e.direction == 'up' ? this.zoom / 1.04 : this.zoom * 1.04;
            const mouseAfter = this.convertMouse([this.mouseHandle.mouseDatum.x, this.mouseHandle.mouseDatum.y], false);
            const change = subPoint(mouseAfter, mouseBefore);
            this.camOffset[0] -= change[0];
            this.camOffset[1] -= change[1];
        });
        this.keyHandle.on('reload', async (data) => {
            location.href = location.href;
        });
        this.keyHandle.on('stop', async (data) => {
            if (this.keyHandle.currentKeys.mod)
                stop();
        });
        this.camOffset = [
            (innerWidth / tileSize / 2 / this.zoom) * -1,
            (innerHeight / tileSize / 2 / this.zoom) * -1,
        ];
        ctx.imageSmoothingEnabled = false;
        try {
            document.body.appendChild(canvas);
        }
        catch (e) { }
        this.canvas = canvas;
        this.ctx = ctx;
        this.tileSize = tileSize;
    }
    convertMouse(pos, round = true) {
        const scaleFactor = this.tileSize * this.zoom;
        let out = pos;
        // Scale point to grid scale
        out = divPoint(out, scaleFactor);
        // Apply camera offset
        out = addPoint(out, [this.camOffset[0], this.camOffset[1]]);
        // Floor it so that it cleanly matches grid
        if (round)
            out = floorPoint(out);
        return out;
    }
    draw() {
        const delta = Date.now() - this.prevTime;
        this.prevTime += delta;
        this.prevTimes.push(delta);
        if (this.prevTimes.length > 60)
            this.prevTimes.shift();
        const scaleFactor = this.tileSize * this.zoom;
        const ctx = this.ctx;
        ctx.fillStyle = fader(1);
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        ctx.save();
        ctx.scale(scaleFactor, scaleFactor);
        ctx.translate(-this.camOffset[0], -this.camOffset[1]);
        const bounds = [
            this.convertMouse([0, 0]),
            this.convertMouse([this.canvas.width, this.canvas.height]),
        ];
        // bounds[0][0] = Math.floor(this.camOffset[0]);
        // bounds[0][1] = Math.floor(this.camOffset[1]);
        // bounds[1][0] = bounds[0][0] + Math.ceil(innerWidth / this.tileSize);
        // bounds[1][1] = bounds[0][1] + Math.ceil(innerHeight / this.tileSize);
        // Extend bounds by 1
        bounds[0][0] -= 2;
        bounds[0][1] -= 2;
        bounds[1][0] += 2;
        bounds[1][1] += 2;
        bounds[0][0] = Math.max(bounds[0][0], -this.player.viewRange);
        bounds[1][0] = Math.min(bounds[1][0], this.player.viewRange);
        bounds[0][1] = Math.max(bounds[0][1], -this.player.viewRange);
        bounds[1][1] = Math.min(bounds[1][1], this.player.viewRange);
        // console.table(bounds);
        const draws = [];
        for (const dx of range(bounds[0][0], bounds[1][0], 1, false)) {
            for (const dy of range(bounds[0][1], bounds[1][1], 1, false)) {
                if (lenPoint([dx, dy]) < this.player.viewRange) {
                    // if (Math.abs(dx) + Math.abs(dy) < this.player.viewRange) {
                    const final = this.player.baseTile.getTileAt([dx, dy]);
                    ctx.save();
                    ctx.translate(dx, dy);
                    final?.draw?.(ctx);
                    ctx.restore();
                    if (final != null && final.drawCount > 0)
                        draws.push([dx, dy, final]);
                }
            }
        }
        let pass = 0;
        while (draws.length > 0) {
            pass++;
            for (let tile of draws) {
                if ('draw' + pass in tile[2]) {
                    ctx.save();
                    ctx.translate(tile[0], tile[1]);
                    tile[2]['draw' + pass](ctx);
                    ctx.restore();
                }
                else
                    draws.splice(draws.indexOf(tile), 1);
            }
        }
        for (const dx of range(bounds[0][0], bounds[1][0], 1, false)) {
            for (const dy of range(bounds[0][1], bounds[1][1], 1, false)) {
                // const pathstring = generatePathString([0, 0], [dx, dy]);
                // ctx.fillStyle = fader(pathstring.length / this.player.viewRange);
                ctx.fillStyle = fader(lenPoint([dx, dy]) / this.player.viewRange);
                ctx.fillRect(dx, dy, 1.0, 1.0);
            }
        }
        ctx.save();
        this.player.draw(ctx);
        ctx.restore();
        ctx.fillStyle = '#ffffff80';
        ctx.fillRect(...this.convertMouse([
            this.mouseHandle.mouseDatum.x,
            this.mouseHandle.mouseDatum.y,
        ]), 1, 1);
        ctx.restore();
        ctx.font = '50px monospace';
        ctx.fillStyle = 'red';
        ctx.fillText(Math.round(1000 /
            (this.prevTimes.reduce((p, c, i, a) => p + c, 0) /
                this.prevTimes.length)).toString(), 20, 20 + 50);
    }
}
//# sourceMappingURL=game.js.map