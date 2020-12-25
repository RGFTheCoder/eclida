export function objKeys(obj) {
    return Object.keys(obj);
}
export function zipObj(keys, values) {
    const out = {};
    for (let i = 0; i < Math.min(keys.length, values.length); i++) {
        out[keys[i]] = values[i];
    }
    return out;
}
//# sourceMappingURL=objects.js.map