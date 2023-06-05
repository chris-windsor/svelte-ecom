import retriever from '$lib/utils/wretch';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const completeResponse: any = {};
	const editId = url.searchParams.get('id');

	if (editId) {
		const data: any = await retriever.url(`/attribute/${editId}`).get().json();
		completeResponse.editAttribute = data.product;
	}

	return completeResponse;
}) satisfies PageServerLoad;

export const actions = {
	createAttribute: async ({ fetch, request }) => {
		const data = await request.formData();

		const id = data.get('id');
		const label = data.get('label');
		const kind = data.get('kind');
		const options = [...data.entries()]
			.filter(([key]) => key.startsWith('options'))
			.reduce((acc: any, [key, value]) => {
				const [prefix, name] = key.split('.');
				const id = parseInt(prefix.charAt(prefix.lastIndexOf('[') + 1));
				acc[id] = {
					...acc[id],
					[name]: value
				};
				return acc;
			}, []);

		// TODO: if ID is defined, update attribute rather than creating it
		const resp = await fetch('http://127.0.0.1:4567/api/product/attribute', {
			method: 'POST',
			body: JSON.stringify({
				label,
				kind,
				options
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return resp.json();
	}
} satisfies Actions;
