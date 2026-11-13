import { createQuery } from '@tanstack/svelte-query';
import { getAttributeDefinitions, getAttributeOptions } from '$lib/services/attributes.service';
import { queryKeys } from './keys';
import { STALE_TIME_MS } from '$lib/config/constants';

export const createAttributesQuery = () =>
	createQuery( () => ({
		queryKey  : queryKeys.attributes.list(),
		queryFn   : getAttributeDefinitions,
		staleTime : STALE_TIME_MS * 4,
	}) );

export const createAttributeOptionsQuery = ( getAttributeId?: () => string | undefined ) =>
	createQuery( () => ({
		queryKey  : [ 'attribute-options', getAttributeId ? getAttributeId() : 'all' ],
		queryFn   : () => getAttributeOptions( getAttributeId ? getAttributeId() : undefined ),
		staleTime : STALE_TIME_MS * 4,
	}) );

