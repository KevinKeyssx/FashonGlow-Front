import type { ProductVariant } from '$lib/types';

export interface ColorGroup {
	colorFamily : string;
	colorName   : string;
	colorHex    : string;
	variants    : ProductVariant[];
}

export const groupByColorFamily = ( variants: ProductVariant[] ): ColorGroup[] => {
	const map = new Map<string, ColorGroup>();
	for ( const variant of variants ) {
		if ( !map.has( variant.colorFamily ) ) {
			map.set( variant.colorFamily, {
				colorFamily : variant.colorFamily,
				colorName   : variant.colorName,
				colorHex    : variant.colorHex,
				variants    : [],
			} );
		}
		map.get( variant.colorFamily )!.variants.push( variant );
	}
	return Array.from( map.values() );
};

export const getContrastColor = ( hex: string ): '#FFFFFF' | '#000000' => {
	const r   = parseInt( hex.slice( 1, 3 ), 16 );
	const g   = parseInt( hex.slice( 3, 5 ), 16 );
	const b   = parseInt( hex.slice( 5, 7 ), 16 );
	const lum = ( 0.299 * r + 0.587 * g + 0.114 * b ) / 255;
	return lum > 0.5 ? '#000000' : '#FFFFFF';
};

export const getImagesByColor = (
	images      : import('$lib/types').ProductImage[],
	colorFamily : string | null,
): import('$lib/types').ProductImage[] => {
	const colorImages   = images.filter( ( img ) => img.colorFamily === colorFamily );
	const genericImages = images.filter( ( img ) => img.colorFamily === null );
	const result        = colorImages.length > 0 ? colorImages : genericImages;
	return result.sort( ( a, b ) => a.position - b.position );
};
