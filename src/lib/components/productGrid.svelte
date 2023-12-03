<script lang="ts">
	import { imageBucket } from '$lib/config.json';
	import type { Product } from '$lib/appTypes';

	export let pageCount: number = 1;
	export let products: Product[];
</script>

<div>
	<div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
		<h2 class="sr-only">Products</h2>

		<div
			class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
		>
			{#each products as product}
				<a href={`/product/${product.shortUrl}`} class="group" data-sveltekit-preload-data>
					<div
						class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
					>
						<img
							alt={product.name}
							src={imageBucket + product.img}
							class="h-full w-full object-contain object-center group-hover:opacity-75 mix-blend-multiply"
						/>
					</div>
					<h3 class="mt-4 text-sm text-gray-700">{product.name}</h3>
					<p class="mt-1 text-lg font-medium text-white">${product.price.toFixed(2)}</p>
				</a>
			{/each}
		</div>
	</div>
</div>
