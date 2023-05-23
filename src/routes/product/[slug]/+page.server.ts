import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const data = await fetch(`http://127.0.0.1:4567/api/product/${params.slug}`).then((res) =>
		res.json()
	);
	return data;
}) satisfies PageServerLoad;
