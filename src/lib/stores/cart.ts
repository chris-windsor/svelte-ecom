import { type Writable, writable } from 'svelte/store';
import { persist, createSessionStorage } from '@macfja/svelte-persistent-store';
import type { Cart, Product } from '$lib/appTypes';

type CartStore = Writable<Cart>;

export const cart: CartStore = persist(
	writable({
		items: [],
		selectedShippingMethod: null
	}),
	createSessionStorage(),
	'cart'
);

export const addProductToCart = (product: Product) => {
	const cartId = crypto.randomUUID();

	cart.update((cart) => {
		return {
			...cart,
			items: cart.items.concat({
				...product,
				cartId,
				qty: 1
			})
		};
	});
};

export const updateProductQtyInCart = (cartId: string, newQty: number) => {
	cart.update((cart) => {
		const itemToUpdateIndex = cart.items.findIndex((item) => item.cartId === cartId);
		const newCartItems = cart.items;
		newCartItems[itemToUpdateIndex].qty = newQty;

		return {
			...cart,
			items: newCartItems
		};
	});
};

export const removeProductFromCart = (cartId: string) => {
	cart.update((cart) => {
		return {
			...cart,
			items: cart.items.filter((product) => product.cartId !== cartId)
		};
	});
};

export const setSelectedShippingMethod = (newMethod: any) => {
	cart.update((cart) => {
		return {
			...cart,
			selectedShippingMethod: newMethod
		};
	});
};

export const clearCart = () => {
	cart.update((cart) => {
		return {
			items: [],
			selectedShippingMethod: null
		};
	});
};
