import { fail, redirect } from '@sveltejs/kit';
import retriever from '$lib/utils/wretch.js';
import { RESPONSE_SUCCESS_DESCRIPTOR } from '$lib/utils/constants.js';
import type { Actions } from './$types';

type ResetPasswordResponse = {
	status: typeof RESPONSE_SUCCESS_DESCRIPTOR;
};

export const actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();
		const password = data.get('password');

		const token = url.searchParams.get('token');

		const resp = await retriever
			.json({
				token,
				password
			})
			.url('/auth/change_password')
			.post()
			.json<ResetPasswordResponse>()
			.catch((err) => {
				if (err.json) {
					return fail(400, { message: err.json.message });
				}

				return fail(400, { message: 'Error encountered while attempting password reset' });
			});

		if (resp.status !== RESPONSE_SUCCESS_DESCRIPTOR) {
			return fail(400, { message: resp.data.message });
		}

		redirect(302, '/auth/signin');
	}
} satisfies Actions;
