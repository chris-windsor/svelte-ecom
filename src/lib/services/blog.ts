import retriever from '$lib/utils/wretch';

export async function getPost(slug: string) {
	return await retriever
		.url('/content?slug=' + slug)
		.get()
		.json<any>();
}
