import type { Category, Subcategory } from '$lib/types';
import { clientEnv } from '$lib/config/client-env';
import { INTERNAL_ENDPOINT } from '$lib/utils/endpoints';

export interface CategoryWithSubcategories extends Category {
	subcategories?: Subcategory[];
}

export const getCategories = async (): Promise<CategoryWithSubcategories[]> => {
	const url = `${ clientEnv.PUBLIC_API_BASE }/${ INTERNAL_ENDPOINT.CATEGORIES.LIST }`;
	const res = await fetch( url );

	if ( !res.ok ) {
		throw new Error( `Error fetching categories: ${ res.statusText }` );
	}

	return await res.json();
};

export const getSubcategories = async ( categoryId?: string ): Promise<Subcategory[]> => {
	const categories = await getCategories();
	const allSubcategories = categories.flatMap( ( c ) => c.subcategories || [] );
	if ( categoryId ) {
		return allSubcategories.filter( ( s ) => s.categoryId === categoryId );
	}
	return allSubcategories;
};

export const getCategoryByIdOrSlug = async ( idOrSlug: string ): Promise<CategoryWithSubcategories | null> => {
	const url = `${ clientEnv.PUBLIC_API_BASE }/${ INTERNAL_ENDPOINT.CATEGORIES.DETAIL( idOrSlug ) }`;
	const res = await fetch( url );

	if ( res.status === 404 ) {
		return null;
	}

	if ( !res.ok ) {
		throw new Error( `Error fetching category '${ idOrSlug }': ${ res.statusText }` );
	}

	return await res.json();
};
