import { PUBLIC_SERVER_ADDRESS } from '$env/static/public';
import wretch from 'wretch';
import { throttlingCache } from 'wretch/middlewares';

const retriever = wretch(PUBLIC_SERVER_ADDRESS);

retriever.middlewares([
	throttlingCache({
		throttle: 3000,
		skip: (url, opts) => opts.skipCache || opts.method !== 'GET',
		key: (url, opts) => opts.method + '@' + url,
		condition: (response) => response.ok,
		flagResponseOnCacheHit: '__cached'
	})
]);

export default retriever;
