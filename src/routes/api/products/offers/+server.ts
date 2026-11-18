import type { RequestHandler } from './$types';
import { proxyToBackend } from '$lib/server/api-proxy';
import { EXTERNAL_ENDPOINT } from '$lib/utils/endpoints';

export const GET: RequestHandler = async () => {
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.PRODUCTS.OFFERS,
		method		: 'GET',
	});
};
