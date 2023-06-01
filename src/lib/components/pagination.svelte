<script lang="ts">
	import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@babeard/svelte-heroicons/solid';

	export let max: number;
	export let current: number;
</script>

<nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
	<div class="-mt-px flex w-0 flex-1">
		<a
			href="#"
			class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
			on:click={() => (current = Math.max(1, current - 1))}
		>
			<ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
			Previous
		</a>
	</div>
	<div class="hidden md:-mt-px md:flex">
		{#each { length: max } as _, pageIndex}
			{@const page = pageIndex + 1}
			{#if current === page}
				<a
					href="#"
					class="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
					aria-current="page">{current}</a
				>
			{:else if [1, current - 1, current + 1, max].includes(page)}
				<a
					href="#"
					class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
					on:click={() => (current = page)}>{page}</a
				>
			{:else if [current - 2, current + 2].includes(page)}
				<span
					class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
					>...</span
				>
			{/if}
		{/each}
	</div>
	<div class="-mt-px flex w-0 flex-1 justify-end">
		<a
			href="#"
			class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
			on:click={() => (current = Math.min(max, current + 1))}
		>
			Next
			<ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
		</a>
	</div>
</nav>
