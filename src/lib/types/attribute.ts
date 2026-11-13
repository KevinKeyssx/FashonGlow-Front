export interface AttributeDefinition {
	id           : string;
	name         : string;
	slug         : string;
	isFilterable : boolean;
}

export interface AttributeOption {
	id           : string;
	attributeId  : string;
	displayValue : string;
	filterSlug   : string;
}

export interface ProductAttribute {
	productId         : string;
	attributeOptionId : string;
}
