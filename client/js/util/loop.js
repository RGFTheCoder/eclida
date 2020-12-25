export function loop(x, min = 0, max = 1) {
    while (x < min)
        x += max - min;
    return ((x - min) % (max - min)) + min;
}
export function* range(startend, end, increment = 1, inclusive = false) {
    const adjustedRange = {
        start: end == null ? 0 : startend,
        end: end == null ? startend : end,
        increment,
        inclusive,
    };
    if (adjustedRange.inclusive) {
        for (let i = adjustedRange.start; i <= adjustedRange.end; i += adjustedRange.increment)
            yield i;
    }
    else {
        for (let i = adjustedRange.start; i < adjustedRange.end; i += adjustedRange.increment)
            yield i;
    }
}
//# sourceMappingURL=loop.js.map