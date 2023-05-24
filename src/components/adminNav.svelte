<script>
	import {
		Bars3Icon,
		MagnifyingGlassIcon,
		ArrowRightOnRectangleIcon
	} from '@babeard/svelte-heroicons/outline';
	import {
		Popover,
		PopoverButton,
		PopoverGroup,
		PopoverPanel,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import logo from '../logo.svg';
	import AnnouncementBanner from './announcementBanner.svelte';
	import Mobiledrawer from './mobileDrawer.svelte';
	import { companyName } from '../config.json';

	const navigation = {
		categories: [
			{
				name: 'Store',
				groups: [
					{
						name: 'Inventory',
						items: [
							{ name: 'Products', href: '/admin/products' },
							{ name: 'Shipments', href: '#' },
							{ name: 'Returns', href: '#' }
						]
					},
					{
						name: 'Discounts',
						items: [
							{ name: 'Coupons', href: '#' },
							{ name: 'Sales', href: '#' },
							{ name: 'Bundles', href: '#' },
							{ name: 'Retention', href: '#' }
						]
					},
					{
						name: 'Shipping',
						items: [
							{ name: 'Pending', href: '#' },
							{ name: 'Pickups', href: '#' },
							{ name: 'Packages', href: '#' },
							{ name: 'Rates', href: '#' }
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
							{ name: 'Top', href: '#' },
							{ name: 'Stock Value', href: '#' }
						]
					}
				]
			}
		],
		pages: [{ name: 'Settings', href: '#' }]
	};

	let show = false;
</script>

<Mobiledrawer {show} {navigation} />

<header class="relative">
	<nav aria-label="Top">
		<AnnouncementBanner />
		<div class="bg-white">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="border-b border-gray-200">
					<div class="flex h-16 items-center justify-between">
						<div class="hidden lg:flex lg:items-center">
							<a href="/" data-sveltekit-preload-data>
								<span class="sr-only">{companyName}</span>
								<img alt="" class="h-8 w-auto" src={logo} />
							</a>
						</div>
						<div class="hidden h-full lg:flex">
							<PopoverGroup class="ml-8">
								<div class="flex h-full justify-center space-x-8">
									{#each navigation.categories as category, categoryIdx}
										<Popover class="flex z-10" let:open>
											<div class="relative flex">
												<PopoverButton
													class={[
														open
															? 'border-indigo-600 text-indigo-600'
															: 'border-transparent text-gray-700 hover:text-gray-800',
														'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
													].join(' ')}
												>
													{category.name}
												</PopoverButton>
											</div>
											<Transition
												enter="transition ease-out duration-200"
												enterFrom="opacity-0"
												enterTo="opacity-100"
												leave="transition ease-in duration-150"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<PopoverPanel
													class="absolute inset-x-0 top-full text-gray-500 sm:text-sm z-10"
												>
													<div
														aria-hidden="true"
														class="absolute inset-0 top-1/2 bg-white shadow"
													/>
													<div class="relative bg-white">
														<div class="mx-auto max-w-7xl px-8">
															<div
																class="grid grid-cols-2 items-start gap-y-10 gap-x-8 pt-10 pb-12"
															>
																{#each [[0, 2], [2, 4]] as [start, end]}
																	<div class="grid grid-cols-2 gap-y-10 gap-x-8">
																		{#each category.groups.slice(start, end) as group, groupIdx}
																			<div>
																				<p
																					id={`desktop-featured-heading-${categoryIdx}-${groupIdx}`}
																					class="font-medium text-gray-900"
																				>
																					{group.name}
																				</p>
																				<ul
																					aria-labelledby={`desktop-featured-heading-${categoryIdx}-${groupIdx}`}
																					class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																				>
																					{#each group.items as item}
																						<li class="flex featuredItem">
																							<a href={item.href} class="hover:text-gray-800">
																								{item.name}
																							</a>
																						</li>
																					{/each}
																				</ul>
																			</div>
																		{/each}
																	</div>
																{/each}
															</div>
														</div>
													</div>
												</PopoverPanel>
											</Transition>
										</Popover>
									{/each}
									{#each navigation.pages as page}
										<a
											href={page.href}
											class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
											>{page.name}</a
										>
									{/each}
								</div>
							</PopoverGroup>
						</div>
						<div class="flex flex-1 items-center lg:hidden">
							<button
								class="-ml-2 rounded-md bg-white p-2 text-gray-400"
								type="button"
								on:click={() => (show = true)}
							>
								<span class="sr-only">Open menu</span>
								<Bars3Icon aria-hidden="true" class="h-6 w-6" />
							</button>
							<a class="ml-2 p-2 text-gray-400 hover:text-gray-500" href="/">
								<span class="sr-only">Search</span>
								<MagnifyingGlassIcon aria-hidden="true" class="h-6 w-6" />
							</a>
						</div>
						<a class="lg:hidden" href="/" data-sveltekit-preload-data>
							<span class="sr-only">{companyName}</span>
							<img alt="" class="h-8 w-auto" src={logo} />
						</a>
						<div class="flex flex-1 items-center justify-end">
							<div class="flex items-center lg:ml-8">
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
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
