import type { CatalogFilters, Gender, SortOption } from '$lib/types';
import { DEFAULT_FILTERS } from '$lib/types';

export const serializeFilters = ( filters: CatalogFilters ): URLSearchParams => {
	const params = new URLSearchParams();
	if ( filters.query )                        params.set( 'q', filters.query );
	if ( filters.categorySlug )                  params.set( 'cat', filters.categorySlug );
	if ( filters.subcategorySlug )               params.set( 'sub', filters.subcategorySlug );
	if ( filters.genders.length )                params.set( 'gen', filters.genders.join( ',' ) );
	if ( filters.brandSlugs.length )             params.set( 'marca', filters.brandSlugs.join( ',' ) );
	if ( filters.colorFamilies.length )          params.set( 'color', filters.colorFamilies.join( ',' ) );
	if ( filters.sizes.length )                  params.set( 'talla', filters.sizes.join( ',' ) );
	if ( filters.priceMin !== null )             params.set( 'pmin', String( filters.priceMin ) );
	if ( filters.priceMax !== null )             params.set( 'pmax', String( filters.priceMax ) );
	if ( filters.onlyOnSale )                    params.set( 'oferta', '1' );
	if ( filters.onlyInStock )                   params.set( 'stock', '1' );
	if ( filters.sort !== DEFAULT_FILTERS.sort ) params.set( 'orden', filters.sort );
	if ( filters.page > 1 )                      params.set( 'pag', String( filters.page ) );

	for ( const [ slug, values ] of Object.entries( filters.attributes ) ) {
		if ( values.length ) params.set( `attr_${ slug }`, values.join( ',' ) );
	}

	return params;
};

const VALID_GENDERS: Gender[]   = [ 'HOMBRE', 'MUJER', 'UNISEX' ];
const VALID_SORTS: SortOption[] = [
	'relevancia', 'precio-asc', 'precio-desc', 'nombre-asc', 'nombre-desc', 'recientes',
];

export const parseFilters = ( searchParams: URLSearchParams ): CatalogFilters => {
	const rawGenders   = searchParams.get( 'gen' )?.split( ',' ) ?? [];
	const validGenders = rawGenders.filter( ( g ): g is Gender =>
		VALID_GENDERS.includes( g as Gender ),
	);

	const rawSort  = searchParams.get( 'orden' );
	const validSort: SortOption = ( rawSort && VALID_SORTS.includes( rawSort as SortOption ) )
		? ( rawSort as SortOption )
		: DEFAULT_FILTERS.sort;

	const attributes: Record<string, string[]> = {};
	for ( const [ key, value ] of searchParams.entries() ) {
		if ( key.startsWith( 'attr_' ) ) {
			const slug         = key.replace( 'attr_', '' );
			attributes[ slug ] = value.split( ',' );
		}
	}

	return {
		query           : searchParams.get( 'q' ) ?? '',
		categorySlug    : searchParams.get( 'cat' ),
		subcategorySlug : searchParams.get( 'sub' ),
		genders         : validGenders,
		brandSlugs      : searchParams.get( 'marca' )?.split( ',' ).filter( Boolean ) ?? [],
		colorFamilies   : searchParams.get( 'color' )?.split( ',' ).filter( Boolean ) ?? [],
		sizes           : searchParams.get( 'talla' )?.split( ',' ).filter( Boolean ) ?? [],
		priceMin        : searchParams.get( 'pmin' ) ? Number( searchParams.get( 'pmin' ) ) : null,
		priceMax        : searchParams.get( 'pmax' ) ? Number( searchParams.get( 'pmax' ) ) : null,
		attributes,
		onlyOnSale      : searchParams.get( 'oferta' ) === '1',
		onlyInStock     : searchParams.get( 'stock' ) === '1',
		sort            : validSort,
		page            : Number( searchParams.get( 'pag' ) ?? 1 ),
		pageSize        : DEFAULT_FILTERS.pageSize,
	};
};

export const countActiveFilters = ( filters: CatalogFilters ): number => {
	let count = 0;
	if ( filters.query )                        count++;
	if ( filters.categorySlug )                  count++;
	if ( filters.subcategorySlug )               count++;
	count += filters.genders.length;
	count += filters.brandSlugs.length;
	count += filters.colorFamilies.length;
	count += filters.sizes.length;
	if ( filters.priceMin !== null )             count++;
	if ( filters.priceMax !== null )             count++;
	if ( filters.onlyOnSale )                    count++;
	if ( filters.onlyInStock )                   count++;
	for ( const values of Object.values( filters.attributes ) ) count += values.length;
	return count;
};
