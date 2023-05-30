import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import jwt_decode from 'jwt-decode';
import type { AuthToken } from '$lib/peach';

export const load = (async ({ cookies }) => {
	const token = cookies.get('token');
	const decoded_token = jwt_decode<AuthToken>(token || '');

	if (decoded_token.role !== 'admin') {
		throw redirect(302, '/auth/signin');
	}

	return {
		name: decoded_token.name
	};
}) satisfies PageServerLoad;
