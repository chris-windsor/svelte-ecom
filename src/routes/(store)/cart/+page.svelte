<script>
	import CartInvoice from '$lib/components/cartInvoice.svelte';
	import CartItems from '$lib/components/cartItems.svelte';
	import { cart } from '$lib/stores/cart';
</script>

<main class="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
	{#if !$cart.items.length}
		<h2 class="text-lg font-medium text-gray-300">Your cart is empty!</h2>
		<p class="mt-6 text-lg leading-8 text-gray-400">
			Let's get back to shopping... checkout out our
			<a class="text-blue-400 hover:text-blue-500" href="/">Hot products</a>,
			<a class="text-blue-400 hover:text-blue-500" href="/">Latest products</a>, or
			<a class="text-blue-400 hover:text-blue-500" href="/">Sale products</a>
		</p>
	{:else}
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<h1 class="sr-only">Checkout</h1>
			<form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
				<div>
					<h2 class="text-lg font-medium text-white">Cart</h2>
					<CartItems additionalClass="border-t border-b border-stone-700 mt-4" />
				</div>
				<div class="mt-10 lg:mt-0">
					<h2 class="text-lg font-medium text-white">Cost breakdown</h2>
					<div class="mt-4 rounded-lg border border-stone-700 bg-stone-900 shadow-sm">
						<h3 class="sr-only">Items in your cart</h3>
						<CartInvoice />
						<div class="border-t border-stone-700 py-6 px-4 sm:px-6">
							<a href="/checkout">
								<button
									class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
									type="button"
								>
									Checkout
								</button>
							</a>
						</div>
					</div>
				</div>
			</form>
		</div>
	{/if}
</main>
