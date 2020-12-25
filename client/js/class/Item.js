import { splitTag } from '../Interfaces/Tagged.js';
import { register } from '../registry/registry.js';
export class Item {
    constructor() {
        this.tags = [];
    }
    equals(other) {
        if (!(other instanceof Item))
            return false;
        return true;
    }
    matchesTag(tag) {
        return this.tags.flatMap(splitTag).includes(tag);
    }
    clone() {
        return new Item();
    }
    serialize() {
        return { type: 'item' };
    }
    deserialize(data) {
        return true;
    }
}
register('item', 'item', Item);
//# sourceMappingURL=Item.js.map