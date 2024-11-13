import { error } from '@sveltejs/kit';

import { loadCatalogData } from '$modules/catalog';

import type { CatalogListT } from '$modules/catalog';

export const load = async () => {
	try {
		const catalogData = await loadCatalogData();
		return { catalog: catalogData as CatalogListT };
	} catch (err) {
		error(500);
	}
};
