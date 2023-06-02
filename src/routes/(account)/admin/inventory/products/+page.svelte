<script lang="ts">
	import PaginatedTable from '$lib/components/admin/paginatedTable.svelte';
	import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	import type { PageData } from './$types';
	import { EllipsisVerticalIcon } from '@babeard/svelte-heroicons/solid';

	export let data: PageData;

	const rows = [
		{
			id: '123',
			name: 'Lime Green Vase',
			email: 'leslie.alexander@example.com',
			imageUrl: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg',
			href: '#',
			lastPurchased: '3h ago',
			lastPurchasedDateTime: '2023-01-23T13:23Z',
			variationCount: 2,
			minimumQty: 1,
			priceMin: 54.98,
			priceMax: 68.7
		},
		{
			id: '456',
			name: 'Grey Hiking Socks',
			imageUrl: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
			href: '#',
			lastPurchased: '3h ago',
			lastPurchasedDateTime: '2023-01-23T13:23Z',
			variationCount: 5,
			minimumQty: 1,
			priceMin: 17.4,
			priceMax: 21
		},
		{
			id: '789',
			name: 'Dark Blue Tee',
			imageUrl: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-02.jpg',
			href: '#',
			lastPurchased: null,
			variationCount: 1,
			minimumQty: 1,
			priceMin: 19.79,
			priceMax: 19.79
		},
		{
			id: '098',
			name: 'Merino Wool Sweats',
			imageUrl: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-01-product-01.jpg',
			href: '#',
			lastPurchased: '3h ago',
			lastPurchasedDateTime: '2023-01-23T13:23Z',
			variationCount: 1,
			minimumQty: 1,
			priceMin: 49.8,
			priceMax: 49.8
		},
		{
			id: '765',
			name: 'Purple Bucket Hat',
			imageUrl: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-02.jpg',
			href: '#',
			lastPurchased: '3h ago',
			lastPurchasedDateTime: '2023-01-23T13:23Z',
			variationCount: 1,
			minimumQty: 7,
			priceMin: 11.54,
			priceMax: 11.54
		},
		{
			id: '432',
			name: 'Cork Beach Sandals',
			imageUrl: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-01-product-02.jpg',
			href: '#',
			lastPurchased: null,
			variationCount: 3,
			minimumQty: 1,
			priceMin: 27.63,
			priceMax: 35.9
		}
	];
</script>

<div class="flex flex-row">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900">Product list</h1>
	<a
		class="flex w-fit items-center justify-center rounded-md bg-indigo-600 py-1.5 px-3 text-base font-semibold leading-7 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6 ml-4"
		href="/admin/inventory/products/edit">Create new</a
	>
</div>
<PaginatedTable totalRows={rows.length}>
	{#each rows as row}
		<li class="flex justify-between gap-x-6 py-5">
			<div class="flex gap-x-4">
				<img
					class="h-12 w-12 flex-none rounded-full bg-gray-50"
					src={row.imageUrl}
					alt={'Thumbnail for' + row.name}
				/>
				<div class="min-w-0 flex-auto">
					<p class="text-sm font-semibold leading-6 text-gray-900">
						<a href={'/admin/inventory/products/edit?id=' + row.id} class="hover:underline"
							>{row.name}</a
						>
					</p>
					<p class="mt-1 flex text-xs leading-5 text-gray-500">
						{row.variationCount} variations
						<span aria-hidden="true" class="mx-2 text-gray-400">&middot;</span>
						{#if row.variationCount > 1}
							${row.priceMin.toFixed(2)}&mdash;${row.priceMax.toFixed(2)}
						{:else}
							${row.priceMax.toFixed(2)}
						{/if}
						<span aria-hidden="true" class="mx-2 text-gray-400">&middot;</span>
						min. qty of {row.minimumQty}
					</p>
				</div>
			</div>
			<div class="flex items-center gap-x-6">
				<div class="hidden sm:flex sm:flex-col sm:items-end">
					{#if row.lastPurchased}
						<p class="mt-1 text-xs leading-5 text-gray-500">
							Last purchased <time datetime={row.lastPurchasedDateTime}>{row.lastPurchased}</time>
						</p>
					{:else}
						<div class="mt-1 flex items-center gap-x-1.5">
							<div class="flex-none rounded-full bg-red-500/20 p-1">
								<div class="h-1.5 w-1.5 rounded-full bg-red-500" />
							</div>
							<p class="text-xs leading-5 text-gray-500">Low in stock</p>
						</div>
					{/if}
				</div>
				<Menu as="div" class="relative flex-none">
					<MenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
						<span class="sr-only">Open options</span>
						<EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
					</MenuButton>
					<Transition
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-50"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-50"
					>
						<MenuItems
							class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
						>
							<MenuItem let:active>
								<a
									href="#"
									class={[
										active ? 'bg-gray-50' : '',
										'block px-3 py-1 text-sm leading-6 text-gray-900'
									].join(' ')}>Edit<span class="sr-only">, {row.name}</span></a
								>
							</MenuItem>
							<MenuItem let:active>
								<a
									href={row.href}
									class={[
										active ? 'bg-gray-50' : '',
										'block px-3 py-1 text-sm leading-6 text-gray-900'
									].join(' ')}>View Listing<span class="sr-only">, {row.name}</span></a
								>
							</MenuItem>
						</MenuItems>
					</Transition>
				</Menu>
			</div>
		</li>
	{/each}
</PaginatedTable>
