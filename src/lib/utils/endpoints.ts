// Rutas internas de SvelteKit BFF (consumidas por el navegador via TanStack Query)
export const INTERNAL_ENDPOINT = {
	PRODUCTS : {
		LIST		: 'products',
		FEATURED	: 'products/featured',
		OFFERS		: 'products/offers',
		DETAIL		: ( slug: string ): string => `products/${ slug }`,
		CREATE		: 'products/create',
		UPDATE		: ( id: string ): string => `products/${ id }`,
		DELETE		: ( id: string ): string => `products/${ id }`,
	},
	CATEGORIES : {
		LIST		: 'categories',
		DETAIL		: ( id: string ): string => `categories/${ id }`,
		CREATE		: 'categories/create',
		UPDATE		: ( id: string ): string => `categories/${ id }`,
		DELETE		: ( id: string ): string => `categories/${ id }`,
	},
	BRANDS : {
		LIST		: 'brands',
		DETAIL		: ( id: string ): string => `brands/${ id }`,
		CREATE		: 'brands/create',
		UPDATE		: ( id: string ): string => `brands/${ id }`,
		DELETE		: ( id: string ): string => `brands/${ id }`,
	},
} as const;

// Rutas externas de NestJS (consumidas por el servidor SvelteKit +server.ts)
export const EXTERNAL_ENDPOINT = {
	PRODUCTS : {
		LIST		: 'products',
		FEATURED	: 'products/featured',
		OFFERS		: 'products/offers',
		DETAIL		: ( slug: string ): string => `products/${ slug }`,
		CREATE		: 'products/create',
		UPDATE		: ( id: string ): string => `products/${ id }`,
		DELETE		: ( id: string ): string => `products/${ id }`,
	},
	CATEGORIES : {
		LIST		: 'categories',
		DETAIL		: ( id: string ): string => `categories/${ id }`,
		CREATE		: 'categories/create',
		UPDATE		: ( id: string ): string => `categories/${ id }`,
		DELETE		: ( id: string ): string => `categories/${ id }`,
	},
	BRANDS : {
		LIST		: 'brands',
		DETAIL		: ( id: string ): string => `brands/${ id }`,
		CREATE		: 'brands/create',
		UPDATE		: ( id: string ): string => `brands/${ id }`,
		DELETE		: ( id: string ): string => `brands/${ id }`,
	},
} as const;
