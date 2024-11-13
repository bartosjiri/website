import { error } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	try {
		const layoutData = await parent();

		const targetCatalogItem = layoutData?.catalog?.find((item) => item.id === params.catalogId);
		if (!targetCatalogItem) error(404);

		return { ...params };
	} catch (err) {
		if (import.meta.env.DEV) {
			console.log('[@DEBUG] /[catalogid]/+page.ts - err: ', err);
		}

		error(404);
	}
};
