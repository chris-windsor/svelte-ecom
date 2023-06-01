import { fail, redirect } from '@sveltejs/kit';
import retriever from '$lib/utils/wretch.js';
import { RESPONSE_SUCCESS_DESCRIPTOR } from '$lib/utils/constants.js';
import type { Actions } from './$types';

type RegisterResponse = {
	status: typeof RESPONSE_SUCCESS_DESCRIPTOR;
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');

		const resp = await retriever
			.json({
				name,
				email,
				password
			})
			.url('/auth/register')
			.post()
			.json<RegisterResponse>()
			.catch((err) => {
				if (err.json) {
					return fail(400, { message: err.json.message });
				}

				return fail(400, { message: 'Error encountered while attempting registration' });
			});

		if (resp.status !== RESPONSE_SUCCESS_DESCRIPTOR) {
			return fail(400, { message: resp.data.message });
		}

		throw redirect(302, '/auth/signin');
	}
} satisfies Actions;
