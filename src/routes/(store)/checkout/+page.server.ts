import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { processOrder } from '$lib/services/store';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const emailAddress = data.get('emailAddress');
		const firstName = data.get('firstName');
		const lastName = data.get('lastName');
		const streetAddress1 = data.get('streetAddress1');
		const streetAddress2 = data.get('streetAddress2');
		const city = data.get('city');
		const state = data.get('state');
		const zipCode = data.get('zipCode');
		const phoneNumber = data.get('phoneNumber');
		const creditCardNumber = ((data.get('ccNumber') as string) || '').replace(/\D/g, '');
		const creditCardExpiry = ((data.get('ccExpiry') as string) || '').replace(/\D/g, '');
		const creditCardCvv = data.get('ccSecurityCode');
		const creditCardName = data.get('ccName');
		const cartItems = (data.get('orderItems') as string) || '';

		const customerDetails = {
			emailAddress,
			firstName,
			lastName,
			streetAddress1,
			streetAddress2,
			city,
			state,
			zipCode,
			phoneNumber
		};

		const paymentDetails = {
			creditCardNumber,
			creditCardExpiry,
			creditCardCvv,
			creditCardName
		};

		const orderItems = cartItems.split(',').map((itemData) => {
			const [id, qty] = itemData.split(';');
			return {
				id,
				qty: parseInt(qty)
			};
		});

		const resp: any = await processOrder(customerDetails, paymentDetails, orderItems);
		console.debug(resp);

		if (resp.status === 200) {
			redirect(303, '/checkout/success');
		} else {
			return resp.json();
		}
	}
} satisfies Actions;
