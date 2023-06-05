<script lang="ts">
	import type { PageData } from './$types';
	import { StarIcon } from '@babeard/svelte-heroicons/solid';
	import { CurrencyDollarIcon, GlobeAmericasIcon } from '@babeard/svelte-heroicons/outline';
	import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import { cart, addProductToCart, updateProductQtyInCart } from '$lib/stores/cart';
	import { companyName, imageBucket } from '$lib/config.json';

	export let data: PageData;
	const { data: product } = data;

	console.log(product.categories);

	const reviews = { average: 4, totalCount: 13 };

	const product2 = {
		...product,
		breadcrumbs: product.categories.map((category) => ({
			...category,
			href: '#'
		})),
		colors: [
			{ name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
			{ name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' }
		],
		sizes: [
			{ name: 'XXS', inStock: true },
			{ name: 'XS', inStock: true },
			{ name: 'S', inStock: true },
			{ name: 'M', inStock: true },
			{ name: 'L', inStock: true },
			{ name: 'XL', inStock: false }
		],
		details: [
			'Only the best materials',
			'Ethically and locally made',
			'Pre-washed and pre-shrunk',
			'Machine wash cold with similar colors'
		]
	};

	const policies = [
		{
			name: 'International delivery',
			icon: GlobeAmericasIcon,
			description: 'Get your order in 2 years'
		},
		{ name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" }
	];

	let selectedSize = product2.sizes[0];
	let selectedColor = product2.colors[1];

	const addToCart = () => {
		const existingProduct = $cart.items.find((item) => item.id === product.id);
		if (existingProduct) {
			updateProductQtyInCart(existingProduct.cartId, existingProduct.qty + 1);
		} else {
			addProductToCart(product);
		}
	};
</script>

<svelte:head>
	<title>{product.name} | {companyName}</title>
	<meta name="description" content={product.description} />
	<meta property="og:title" content={product.name} />
	<!-- TODO: this will not work until images are proxied as JPGs -->
	<meta property="og:image" content={imageBucket + product.img} />
</svelte:head>

<div class="bg-white">
	<div class="pt-6 pb-16 sm:pb-24">
		<Breadcrumbs product={product2} />
		<div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
				<div class="lg:col-span-5 lg:col-start-8">
					<div class="flex justify-between">
						<h1 class="text-xl font-medium text-gray-900">{product.name}</h1>
						<p class="text-xl font-medium text-gray-900">${product.price.toFixed(2)}</p>
					</div>
					{#if reviews}
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
									<a
										class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
										href="#reviews"
									>
										See all {reviews.totalCount} reviews
									</a>
								</div>
							</div>
						</div>
					{/if}
				</div>
				<div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
					<h2 class="sr-only">Images</h2>
					<div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
						<img
							alt="The coolest product"
							class={[
								product.img ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
								'rounded-lg'
							].join(' ')}
							src={imageBucket + product.img}
						/>
					</div>
				</div>
				<div class="mt-8 lg:col-span-5">
					<form>
						<div>
							<h2 class="text-sm font-medium text-gray-900">Color</h2>
							<RadioGroup
								value={selectedColor}
								on:change={(e) => (selectedColor = e.detail)}
								class="mt-2"
							>
								<RadioGroupLabel class="sr-only">Choose a color</RadioGroupLabel>
								<div class="flex items-center space-x-3">
									{#each product2.colors as color}
										<RadioGroupOption value={color} let:active let:checked>
											<div
												class={[
													color.selectedColor,
													active && checked ? 'ring ring-offset-1' : '',
													!active && checked ? 'ring-2' : '',
													'-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
												].join(' ')}
											>
												<RadioGroupLabel as="span" class="sr-only">{color.name}</RadioGroupLabel>
												<span
													class={[
														color.bgColor,
														'h-8 w-8 border border-black border-opacity-10 rounded-full'
													].join(' ')}
													aria-hidden="true"
												/>
											</div>
										</RadioGroupOption>
									{/each}
								</div>
							</RadioGroup>
						</div>
						<div class="mt-8">
							<div class="flex items-center justify-between">
								<h2 class="text-sm font-medium text-gray-900">Size</h2>
								<a class="text-sm font-medium text-indigo-600 hover:text-indigo-500" href="#sizing">
									See sizing chart
								</a>
							</div>
							<RadioGroup
								value={selectedSize}
								on:change={(e) => (selectedSize = e.detail)}
								class="mt-2"
							>
								<RadioGroupLabel class="sr-only">Choose a size</RadioGroupLabel>
								<div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
									{#each product2.sizes as size}
										<RadioGroupOption disabled={!size.inStock} value={size} let:active let:checked>
											<div
												class={[
													size.inStock
														? 'cursor-pointer focus:outline-none'
														: 'opacity-25 cursor-not-allowed',
													active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
													checked
														? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
														: 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
													'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
												].join(' ')}
											>
												<RadioGroupLabel as="span">{size.name}</RadioGroupLabel>
											</div>
										</RadioGroupOption>
									{/each}
								</div>
							</RadioGroup>
						</div>
						<button
							class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							type="submit"
							on:click={addToCart}
						>
							Add {$cart.items.findIndex((item) => item.id === product.id) ? '' : 'another'} to cart
						</button>
					</form>
					<div class="mt-10">
						<h2 class="text-sm font-medium text-gray-900">Additional Details</h2>
						<div class="prose prose-sm mt-4 text-gray-500">
							{@html product2.description}
						</div>
					</div>
					<div class="mt-8 border-t border-gray-200 pt-8">
						<h2 class="text-sm font-medium text-gray-900">Why buy here?</h2>
						<div class="prose prose-sm mt-4 text-gray-500">
							<ul>
								{#each product2.details as detail}
									<li>{detail}</li>
								{/each}
							</ul>
						</div>
					</div>
					<section aria-labelledby="policies-heading" class="mt-10">
						<h2 id="policies-heading" class="sr-only">Our Policies</h2>
						<dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
							{#each policies as policy}
								<div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
									<dt>
										<svelte:component
											this={policy.icon}
											aria-hidden="true"
											class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
										/>
										<span class="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
									</dt>
									<dd class="mt-1 text-sm text-gray-500">{policy.description}</dd>
								</div>
							{/each}
						</dl>
					</section>
				</div>
			</div>
		</div>
	</div>
</div>
