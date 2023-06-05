import type { ActionFailure } from '@sveltejs/kit';

// TODO: remove this if wretch is compeltely removed
// will be useful if a way is found to utilize wretch
export function respIsError(resp: any): resp is ActionFailure<any> {
	return resp.status === 400;
}
