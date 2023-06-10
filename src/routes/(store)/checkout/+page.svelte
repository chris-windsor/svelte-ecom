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

	onMount(() => {
		if (!$cart.items.length) {
			goto('/cart', {
				replaceState: true
			});
		}
	});

	const {
		beforeAll: beforeAllFieldsPlugins,
		afterContact: afterContactFieldsPlugins,
		afterShipping: afterShippingFieldsPlugins,
		afterDelivery: afterDeliveryFieldsPlugins,
		afterPayment: afterPaymentFieldsPlugins
	} = getCheckoutPlugins();
</script>

<main class="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-2xl lg:max-w-none">
		<h1 class="sr-only">Checkout</h1>
		<form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
			<div>
				{#each beforeAllFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} {cart} />
				{/each}
				<div class={beforeAllFieldsPlugins.length ? 'mt-10 border-t border-gray-200 pt-10' : ''}>
					<h2 class="text-lg font-medium text-gray-900">Contact information</h2>
					<div class="mt-4">
						<label class="block text-sm font-medium text-gray-700" for="email-address">
							Email address
						</label>
						<div class="mt-1">
							<input
								id="email-address"
								autocomplete="email"
								class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								name="email-address"
								type="email"
							/>
						</div>
					</div>
				</div>
				{#each afterContactFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} {cart} />
				{/each}
				<ShippingInformation />
				{#each afterShippingFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} {cart} />
				{/each}
				<ShippingMethods />
				{#each afterDeliveryFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} {cart} />
				{/each}
				<PaymentMethods />
				{#each afterPaymentFieldsPlugins as pluginComponent}
					<svelte:component this={pluginComponent} {cart} />
				{/each}
			</div>
			<div class="mt-10 lg:mt-0">
				<h2 class="text-lg font-medium text-gray-900">Order summary</h2>
				<div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
					<h3 class="sr-only">Items in your cart</h3>
					<div class="ml-6 mr-6">
						<CartItems />
					</div>
					<CartInvoice />
					<div class="border-t border-gray-200 py-6 px-4 sm:px-6">
						<button
							class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
							type="submit"
						>
							Confirm order
						</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</main>
