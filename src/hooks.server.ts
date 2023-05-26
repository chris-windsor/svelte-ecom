import { redirect } from '@sveltejs/kit';
import jwt_decode from 'jwt-decode';

type AuthToken = {
	role: string;
};

const ACCOUNT_LEVEL_ROUTE_PREFIX = '/(account)';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.route.id?.startsWith(ACCOUNT_LEVEL_ROUTE_PREFIX)) {
		const token = event.cookies.get('token');

		if (!token?.length) {
			throw redirect(302, '/auth/signin');
		}

		const decoded_token = jwt_decode<AuthToken>(token);

		if (
			event.route.id.startsWith(ACCOUNT_LEVEL_ROUTE_PREFIX + '/admin') &&
			decoded_token.role !== 'admin'
		) {
			throw redirect(302, '/account');
		}
	}

	return await resolve(event);
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event }) {
	return {
		message: error.message
	};
}
