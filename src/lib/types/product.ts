export type Gender = 'HOMBRE' | 'MUJER' | 'UNISEX';

export interface Product {
	id                : string;
	subcategoryId     : string;
	brandId           : string;
	name              : string;
	slug              : string;
	description       : string;
	gender            : Gender;
	basePrice         : number;
	discountPrice     : number | null;
	minEffectivePrice : number;
	searchKeywords    : string[];
	isFeatured        : boolean;
	isActive          : boolean;
	createdAt         : string;
}

export interface ProductVariant {
	id            : string;
	productId     : string;
	sku           : string;
	size          : string;
	sizeOrder     : number;
	colorName     : string;
	colorFamily   : string;
	colorHex      : string;
	stock         : number;
	price         : number | null;
	discountPrice : number | null;
}

export interface ProductImage {
	id          : string;
	productId   : string;
	colorFamily : string | null;
	url         : string;
	altText     : string;
	position    : number;
}
