import type {
	CatalogFilters,
	ProductWithRelations,
	FacetedResponse,
	FacetCount,
	ColorFacet,
	Category,
	Subcategory,
	Brand,
	AttributeDefinition,
	AttributeOption,
	Gender,
} from '$lib/types';
import { MOCK_CATEGORIES, MOCK_SUBCATEGORIES }         from './data/categories';
import { MOCK_BRANDS }                                  from './data/brands';
import { MOCK_PRODUCTS }                                from './data/products';
import { MOCK_VARIANTS }                                from './data/variants';
import { MOCK_IMAGES }                                  from './data/images';
import { MOCK_ATTRIBUTE_DEFS, MOCK_ATTRIBUTE_OPTIONS }  from './data/attributes';
import { MOCK_PRODUCT_ATTRIBUTES }                      from './data/product-attributes';
import { searchProducts }                               from '$lib/utils/search';
import { getEffectivePrice }                            from '$lib/utils/price';
import { groupByColorFamily }                           from '$lib/utils/colors';

const delay = ( ms = 200 ): Promise<void> =>
	new Promise<void>( ( resolve ) => setTimeout( resolve, ms ) );

const buildHydratedProducts = (): ProductWithRelations[] =>
	MOCK_PRODUCTS.filter( ( p ) => p.isActive ).map( ( product ) => {
		const brand       = MOCK_BRANDS.find( ( b ) => b.id === product.brandId )!;
		const subcategory = MOCK_SUBCATEGORIES.find( ( s ) => s.id === product.subcategoryId )!;
		const category    = MOCK_CATEGORIES.find( ( c ) => c.id === subcategory.categoryId )!;
		const variants    = MOCK_VARIANTS.filter( ( v ) => v.productId === product.id );
		const images      = MOCK_IMAGES.filter( ( i ) => i.productId === product.id )
			.sort( ( a, b ) => a.position - b.position );
		const attrRels    = MOCK_PRODUCT_ATTRIBUTES.filter( ( pa ) => pa.productId === product.id );
		const attributes  = attrRels.map( ( rel ) => {
			const option     = MOCK_ATTRIBUTE_OPTIONS.find( ( o ) => o.id === rel.attributeOptionId )!;
			const definition = MOCK_ATTRIBUTE_DEFS.find( ( d ) => d.id === option.attributeId )!;
			return { definition, option };
		} );

		return {
			...product,
			brand,
			subcategory,
			category,
			variants,
			images,
			attributes,
		};
	} );

let cachedHydrated: ProductWithRelations[] | null = null;
const getHydrated = (): ProductWithRelations[] => {
	if ( !cachedHydrated ) {
		cachedHydrated = buildHydratedProducts();
	}
	return cachedHydrated;
};

export const mockGetCatalog = async ( filters: CatalogFilters ): Promise<FacetedResponse> => {
	await delay( 150 );
	let products = getHydrated();

	if ( filters.query ) {
		products = searchProducts( products, filters.query );
	}

	if ( filters.categorySlug ) {
		products = products.filter( ( p ) => p.category.slug === filters.categorySlug );
	}

	if ( filters.subcategorySlug ) {
		products = products.filter( ( p ) => p.subcategory.slug === filters.subcategorySlug );
	}

	if ( filters.genders.length ) {
		products = products.filter( ( p ) => filters.genders.includes( p.gender ) );
	}

	if ( filters.brandSlugs.length ) {
		products = products.filter( ( p ) => filters.brandSlugs.includes( p.brand.slug ) );
	}

	if ( filters.colorFamilies.length ) {
		products = products.filter( ( p ) =>
			p.variants.some( ( v ) => filters.colorFamilies.includes( v.colorFamily ) ),
		);
	}

	if ( filters.sizes.length ) {
		products = products.filter( ( p ) =>
			p.variants.some( ( v ) => filters.sizes.includes( v.size ) && v.stock > 0 ),
		);
	}

	if ( filters.priceMin !== null || filters.priceMax !== null ) {
		products = products.filter( ( p ) => {
			const price = getEffectivePrice( p );
			if ( filters.priceMin !== null && price < filters.priceMin ) return false;
			if ( filters.priceMax !== null && price > filters.priceMax ) return false;
			return true;
		} );
	}

	for ( const [ slug, values ] of Object.entries( filters.attributes ) ) {
		if ( !values.length ) continue;
		const def = MOCK_ATTRIBUTE_DEFS.find( ( d ) => d.slug === slug );
		if ( !def ) continue;
		const matchingOptionIds = MOCK_ATTRIBUTE_OPTIONS
			.filter( ( o ) => o.attributeId === def.id && values.includes( o.filterSlug ) )
			.map( ( o ) => o.id );
		products = products.filter( ( p ) =>
			p.attributes.some( ( a ) => matchingOptionIds.includes( a.option.id ) ),
		);
	}

	if ( filters.onlyOnSale ) {
		products = products.filter( ( p ) => p.discountPrice !== null );
	}

	if ( filters.onlyInStock ) {
		products = products.filter( ( p ) => p.variants.some( ( v ) => v.stock > 0 ) );
	}

	products = [ ...products ].sort( ( a, b ) => {
		switch ( filters.sort ) {
			case 'precio-asc'  : return getEffectivePrice( a ) - getEffectivePrice( b );
			case 'precio-desc' : return getEffectivePrice( b ) - getEffectivePrice( a );
			case 'nombre-asc'  : return a.name.localeCompare( b.name, 'es' );
			case 'nombre-desc' : return b.name.localeCompare( a.name, 'es' );
			case 'recientes'   : return b.createdAt.localeCompare( a.createdAt );
			default            : return ( b.isFeatured ? 1 : 0 ) - ( a.isFeatured ? 1 : 0 );
		}
	} );

	const allPrices = products.map( ( p ) => getEffectivePrice( p ) );
	const facets    = {
		categories    : buildFacetCounts( products, ( p ) => ({ value: p.category.slug, label: p.category.name }) ),
		subcategories : buildFacetCounts( products, ( p ) => ({ value: p.subcategory.slug, label: p.subcategory.name }) ),
		genders       : buildFacetCounts( products, ( p ) => ({ value: p.gender, label: genderLabel( p.gender ) }) ),
		brands        : buildFacetCounts( products, ( p ) => ({ value: p.brand.slug, label: p.brand.name }) ),
		colors        : buildColorFacets( products ),
		sizes         : buildSizeFacets( products ),
		priceRange    : {
			min : allPrices.length ? Math.min( ...allPrices ) : 0,
			max : allPrices.length ? Math.max( ...allPrices ) : 150000,
		},
		attributes    : buildAttributeFacets( products ),
	};

	const totalCount = products.length;
	const totalPages = Math.max( 1, Math.ceil( totalCount / filters.pageSize ) );
	const start      = ( filters.page - 1 ) * filters.pageSize;
	const paged      = products.slice( start, start + filters.pageSize );

	return {
		products : paged,
		totalCount,
		totalPages,
		facets,
	};
};

const buildFacetCounts = (
	products : ProductWithRelations[],
	getter   : ( p: ProductWithRelations ) => { value: string; label: string },
): FacetCount[] => {
	const map = new Map<string, FacetCount>();
	for ( const p of products ) {
		const { value, label } = getter( p );
		if ( map.has( value ) ) {
			map.get( value )!.count++;
		} else {
			map.set( value, { value, label, count: 1 } );
		}
	}
	return Array.from( map.values() ).sort( ( a, b ) => b.count - a.count );
};

const buildColorFacets = ( products: ProductWithRelations[] ): ColorFacet[] => {
	const map = new Map<string, ColorFacet>();
	for ( const p of products ) {
		const groups = groupByColorFamily( p.variants );
		for ( const g of groups ) {
			if ( map.has( g.colorFamily ) ) {
				map.get( g.colorFamily )!.count++;
			} else {
				map.set( g.colorFamily, {
					value : g.colorFamily,
					label : g.colorName,
					hex   : g.colorHex,
					count : 1,
				} );
			}
		}
	}
	return Array.from( map.values() ).sort( ( a, b ) => b.count - a.count );
};

const buildSizeFacets = ( products: ProductWithRelations[] ): FacetCount[] => {
	const map = new Map<string, { label: string; count: number; order: number }>();
	for ( const p of products ) {
		const inStockVariants = p.variants.filter( ( v ) => v.stock > 0 );
		for ( const v of inStockVariants ) {
			if ( map.has( v.size ) ) {
				map.get( v.size )!.count++;
			} else {
				map.set( v.size, { label: v.size, count: 1, order: v.sizeOrder } );
			}
		}
	}
	return Array.from( map.entries() )
		.sort( ( [ , a ], [ , b ] ) => a.order - b.order )
		.map( ( [ value, { label, count } ] ) => ({ value, label, count }) );
};

const buildAttributeFacets = ( products: ProductWithRelations[] ): Record<string, FacetCount[]> => {
	const result: Record<string, FacetCount[]> = {};
	const defMap = new Map<string, AttributeDefinition>();
	for ( const def of MOCK_ATTRIBUTE_DEFS ) {
		if ( def.isFilterable ) defMap.set( def.id, def );
	}
	for ( const p of products ) {
		for ( const { definition, option } of p.attributes ) {
			if ( !defMap.has( definition.id ) ) continue;
			const slug = definition.slug;
			if ( !result[ slug ] ) result[ slug ] = [];
			const existing = result[ slug ].find( ( f ) => f.value === option.filterSlug );
			if ( existing ) {
				existing.count++;
			} else {
				result[ slug ].push( { value: option.filterSlug, label: option.displayValue, count: 1 } );
			}
		}
	}
	return result;
};

const genderLabel = ( gender: Gender ): string => {
	const labels: Record<Gender, string> = {
		HOMBRE : 'Hombre',
		MUJER  : 'Mujer',
		UNISEX : 'Unisex',
	};
	return labels[ gender ];
};

export const mockGetProductBySlug = async ( slug: string ): Promise<ProductWithRelations | null> => {
	await delay( 100 );
	return getHydrated().find( ( p ) => p.slug === slug ) ?? null;
};

export const mockGetFeaturedProducts = async (): Promise<ProductWithRelations[]> => {
	await delay( 100 );
	return getHydrated().filter( ( p ) => p.isFeatured ).slice( 0, 8 );
};

export const mockGetOfferProducts = async (): Promise<ProductWithRelations[]> => {
	await delay( 100 );
	return getHydrated().filter( ( p ) => p.discountPrice !== null ).slice( 0, 8 );
};

export const mockGetCategories = async (): Promise<Category[]> => {
	await delay( 80 );
	return MOCK_CATEGORIES.filter( ( c ) => c.isActive );
};

export const mockGetSubcategories = async ( categoryId?: string ): Promise<Subcategory[]> => {
	await delay( 80 );
	const all = MOCK_SUBCATEGORIES.filter( ( s ) => s.isActive );
	return categoryId ? all.filter( ( s ) => s.categoryId === categoryId ) : all;
};

export const mockGetBrands = async (): Promise<Brand[]> => {
	await delay( 80 );
	return MOCK_BRANDS;
};

export const mockGetAttributeDefs = async (): Promise<AttributeDefinition[]> => {
	await delay( 80 );
	return MOCK_ATTRIBUTE_DEFS.filter( ( d ) => d.isFilterable );
};

export const mockGetAttributeOptions = async ( attributeId?: string ): Promise<AttributeOption[]> => {
	await delay( 80 );
	return attributeId
		? MOCK_ATTRIBUTE_OPTIONS.filter( ( o ) => o.attributeId === attributeId )
		: MOCK_ATTRIBUTE_OPTIONS;
};

