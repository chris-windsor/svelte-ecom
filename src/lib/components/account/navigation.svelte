<script>
	import { ArrowRightOnRectangleIcon, ShoppingCartIcon } from '@babeard/svelte-heroicons/outline';
	import AnnouncementBanner from '$lib/components/announcementBanner.svelte';
	import logo from '$lib/logo.svg';
	import { companyName } from '$lib/config.json';
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart';

	const navigation = [
		{ name: 'Home', href: '/account' },
		{ name: 'Orders', href: '/account/orders' },
		{ name: 'Addresses', href: '/account/addresses' },
		{ name: 'Payment Methods', href: '/account/payment-methods' }
	];

	$: activeNav = navigation.map((route) => ({
		...route,
		current: route.href === $page.url.pathname
	}));

	$: cartSize = $cart.items.reduce((runningTotal, item) => {
		return runningTotal + item.qty;
	}, 0);

	const logout = async () => {};
</script>

<header class="relative">
	<nav aria-label="Top">
		<AnnouncementBanner />
		<div class="bg-stone-900">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="border-b border-stone-700">
					<div class="flex h-16 items-center justify-between">
						<div class="hidden lg:flex lg:items-center">
							<a href="/" data-sveltekit-preload-data>
								<span class="sr-only">{companyName}</span>
								<img alt="" class="h-8 w-auto" src={logo} />
							</a>
						</div>
						<a class="lg:hidden" href="/" data-sveltekit-preload-data>
							<span class="sr-only">{companyName}</span>
							<img alt="" class="h-8 w-auto" src={logo} />
						</a>
						<div class="flex flex-1 items-center justify-end">
							<div class="flex items-center lg:ml-8">
								<div class="flex space-x-8">
									<div class="lg:flex">
										<a
											class="-m-2 p-2 text-gray-400 hover:text-gray-500"
											href="/account"
											on:click={logout}
										>
											<span class="sr-only">Log out</span>
											<ArrowRightOnRectangleIcon aria-hidden="true" class="h-6 w-6" />
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
										<span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
											{cartSize}
										</span>
										<span class="sr-only">items in cart, view bag</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div aria-label="Global" class="flex md:space-x-8 py-2">
					{#each activeNav as item}
						<a
							aria-current={item.current ? 'page' : undefined}
							href={item.href}
							class={[
								'text-white hover:bg-gray-50 hover:text-white rounded-md py-2 px-3 inline-flex items-center text-sm font-medium',
								item.current ? 'bg-gray-100 text-white hover:bg-gray-100' : ''
							].join(' ')}
							>{item.name}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</nav>
</header>
