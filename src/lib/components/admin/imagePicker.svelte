<script lang="ts">
	import { CheckCircleIcon } from '@babeard/svelte-heroicons/solid';
	import {
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption
	} from '@rgossiaux/svelte-headlessui';

	export let images: string[];
	export let selectedImage: string;
</script>

<RadioGroup value={selectedImage} on:change={(e) => (selectedImage = e.detail)}>
	{#if !images.length}
		<RadioGroupLabel class="text-base font-semibold leading-6 text-gray-900">
			No images found on the server
		</RadioGroupLabel>
	{/if}
	<div class="grid grid-cols-3 gap-y-2 sm:grid-cols-4 sm:gap-x-2">
		{#each images as image}
			<RadioGroupOption as="div" value={image} let:active let:checked>
				<div
					class={[
						checked ? 'border-transparent' : 'border-gray-300',
						active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
						'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
					].join(' ')}
				>
					<span class="flex flex-1">
						<span class="flex flex-col">
							<img src={'https://lemonseeds.s3.us-east-2.amazonaws.com/' + image} />
							<RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">
								{image.substr(0, 7)}
							</RadioGroupLabel>
						</span>
					</span>
					<CheckCircleIcon
						class={[!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600'].join(' ')}
						aria-hidden="true"
					/>
					<span
						class={[
							active ? 'border' : 'border-2',
							checked ? 'border-indigo-600' : 'border-transparent',
							'pointer-events-none absolute -inset-px rounded-lg'
						].join(' ')}
						aria-hidden="true"
					/>
				</div>
			</RadioGroupOption>
		{/each}
	</div>
</RadioGroup>
