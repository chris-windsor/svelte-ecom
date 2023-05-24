import { fail, redirect } from '@sveltejs/kit';
import retriever from '../../../../utils/wretch.js';
import { RESPONSE_SUCCESS_DESCRIPTOR } from '../../../../utils/constants.js';

type RegisterResponse = {
	status: string;
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
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
			.json<RegisterResponse>();

		if (resp.status !== RESPONSE_SUCCESS_DESCRIPTOR) {
			return fail(400);
		}

		throw redirect(302, '/auth/signin');
	}
};
