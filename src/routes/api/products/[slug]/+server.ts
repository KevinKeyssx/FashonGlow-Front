import type { RequestHandler } from './$types';
import { proxyToBackend } from '$lib/server/api-proxy';
import { EXTERNAL_ENDPOINT } from '$lib/utils/endpoints';

export const GET: RequestHandler = async ({ params }) => {
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.PRODUCTS.DETAIL( params.slug ),
		method		: 'GET',
	});
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	const body = await request.json().catch( () => ({}) );
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.PRODUCTS.UPDATE( params.slug ),
		method		: 'PATCH',
		body,
	});
};

export const DELETE: RequestHandler = async ({ params }) => {
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.PRODUCTS.DELETE( params.slug ),
		method		: 'DELETE',
	});
};
