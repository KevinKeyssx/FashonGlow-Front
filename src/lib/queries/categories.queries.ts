import { createQuery } from '@tanstack/svelte-query';
import { getCategories, getSubcategories } from '$lib/services/categories.service';
import { queryKeys } from './keys';
import { STALE_TIME_MS } from '$lib/config/constants';

export const createCategoriesQuery = () =>
	createQuery( () => ({
		queryKey  : queryKeys.categories.list(),
		queryFn   : getCategories,
		staleTime : STALE_TIME_MS * 4,
	}) );

export const createSubcategoriesQuery = ( getCategoryId?: () => string | undefined ) =>
	createQuery( () => ({
		queryKey  : [ 'subcategories', getCategoryId ? getCategoryId() : 'all' ],
		queryFn   : () => getSubcategories( getCategoryId ? getCategoryId() : undefined ),
		staleTime : STALE_TIME_MS * 4,
	}) );

