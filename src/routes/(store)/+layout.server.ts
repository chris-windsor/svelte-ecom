import { getCategories } from '$lib/services/store';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const productCategories = getCategories();

	return {
		productCategories
	};
}) satisfies LayoutServerLoad;
