import { PUBLIC_SERVER_ADDRESS } from '$env/static/public';
import { getAttributes, getCategories } from '$lib/services/store';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const completeResponse: any = {};

	const upladedImagesRes = await fetch(PUBLIC_SERVER_ADDRESS + '/list_files');
	const { data: uploadedImages } = await upladedImagesRes.json();
	completeResponse.images = uploadedImages.images;

	const { categories } = await getCategories();
	completeResponse.categories = categories;

	const { attributes } = await getAttributes();
	completeResponse.attributes = attributes;

	return completeResponse;
}) satisfies PageServerLoad;

export const actions = {
	createProduct: async ({ fetch, request }) => {
		const data = await request.formData();

		const name = data.get('name');
		const shortUrl = data.get('short-url');
		const description = data.get('description');
		const price = parseFloat(data.get('price')?.toString() || '');
		const categories = data
			.get('categories')
			?.toString()
			.split(',')
			.map((c) => parseInt(c, 10))
			.filter(Boolean);
		const attributes = data
			.get('attributes')
			?.toString()
			.split(',')
			.map((c) => parseInt(c, 10))
			.filter(Boolean);
		const stock = parseInt(data.get('stock')?.toString() || '');
		const imageId = data.get('primary-image');

		const resp = await fetch('http://127.0.0.1:4567/api/product', {
			method: 'POST',
			body: JSON.stringify({
				name,
				shortUrl,
				description,
				price,
				categories,
				attributes,
				stock,
				imageId
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return resp.json();
	},
	uploadFile: async ({ fetch, request }) => {
		const data = await request.formData();

		await fetch('http://127.0.0.1:4567/api/upload_file', {
			method: 'POST',
			body: data
		});
	}
} satisfies Actions;
