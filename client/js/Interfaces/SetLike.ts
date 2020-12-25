import { ITagged } from './Tagged.js';

export interface ISetLike<T extends ITagged> {
	add(...val: T[]);
	remove(val: T): T;
	hasTag(tag: string): boolean;
	getTag(tag: string): T;
	toArray(): T[];
}
