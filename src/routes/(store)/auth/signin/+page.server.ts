import { fail, redirect } from '@sveltejs/kit';
import retriever from '../../../../utils/wretch.js';
import { RESPONSE_SUCCESS_DESCRIPTOR } from '../../../../utils/constants.js';

type LoginResponse = {
	token: string;
	status: string;
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const resp = await retriever
			.json({
				email,
				password
			})
			.url('/auth/login')
			.post()
			.json<LoginResponse>();

		if (resp.status !== RESPONSE_SUCCESS_DESCRIPTOR) {
			return fail(400);
		}

		cookies.set('token', resp.token, {
			domain: 'localhost',
			path: '/',
			secure: false,
			sameSite: 'lax'
		});
		throw redirect(303, '/account');
	}
};
