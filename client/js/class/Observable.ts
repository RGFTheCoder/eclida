type CallBack<T, R = any> = (data: T) => Promise<R>;

/** EventType is an object type with keys of event names, and values of event data */
export class Observable<EventType> {
	eventHolder: Partial<
		{ [key in keyof EventType]: CallBack<EventType[key]>[] }
	> = {};

	addEventListener<T extends keyof EventType>(
		name: T,
		callback: CallBack<EventType[T]>
	) {
		this.eventHolder[name] = this.eventHolder[name] ?? [];
		this.eventHolder[name].push(callback);
	}
	removeEventListener<T extends keyof EventType>(
		name: T,
		callback: CallBack<EventType[T]>
	): boolean {
		if (!(name in this.eventHolder)) return false;
		const location = this.eventHolder[name].indexOf(callback);
		if (location === -1) return false;

		this.eventHolder[name].splice(location, 1);
		return true;
	}

	async emitEvent<T extends keyof EventType>(name: T, data: EventType[T]) {
		if (!(name in this.eventHolder)) return [];
		const cbs = this.eventHolder[name];
		const promises = cbs.map((x) => x(data));
		return await Promise.all(promises);
	}

	on<T extends keyof EventType>(name: T, callback: CallBack<EventType[T]>) {
		this.addEventListener(name, callback);
	}
	once<T extends keyof EventType>(name: T, callback: CallBack<EventType[T]>) {
		const cb = async (data) => {
			this.removeEventListener(name, cb);
			return await callback(data);
		};
		this.addEventListener(name, cb);
	}
	promiseOnce<T extends keyof EventType>(name: T) {
		return new Promise<EventType[T]>((res, rej) => {
			const f = async (data: EventType[T]) => res(data);
			this.once(name, f);
		});
	}
}
