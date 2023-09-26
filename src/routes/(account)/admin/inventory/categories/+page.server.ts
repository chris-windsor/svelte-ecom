import { PUBLIC_SERVER_ADDRESS } from '$env/static/public';
import { getCategories } from '$lib/services/store';
import retriever from '$lib/utils/wretch';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const completeResponse: any = {};
	const editId = url.searchParams.get('id');

	if (editId) {
		const data: any = await retriever.url(`/category/${editId}`).get().json();
		completeResponse.editCategory = data.product;
	}
	const { categories } = await getCategories();
	completeResponse.categories = categories;

	return completeResponse;
}) satisfies PageServerLoad;

export const actions = {
	createCategory: async ({ fetch, request }) => {
		const data = await request.formData();

		const id = data.get('id');
		const label = data.get('label');
		const parentId = parseInt(data.get('parentId')?.toString() || '');

		// TODO: if ID is defined, update category rather than creating it
		const resp = await fetch(PUBLIC_SERVER_ADDRESS + '/product/category', {
			method: 'POST',
			body: JSON.stringify({
				label,
				parentId
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return resp.json();
	}
} satisfies Actions;
