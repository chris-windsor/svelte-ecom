<script lang="ts">
	import { showTaxes, shippingMethods } from '$lib/config.json';
	import { cart } from '$lib/stores/cart';

	$: subtotal = $cart.items.reduce((acc, item) => {
		return acc + item.price * (item.qty || 1);
	}, 0);

	$: selectedShippingMethod = shippingMethods.find(
		(method: any) => method.id === $cart.selectedShippingMethod
	);

	const taxRate = 0.0715;
	$: subtotalTax = subtotal * taxRate;

	$: total = subtotal + subtotalTax + (selectedShippingMethod?.price || 0);
</script>

<dl class="space-y-6 border-stone-700 py-6 px-4 sm:px-6">
	<div class="flex items-center justify-between">
		<dt class="text-sm">Subtotal</dt>
		<dd class="text-sm font-medium text-white">${subtotal.toFixed(2)}</dd>
	</div>
	{#if selectedShippingMethod}
		<div class="flex items-center justify-between">
			<dt class="text-sm">Shipping ({selectedShippingMethod.title})</dt>
			<dd class="text-sm font-medium text-white">
				${selectedShippingMethod?.price?.toFixed(2)}
			</dd>
		</div>
	{/if}
	{#if showTaxes}
		<div class="flex items-center justify-between">
			<dt class="text-sm">Taxes ({(taxRate * 100).toFixed(2)}%)</dt>
			<dd class="text-sm font-medium text-white">${subtotalTax.toFixed(2)}</dd>
		</div>
	{/if}
	<div class="flex items-center justify-between border-t border-stone-700 pt-6">
		<dt class="text-base font-medium">Total</dt>
		<dd class="text-base font-medium text-white">${total.toFixed(2)}</dd>
	</div>
</dl>
