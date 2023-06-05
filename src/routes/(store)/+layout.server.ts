import type { ProductCategoriesRes } from '$lib/peach';
import retriever from '$lib/utils/wretch';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const productCategories = await retriever
		.url('/product/categories')
		.get()
		.json<ProductCategoriesRes>();

	return {
		productCategories
	};
}) satisfies LayoutServerLoad;
