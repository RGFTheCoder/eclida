export const registry = {
    item: {},
    tile: {},
    world: {},
};
export function register(group, type, val) {
    registry[group][type] = val;
}
globalThis.registry = registry;
//# sourceMappingURL=registry.js.map