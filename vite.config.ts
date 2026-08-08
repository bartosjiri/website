import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

import { transformConfigToDirectives } from './src/util/vite-imagetools';
import { generateOgImage } from './src/util/ogig';

import { CATALOG_MEDIA_CONFIG } from './src/modules/catalog/catalog.config';

export default defineConfig({
	plugins: [
		imagetools({
			defaultDirectives: () => transformConfigToDirectives(CATALOG_MEDIA_CONFIG)
		}),
		generateOgImage(),
		sveltekit()
	],
	server: {
		fs: {
			allow: ['./content']
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				additionalData: '@use "/src/styles/_styles.scss" as *;'
			}
		}
	}
});
