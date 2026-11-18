import { json } from '@sveltejs/kit';
import { serverEnv } from '$lib/config/server-env';

export interface ProxyOptions {
	endpoint		: string;
	method?			: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	body?			: unknown;
	searchParams?	: URLSearchParams;
}

export interface ProxyErrorResponse {
	statusCode	: number;
	message		: string;
}

export const proxyToBackend = async ({
	endpoint,
	method = 'GET',
	body,
	searchParams,
}: ProxyOptions ): Promise<Response> => {
	const queryString = searchParams && searchParams.toString().length > 0
		? `?${ searchParams.toString() }`
		: '';
	const targetUrl = `${ serverEnv.BACKEND_API_URL }/${ endpoint }${ queryString }`;

	try {
		const headers: Record<string, string> = {
			'Content-Type'	: 'application/json',
		};

		const res = await fetch( targetUrl, {
			method,
			headers,
			body	: body ? JSON.stringify( body ) : undefined,
		} );

		const data = await res.json().catch( () => ({}) );
		return json( data, { status: res.status } );
	} catch ( error ) {
		console.error( `[BFF Proxy Error] No se pudo conectar con ${ targetUrl }:`, error );
		const errorPayload: ProxyErrorResponse = {
			statusCode	: 503,
			message		: 'Backend no disponible. Verifique que el servicio NestJS esté corriendo.',
		};
		return json( errorPayload, {
			status	: 503,
		} );
	}
};
