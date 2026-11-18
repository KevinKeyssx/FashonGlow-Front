import type { CatalogFilters, FacetedResponse, ProductWithRelations } from '$lib/types';
import { clientEnv } from '$lib/config/client-env';
import { INTERNAL_ENDPOINT } from '$lib/utils/endpoints';

const serializeFilters = ( filters: CatalogFilters ): URLSearchParams => {
	const params = new URLSearchParams();

	if ( filters.query ) params.set( 'query', filters.query );
	if ( filters.categorySlug ) params.set( 'categorySlug', filters.categorySlug );
	if ( filters.subcategorySlug ) params.set( 'subcategorySlug', filters.subcategorySlug );
	if ( filters.genders.length > 0 ) params.set( 'genders', filters.genders.join( ',' ) );
	if ( filters.brandSlugs.length > 0 ) params.set( 'brandSlugs', filters.brandSlugs.join( ',' ) );
	if ( filters.colorFamilies.length > 0 ) params.set( 'colorFamilies', filters.colorFamilies.join( ',' ) );
	if ( filters.sizes.length > 0 ) params.set( 'sizes', filters.sizes.join( ',' ) );
	if ( filters.priceMin !== null ) params.set( 'priceMin', filters.priceMin.toString() );
	if ( filters.priceMax !== null ) params.set( 'priceMax', filters.priceMax.toString() );
	if ( Object.keys( filters.attributes ).length > 0 ) {
		params.set( 'attributes', JSON.stringify( filters.attributes ) );
	}
	if ( filters.onlyOnSale ) params.set( 'onlyOnSale', 'true' );
	if ( filters.onlyInStock ) params.set( 'onlyInStock', 'true' );
	if ( filters.sort ) params.set( 'sort', filters.sort );
	if ( filters.page ) params.set( 'page', filters.page.toString() );
	if ( filters.pageSize ) params.set( 'pageSize', filters.pageSize.toString() );

	return params;
};

export const getProducts = async ( filters: CatalogFilters ): Promise<FacetedResponse> => {
	const searchParams = serializeFilters( filters );
	const url = `${ clientEnv.PUBLIC_API_BASE }/${ INTERNAL_ENDPOINT.PRODUCTS.LIST }?${ searchParams.toString() }`;
	const res = await fetch( url );

	if ( !res.ok ) {
		throw new Error( `Error fetching products: ${ res.statusText }` );
	}

	return await res.json();
};

export const getProductBySlug = async ( slug: string ): Promise<ProductWithRelations | null> => {
	const url = `${ clientEnv.PUBLIC_API_BASE }/${ INTERNAL_ENDPOINT.PRODUCTS.DETAIL( slug ) }`;
	const res = await fetch( url );

	if ( res.status === 404 ) {
		return null;
	}

	if ( !res.ok ) {
		throw new Error( `Error fetching product '${ slug }': ${ res.statusText }` );
	}

	return await res.json();
};

export const getFeaturedProducts = async (): Promise<ProductWithRelations[]> => {
	const url = `${ clientEnv.PUBLIC_API_BASE }/${ INTERNAL_ENDPOINT.PRODUCTS.FEATURED }`;
	const res = await fetch( url );

	if ( !res.ok ) {
		throw new Error( `Error fetching featured products: ${ res.statusText }` );
	}

	return await res.json();
};

export const getOfferProducts = async (): Promise<ProductWithRelations[]> => {
	const url = `${ clientEnv.PUBLIC_API_BASE }/${ INTERNAL_ENDPOINT.PRODUCTS.OFFERS }`;
	const res = await fetch( url );

	if ( !res.ok ) {
		throw new Error( `Error fetching offer products: ${ res.statusText }` );
	}

	return await res.json();
};
