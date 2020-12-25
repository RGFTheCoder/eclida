import { KeyHandler } from '../util/input/keyHandler.js';
import { addPoint, floorPoint, mulPoint, subPoint, } from '../util/points.js';
export class Player {
    constructor() {
        this.viewRangeBase = 20;
        this.keyHandle = new KeyHandler({
            moveUp: 'w',
            moveLeft: 'a',
            moveDown: 's',
            moveRight: 'd',
            speed: 'Control',
        });
        this.posInTile = [0.5, 0.5];
        this.drawCount = 0;
        this.image = document.createElement('canvas');
        this.drawn = false;
    }
    get viewRange() {
        return this.viewRangeBase;
    }
    move(vel) {
        const newPoint = addPoint(this.posInTile, vel);
        // change of tile
        const bigchange = floorPoint(newPoint);
        // new value of posInTile
        const newState = subPoint(newPoint, bigchange);
        const newBase = this.baseTile.getTileAt(bigchange, true);
        const newBasePass = this.baseTile.getTileAt(bigchange, false);
        if (this.renderer != null && newBase === newBasePass && newBase != null) {
            const change1 = subPoint(newState, this.posInTile);
            this.renderer.camOffset[0] += change1[0];
            this.renderer.camOffset[1] += change1[1];
        }
        const subChange = subPoint(newState, this.posInTile);
        if (newBase === newBasePass && newBase != null)
            this.posInTile = addPoint(this.posInTile, subChange);
        if (newBase != null)
            this.baseTile = newBase;
    }
    drawCachedImage() {
        this.image.width = 32 * 3;
        this.image.height = 32 * 3;
        const ctx = this.image.getContext('2d');
        ctx.save();
        ctx.scale(32, 32);
        ctx.translate(1.5, 1.5);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(-0.25, -0.25, 0.5, 0.5);
        ctx.restore();
        this.drawn = true;
    }
    draw(ctx) {
        if (!this.drawn)
            this.drawCachedImage();
        ctx.drawImage(this.image, -1.5 + this.posInTile[0], -1.5 + this.posInTile[1], 3, 3);
        (async () => {
            const walkSpeed = 0.1, runSpeed = 0.25;
            if (this.keyHandle.currentKeys['moveUp'])
                this.move(mulPoint([0, -1], this.keyHandle.currentKeys['speed'] ? runSpeed : walkSpeed));
            if (this.keyHandle.currentKeys['moveDown'])
                this.move(mulPoint([0, 1], this.keyHandle.currentKeys['speed'] ? runSpeed : walkSpeed));
            if (this.keyHandle.currentKeys['moveLeft'])
                this.move(mulPoint([-1, 0], this.keyHandle.currentKeys['speed'] ? runSpeed : walkSpeed));
            if (this.keyHandle.currentKeys['moveRight'])
                this.move(mulPoint([1, 0], this.keyHandle.currentKeys['speed'] ? runSpeed : walkSpeed));
        })();
    }
}
//# sourceMappingURL=Player.js.map