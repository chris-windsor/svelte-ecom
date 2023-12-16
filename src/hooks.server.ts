import { dev } from '$app/environment';
import type { AuthToken } from '$lib/appTypes';
import { redirect, type HandleServerError, type HandleFetch, type Handle } from '@sveltejs/kit';
import jwt_decode from 'jwt-decode';

const ACCOUNT_LEVEL_ROUTE_PREFIX = '/(account)';

export const handle = (async ({ event, resolve }) => {
	if (event.route.id?.startsWith(ACCOUNT_LEVEL_ROUTE_PREFIX)) {
		const token = event.cookies.get('token');

		if (!token || !token?.length) {
			redirect(302, '/auth/signin');
		}

		const decoded_token = jwt_decode<AuthToken>(token);

		const now = Date.now();
		if (decoded_token.exp * 1000 < now) {
			event.cookies.delete('token', { path: '/' });
			redirect(302, '/auth/signin');
		}

		if (
			event.route.id.startsWith(ACCOUNT_LEVEL_ROUTE_PREFIX + '/admin') &&
			decoded_token.role !== 'admin'
		) {
			redirect(302, '/account');
		}
	}

	return await resolve(event);
}) satisfies Handle;

export const handleFetch = (async ({ event, request, fetch }) => {
	request.headers.set('cookie', event.request.headers.get('cookie') || '');
	return fetch(request);
}) satisfies HandleFetch;

export const handleError = (async ({ error, event }) => {
	if (dev) {
		console.error(error);
	}
	return {
		message: error.message + JSON.stringify(event)
	};
}) satisfies HandleServerError;
