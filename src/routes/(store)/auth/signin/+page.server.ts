import { fail, redirect } from '@sveltejs/kit';
import { RESPONSE_SUCCESS_DESCRIPTOR, type USER_ROLE } from '$lib/utils/constants.js';
import type { Actions, PageServerLoad } from './$types';
import retriever from '$lib/utils/wretch';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

type LoginResponse = {
	status: typeof RESPONSE_SUCCESS_DESCRIPTOR;
	token: string;
	role: USER_ROLE;
};

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	remember: z.boolean().default(false)
});

export const load = (async () => {
	const form = await superValidate(loginSchema);

	return { form };
}) satisfies PageServerLoad;

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
			path: '/',
			secure: false,
			sameSite: 'lax'
		});

		if (resp.role === 'admin') {
			redirect(303, '/admin');
		}

		redirect(303, '/account');
	}
} satisfies Actions;
