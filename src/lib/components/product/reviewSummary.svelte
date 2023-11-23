<script lang="ts">
	import type { ProductReviewSummary } from '$lib/appTypes';
	import { StarIcon } from '@babeard/svelte-heroicons/solid';

	export let reviews: ProductReviewSummary;
</script>

<div class="mt-4">
	<h2 class="sr-only">Reviews</h2>
	<div class="flex items-center">
		<p class="text-sm text-gray-700">
			<span class="sr-only">{reviews.average} out of 5 stars</span>
		</p>
		<div class="flex items-center">
			{#each [0, 1, 2, 3, 4] as rating}
				<StarIcon
					class={[
						reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
						'h-5 w-5 flex-shrink-0'
					].join(' ')}
					aria-hidden="true"
				/>
			{/each}
		</div>
		<div aria-hidden="true" class="ml-4 text-sm text-gray-300">·</div>
		<div class="ml-4 flex">
			<a class="text-sm font-medium text-indigo-600 hover:text-indigo-500" href="#reviews">
				See all {reviews.totalCount} reviews
			</a>
		</div>
	</div>
</div>
