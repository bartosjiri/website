import { redirect } from '@sveltejs/kit';

import { ABOUT_LINKS } from '@/modules/about';

export const load = () => {
	throw redirect(302, ABOUT_LINKS.TWITTER);
};
