import type { Product, Resp } from '$lib/appTypes';
import retriever from '$lib/utils/wretch';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const data = await retriever.url(`/product/${params.slug}`).get().json<Resp<Product>>();
	return data;
}) satisfies PageServerLoad;
