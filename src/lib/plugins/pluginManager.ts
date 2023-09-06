import stateRestrictions from './checkout/stateRestrictions';
import StoreSearch from './checkout/storeSearch.svelte';

type PluginList = ConstructorOfATypedSvelteComponent[];
type RuleController = Function;

type CheckoutPluginMap = {
	beforeAll: PluginList;
	afterContact: PluginList;
	afterShipping: PluginList;
	afterPayment: PluginList;
	afterDelivery: PluginList;
	ruleControllers: RuleController[];
};

type AdminPluginMap = {
	attributeModifiers: PluginList;
};

export function getCheckoutPlugins(): CheckoutPluginMap {
	return {
		beforeAll: [],
		afterContact: [],
		afterShipping: [StoreSearch],
		afterDelivery: [],
		afterPayment: [],
		ruleControllers: [stateRestrictions]
	};
}

export function getAdminPlugins(): AdminPluginMap {
	return {
		attributeModifiers: []
	};
}

export function getProductListingPlugins() {}
