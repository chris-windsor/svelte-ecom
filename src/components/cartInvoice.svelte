<script lang="ts">
	import { showTaxes, shippingMethods } from '../config.json';
	import { cart } from '../stores/cart';

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

<dl class="space-y-6 border-gray-200 py-6 px-4 sm:px-6">
	<div class="flex items-center justify-between">
		<dt class="text-sm">Subtotal</dt>
		<dd class="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
	</div>
	{#if selectedShippingMethod}
		<div class="flex items-center justify-between">
			<dt class="text-sm">Shipping ({selectedShippingMethod.title})</dt>
			<dd class="text-sm font-medium text-gray-900">
				${selectedShippingMethod?.price?.toFixed(2)}
			</dd>
		</div>
	{/if}
	{#if showTaxes}
		<div class="flex items-center justify-between">
			<dt class="text-sm">Taxes ({(taxRate * 100).toFixed(2)}%)</dt>
			<dd class="text-sm font-medium text-gray-900">${subtotalTax.toFixed(2)}</dd>
		</div>
	{/if}
	<div class="flex items-center justify-between border-t border-gray-200 pt-6">
		<dt class="text-base font-medium">Total</dt>
		<dd class="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
	</div>
</dl>
