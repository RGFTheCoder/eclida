export interface ITagged {
	tags: string[];
	matchesTag(tag: string): boolean;
}

export function splitTag(tag: string): string[] {
	return tag.split('.').reduce((p, c, i, a) => {
		return [...p, a.slice(0, i + 1).join('.')];
	}, []);
}
