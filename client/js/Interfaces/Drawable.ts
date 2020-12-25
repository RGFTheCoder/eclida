export interface IDrawable {
	image: HTMLCanvasElement;
	drawn: boolean;

	drawCachedImage(): void;

	draw(ctx: CanvasRenderingContext2D): void;

	drawCount: number;
}
