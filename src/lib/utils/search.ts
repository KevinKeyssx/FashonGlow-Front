import type { ProductWithRelations } from '$lib/types';

export const removeDiacritics = ( str: string ): string =>
	str.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' );

export const normalizeSearch = ( str: string ): string =>
	removeDiacritics( str ).toLowerCase().trim();

export const fuzzyMatch = ( needle: string, haystack: string ): boolean => {
	const n = normalizeSearch( needle );
	const h = normalizeSearch( haystack );
	if ( h.includes( n ) ) return true;
	// Simple typo tolerance: check if needle chars appear in order
	let ni = 0;
	for ( let i = 0; i < h.length && ni < n.length; i++ ) {
		if ( h[ i ] === n[ ni ] ) ni++;
	}
	return ni === n.length && n.length > 2;
};

export const searchProducts = (
	products : ProductWithRelations[],
	query    : string,
): ProductWithRelations[] => {
	if ( !query.trim() ) return products;
	const q = normalizeSearch( query );
	return products.filter( ( p ) => {
		const fields = [
			p.name,
			p.brand.name,
			p.subcategory.name,
			p.category.name,
			p.description,
			...p.searchKeywords,
		];
		return fields.some( ( f ) => fuzzyMatch( q, f ) );
	} );
};
