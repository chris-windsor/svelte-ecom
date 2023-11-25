<script lang="ts">
	import type { PageData } from './$types';
	import { CurrencyDollarIcon, GlobeAmericasIcon } from '@babeard/svelte-heroicons/outline';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import { cart, addProductToCart, updateProductQtyInCart } from '$lib/stores/cart';
	import { companyName, imageBucket } from '$lib/config.json';
	import ReviewSummary from '$lib/components/product/reviewSummary.svelte';
	import OptionSelector from '$lib/components/product/optionSelector.svelte';

	export let data: PageData;
	const { data: rawProductData } = data;

	const product = {
		...rawProductData,
		breadcrumbs: rawProductData.categories.map((category) => ({
			...category,
			href: '#'
		})),
		colors: [
			{ name: 'Black', bgColor: 'bg-gray-900', activeColor: 'ring-gray-900', inStock: true },
			{ name: 'Heather Grey', bgColor: 'bg-gray-400', activeColor: 'ring-gray-400', inStock: false }
		],
		sizes: [
			{ name: 'XXS', inStock: true },
			{ name: 'XS', inStock: false },
			{ name: 'S', inStock: true },
			{ name: 'M', inStock: true },
			{ name: 'L', inStock: false },
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

	let selectedSize = product.sizes[0];
	let selectedColor = product.colors[1];

	const addToCart = () => {
		const existingProduct = $cart.items.find((item) => item.id === rawProductData.id);
		if (existingProduct) {
			updateProductQtyInCart(existingProduct.cartId, existingProduct.qty + 1);
		} else {
			addProductToCart(rawProductData);
		}
	};
</script>

<svelte:head>
	<title>{rawProductData.name} | {companyName}</title>
	<meta name="description" content={rawProductData.description} />
	<meta property="og:title" content={rawProductData.name} />
	<!-- TODO: this will not work until images are proxied as JPGs -->
	<meta property="og:image" content={imageBucket + rawProductData.img} />
</svelte:head>

<div class="bg-white">
	<div class="pt-6 pb-16 sm:pb-24">
		{#if rawProductData.categories.length}
			<Breadcrumbs {product} />
		{/if}
		<div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
				<div class="lg:col-span-5 lg:col-start-8">
					<div class="flex justify-between">
						<h1 class="text-xl font-medium text-gray-900">{rawProductData.name}</h1>
						<p class="text-xl font-medium text-gray-900">${rawProductData.price.toFixed(2)}</p>
					</div>
					{#if rawProductData.reviews}
						<ReviewSummary reviews={rawProductData.reviews} />
					{/if}
				</div>
				<div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
					<h2 class="sr-only">Images</h2>
					<div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
						<img
							alt={rawProductData.name + ' detail shot'}
							class={[
								rawProductData.img ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
								'rounded-lg'
							].join(' ')}
							src={imageBucket + rawProductData.img}
						/>
					</div>
				</div>
				<div class="mt-8 lg:col-span-5">
					<form>
						<div class="grid gap-8">
							{#each product.attributes.filter((attribute) => attribute.kind === 'static' && attribute.visibleOnListing) as attribute}
								<span class="bg-gray-100 rounded-sm p-1">
									{attribute.label}
								</span>
							{/each}
							<OptionSelector
								title={'Color'}
								options={product.colors}
								selectedOption={selectedColor}
								variant={'rounded'}
							/>
							<OptionSelector
								title={'Size'}
								options={product.sizes}
								selectedOption={selectedSize}
								variant={'block'}
							/>
						</div>
						<button
							class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							type="button"
							on:click={addToCart}
						>
							Add {$cart.items.findIndex((item) => item.id === rawProductData.id) ? '' : 'another'} to
							cart
						</button>
					</form>
					<div class="mt-10">
						<h2 class="text-sm font-medium text-gray-900">Description</h2>
						<div class="prose prose-sm mt-4 text-gray-500">
							{@html rawProductData.description}
						</div>
					</div>
					<div class="mt-8 border-t border-gray-200 pt-8">
						<h2 class="text-sm font-medium text-gray-900">Additional Details</h2>
						<div class="prose prose-sm mt-4 text-gray-500">
							<ul>
								{#each product.details as detail}
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
