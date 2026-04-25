import { decode } from 'html-entities';

import { ABOUT_BIO } from '@/modules/about';

export const META_DOMAIN = 'https://bartosjiri.com';

export const META_TITLE = `bartosjiri`;
export const META_DESCRIPTION = decode(ABOUT_BIO);
export const META_KEYWORDS = [
	'bartosjiri',
	'Jiri Bartos',
	'Jiří Bartoš',
	'software engineer',
	'svelte developer',
	'sveltekit developer',
	'creative technologist'
];

export const META_AUTHOR = 'Jiri Bartos';
export const META_AUTHOR_NATIVE = 'Jiří Bartoš';
export const META_ALIAS = 'bartosjiri';

export const META_JOB_TITLE = 'Software Engineer';
export const META_JOB_SKILLS = [
	'Svelte',
	'SvelteKit',
	'JavaScript',
	'TypeScript',
	'React',
	'Full-stack web development'
];

export const META_LOCATION = 'Prague';
export const META_COUNTRY = 'CZ';

export const META_COLOR_THEME = '#020303';
export const META_COLOR_APPLE = '#ff0033';
export const META_COLOR_MICROSOFT = '#020303';

export const META_OG_URL = META_DOMAIN;
export const META_OG_IMAGE_URL = `${META_OG_URL}/meta/og-image.png`;
export const META_OG_IMAGE_WIDTH = 1200;
export const META_OG_IMAGE_HEIGHT = 630;

export const META_VERSION = '1mx5e24lw7';
