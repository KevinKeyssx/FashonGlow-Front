import { createQuery, keepPreviousData } from '@tanstack/svelte-query';
import type { CatalogFilters } from '$lib/types';
import {
	getProducts,
	getProductBySlug,
	getFeaturedProducts,
	getOfferProducts,
} from '$lib/services/catalog.service';
import { queryKeys } from './keys';
import { STALE_TIME_MS } from '$lib/config/constants';

export const createCatalogQuery = ( getFilters: () => CatalogFilters ) =>
	createQuery( () => ({
		queryKey        : queryKeys.catalog.list( getFilters() ),
		queryFn         : () => getProducts( getFilters() ),
		staleTime       : STALE_TIME_MS,
		placeholderData : keepPreviousData,
	}) );

export const createProductQuery = ( getSlug: () => string ) =>
	createQuery( () => ({
		queryKey  : queryKeys.catalog.detail( getSlug() ),
		queryFn   : () => getProductBySlug( getSlug() ),
		staleTime : STALE_TIME_MS,
	}) );

export const createFeaturedQuery = () =>
	createQuery( () => ({
		queryKey  : queryKeys.catalog.featured(),
		queryFn   : getFeaturedProducts,
		staleTime : STALE_TIME_MS * 2,
	}) );

export const createOffersQuery = () =>
	createQuery( () => ({
		queryKey  : queryKeys.catalog.offers(),
		queryFn   : getOfferProducts,
		staleTime : STALE_TIME_MS * 2,
	}) );
