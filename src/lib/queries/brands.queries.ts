import { createQuery } from '@tanstack/svelte-query';
import { getBrands } from '$lib/services/brands.service';
import { queryKeys } from './keys';
import { STALE_TIME_MS } from '$lib/config/constants';

export const createBrandsQuery = () =>
	createQuery( () => ({
		queryKey  : queryKeys.brands.list(),
		queryFn   : getBrands,
		staleTime : STALE_TIME_MS * 4,
	}) );

