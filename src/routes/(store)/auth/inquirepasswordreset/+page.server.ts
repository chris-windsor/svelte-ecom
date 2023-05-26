import { fail, redirect } from '@sveltejs/kit';
import retriever from '$lib/utils/wretch.js';
import { RESPONSE_SUCCESS_DESCRIPTOR } from '$lib/utils/constants.js';

type InquirePasswordResetResponse = {
	status: string;
};

/** @type {import('./$types').Actions} */
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
			.json<InquirePasswordResetResponse>();

		if (resp.status !== RESPONSE_SUCCESS_DESCRIPTOR) {
			return fail(400);
		}

		throw redirect(302, '/auth/signin');
	}
};
