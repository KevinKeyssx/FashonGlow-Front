import type { CatalogFilters, FacetedResponse, ProductWithRelations } from '$lib/types';
import {
	mockGetCatalog,
	mockGetProductBySlug,
	mockGetFeaturedProducts,
	mockGetOfferProducts,
} from '$lib/mock/handlers';

export const getProducts = ( filters: CatalogFilters ): Promise<FacetedResponse> =>
	mockGetCatalog( filters );

export const getProductBySlug = ( slug: string ): Promise<ProductWithRelations | null> =>
	mockGetProductBySlug( slug );

export const getFeaturedProducts = (): Promise<ProductWithRelations[]> =>
	mockGetFeaturedProducts();

export const getOfferProducts = (): Promise<ProductWithRelations[]> =>
	mockGetOfferProducts();

