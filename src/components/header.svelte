<script>
	import {
		Bars3Icon,
		MagnifyingGlassIcon,
		ShoppingCartIcon,
		UserIcon
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
	import { cart } from '../stores/cart';

	const navigation = {
		categories: [
			{
				name: 'Women',
				featured: [
					{ name: 'Sleep', href: '#' },
					{ name: 'Swimwear', href: '#' },
					{ name: 'Underwear', href: '#' }
				],
				collection: [
					{ name: 'Everything', href: '#' },
					{ name: 'Core', href: '#' },
					{ name: 'New Arrivals', href: '#' },
					{ name: 'Sale', href: '#' }
				],
				categories: [
					{ name: 'Basic Tees', href: '#' },
					{ name: 'Artwork Tees', href: '#' },
					{ name: 'Bottoms', href: '#' },
					{ name: 'Underwear', href: '#' },
					{ name: 'Accessories', href: '#' }
				],
				brands: [
					{ name: 'Full Nelson', href: '#' },
					{ name: 'My Way', href: '#' },
					{ name: 'Re-Arranged', href: '#' },
					{ name: 'Counterfeit', href: '#' },
					{ name: 'Significant Other', href: '#' }
				]
			},
			{
				name: 'Men',
				featured: [
					{ name: 'Casual', href: '#' },
					{ name: 'Boxers', href: '#' },
					{ name: 'Outdoor', href: '#' }
				],
				collection: [
					{ name: 'Everything', href: '#' },
					{ name: 'Core', href: '#' },
					{ name: 'New Arrivals', href: '#' },
					{ name: 'Sale', href: '#' }
				],
				categories: [
					{ name: 'Artwork Tees', href: '#' },
					{ name: 'Pants', href: '#' },
					{ name: 'Accessories', href: '#' },
					{ name: 'Boxers', href: '#' },
					{ name: 'Basic Tees', href: '#' }
				],
				brands: [
					{ name: 'Significant Other', href: '#' },
					{ name: 'My Way', href: '#' },
					{ name: 'Counterfeit', href: '#' },
					{ name: 'Re-Arranged', href: '#' },
					{ name: 'Full Nelson', href: '#' }
				]
			}
		],
		pages: [
			{ name: 'Company', href: '#' },
			{ name: 'Stores', href: '#' }
		]
	};

	let show = false;
	let userStore = { cart: [] };
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
							<a href="/">
								<span class="sr-only">Your Company</span>
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
																<div class="grid grid-cols-2 gap-y-10 gap-x-8">
																	<div>
																		<p
																			id={`desktop-featured-heading-${categoryIdx}`}
																			class="font-medium text-gray-900"
																		>
																			Featured
																		</p>
																		<ul
																			aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
																			class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																		>
																			{#each category.featured as item}
																				<li class="flex featuredItem">
																					<a href={item.href} class="hover:text-gray-800">
																						{item.name}
																					</a>
																				</li>
																			{/each}
																		</ul>
																	</div>
																	<div>
																		<p
																			id="desktop-categories-heading"
																			class="font-medium text-gray-900"
																		>
																			Categories
																		</p>
																		<ul
																			aria-labelledby="desktop-categories-heading"
																			class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																		>
																			{#each category.categories as item}
																				<li class="flex">
																					<a href={item.href} class="hover:text-gray-800">
																						{item.name}
																					</a>
																				</li>
																			{/each}
																		</ul>
																	</div>
																</div>
																<div class="grid grid-cols-2 gap-y-10 gap-x-8">
																	<div>
																		<p
																			id="desktop-collection-heading"
																			class="font-medium text-gray-900"
																		>
																			Collection
																		</p>
																		<ul
																			aria-labelledby="desktop-collection-heading"
																			class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																		>
																			{#each category.collection as item}
																				<li class="flex">
																					<a href={item.href} class="hover:text-gray-800">
																						{item.name}
																					</a>
																				</li>
																			{/each}
																		</ul>
																	</div>

																	<div>
																		<p id="desktop-brand-heading" class="font-medium text-gray-900">
																			Brands
																		</p>
																		<ul
																			aria-labelledby="desktop-brand-heading"
																			class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																		>
																			{#each category.brands as item}
																				<li class="flex">
																					<a href={item.href} class="hover:text-gray-800">
																						{item.name}
																					</a>
																				</li>
																			{/each}
																		</ul>
																	</div>
																</div>
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
						<a class="lg:hidden" href="/">
							<span class="sr-only">Your Company</span>
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
									<div class="flex">
										<a class="-m-2 p-2 text-gray-400 hover:text-gray-500" href="/account">
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
											class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
										/>
										<span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
											>{$cart.items.length}</span
										>
										<span class="sr-only">items in cart, view bag</span>
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
