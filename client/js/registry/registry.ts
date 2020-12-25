import { Item } from '../class/Item.js';
import { Tile } from '../class/Tile.js';
import { Class, Dict } from '../Interfaces/TS.js';

type RegistryTypes = {
	item: Class<Item>;
	tile: Class<Tile>;
	world: Tile;
};

export const registry: {
	[key in keyof RegistryTypes]: Dict<RegistryTypes[key]>;
} = {
	item: {},
	tile: {},
	world: {},
};

export function register(
	group: keyof RegistryTypes,
	type: string,
	val: RegistryTypes[typeof group]
) {
	registry[group][type] = val;
}

globalThis.registry = registry;
