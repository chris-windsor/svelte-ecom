import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import jwt_decode from 'jwt-decode';

type AuthToken = {
	name: string;
	exp: number;
};

export const load = (async ({ cookies }) => {
	const token = cookies.get('token');

	if (!token?.length) {
		throw redirect(302, '/auth/signin');
	}

	const decoded_token = jwt_decode<AuthToken>(token || '');

	const now = Date.now();
	if (decoded_token.exp * 1000 < now) {
		cookies.delete('token');
		throw redirect(302, '/auth/signin');
	}

	return {
		name: decoded_token.name
	};
}) satisfies PageServerLoad;
