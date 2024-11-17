import type { CatalogItemConfigT } from '$modules/catalog';

export const superchainChiblings: CatalogItemConfigT = {
	name: 'Superchain Chiblings',
	type: 'NFT collection',
	category: 'project',
	timeframe: {
		start: 202407,
		end: null
	},
	description:
		'A&nbsp;custom NFT minting experience for the&nbsp;Superchain Chiblings collection by <a href="https://twitter.com/ttyl5h" target="_blank">Secretpikachu</a>. The&nbsp;collection minted 20,000 tokens in less than an&nbsp;hour.<br/>It&nbsp;was later open-sourced and&nbsp;featured as a&nbsp;case study in&nbsp;Highlight\'s official documentation.',
	links: [
		{
			url: 'https://superchainchiblings.com',
			label: 'superchainchiblings.com'
		},
		{
			url: 'https://support.highlight.xyz/knowledge-base/for-creators/use-embeds-to-build-custom-mint-sites/case-study-how-superchain-chiblings-launched-a-fully-custom-website-on-highlight-x-base',
			label: 'highlight.xyz'
		}
	]
};
