import { error } from '@sveltejs/kit';

import { loadCatalogData } from '@/modules/catalog';

import type { CatalogListT } from '@/modules/catalog';

export const load = async () => {
	try {
		const catalogData = await loadCatalogData();
		return { catalog: catalogData as CatalogListT };
	} catch (err) {
		if (import.meta.env.DEV) {
			console.log('[@DEBUG] /+layout.ts - err: ', err);
		}

		error(500);
	}
};
