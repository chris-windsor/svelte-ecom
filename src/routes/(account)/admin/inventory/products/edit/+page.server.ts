import { PUBLIC_SERVER_ADDRESS } from '$env/static/public';
import { getAttributes, getCategories } from '$lib/services/store';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';

const productSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	shortUrl: z.string(),
	primaryImageId: z.string(),
	description: z.string(),
	price: z.number(),
	stock: z.number(),
	maxPurchaseQty: z.number(),
	sku: z.string(),
	category: z.number().default(-1),
	attributes: z.array(z.number()),
	variationAttributes: z.array(z.number()),
	manageStock: z.boolean().default(true),
	allowBackOrders: z.boolean(),
	restockNotifications: z.boolean(),
	publishState: z.string(),
	variations: z.array(
		z.object({
			stock: z.number(),
			price: z.number(),
			sku: z.string(),
			label: z.string()
		})
	)
});

export const load = (async ({ fetch }) => {
	const availableImages = await fetch(PUBLIC_SERVER_ADDRESS + '/list_files');
	const {
		data: { images = [] }
	} = await availableImages.json();

	const { categories = [] } = await getCategories();
	const { attributes = [] } = await getAttributes();

	const form = await superValidate(productSchema);

	return { form, categories, attributes, images };
}) satisfies PageServerLoad;

export const actions = {
	createProduct: async ({ request, fetch }) => {
		const form = await superValidate(request, productSchema);

		if (!form.valid) {
			return message(form, 'Product schema not fulfilled');
		}

		const resp = await fetch(PUBLIC_SERVER_ADDRESS + '/product', {
			method: 'POST',
			body: JSON.stringify({}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return message(form, 'Product created?!?');
	},
	uploadFile: async ({ fetch, request }) => {
		const data = await request.formData();

		await fetch(PUBLIC_SERVER_ADDRESS + '/upload_file', {
			method: 'POST',
			body: data
		});
	}
} satisfies Actions;
