import type { CatalogItemConfigT } from '$modules/catalog';

export const dogVision: CatalogItemConfigT = {
	name: 'Dog Vision',
	type: 'Interactive tool',
	category: 'project',
	timeframe: {
		start: 202312
	},
	description: "A&nbsp;web app for visualizing a&nbsp;dog's color perception.",
	links: [
		{
			url: 'https://dogvision.vercel.app',
			label: 'dogvision.vercel.app'
		}
	]
};
