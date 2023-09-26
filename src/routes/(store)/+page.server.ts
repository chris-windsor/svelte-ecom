import { getProducts } from '$lib/services/store';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const productGrid = getProducts();

	return {
		productGrid
	};
}) satisfies PageServerLoad;
