<script lang="ts">
	import { clearCart } from '$lib/stores/cart';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	onMount(() => {
		if (!dev) {
			clearCart();
		}
	});
</script>

<div class="bg-stone-900 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<p class="text-base font-semibold leading-7 text-indigo-600">Your order was successful</p>
			<h2 class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl">
				Congratulations<span class="pl-4">🎉</span>
			</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				Thank you for trusting us with your purchase. We hope you come back soon. Please do not
				hesitate to reach out if there is anything else we can assist you with.
			</p>
			<button class="border border-red-100" type="button" on:click={clearCart}>
				clear your cart now
			</button>
		</div>
	</div>
</div>
