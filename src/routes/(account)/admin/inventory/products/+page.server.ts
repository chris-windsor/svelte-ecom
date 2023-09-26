import { getProducts } from '$lib/services/store';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const data = await getProducts();
	return data;
}) satisfies PageServerLoad;
