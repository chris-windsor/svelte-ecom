import { fail, redirect } from '@sveltejs/kit';
import retriever from '$lib/utils/wretch.js';
import { RESPONSE_SUCCESS_DESCRIPTOR } from '$lib/utils/constants.js';
import type { Actions } from './$types';

type InquirePasswordResetResponse = {
	status: typeof RESPONSE_SUCCESS_DESCRIPTOR;
};

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');

		const resp = await retriever
			.json({
				email
			})
			.url('/auth/inquire_password_reset')
			.post()
			.json<InquirePasswordResetResponse>()
			.catch((err) => {
				if (err.json) {
					return fail(400, { message: err.json.message });
				}

				return fail(400, { message: 'Error encountered while attempting reset inquiry' });
			});

		if (resp.status !== RESPONSE_SUCCESS_DESCRIPTOR) {
			return fail(400, { message: resp.data.message });
		}

		redirect(302, '/auth/signin');
	}
} satisfies Actions;
