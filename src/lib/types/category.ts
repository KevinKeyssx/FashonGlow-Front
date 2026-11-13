export interface Category {
	id       : string;
	name     : string;
	slug     : string;
	imageUrl : string;
	isActive : boolean;
}

export interface Subcategory {
	id         : string;
	categoryId : string;
	name       : string;
	slug       : string;
	isActive   : boolean;
}
