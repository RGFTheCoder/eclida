import { Tile } from '../../class/Tile.js';

export interface IGenerator {
	generate(x: number, y: number): Tile;
}
