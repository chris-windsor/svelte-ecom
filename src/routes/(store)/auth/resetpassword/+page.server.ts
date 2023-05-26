import { fail, redirect } from '@sveltejs/kit';
import retriever from '$lib/utils/wretch.js';
import { RESPONSE_SUCCESS_DESCRIPTOR } from '$lib/utils/constants.js';

type ResetPasswordResponse = {
	status: string;
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const password = data.get('password');
		const confirmPassword = data.get('confirmPassword');

		const resp = await retriever
			.json({
				password,
				confirmPassword
			})
			.url('/auth/change_password')
			.post()
			.json<ResetPasswordResponse>();

		if (resp.status !== RESPONSE_SUCCESS_DESCRIPTOR) {
			return fail(400);
		}

		throw redirect(302, '/auth/signin');
	}
};
