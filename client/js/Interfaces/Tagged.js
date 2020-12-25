export function splitTag(tag) {
    return tag.split('.').reduce((p, c, i, a) => {
        return [...p, a.slice(0, i + 1).join('.')];
    }, []);
}
//# sourceMappingURL=Tagged.js.map