import retriever from '$lib/utils/wretch';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const data = await retriever.url(`/product/${params.slug}`).get().json();
	return data;
}) satisfies PageServerLoad;
