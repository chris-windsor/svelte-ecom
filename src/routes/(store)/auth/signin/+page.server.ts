import { fail, redirect } from '@sveltejs/kit';
import { RESPONSE_SUCCESS_DESCRIPTOR } from '$lib/utils/constants.js';
import type { Actions } from './$types';

type LoginResponse = {
	token: string;
	status: string;
};

export const actions = {
	default: async ({ cookies, fetch, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const res = await fetch('http://127.0.0.1:4567/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			}),
			headers: [['Content-Type', 'application/json']]
		});

		let resp = await res.json();

		if (resp.status !== RESPONSE_SUCCESS_DESCRIPTOR) {
			return fail(400, resp);
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
