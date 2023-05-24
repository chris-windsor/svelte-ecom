import { redirect } from '@sveltejs/kit';
import jwt_decode from 'jwt-decode';

type AuthToken = {
	role: string;
};

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.route.id?.startsWith('/account') || event.route.id?.startsWith('/admin')) {
		const token = event.cookies.get('token');

		if (!token?.length) {
			throw redirect(302, '/auth/signin');
		}

		const decoded_token = jwt_decode<AuthToken>(token);

		if (event.route.id.startsWith('/admin') && decoded_token.role !== 'admin') {
			throw redirect(302, '/account');
		}
	}

	return await resolve(event);
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event }) {
	return {
		message: 'hmmph!'
	};
}
