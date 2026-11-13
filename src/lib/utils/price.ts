import type { Product, ProductVariant } from '$lib/types';

export const getEffectivePrice = ( product: Product ): number =>
	product.discountPrice ?? product.basePrice;

export const getVariantEffectivePrice = ( variant: ProductVariant, product: Product ): number => {
	const basePrice     = variant.price ?? product.basePrice;
	const discountPrice = variant.discountPrice ?? product.discountPrice;
	return discountPrice ?? basePrice;
};

export const getVariantOriginalPrice = ( variant: ProductVariant, product: Product ): number =>
	variant.price ?? product.basePrice;

export const calcDiscountPercent = ( original: number, discounted: number ): number =>
	Math.round( ( 1 - discounted / original ) * 100 );

export const hasDiscount = ( product: Product ): boolean =>
	product.discountPrice !== null && product.discountPrice < product.basePrice;

export const getVariantHasDiscount = ( variant: ProductVariant, product: Product ): boolean => {
	const original  = getVariantOriginalPrice( variant, product );
	const effective = getVariantEffectivePrice( variant, product );
	return effective < original;
};
