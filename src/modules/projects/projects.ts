import type { ProjectT } from './projects.types';

import DogvisionLogo from '$assets/dogvision-logo.svg?raw';
import DogvisionLogoOutline from '$assets/dogvision-logo-outline.svg?raw';
import WeardrobeLogo from '$assets/weardrobe-logo.svg?raw';
import WeardrobeLogoOutline from '$assets/weardrobe-logo-outline.svg?raw';
import MultisightLogo from '$assets/multisight-logo.svg?raw';
import MultisightLogoOutline from '$assets/multisight-logo-outline.svg?raw';
// import GgtvLogo from '$assets/ggtv-logo.svg?raw';
// import GgtvLogoOutline from '$assets/ggtv-logo-outline.svg?raw';
import MixtapesLogo from '$assets/mixtapes-logo.svg?raw';
import MixtapesLogoOutline from '$assets/mixtapes-logo-outline.svg?raw';
import HyperhidrosisLogo from '$assets/hyperhidrosis-logo.svg?raw';
import HyperhidrosisLogoOutline from '$assets/hyperhidrosis-logo-outline.svg?raw';
import GoblinphoneLogo from '$assets/goblinphone-logo.svg?raw';
import GoblinphoneLogoOutline from '$assets/goblinphone-logo-outline.svg?raw';

export const PROJECTS: ProjectT[] = [
	{
		title: 'DogVision',
		logo: DogvisionLogo,
		logoOutline: DogvisionLogoOutline,
		description: "An app for visualizing a dog's color perception",
		href: 'https://dogvision.vercel.app',
		timeframe: 'December 2023'
	},
	{
		title: 'Multisight',
		logo: MultisightLogo,
		logoOutline: MultisightLogoOutline,
		description: 'A multisignature wallet response activity analytics tool',
		href: 'https://multisight.app',
		timeframe: 'July 2023'
	},
	// {
	// 	title: 'GGTV',
	// 	logo: GgtvLogo,
	// 	logoOutline: GgtvLogoOutline,
	// 	description: 'A GTA5 roleplay community content hub',
	// 	href: 'https://gulaggang.tv',
	// 	timeframe: 'June 2023'
	// },
	{
		title: 'Mixtapes',
		logo: MixtapesLogo,
		logoOutline: MixtapesLogoOutline,
		description: 'A showcase of personal playlists',
		href: 'https://mixtapes.bartosjiri.com',
		timeframe: 'May 2023'
	},
	{
		title: 'Hyperhidrosis Help',
		logo: HyperhidrosisLogo,
		logoOutline: HyperhidrosisLogoOutline,
		description: 'An educational microsite about hyperhidrosis',
		href: 'https://hyperhidrosis.help',
		timeframe: 'April 2023'
	},
	{
		title: 'Weardrobe',
		logo: WeardrobeLogo,
		logoOutline: WeardrobeLogoOutline,
		description: 'A community-curated digital fashion gallery',
		href: 'https://weardrobe.xyz',
		timeframe: 'November 2022'
	},
	{
		title: 'Goblin Phone',
		logo: GoblinphoneLogo,
		logoOutline: GoblinphoneLogoOutline,
		description: 'An NFT collection derivative art project',
		href: 'https://goblinphone.vercel.app',
		timeframe: 'June 2022'
	}
];
