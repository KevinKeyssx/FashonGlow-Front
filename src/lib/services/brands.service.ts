import type { Brand } from '$lib/types';
import { clientEnv } from '$lib/config/client-env';
import { INTERNAL_ENDPOINT } from '$lib/utils/endpoints';

export const getBrands = async (): Promise<Brand[]> => {
	const url = `${ clientEnv.PUBLIC_API_BASE }/${ INTERNAL_ENDPOINT.BRANDS.LIST }`;
	const res = await fetch( url );

	if ( !res.ok ) {
		throw new Error( `Error fetching brands: ${ res.statusText }` );
	}

	return await res.json();
};

export const getBrandByIdOrSlug = async ( idOrSlug: string ): Promise<Brand | null> => {
	const url = `${ clientEnv.PUBLIC_API_BASE }/${ INTERNAL_ENDPOINT.BRANDS.DETAIL( idOrSlug ) }`;
	const res = await fetch( url );

	if ( res.status === 404 ) {
		return null;
	}

	if ( !res.ok ) {
		throw new Error( `Error fetching brand '${ idOrSlug }': ${ res.statusText }` );
	}

	return await res.json();
};
