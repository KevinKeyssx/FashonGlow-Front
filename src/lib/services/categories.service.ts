import type { Category, Subcategory } from '$lib/types';
import { mockGetCategories, mockGetSubcategories } from '$lib/mock/handlers';

export const getCategories = (): Promise<Category[]> =>
	mockGetCategories();

export const getSubcategories = ( categoryId?: string ): Promise<Subcategory[]> =>
	mockGetSubcategories( categoryId );

