import { META_DOMAIN } from '@/util/meta';

export const prerender = true;

export const GET = async () => {
	const body = [
		'User-agent: *',
		'Disallow:',
		'',
		`Sitemap: ${META_DOMAIN}/sitemap.xml`,
		`LLMs: ${META_DOMAIN}/llms.txt`
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
