<script lang="ts">
	import { onMount } from 'svelte';
	import CartInvoice from '$lib/components/cartInvoice.svelte';
	import CartItems from '$lib/components/cartItems.svelte';
	import ShippingMethods from '$lib/components/checkout/shippingMethods.svelte';
	import { cart } from '$lib/stores/cart';
	import { goto } from '$app/navigation';
	import { getCheckoutPlugins } from '$lib/plugins/pluginManager';
	import PaymentMethods from '$lib/components/checkout/paymentMethods.svelte';
	import ShippingInformation from '$lib/components/checkout/shippingInformation.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import Alert from '$lib/components/alert.svelte';
	import BlockingLoadingIndicator from '$lib/components/blockingLoadingIndicator.svelte';
	import type { Cart, Customer } from '$lib/appTypes';
	import { customer } from '$lib/stores/customer';

	export let form: ActionData;
	let checkoutCartState: Cart;
	let checkoutCustomerState: Customer;

	type CheckoutOverrides = {
		options: any;
		errors: string[];
	};

	onMount(() => {
		if (!$cart.items.length) {
			goto('/cart', {
				replaceState: true
			});
		}

		cart.subscribe((newCart: Cart) => (checkoutCartState = newCart));
		customer.subscribe((newCustomerState: Customer) => (checkoutCustomerState = newCustomerState));
	});

	const {
		beforeAll: beforeAllFieldsPlugins,
		afterContact: afterContactFieldsPlugins,
		afterShipping: afterShippingFieldsPlugins,
		afterDelivery: afterDeliveryFieldsPlugins,
		afterPayment: afterPaymentFieldsPlugins,
		ruleControllers
	} = getCheckoutPlugins();

	let overrides: CheckoutOverrides;
	const getOverrides = (checkoutCartState: Cart, checkoutCustomerState: Customer) => {
		const ruleResults: CheckoutOverrides = {
			errors: [],
			options: {}
		};

		for (const controller of ruleControllers) {
			const { errors, options } = controller({
				cart: checkoutCartState,
				customer: checkoutCustomerState
			});

			ruleResults.options = {
				...ruleResults.options,
				...options
			};
			ruleResults.errors = ruleResults.errors.concat(errors);
		}
		return ruleResults;
	};
	$: overrides = getOverrides(checkoutCartState, checkoutCustomerState);

	let isProcessing = false;
</script>

<BlockingLoadingIndicator open={isProcessing} />

<main class="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-2xl lg:max-w-none">
		<h1 class="sr-only">Checkout</h1>
		<form
			class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
			method="POST"
			use:enhance={({ formData }) => {
				isProcessing = true;
				formData.set('orderItems', $cart.items.map((item) => `${item.id};${item.qty}`).join(','));
				return async ({ update }) => {
					isProcessing = false;
					await update();
				};
			}}
		>
			<div>
				{#each beforeAllFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} />
				{/each}
				<div class={beforeAllFieldsPlugins.length ? 'mt-10 border-t border-stone-700 pt-10' : ''}>
					<h2 class="text-lg font-medium text-white">Contact information</h2>
					<div class="mt-4">
						<label class="block text-sm font-medium text-gray-700" for="email-address">
							Email address
						</label>
						<div class="mt-1">
							<input
								id="email-address"
								autocomplete="email"
								class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								name="emailAddress"
								type="email"
								inputmode="email"
								bind:value={$customer.email}
							/>
						</div>
					</div>
				</div>
				{#each afterContactFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} />
				{/each}
				<ShippingInformation />
				{#each afterShippingFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} />
				{/each}
				<ShippingMethods />
				{#each afterDeliveryFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} />
				{/each}
				<PaymentMethods />
				{#each afterPaymentFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} />
				{/each}
			</div>
			<div class="mt-10 lg:mt-0">
				<h2 class="text-lg font-medium text-white">Order summary</h2>
				<div class="mt-4 rounded-lg border border-stone-700 bg-stone-900 shadow-sm">
					<h3 class="sr-only">Items in your cart</h3>
					<div class="ml-6 mr-6">
						<CartItems />
					</div>
					<CartInvoice />
					<div class="border-t border-stone-700 py-6 px-4 sm:px-6">
						{#if form && form.status === 'fail'}
							<div class="mb-6">
								<Alert
									type="error"
									title="An error was encountered while attempting to complete your order"
									details={[form.message]}
								/>
							</div>
						{/if}
						{#if overrides.errors?.length}
							<div class="mb-6">
								<Alert
									type="warning"
									title="Please acknowledge the following issues before completing your order"
									details={overrides.errors}
								/>
							</div>
						{/if}
						<button
							class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							type="submit"
							disabled={overrides.options.disableCheckout}
						>
							Confirm order
						</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</main>
