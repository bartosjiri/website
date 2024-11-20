export type ImageToolsConfigT = {
	[key: string]: string[] | number[] | string | number | boolean;
};

export const transformConfigToDirectives = (config: ImageToolsConfigT) => {
	const directives = new URLSearchParams();

	for (const [key, value] of Object.entries(config)) {
		if (Array.isArray(value)) {
			directives.set(key, value.join(';'));
		} else if (typeof value === 'object') {
			for (const [subKey, subValue] of Object.entries(value)) {
				directives.set(`${key}.${subKey}`, (subValue as string).toString());
			}
		} else {
			directives.set(key, value.toString());
		}
	}

	return directives;
};
