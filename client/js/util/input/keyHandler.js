import { Observable } from '../../class/Observable.js';
import { objKeys, zipObj } from '../objects.js';
export class KeyHandler extends Observable {
    constructor(keys) {
        super();
        this.keyMap = {};
        this.currentKeys = zipObj(objKeys(keys), new Array(objKeys(keys).length).fill(false));
        for (const id in keys) {
            this.keyMap[keys[id]] = this.keyMap[keys[id]] ?? [];
            this.keyMap[keys[id]].push(id);
        }
        addEventListener('keydown', (e) => {
            // console.log(e.key);
            e.preventDefault();
            const evts = this.keyMap[e.key];
            if (evts != null)
                for (const evt of evts) {
                    this.currentKeys[evt] = true;
                    this.emitEvent(evt, { key: e.key });
                }
        });
        addEventListener('keyup', (e) => {
            e.preventDefault();
            const evts = this.keyMap[e.key];
            if (evts != null)
                for (const evt of evts) {
                    this.currentKeys[evt] = false;
                }
        });
    }
}
let a = new KeyHandler({
    moveUp: 'w',
    moveLeft: 'a',
    moveDown: 's',
    moveRight: 'd',
});
//# sourceMappingURL=keyHandler.js.map