import type { RequestHandler } from './$types';
import { proxyToBackend } from '$lib/server/api-proxy';
import { EXTERNAL_ENDPOINT } from '$lib/utils/endpoints';

export const GET: RequestHandler = async ({ url }) => {
	return await proxyToBackend({
		endpoint		: EXTERNAL_ENDPOINT.PRODUCTS.LIST,
		method			: 'GET',
		searchParams	: url.searchParams,
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch( () => ({}) );
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.PRODUCTS.CREATE,
		method		: 'POST',
		body,
	});
};
