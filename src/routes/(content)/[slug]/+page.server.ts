import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const resp = await fetch(`http://127.0.0.1:4567/api/content?slug=${params.slug}`);
	const staticPage = await resp.json();
	return staticPage;
}) satisfies PageServerLoad;
