export function sample(arr) {
    return arr[(Math.random() * arr.length) | 0];
}
export const alphanum = '1234567890qwertyuiopsdfghjklzxcvbnmQWERTYUIOPSDFGHJKLZXCVBNM';
export const hex = '0123456789abcdef';
export function randomToken(len = 64, alphabet = alphanum) {
    return Array(len)
        .fill('')
        .map((x) => sample(alphabet))
        .join('');
}
export function weightedRandom(min = -1, max = 1, center = (min + max) / 2) {
    if (Math.random() < 0.5) {
        return fallingWeightedRandom(min, center);
    }
    else {
        return fallingWeightedRandom(center, max);
    }
}
export function fallingWeightedRandom(min = 0, max = 1) {
    return Math.abs(Math.random() - Math.random()) * (max - min) + min;
}
//# sourceMappingURL=random.js.map