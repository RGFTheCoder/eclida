import { Observable } from '../../class/Observable.js';
import { Dict, SDict } from '../../Interfaces/TS.js';
import { objKeys, zipObj } from '../objects.js';

type KeyData = { key: string };

export class KeyHandler<ControlNames extends string> extends Observable<
	SDict<ControlNames, KeyData>
> {
	currentKeys: SDict<ControlNames, boolean>;
	keyMap: Dict<ControlNames[]> = {};

	constructor(keys: SDict<ControlNames, string>) {
		super();
		this.currentKeys = zipObj(
			objKeys(keys),
			new Array(objKeys(keys).length).fill(false)
		);

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

type testHandle = 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight';
let a = new KeyHandler({
	moveUp: 'w',
	moveLeft: 'a',
	moveDown: 's',
	moveRight: 'd',
});
