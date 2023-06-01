import { fail, redirect } from '@sveltejs/kit';
import { RESPONSE_SUCCESS_DESCRIPTOR, type USER_ROLE } from '$lib/utils/constants.js';
import type { Actions } from './$types';
import retriever from '$lib/utils/wretch';

type LoginResponse = {
	status: typeof RESPONSE_SUCCESS_DESCRIPTOR;
	token: string;
	role: USER_ROLE;
};

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
			.json<LoginResponse>()
			.catch((err) => {
				if (err.json) {
					return fail(400, { message: err.json.message });
				}

				return fail(400, { message: 'Error encountered while attempting authentication' });
			});

		if (resp.status !== RESPONSE_SUCCESS_DESCRIPTOR) {
			return fail(400, { message: resp.data.message });
		}

		cookies.set('token', resp.token, {
			domain: 'localhost',
			path: '/',
			secure: false,
			sameSite: 'lax'
		});

		if (resp.role === 'admin') {
			throw redirect(303, '/admin');
		}

		throw redirect(303, '/account');
	}
} satisfies Actions;
