/** @type {import('@sveltejs/kit').HandleClientError} */
export async function handleError({ error, event }) {
	return {
		message: 'hmmph!'
	};
}
