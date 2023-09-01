import type { ProductGridRes } from '$lib/peach';
import retriever from '$lib/utils/wretch';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const data = await retriever.url('/products').get().json<ProductGridRes>();
	return data;
}) satisfies PageServerLoad;
