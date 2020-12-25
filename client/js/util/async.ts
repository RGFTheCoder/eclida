export function delay(milliseconds: number) {
	return new Promise((res, rej) => {
		setTimeout(res, milliseconds);
	});
}
