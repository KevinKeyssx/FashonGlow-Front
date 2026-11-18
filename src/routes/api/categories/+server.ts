import type { RequestHandler } from './$types';
import { proxyToBackend } from '$lib/server/api-proxy';
import { EXTERNAL_ENDPOINT } from '$lib/utils/endpoints';

export const GET: RequestHandler = async () => {
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.CATEGORIES.LIST,
		method		: 'GET',
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch( () => ({}) );
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.CATEGORIES.CREATE,
		method		: 'POST',
		body,
	});
};
