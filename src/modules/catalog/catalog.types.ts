export type CatalogListT = CatalogItemT[];

export type CatalogItemT = CatalogItemConfigT & {
	id: string;
	media?: CatalogItemMediaT[];
};

export type CatalogItemConfigT = {
	name: string;
	type: string;
	category: CatalogItemCategoryT;
	timeframe: {
		start: number;
		end?: number;
	};
	description: string;
	links?: {
		url: string;
		label: string;
		target?: '_blank';
	}[];
};

export type CatalogItemCategoryT = 'project';

export type CatalogItemMediaT = {
	original?: { [key: string]: string };
	[key: number]: { [key: string]: string };
};

export type MediaImportT = [string, MediaModuleT][];

export type MediaModuleT = {
	default: MediaFileT[];
};

export type MediaFileT = {
	height: number;
	format: string;
	src: string;
};
