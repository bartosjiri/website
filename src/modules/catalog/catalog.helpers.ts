import { get } from 'svelte/store';

import { mediaContainerRef } from './catalog.store';

import { CATALOG_MEDIA_CONFIG } from './catalog.config';

import type { CatalogListT, CatalogItemConfigT, CatalogItemMediaT } from './catalog.types.ts';

export const loadCatalogData = async () => {
	const configs = import.meta.glob('/content/catalog/**/*.ts');
	const media = import.meta.glob('/content/catalog/**/*.{jpg,jpeg,png,webp}', {
		eager: true,
		query: { as: 'metadata' }
	});

	const catalogData: CatalogListT = [];

	for (const [path, resolver] of Object.entries(configs)) {
		const resolved = (await resolver()) as { [key: string]: CatalogItemConfigT };

		const itemId = path.replace('/content/catalog/', '').replace('/index.ts', '');
		const itemData = { id: itemId, ...resolved[Object.keys(resolved)[0]] };

		catalogData.push(itemData);
	}

	for (const item of catalogData) {
		const itemMedia = Object.entries(media).filter(([path]) => path.includes(item.id));

		item['media'] = formatMedia(itemMedia as MediaImportT);
	}

	return catalogData.sort((a, b) => b.timeframe.start - a.timeframe.start);
};

const formatMedia = (mediaItems: MediaImportT): CatalogItemMediaT[] => {
	const formattedMedia: CatalogItemMediaT[] = [];

	for (const [path, module] of mediaItems) {
		const mediaItem: CatalogItemMediaT = {};

		mediaItem['original'] = {
			[path.split('.').pop() as string]: path
		};

		for (const file of module.default) {
			const { height, format, src } = file;
			const closestHeight = getClosestHeight(height, CATALOG_MEDIA_CONFIG.h as number[]);

			if (!mediaItem[closestHeight]) {
				mediaItem[closestHeight] = {};
			}

			mediaItem[closestHeight][format] = src;
		}

		formattedMedia.push(mediaItem);
	}

	return formattedMedia;
};

const getClosestHeight = (actualHeight: number, targetHeights: number[]): number => {
	return targetHeights.reduce((prev, curr) =>
		Math.abs(curr - actualHeight) < Math.abs(prev - actualHeight) ? curr : prev
	);
};

export const centerMediaContainer = (itemIndex: number) => {
	const containerRef = get(mediaContainerRef);
	if (!containerRef) return;

	const { clientWidth, scrollWidth } = containerRef;
	if (scrollWidth <= clientWidth) return;

	const children = containerRef.children;
	let offsetLeft = 0;

	for (let i = 0; i < itemIndex; i++) {
		offsetLeft += children[i].scrollWidth;
	}
	offsetLeft += children[itemIndex].scrollWidth / 2;

	containerRef.scrollLeft = offsetLeft - clientWidth / 2;
};

type MediaImportT = [string, MediaModuleT][];

type MediaModuleT = {
	default: MediaFileT[];
};

type MediaFileT = {
	height: number;
	format: string;
	src: string;
};
