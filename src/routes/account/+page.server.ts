import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import jwt_decode from 'jwt-decode';

type AuthToken = {
	name: string;
	exp: number;
};

export const load = (async ({ cookies }) => {
	const decoded_token = jwt_decode<AuthToken>(cookies.get('token') || '');

	const now = Date.now();
	if (decoded_token.exp * 1000 < now) {
		throw redirect(302, '/auth/signin');
	}

	return {
		name: decoded_token.name
	};
}) satisfies PageServerLoad;
