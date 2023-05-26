import wretch from 'wretch';
import { throttlingCache } from 'wretch/middlewares';

const retriever = wretch('http://127.0.0.1:4567/api');

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
