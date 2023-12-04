export type SupportedInputType =
	| 'text'
	| 'textarea'
	| 'password'
	| 'number'
	| 'checkbox'
	| 'radio'
	| 'select';

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

export type ProductImage = {
	hash: string;
};

export type ProductCategory = {
	id: number;
	label: string;
	parentId: number;
};

export type ProductCategoriesRes = {
	categories: ProductCategory[];
};

export type ProductAttributeKind = 'static' | 'list' | 'color';

export type ProductAttribute = {
	id: number;
	label: string;
	kind: ProductAttributeKind;
	content: string;
	options: ProductAttributeOption[];
	visibleOnListing: boolean;
};

export type ProductAttributeOption = {
	attributeId: number;
	id: number;
	label: string;
	content: string;
};

export type ProductAttributesRes = {
	attributes: ProductAttribute[];
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

export type Cart = {
	items: CartItem[];
	selectedShippingMethod: ShippingMethod | null;
};

export type Customer = {
	email: string;
	firstName: string;
	lastName: string;
	company: string;
	address: string;
	address2: string;
	city: string;
	state: string;
	zipCode: string;
	phoneNumber: string;
};
