<script>
	import {
		MagnifyingGlassIcon,
		ArrowRightOnRectangleIcon
	} from '@babeard/svelte-heroicons/outline';
	import BaseHeader from './baseHeader.svelte';

	const navigation = {
		categories: [
			{
				name: 'Store',
				groups: [
					{
						name: 'Inventory',
						items: [
							{ name: 'Products', href: '/admin/inventory/products' },
							{ name: 'Attributes', href: '/admin/inventory/attributes' },
							{ name: 'Categories', href: '/admin/inventory/categories' }
						]
					},
					{
						name: 'Marketing',
						items: [
							{ name: 'Coupons', href: '/marketing/coupons' },
							{ name: 'Sales', href: '/marketing/sales' },
							{ name: 'Bundles', href: '/marketing/bundles' }
						]
					},
					{
						name: 'Shipping',
						items: [
							{ name: 'Shipments', href: '/admin/inventory/shipments' },
							{ name: 'Returns', href: '/admin/inventory/returns' },
							{ name: 'Pickups', href: '/admin/shipping/pickups' },
							{ name: 'Packages', href: '/admin/shipping/packages' },
							{ name: 'Rates', href: '/admin/shipping/rates' }
						]
					}
				]
			},
			{
				name: 'Analytics',
				groups: [
					{
						name: 'Customers',
						items: [
							{ name: 'Orders', href: '#' },
							{ name: 'Sales', href: '#' },
							{ name: 'Locations', href: '#' }
						]
					},
					{
						name: 'Revenue',
						items: [
							{ name: 'Gross', href: '#' },
							{ name: 'Shipping', href: '#' },
							{ name: 'Taxes', href: '#' },
							{ name: 'Discounts', href: '#' }
						]
					},
					{
						name: 'Products',
						items: [
							{ name: 'Stock Value', href: '#' },
							{ name: 'Popularity', href: '#' }
						]
					}
				]
			}
		],
		pages: [{ name: 'Settings', href: '#' }]
	};
</script>

<BaseHeader {navigation}>
	<a slot="leftButton" class="ml-2 p-2 text-gray-400 hover:text-gray-500" href="/">
		<span class="sr-only">Search</span>
		<MagnifyingGlassIcon aria-hidden="true" class="h-6 w-6" />
	</a>

	<div slot="rightButtons" class="flex items-center lg:ml-8">
		<div class="flex space-x-8">
			<div class="hidden lg:flex">
				<a class="-m-2 p-2 text-gray-400 hover:text-gray-500" href="/">
					<span class="sr-only">Search</span>
					<MagnifyingGlassIcon aria-hidden="true" class="h-6 w-6" />
				</a>
			</div>
		</div>
		<span aria-hidden="true" class="mx-4 h-6 w-px bg-gray-200 lg:mx-6" />
		<div class="flow-root">
			<a class="group -m-2 flex items-center p-2" href="/cart">
				<span class="sr-only">Log out</span>
				<ArrowRightOnRectangleIcon
					aria-hidden="true"
					class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
				/>
			</a>
		</div>
	</div>
</BaseHeader>
