import { IClonable } from '../Interfaces/Clonable.js';
import { IEqu } from '../Interfaces/Equ.js';
import { JSONObject } from '../Interfaces/JSON.js';
import { ISerializeable } from '../Interfaces/Serializeable.js';
import { ITagged, splitTag } from '../Interfaces/Tagged.js';
import { register } from '../registry/registry.js';

export class Item implements IEqu, ITagged, IClonable<Item>, ISerializeable {
	equals(other) {
		if (!(other instanceof Item)) return false;

		return true;
	}

	tags: string[] = [];
	matchesTag(tag: string) {
		return this.tags.flatMap(splitTag).includes(tag);
	}

	clone() {
		return new Item();
	}

	serialize() {
		return { type: 'item' };
	}
	deserialize(data: JSONObject) {
		return true;
	}
}

register('item', 'item', Item);
