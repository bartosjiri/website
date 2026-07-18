import { response } from 'super-sitemap/sveltekit';

import { META_DOMAIN } from '@/util/meta';

export const GET = async () => {
	return await response({
		origin: META_DOMAIN,
		additionalPaths: ['/llms.txt']
	});
};
