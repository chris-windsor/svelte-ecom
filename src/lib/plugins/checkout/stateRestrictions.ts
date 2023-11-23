import type { Cart, Customer } from '$lib/appTypes';

type ControllerData = {
	cart: Cart;
	customer: Customer;
};

const stateRestrictions = ({ cart, customer }: ControllerData) => {
	if (!cart?.items || !customer?.state) {
		return {
			options: {},
			errors: []
		};
	}

	let disableCheckout = false;
	let checkoutErrors: string[] = [];
	/* 
		This is an example rule to be removed before release

		It simulates state level shipping restrictions based on an attribute that
		you would put on certain items within the store
	*/
	const utahStateRestrictedItems = cart.items.filter(
		(item) => !!~item.attributes.findIndex((attr) => attr.id === 4)
	);

	if (utahStateRestrictedItems.length && customer.state === 'UT') {
		disableCheckout = true;
		checkoutErrors.push('Your cart contains items that we cannot ship to your state');
	}

	return {
		options: {
			disableCheckout
		},
		errors: checkoutErrors
	};
};

export default stateRestrictions;
