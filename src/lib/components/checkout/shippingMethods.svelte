<script lang="ts">
	import { CheckCircleIcon } from '@babeard/svelte-heroicons/solid';
	import {
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption
	} from '@rgossiaux/svelte-headlessui';
	import { setSelectedShippingMethod, cart } from '$lib/stores/cart';
	import { shippingMethods } from '$lib/config.json';

	type DeliveryMethod = {
		id: number;
		title: string;
		turnaround: string;
		price: number;
	};
</script>

<div class="mt-10 border-t border-gray-200 pt-10">
	<RadioGroup
		value={$cart.selectedShippingMethod}
		on:change={(e) => setSelectedShippingMethod(e.detail)}
	>
		<RadioGroupLabel class="text-lg font-medium text-gray-900">Delivery method</RadioGroupLabel>
		<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
			{#each shippingMethods as shippingMethod}
				<RadioGroupOption value={shippingMethod.id} as="div" let:active let:checked>
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
									>{shippingMethod.title}</RadioGroupLabel
								>
								<RadioGroupDescription
									as="span"
									class="mt-1 flex items-center text-sm text-gray-500"
									>{shippingMethod.turnaround}</RadioGroupDescription
								>
								<RadioGroupDescription as="span" class="mt-6 text-sm font-medium text-gray-900"
									>${shippingMethod.price.toFixed(2)}</RadioGroupDescription
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
