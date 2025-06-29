import { get } from 'svelte/store';
import { goto } from '$app/navigation';

import {
	catalog as catalogStore,
	catalogItemIndex as catalogItemIndexStore,
	catalogItemMediaIndex as catalogItemMediaIndexStore,
	mediaContainerRef as mediaContainerRefStore
} from './catalog.store';

import { CATALOG_MEDIA_CONFIG } from './catalog.config';

import type {
	CatalogListT,
	CatalogItemConfigT,
	CatalogItemMediaT,
	MediaImportT
} from './catalog.types.ts';

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
	const mediaContainerRef = get(mediaContainerRefStore);
	if (!mediaContainerRef) return;

	const { clientWidth, scrollWidth } = mediaContainerRef;
	if (scrollWidth <= clientWidth) return;

	const children = mediaContainerRef.children;
	let offsetLeft = 0;

	for (let i = 0; i < itemIndex; i++) {
		offsetLeft += children[i].scrollWidth;
	}
	offsetLeft += children[itemIndex].scrollWidth / 2;

	mediaContainerRef.scrollLeft = offsetLeft - clientWidth / 2;
};

export const handleCatalogItemNavigation = async (
	directionModifier: -1 | 1,
	resetMediaIndex = false
) => {
	const catalog = get(catalogStore);
	let catalogItemIndex = get(catalogItemIndexStore);

	if (catalogItemIndex === null) {
		catalogItemIndex = directionModifier === -1 ? catalog.length : -1;
	}

	const targetItem =
		catalog[(catalogItemIndex + directionModifier + catalog.length) % catalog.length];
	const targetItemMediaCount = targetItem?.media?.length ?? 0;

	await goto(targetItem.id);

	if (resetMediaIndex) {
		catalogItemMediaIndexStore.set(0);
	} else {
		catalogItemMediaIndexStore.set(
			directionModifier === 1 ? 0 : Math.max(targetItemMediaCount - 1, 0)
		);
	}
};

export const handleCatalogItemMediaNavigation = (directionModifier: -1 | 1) => {
	const catalog = get(catalogStore);
	const catalogItemIndex = get(catalogItemIndexStore) || 0;

	const item = catalog[catalogItemIndex];
	if (!item.media?.length) return;

	const catalogItemMediaIndex = get(catalogItemMediaIndexStore);

	if (
		(directionModifier === 1 && catalogItemMediaIndex === item.media.length - 1) ||
		(directionModifier === -1 && catalogItemMediaIndex === 0)
	) {
		handleCatalogItemNavigation(directionModifier);
		return;
	}

	const targetIdex =
		(catalogItemMediaIndex + directionModifier + item.media.length) % item.media.length;

	catalogItemMediaIndexStore.set(targetIdex);
	centerMediaContainer(targetIdex);
};

export const handleCatalogKeyboardNavigation = (e: KeyboardEvent) => {
	const catalogItemIndex = get(catalogItemIndexStore);
	const isBrowsingCatalog = catalogItemIndex !== null;

	switch (e.key) {
		case 'ArrowUp':
		case 'w':
			handleCatalogItemNavigation(-1, true);
			break;
		case 'ArrowDown':
		case 's':
			handleCatalogItemNavigation(1, true);
			break;
		case 'ArrowLeft':
		case 'a':
			if (isBrowsingCatalog) handleCatalogItemMediaNavigation(-1);
			break;
		case 'ArrowRight':
		case 'd':
			if (isBrowsingCatalog) handleCatalogItemMediaNavigation(1);
			break;
		default:
			return;
	}
};
