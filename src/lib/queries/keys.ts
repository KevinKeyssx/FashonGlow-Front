import type { CatalogFilters } from '$lib/types';

export const queryKeys = {
	catalog : {
		all      : [ 'catalog' ] as const,
		list     : ( filters: CatalogFilters ) => [ 'catalog', 'list', filters ] as const,
		detail   : ( slug: string ) => [ 'catalog', 'detail', slug ] as const,
		featured : () => [ 'catalog', 'featured' ] as const,
		offers   : () => [ 'catalog', 'offers' ] as const,
	},
	categories : {
		all  : [ 'categories' ] as const,
		list : () => [ 'categories', 'list' ] as const,
	},
	brands : {
		all  : [ 'brands' ] as const,
		list : () => [ 'brands', 'list' ] as const,
	},
	attributes : {
		all  : [ 'attributes' ] as const,
		list : () => [ 'attributes', 'list' ] as const,
	},
} as const;
