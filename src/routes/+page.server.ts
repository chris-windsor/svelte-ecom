import type { PageServerLoad } from './$types';

export const load = (async () => {
    const data = await fetch('http://localhost:4567/api/products').then(res => res.json());    
    return data;
}) satisfies PageServerLoad;