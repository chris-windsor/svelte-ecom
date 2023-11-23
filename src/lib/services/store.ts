import type { ProductAttributesRes, ProductCategoriesRes, ProductGridRes } from '$lib/appTypes';
import retriever from '$lib/utils/wretch';

export async function getProducts() {
	return await retriever.url('/products').get().json<ProductGridRes>();
}

export async function getAttributes() {
	return await retriever.url('/product/attributes').get().json<ProductAttributesRes>();
}

export async function getCategories() {
	return await retriever.url('/product/categories').get().json<ProductCategoriesRes>();
}

export async function processOrder(customerDetails: any, paymentDetails: any, orderItems: any) {
	return await retriever
		.url('/process_order')
		.post({
			customerDetails,
			paymentDetails,
			orderItems
		})
		.json();
}
