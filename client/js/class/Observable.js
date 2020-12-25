/** EventType is an object type with keys of event names, and values of event data */
export class Observable {
    constructor() {
        this.eventHolder = {};
    }
    addEventListener(name, callback) {
        this.eventHolder[name] = this.eventHolder[name] ?? [];
        this.eventHolder[name].push(callback);
    }
    removeEventListener(name, callback) {
        if (!(name in this.eventHolder))
            return false;
        const location = this.eventHolder[name].indexOf(callback);
        if (location === -1)
            return false;
        this.eventHolder[name].splice(location, 1);
        return true;
    }
    async emitEvent(name, data) {
        if (!(name in this.eventHolder))
            return [];
        const cbs = this.eventHolder[name];
        const promises = cbs.map((x) => x(data));
        return await Promise.all(promises);
    }
    on(name, callback) {
        this.addEventListener(name, callback);
    }
    once(name, callback) {
        const cb = async (data) => {
            this.removeEventListener(name, cb);
            return await callback(data);
        };
        this.addEventListener(name, cb);
    }
    promiseOnce(name) {
        return new Promise((res, rej) => {
            const f = async (data) => res(data);
            this.once(name, f);
        });
    }
}
//# sourceMappingURL=Observable.js.map