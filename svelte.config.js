import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess({})],
	kit: {
		adapter: adapter(),
		alias: {
			$assets: './static/assets',
			$lib: './src/lib',
			$modules: './src/modules',
			$util: './src/util'
		}
	}
};

export default config;
