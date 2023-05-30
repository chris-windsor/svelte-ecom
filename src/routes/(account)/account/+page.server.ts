import type { PageServerLoad } from './$types';
import jwt_decode from 'jwt-decode';
import type { AuthToken } from '$lib/peach';

export const load = (async ({ cookies }) => {
	const token = cookies.get('token');
	const decoded_token = jwt_decode<AuthToken>(token || '');

	return {
		name: decoded_token.name
	};
}) satisfies PageServerLoad;
