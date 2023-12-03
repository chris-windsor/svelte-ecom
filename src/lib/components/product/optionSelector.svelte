<script lang="ts">
	import { XMarkIcon } from '@babeard/svelte-heroicons/outline';
	import {
		Dialog,
		DialogOverlay,
		RadioGroup,
		RadioGroupLabel,
		RadioGroupOption
	} from '@rgossiaux/svelte-headlessui';

	export let title: string;
	export let options: any[];
	export let selectedOption: any;
	export let variant: 'rounded' | 'block';
	export let link: string = '';

	let showLabelSROnly = variant === 'rounded';
	let helpPopupOpen = false;
</script>

<Dialog open={helpPopupOpen} class="fixed inset-0 z-40">
	<DialogOverlay
		class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-stone-900 pb-12 shadow-xl m-auto"
	>
		<div class="flex px-4 pt-5 pb-2">
			<button
				class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
				type="button"
				on:click={() => (helpPopupOpen = false)}
			>
				<span class="sr-only">Close menu</span>
				<XMarkIcon aria-hidden="true" class="h-6 w-6" />
			</button>
		</div>
		<slot name="helpPopup" />
	</DialogOverlay>
</Dialog>

<div>
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-white">{title}</h2>
		{#if $$slots.helpPopup || link.length}
			<a
				class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
				on:click={$$slots.helpPopup ? () => (helpPopupOpen = !helpPopupOpen) : () => {}}
				href={link.length ? link : '#helpPopup'}
			>
				See sizing chart
			</a>
		{/if}
	</div>
	<RadioGroup bind:value={selectedOption} class="mt-2">
		<RadioGroupLabel class="sr-only">Choose a {title}</RadioGroupLabel>
		<div
			class={variant === 'rounded'
				? 'flex items-center space-x-3'
				: 'grid grid-cols-3 gap-3 sm:grid-cols-6'}
		>
			{#each options as option}
				<RadioGroupOption disabled={!option.inStock} value={option} let:active let:checked>
					<div
						class={[
							'activeColor' in option ? option.activeColor : '',
							option.inStock
								? 'cursor-pointer focus:outline-none'
								: 'opacity-25 cursor-not-allowed',
							active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
							active && checked ? 'ring ring-offset-1' : '',
							variant === 'rounded' && !active && checked ? 'ring-2' : '',
							variant === 'block' && checked
								? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
								: 'bg-stone-900 border-stone-700 text-white hover:bg-gray-50',
							variant === 'rounded'
								? '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center focus:outline-none'
								: 'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
						].join(' ')}
					>
						<RadioGroupLabel as="span" class={showLabelSROnly ? 'sr-only' : ''}>
							{option.name}
						</RadioGroupLabel>
						{#if variant === 'rounded'}
							<span
								class={[
									option.bgColor,
									'h-8 w-8 border border-black border-opacity-10 rounded-full'
								].join(' ')}
								aria-hidden="true"
							/>
						{/if}
					</div>
				</RadioGroupOption>
			{/each}
		</div>
	</RadioGroup>
</div>
