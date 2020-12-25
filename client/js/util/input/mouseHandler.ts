import { Observable } from '../../class/Observable.js';
import { delay } from '../async.js';

type MouseData = { x: number; y: number };
type MouseDataMoved = MouseData & { dx: number; dy: number };
type ScrollData = { strength: number; direction: 'up' | 'down' };

type EventType = {
	click: MouseData;
	rawMove: MouseDataMoved;
	hold: MouseData;
	holdDrag: MouseDataMoved;
	holdEnd: MouseData;
	dragStart: MouseData;
	drag: MouseDataMoved;
	dragEnd: MouseData;
	holdDragEnd: MouseData;
	scroll: ScrollData;
	scrollUp: ScrollData;
	scrollDown: ScrollData;
};

export class MouseHandler extends Observable<EventType> {
	mouseDatum = {
		x: 0,
		y: 0,
		down: false,
		drag: false,
		held: false,
	};

	constructor({ holdDelay = 100 } = {}) {
		super();

		addEventListener('mousedown', (e) => {
			e.preventDefault();
			this.mouseDatum.x = e.clientX;
			this.mouseDatum.y = e.clientY;

			this.mouseDatum.down = true;

			const cachePos = {
				x: this.mouseDatum.x,
				y: this.mouseDatum.y,
			};

			delay(holdDelay).then(() => {
				if (
					this.mouseDatum.down &&
					this.mouseDatum.x == cachePos.x &&
					this.mouseDatum.y == cachePos.y
				) {
					this.mouseDatum.held = true;
					this.emitEvent('hold', {
						x: this.mouseDatum.x,
						y: this.mouseDatum.y,
					});
				}
			});
		});
		addEventListener('mousemove', async (e) => {
			e.preventDefault();
			const cachePos = {
				x: this.mouseDatum.x,
				y: this.mouseDatum.y,
			};
			this.mouseDatum.x = e.clientX;
			this.mouseDatum.y = e.clientY;

			this.emitEvent('rawMove', {
				x: this.mouseDatum.x,
				y: this.mouseDatum.y,
				dx: this.mouseDatum.x - cachePos.x,
				dy: this.mouseDatum.y - cachePos.y,
			});

			if (this.mouseDatum.down && !this.mouseDatum.drag) {
				this.mouseDatum.drag = true;
				await this.emitEvent('dragStart', {
					x: this.mouseDatum.x,
					y: this.mouseDatum.y,
				});
			}
			if (this.mouseDatum.drag && !this.mouseDatum.held) {
				this.emitEvent('drag', {
					x: this.mouseDatum.x,
					y: this.mouseDatum.y,
					dx: this.mouseDatum.x - cachePos.x,
					dy: this.mouseDatum.y - cachePos.y,
				});
			} else if (this.mouseDatum.held) {
				this.emitEvent('holdDrag', {
					x: this.mouseDatum.x,
					y: this.mouseDatum.y,
					dx: this.mouseDatum.x - cachePos.x,
					dy: this.mouseDatum.y - cachePos.y,
				});
			}
		});
		addEventListener('mouseup', (e) => {
			e.preventDefault();
			this.mouseDatum.x = e.clientX;
			this.mouseDatum.y = e.clientY;

			this.mouseDatum.down = false;

			if (this.mouseDatum.drag && !this.mouseDatum.held) {
				this.mouseDatum.drag = false;
				this.emitEvent('dragEnd', {
					x: this.mouseDatum.x,
					y: this.mouseDatum.y,
				});
			} else if (this.mouseDatum.held && !this.mouseDatum.drag) {
				this.mouseDatum.held = false;
				this.emitEvent('holdEnd', {
					x: this.mouseDatum.x,
					y: this.mouseDatum.y,
				});
			} else if (this.mouseDatum.held && this.mouseDatum.drag) {
				this.mouseDatum.drag = false;
				this.mouseDatum.held = false;
				this.emitEvent('holdDragEnd', {
					x: this.mouseDatum.x,
					y: this.mouseDatum.y,
				});
			} else {
				this.emitEvent('click', {
					x: this.mouseDatum.x,
					y: this.mouseDatum.y,
				});
			}
		});
		addEventListener('wheel', (e) => {
			const y = e.deltaY;

			this.emitEvent('scroll', {
				strength: y,
				direction: y > 0 ? 'up' : 'down',
			});
			if (y > 0) this.emitEvent('scrollUp', { strength: y, direction: 'up' });
			if (y < 0)
				this.emitEvent('scrollDown', { strength: -y, direction: 'down' });
		});

		// addEventListener('mouseenter', (e) => { })
		// addEventListener('mouseleave', (e) => { })
		// addEventListener('mouseout', (e) => { })
		// addEventListener('mouseover', (e) => { })
	}
}
