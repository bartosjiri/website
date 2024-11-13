import type { ImageToolsConfigT } from '@/util/vite-imagetools';

export const CATALOG_MEDIA_CONFIG: ImageToolsConfigT = {
	withoutEnlargement: false,
	h: [200, 1280],
	format: ['avif', 'webp', 'png']
};
