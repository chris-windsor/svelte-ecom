<script lang="ts">
	import { CheckIcon, ClockIcon } from '@babeard/svelte-heroicons/solid';
	import { removeProductFromCart, cart, updateProductQtyInCart } from '$lib/stores/cart';
	import { imageBucket } from '$lib/config.json';

	export let additionalClass: string = '';

	$: products = $cart.items.map((item) => {
		return {
			...item,
			inStock: Math.random() > 0.4,
			leadTime: '3 months',
			imageSrc: imageBucket + (item.img !== '' ? item.img : 'unknown')
		};
	});

	const updateItemQty = (cartId: string, event: any) => {
		if (!event?.target?.value) return;

		updateProductQtyInCart(cartId, parseInt(event.target.value));
	};

	const removeItem = (cartId: string) => {
		removeProductFromCart(cartId);
	};
</script>

<ul class={['divide-y divide-gray-200', additionalClass].join(' ')}>
	{#each products as product, productIdx}
		<li class="flex py-6 sm:py-10">
			<div class="flex-shrink-0">
				<img
					alt={product.name}
					src={product.imageSrc}
					class="h-24 w-24 rounded-lg object-contain object-center sm:h-32 sm:w-32"
				/>
			</div>
			<div class="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
				<div>
					<div class="flex justify-between sm:grid sm:grid-cols-2">
						<div class="pr-6">
							<h3 class="text-sm">
								<a
									href={'/product/' + product.shortUrl}
									class="font-medium text-gray-700 hover:text-gray-800">{product.name}</a
								>
							</h3>
							<p class="mt-1 text-sm text-gray-500">
								{#each product.attributes as attribute}
									{#if attribute.kind === 'static'}
										{attribute.label}
									{:else if attribute.kind === 'list'}
										{attribute.label}: {attribute.content}
									{/if}
								{/each}
							</p>
						</div>
						<p class="text-right text-sm font-medium text-white">
							${product.price.toFixed(2)}{product.qty > 1 ? '/ea' : ''}
						</p>
					</div>
					<div class="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
						<label for={`quantity-${productIdx}`} class="sr-only">Quantity, {product.name}</label>
						<select
							id={`quantity-${productIdx}`}
							name={`quantity-${productIdx}`}
							value={product.qty}
							class="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
							on:change={(event) => updateItemQty(product.cartId, event)}
						>
							{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as qtyOption}
								<option>{qtyOption}</option>
							{/each}
						</select>
						<button
							class="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
							type="button"
							on:click={() => removeItem(product.cartId)}
						>
							<span>Remove</span>
						</button>
					</div>
				</div>
				<p class="mt-4 flex space-x-2 text-sm text-gray-700">
					{#if product.inStock}
						<CheckIcon aria-hidden="true" class="h-5 w-5 flex-shrink-0 text-green-500" />
					{:else}
						<ClockIcon aria-hidden="true" class="h-5 w-5 flex-shrink-0 text-gray-300" />
					{/if}
					<span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
				</p>
			</div>
		</li>
	{/each}
</ul>
