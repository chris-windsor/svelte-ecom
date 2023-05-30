import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const resp = await fetch('http://127.0.0.1:4567/api/list_files');

	const { data } = await resp.json();
	return data;
}) satisfies PageServerLoad;

export const actions = {
	createProduct: async ({ fetch, request }) => {
		const data = await request.formData();

		const name = data.get('name');
		const description = data.get('description');
		const price = parseFloat(data.get('price')?.toString() || '');
		const stock = parseInt(data.get('stock')?.toString() || '');
		const imageId = data.get('primary-image');

		const resp = await fetch('http://127.0.0.1:4567/api/product', {
			method: 'POST',
			body: JSON.stringify({
				name,
				description,
				price,
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
