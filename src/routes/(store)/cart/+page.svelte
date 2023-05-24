<script>
	import CartItems from '../../../components/cartItems.svelte';
	import { showTaxes } from '../../../config.json';
	import { cart } from '../../../stores/cart';

	$: selectedShippingMethod = $cart.selectedShippingMethod;
</script>

<main class="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-2xl lg:max-w-none">
		<h1 class="sr-only">Checkout</h1>
		<form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
			<div>
				<h2 class="text-lg font-medium text-gray-900">Cart</h2>
				<CartItems additionalClass="border-t border-b border-gray-200 mt-4" />
			</div>
			<div class="mt-10 lg:mt-0">
				<h2 class="text-lg font-medium text-gray-900">Cost breakdown</h2>
				<div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
					<h3 class="sr-only">Items in your cart</h3>
					<dl class="space-y-6 border-gray-200 py-6 px-4 sm:px-6">
						<div class="flex items-center justify-between">
							<dt class="text-sm">Subtotal</dt>
							<dd class="text-sm font-medium text-gray-900">$64.00</dd>
						</div>
						{#if selectedShippingMethod}
							<div class="flex items-center justify-between">
								<dt class="text-sm">Shipping ({selectedShippingMethod.title})</dt>
								<dd class="text-sm font-medium text-gray-900">
									${selectedShippingMethod.price.toFixed(2)}
								</dd>
							</div>
						{/if}
						{#if showTaxes}
							<div class="flex items-center justify-between">
								<dt class="text-sm">Taxes</dt>
								<dd class="text-sm font-medium text-gray-900">$5.52</dd>
							</div>
						{/if}
						<div class="flex items-center justify-between border-t border-gray-200 pt-6">
							<dt class="text-base font-medium">Total</dt>
							<dd class="text-base font-medium text-gray-900">$75.52</dd>
						</div>
					</dl>
					<div class="border-t border-gray-200 py-6 px-4 sm:px-6">
						<a href="/checkout">
							<button
								class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
								type="submit"
							>
								Checkout
							</button>
						</a>
					</div>
				</div>
			</div>
		</form>
	</div>
</main>
