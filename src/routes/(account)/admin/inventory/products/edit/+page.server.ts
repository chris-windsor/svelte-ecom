import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const completeResponse: any = {};

	const upladedImagesRes = await fetch('http://127.0.0.1:4567/api/list_files');
	const { data: uploadedImages } = await upladedImagesRes.json();
	completeResponse.images = uploadedImages.images;

	const categoriesRes = await fetch('http://127.0.0.1:4567/api/product/categories');
	const { categories } = await categoriesRes.json();
	completeResponse.categories = categories;

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
