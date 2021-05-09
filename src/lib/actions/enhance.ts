export type EnhanceOptions = {
	classname: string;
};

export function enhance(node: HTMLElement, options: Partial<EnhanceOptions> = {}): void {
	const { classname } = { classname: 'js', ...options };

	node.classList.add(classname);
}
