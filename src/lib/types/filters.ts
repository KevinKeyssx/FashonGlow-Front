import type { Gender } from './product';
import type { Brand } from './brand';
import type { Subcategory, Category } from './category';
import type { ProductVariant, ProductImage, Product } from './product';
import type { AttributeDefinition, AttributeOption } from './attribute';

export type SortOption =
	| 'relevancia'
	| 'precio-asc'
	| 'precio-desc'
	| 'nombre-asc'
	| 'nombre-desc'
	| 'recientes';

export interface CatalogFilters {
	query           : string;
	categorySlug    : string | null;
	subcategorySlug : string | null;
	genders         : Gender[];
	brandSlugs      : string[];
	colorFamilies   : string[];
	sizes           : string[];
	priceMin        : number | null;
	priceMax        : number | null;
	attributes      : Record<string, string[]>;
	onlyOnSale      : boolean;
	onlyInStock     : boolean;
	sort            : SortOption;
	page            : number;
	pageSize        : number;
}

export interface FacetCount {
	value : string;
	label : string;
	count : number;
}

export interface ColorFacet extends FacetCount {
	hex : string;
}

export interface FacetedResponse {
	products   : ProductWithRelations[];
	totalCount : number;
	totalPages : number;
	facets     : {
		categories    : FacetCount[];
		subcategories : FacetCount[];
		genders       : FacetCount[];
		brands        : FacetCount[];
		colors        : ColorFacet[];
		sizes         : FacetCount[];
		priceRange    : { min: number; max: number };
		attributes    : Record<string, FacetCount[]>;
	};
}

export interface ProductWithRelations extends Product {
	brand       : Brand;
	subcategory : Subcategory;
	category    : Category;
	variants    : ProductVariant[];
	images      : ProductImage[];
	attributes  : Array<{
		definition : AttributeDefinition;
		option     : AttributeOption;
	}>;
}

export const DEFAULT_FILTERS: CatalogFilters = {
	query           : '',
	categorySlug    : null,
	subcategorySlug : null,
	genders         : [],
	brandSlugs      : [],
	colorFamilies   : [],
	sizes           : [],
	priceMin        : null,
	priceMax        : null,
	attributes      : {},
	onlyOnSale      : false,
	onlyInStock     : false,
	sort            : 'relevancia',
	page            : 1,
	pageSize        : 24,
};
