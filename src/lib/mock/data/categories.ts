import type { Category, Subcategory } from '$lib/types';

export const MOCK_CATEGORIES: Category[] = [
	{
		id       : 'CAT0100000000000000000001',
		name     : 'Ropa',
		slug     : 'ropa',
		imageUrl : 'https://picsum.photos/seed/ropa/800/600',
		isActive : true,
	},
	{
		id       : 'CAT0100000000000000000002',
		name     : 'Calzado',
		slug     : 'calzado',
		imageUrl : 'https://picsum.photos/seed/calzado/800/600',
		isActive : true,
	},
	{
		id       : 'CAT0100000000000000000003',
		name     : 'Accesorios',
		slug     : 'accesorios',
		imageUrl : 'https://picsum.photos/seed/accesorios/800/600',
		isActive : true,
	},
	{
		id       : 'CAT0100000000000000000004',
		name     : 'Deportivo',
		slug     : 'deportivo',
		imageUrl : 'https://picsum.photos/seed/deportivo/800/600',
		isActive : true,
	},
];

export const MOCK_SUBCATEGORIES: Subcategory[] = [
	// Ropa
	{
		id         : 'SUBCAT010000000000000001',
		categoryId : 'CAT0100000000000000000001',
		name       : 'Poleras',
		slug       : 'poleras',
		isActive   : true,
	},
	{
		id         : 'SUBCAT010000000000000002',
		categoryId : 'CAT0100000000000000000001',
		name       : 'Pantalones',
		slug       : 'pantalones',
		isActive   : true,
	},
	{
		id         : 'SUBCAT010000000000000003',
		categoryId : 'CAT0100000000000000000001',
		name       : 'Jeans',
		slug       : 'jeans',
		isActive   : true,
	},
	{
		id         : 'SUBCAT010000000000000004',
		categoryId : 'CAT0100000000000000000001',
		name       : 'Vestidos',
		slug       : 'vestidos',
		isActive   : true,
	},
	{
		id         : 'SUBCAT010000000000000005',
		categoryId : 'CAT0100000000000000000001',
		name       : 'Chaquetas',
		slug       : 'chaquetas',
		isActive   : true,
	},
	// Calzado
	{
		id         : 'SUBCAT010000000000000006',
		categoryId : 'CAT0100000000000000000002',
		name       : 'Zapatillas',
		slug       : 'zapatillas',
		isActive   : true,
	},
	{
		id         : 'SUBCAT010000000000000007',
		categoryId : 'CAT0100000000000000000002',
		name       : 'Chalas y Sandalias',
		slug       : 'chalas-y-sandalias',
		isActive   : true,
	},
	{
		id         : 'SUBCAT010000000000000008',
		categoryId : 'CAT0100000000000000000002',
		name       : 'Botas',
		slug       : 'botas',
		isActive   : true,
	},
	// Accesorios
	{
		id         : 'SUBCAT010000000000000009',
		categoryId : 'CAT0100000000000000000003',
		name       : 'Gorros y Gorras',
		slug       : 'gorros-y-gorras',
		isActive   : true,
	},
	{
		id         : 'SUBCAT010000000000000010',
		categoryId : 'CAT0100000000000000000003',
		name       : 'Bolsos y Mochilas',
		slug       : 'bolsos-y-mochilas',
		isActive   : true,
	},
	{
		id         : 'SUBCAT010000000000000011',
		categoryId : 'CAT0100000000000000000003',
		name       : 'Cinturones',
		slug       : 'cinturones',
		isActive   : true,
	},
	// Deportivo
	{
		id         : 'SUBCAT010000000000000012',
		categoryId : 'CAT0100000000000000000004',
		name       : 'Ropa Deportiva',
		slug       : 'ropa-deportiva',
		isActive   : true,
	},
	{
		id         : 'SUBCAT010000000000000013',
		categoryId : 'CAT0100000000000000000004',
		name       : 'Calzado Deportivo',
		slug       : 'calzado-deportivo',
		isActive   : true,
	},
];
