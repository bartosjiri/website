import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { decode } from 'html-entities';

import { ABOUT_BIO } from '../../modules/about/about.constants.ts';

import type { Plugin } from 'vite';

const LOGO_SOURCEPATH = fileURLToPath(
	new URL('../../lib/primitives/logo/assets/logo.svg', import.meta.url)
);
const FONT_SOURCEPATH = fileURLToPath(
	new URL('../../../static/fonts/BerkeleyMono-Regular.woff', import.meta.url)
);

const OUTPUT_PATH = fileURLToPath(new URL('../../../static/meta/og-image.png', import.meta.url));
const OUTPUT_WIDTH = 2400;
const OUTPUT_HEIGHT = 1260;

const OG_IMAGE_WATCHED_FILES = [
	fileURLToPath(new URL('../../modules/about/about.constants.ts', import.meta.url)),
	LOGO_SOURCEPATH,
	FONT_SOURCEPATH
];

export const generateOgImage = (): Plugin => ({
	name: 'vite-plugin-ogig',

	async buildStart() {
		await generatePng();
	},

	async handleHotUpdate({ file }) {
		if (OG_IMAGE_WATCHED_FILES.includes(file)) {
			await generatePng();
		}
	}
});

const generatePng = async () => {
	const [logoSvg, fontData] = await Promise.all([
		readFile(LOGO_SOURCEPATH, 'utf8'),
		readFile(FONT_SOURCEPATH)
	]);

	const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					rowGap: '54px',
					color: '#f7f6f2',
					backgroundColor: '#020303',
					padding: '60px'
				},
				children: [
					{
						type: 'img',
						props: { src: logoSrc, width: 75.5, height: 42 }
					},
					{
						type: 'div',
						props: {
							style: {
								maxWidth: 1280,
								fontSize: 42,
								fontFamily: 'Berkeley Mono',
								fontWeight: 400,
								lineHeight: 1,
								textTransform: 'uppercase'
							},
							children: decode(ABOUT_BIO).replaceAll('\u2011', '-')
						}
					}
				]
			}
		},
		{
			width: OUTPUT_WIDTH,
			height: OUTPUT_HEIGHT,
			fonts: [
				{
					name: 'Berkeley Mono',
					data: fontData,
					weight: 400,
					style: 'normal'
				}
			]
		}
	);

	const png = new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng();

	await writeFile(OUTPUT_PATH, png);
};

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
	try {
		await generatePng();
		console.log(`Generated ${OUTPUT_PATH}`);
	} catch (err) {
		console.error(`Failed to generate ${OUTPUT_PATH}:`, err);
		process.exit(1);
	}
}
