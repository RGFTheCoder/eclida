import { Grass } from '../../subclass/tiles/Grass.js';
import { IGenerator } from './IGenerator.js';

export class Grassland implements IGenerator {
	generate(x: number, y: number) {
		const ret = new Grass();
		return ret;
	}
}
