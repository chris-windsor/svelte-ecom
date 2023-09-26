import { getPost } from '$lib/services/blog';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const staticPage = await getPost(params.slug);
	return staticPage;
}) satisfies PageServerLoad;
