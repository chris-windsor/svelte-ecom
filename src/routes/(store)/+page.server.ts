import retriever from '../../utils/wretch';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const data = await retriever.url('/products').get().json();
	return data;
}) satisfies PageServerLoad;
