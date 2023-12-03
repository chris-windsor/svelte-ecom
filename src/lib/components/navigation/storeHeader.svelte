<script lang="ts">
	import {
		MagnifyingGlassIcon,
		ShoppingCartIcon,
		UserIcon
	} from '@babeard/svelte-heroicons/outline';
	import type { ProductCategory } from '$lib/appTypes';
	import { cart } from '$lib/stores/cart';
	import AnnouncementBanner from '$lib/components/announcementBanner.svelte';
	import BaseHeader from '$lib/components/navigation/baseHeader.svelte';

	export let categories: ProductCategory[] = [];

	const navigation = {
		categories: [
			{
				name: 'Categories',
				groups: [
					{
						name: 'Best Sellers',
						items: categories.map((category) => ({
							name: category.label,
							href: '/store/category/' + category.id
						}))
					},
					{
						name: 'A-Z',
						items: [
							{ name: 'Coyote', href: '#' },
							{ name: 'Elephant', href: '#' },
							{ name: 'Giraffe', href: '#' },
							{ name: 'Kangaroo', href: '#' }
						]
					}
				]
			},
			{
				name: 'Brands',
				groups: [
					{
						name: 'Best Sellers',
						items: [
							{ name: 'Peach', href: '#' },
							{ name: 'Lemon', href: '#' },
							{ name: 'Strawberry', href: '#' }
						]
					},
					{
						name: 'A-Z',
						items: [
							{ name: 'Apple', href: '#' },
							{ name: 'Banana', href: '#' },
							{ name: 'Cherry', href: '#' },
							{ name: 'Dragonfruit', href: '#' }
						]
					}
				]
			}
		],
		pages: [
			{ name: 'Featured', href: '#' },
			{ name: 'New', href: '#' },
			{ name: 'Sale', href: '#' }
		]
	};

	$: cartSize = $cart.items.reduce((runningTotal, item) => {
		return runningTotal + item.qty;
	}, 0);
</script>

<BaseHeader {navigation}>
	<AnnouncementBanner slot="banner" />

	<a slot="leftButton" class="ml-2 p-2 text-white hover:text-gray-300" href="/">
		<span class="sr-only">Search</span>
		<MagnifyingGlassIcon aria-hidden="true" class="h-6 w-6" />
	</a>

	<div slot="rightButtons" class="flex items-center lg:ml-8">
		<div class="flex space-x-8">
			<div class="hidden lg:flex">
				<a class="-m-2 p-2 text-white hover:text-gray-300" href="/">
					<span class="sr-only">Search</span>
					<MagnifyingGlassIcon aria-hidden="true" class="h-6 w-6" />
				</a>
			</div>
			<div class="flex">
				<a class="-m-2 p-2 text-white hover:text-gray-300" href="/account">
					<span class="sr-only">Account</span>
					<UserIcon aria-hidden="true" class="h-6 w-6" />
				</a>
			</div>
		</div>
		<span aria-hidden="true" class="mx-4 h-6 w-px bg-gray-200 lg:mx-6" />
		<div class="flow-root">
			<a class="group -m-2 flex items-center p-2" href="/cart">
				<ShoppingCartIcon
					aria-hidden="true"
					class="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-300"
				/>
				<span class="ml-2 text-sm font-medium text-white group-hover:text-gray-300">
					{cartSize}
				</span>
				<span class="sr-only">items in cart, view bag</span>
			</a>
		</div>
	</div>
</BaseHeader>
