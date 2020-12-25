import { ISetLike } from '../Interfaces/SetLike.js';
import { Item } from './Item.js';

interface Counted<T> {
	count: number;
	value: T;
}

export class Inventory implements ISetLike<Item> {
	#items: Counted<Item>[] = [];
	maxSize = 10;

	#onChangeCBs: ((t: Inventory) => void)[] = [];
	onChange(cb) {
		this.#onChangeCBs.push(cb);
	}

	add(item: Item, ...rest: Item[]): boolean {
		// See if the item fits in the list
		for (const a of this.#items) {
			if (a.value.equals(item)) {
				a.count++;

				if (rest.length > 0) {
					const [head, ...res] = rest;
					const nex = this.add(head, ...res);
					if (!nex) a.count--;
					return nex;
				} else {
					this.#onChangeCBs.forEach((x) => x(this));
					return true;
				}
			}
		}

		// Try to add item to slot
		if (this.#items.length < this.maxSize) {
			this.#items.push({ count: 1, value: item });

			if (rest.length > 0) {
				const [head, ...res] = rest;
				const nex = this.add(head, ...res);
				if (!nex) {
					for (let a of this.#items) {
						if (a.value.equals(item)) {
							this.#items.splice(this.#items.indexOf(a), 1);
							return false;
						}
					}
				}
				return nex;
			} else {
				this.#onChangeCBs.forEach((x) => x(this));
				return true;
			}
		}

		if (rest.length > 0) {
			const [head, ...res] = rest;
			return this.add(head, ...res) && false;
		} else return false;
	}

	remove(item: Item): Item {
		for (let a of this.#items) {
			if (a.value.equals(item)) {
				a.count--;

				if (a.count === 0) this.#items.splice(this.#items.indexOf(a), 1);

				return a.value;
			}
		}
	}

	hasTag(tag: string): boolean {
		for (const item of this.#items) {
			if (item.value.matchesTag(tag)) return true;
		}
		return false;
	}

	getTag(tag: string): Item {
		for (const item of this.#items) {
			if (item.value.matchesTag(tag)) {
				item.count--;

				if (item.count === 0) this.#items.splice(this.#items.indexOf(item), 1);

				return item.value;
			}
		}
	}

	toArray(): Item[] {
		return this.#items.flatMap((x) => {
			const ret = [];
			for (let i = 0; i < x.count; i++) ret.push(x.value.clone());
			return ret;
		});
	}
}
