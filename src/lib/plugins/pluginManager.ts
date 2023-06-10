import StoreSearch from './checkout/storeSearch.svelte';

type PluginList = ConstructorOfATypedSvelteComponent[];

type CheckoutPluginMap = {
	beforeAll: PluginList;
	afterContact: PluginList;
	afterShipping: PluginList;
	afterPayment: PluginList;
	afterDelivery: PluginList;
};

export function getCheckoutPlugins(): CheckoutPluginMap {
	return {
		beforeAll: [],
		afterContact: [],
		afterShipping: [StoreSearch],
		afterDelivery: [],
		afterPayment: []
	};
}

export function getProductListingPlugins() {}
