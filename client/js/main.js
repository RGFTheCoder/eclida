import './customElements/list.js';
import { Renderer } from './game/game.js';
import { Antimatter } from './subclass/tiles/Antimatter.js';
// const world = generate(Planks, 10);
const world = new Antimatter();
// const world =
// 	complexGenerate({
// 	noiseLayers: {
// 		humidity: null,
// 		temperature: null,
// 		weirdness: null,
// 	},
// 	biomes: [
// 		{
// 			generator: new Grassland(),
// 			noiseLocation: {
// 				humidity: 0.3,
// 				temperature: 0.5,
// 				weirdness: 0,
// 			},
// 		},
// 	],
// });
const renderer = new Renderer({
    baseTile: world,
});
function drawLoop() {
    renderer.draw();
    requestAnimationFrame(drawLoop);
}
drawLoop();
globalThis.renderer = renderer;
//# sourceMappingURL=main.js.map