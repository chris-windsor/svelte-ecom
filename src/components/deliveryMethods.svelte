<script lang="ts">
	import { CheckCircleIcon } from '@babeard/svelte-heroicons/solid';
	import {
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption
	} from '@rgossiaux/svelte-headlessui';
	import { setSelectedShippingMethod, cart } from '../stores/cart';

	const deliveryMethods = [
		{ id: 1, title: 'USPS First Class Mail', turnaround: '4–10 business days', price: '$6.00' },
		{ id: 3, title: 'UPS Ground', turnaround: '1–6 business days', price: '$11.00' },
		{ id: 2, title: 'USPS Priority Mail', turnaround: '1-3 business days', price: '$15.00' },
		{ id: 4, title: 'UPS 3 Day Select', turnaround: '3 business days', price: '$19.00' },
		{ id: 5, title: 'UPS 2nd Day Air', turnaround: '2 business days', price: '$36.00' },
		{ id: 6, title: 'UPS Next Day Air', turnaround: '1 business days', price: '$57.00' }
	];
</script>

<div class="mt-10 border-t border-gray-200 pt-10">
	<RadioGroup
		value={$cart.selectedShippingMethod}
		on:change={(e) => setSelectedShippingMethod(e.detail)}
	>
		<RadioGroupLabel class="text-lg font-medium text-gray-900">Delivery method</RadioGroupLabel>

		<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
			{#each deliveryMethods as deliveryMethod}
				<RadioGroupOption value={deliveryMethod} as="div" let:active let:checked>
					<div
						class={[
							checked ? 'border-transparent' : 'border-gray-300',
							active ? 'ring-2 ring-indigo-500' : '',
							'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
						].join(' ')}
					>
						<span class="flex flex-1">
							<span class="flex flex-col">
								<RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900"
									>{deliveryMethod.title}</RadioGroupLabel
								>
								<RadioGroupDescription
									as="span"
									class="mt-1 flex items-center text-sm text-gray-500"
									>{deliveryMethod.turnaround}</RadioGroupDescription
								>
								<RadioGroupDescription as="span" class="mt-6 text-sm font-medium text-gray-900"
									>{deliveryMethod.price}</RadioGroupDescription
								>
							</span>
						</span>
						{#if checked}
							<CheckCircleIcon aria-hidden="true" class="h-5 w-5 text-indigo-600" />
						{/if}
						<span
							class={[
								active ? 'border' : 'border-2',
								checked ? 'border-indigo-500' : 'border-transparent',
								'pointer-events-none absolute -inset-px rounded-lg'
							].join(' ')}
							aria-hidden="true"
						/>
					</div>
				</RadioGroupOption>
			{/each}
		</div>
	</RadioGroup>
</div>
