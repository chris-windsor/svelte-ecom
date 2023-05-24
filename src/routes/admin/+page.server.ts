import type { PageServerLoad } from './$types';

export const load = (async () => {
	const data = await fetch('http://127.0.0.1:4567/api/products').then((res) => res.json());
	return data;
}) satisfies PageServerLoad;
