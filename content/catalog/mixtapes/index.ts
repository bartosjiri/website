import type { CatalogItemConfigT } from '$modules/catalog';

export const mixtapes: CatalogItemConfigT = {
	name: 'Mixtapes',
	type: 'Personal',
	category: 'project',
	timeframe: {
		start: 202305
	},
	description: 'A&nbsp;showcase of selected personal Spotify playlists.',
	links: [
		{
			url: 'https://mixtapes.bartosjiri.com',
			label: 'mixtapes.bartosjiri.com'
		}
	]
};
