export type AuthToken = {
	name: string;
	exp: number;
	role: string;
};

// TODO: get rid of this
export type Resp<T> = {
	status: string;
	data: T;
};

export type CartItem = Product & {
	cartId: string;
	qty: number;
};

export type Product = {
	id: string;
	name: string;
	description: string;
	shortUrl: string;
	price: number;
	stock: number;
	categories: ProductCategory[];
	attributes: ProductAttribute[];
	img: string;
	reviews: ProductReviewSummary;
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

export type ProductAttribute = {
	id: number;
	label: string;
	kind: string;
	content: string;
};

export type ProductReviewSummary = {
	average: number;
	totalCount: number;
};

export type ProductCreationRes = {};

export type FileUploadRes = {};

export type ShippingMethod = {
	id: number;
	title: string;
	turnaround: string;
	price: number;
};
