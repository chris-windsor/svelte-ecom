export type AuthToken = {
	name: string;
	exp: number;
	role: string;
};

export type ProductAttributes = {
	id: string;
	descriptor: string;
	value: string;
};

// TODO: get rid of this
export type Resp<T> = {
	status: string;
	data: T;
};

export type Product = {
	id: string;
	name: string;
	description: string;
	shortUrl: string;
	price: number;
	stock: number;
	attributes: ProductAttributes[];
	img: string;
};

export type ProductGridRes = {
	pageCount: number;
	products: Product[];
};

export type ProductCategory = {
	id: number;
	label: string;
	parentId: number;
};

export type ProductCategoriesRes = {
	categories: ProductCategory[];
};

export type ProductCreationRes = {};

export type FileUploadRes = {};
