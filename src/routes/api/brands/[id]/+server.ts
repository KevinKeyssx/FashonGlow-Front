import type { RequestHandler } from './$types';
import { proxyToBackend } from '$lib/server/api-proxy';
import { EXTERNAL_ENDPOINT } from '$lib/utils/endpoints';

export const GET: RequestHandler = async ({ params }) => {
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.BRANDS.DETAIL( params.id ),
		method		: 'GET',
	});
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	const body = await request.json().catch( () => ({}) );
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.BRANDS.UPDATE( params.id ),
		method		: 'PATCH',
		body,
	});
};

export const DELETE: RequestHandler = async ({ params }) => {
	return await proxyToBackend({
		endpoint	: EXTERNAL_ENDPOINT.BRANDS.DELETE( params.id ),
		method		: 'DELETE',
	});
};
