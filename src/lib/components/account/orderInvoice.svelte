<script lang="ts">
	import { Transition, TransitionChild } from '@rgossiaux/svelte-headlessui';

	type Order = {
		products: any[];
	};

	export let order: Order;

	let show = false;
</script>

<div class="mt-4 border-b border-stone-700 pb-5 text-sm sm:flex sm:justify-between">
	<dl class="flex">
		<dt class="text-gray-500">Order number&nbsp;</dt>
		<dd class="font-medium text-white">W086438695</dd>
		<dt>
			<span class="sr-only">Date</span>
			<span aria-hidden="true" class="mx-2 text-gray-400">&middot;</span>
		</dt>
		<dd class="font-medium text-white">
			<time datetime="2021-03-22">March 22, 2021</time>
		</dd>
		<dt>
			<span class="sr-only">Item count</span>
			<span aria-hidden="true" class="mx-2 text-gray-400">&middot;</span>
		</dt>
		<dd class="font-medium text-white">
			<time datetime="2021-03-22">2 items</time>
		</dd>
		<dt>
			<span class="sr-only">Total cost</span>
			<span aria-hidden="true" class="mx-2 text-gray-400">&middot;</span>
		</dt>
		<dd class="font-medium text-white">
			<time datetime="2021-03-22">$78.92</time>
		</dd>
	</dl>
	<div class="mt-4 sm:mt-0">
		<a
			class="font-medium text-indigo-600 hover:text-indigo-500"
			href="#"
			on:click={() => (show = !show)}
		>
			{#if show}
				Collapse invoice
				<span aria-hidden="true"> &uarr;</span>
			{:else}
				Expand invoice
				<span aria-hidden="true"> &darr;</span>
			{/if}
		</a>
	</div>
</div>
<Transition {show}>
	<TransitionChild
		enter="transition ease duration-500 transform"
		enterFrom="opacity-0 -translate-y-12"
		enterTo="opacity-100 translate-y-0"
		leave="transition ease duration-300 transform"
		leaveFrom="opacity-100 translate-y-0"
		leaveTo="opacity-0 -translate-y-12"
	>
		<div class="mt-8">
			<h2 class="sr-only">Products purchased</h2>
			<div class="space-y-24">
				{#each order.products as product}
					<div
						class="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
					>
						<div class="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
							<div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-50">
								<img
									alt={product.imageAlt}
									src={product.imageSrc}
									class="object-cover object-center"
								/>
							</div>
						</div>
						<div class="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
							<h3 class="text-lg font-medium text-white">
								<a href={product.href}>{product.name}</a>
							</h3>
							<p class="mt-1 font-medium text-white">{product.price}</p>
							<p class="mt-3 text-gray-500">{product.description}</p>
						</div>
						<div class="sm:col-span-12 md:col-span-7">
							<dl
								class="grid grid-cols-1 gap-y-8 border-b border-stone-700 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10"
							>
								<div>
									<dt class="font-medium text-white">Delivery address</dt>
									<dd class="mt-3 text-gray-500">
										<span class="block">{product.address[0]}</span>
										<span class="block">{product.address[1]}</span>
										<span class="block">{product.address[2]}</span>
									</dd>
								</div>
								<div>
									<dt class="font-medium text-white">Shipping updates</dt>
									<dd class="mt-3 space-y-3 text-gray-500">
										<p>{product.email}</p>
										<p>{product.phone}</p>
										<button class="font-medium text-indigo-600 hover:text-indigo-500" type="button">
											Edit
										</button>
									</dd>
								</div>
							</dl>
							<p class="mt-6 font-medium text-white md:mt-10">
								{product.status} on
								<time datetime={product.datetime}>{product.date}</time>
							</p>
							<div class="mt-6">
								<div class="overflow-hidden rounded-full bg-gray-200">
									<div
										style={`width: calc((${product.step} * 2 + 1) / 8 * 100%)`}
										class="h-2 rounded-full bg-indigo-600"
									/>
								</div>
								<div class="mt-6 hidden grid-cols-4 font-medium text-gray-600 sm:grid">
									<div class="text-indigo-600">Order placed</div>
									<div class={[product.step > 0 ? 'text-indigo-600' : '', 'text-center'].join(' ')}>
										Processing
									</div>
									<div class={[product.step > 1 ? 'text-indigo-600' : '', 'text-center'].join(' ')}>
										Shipped
									</div>
									<div class={[product.step > 2 ? 'text-indigo-600' : '', 'text-right'].join(' ')}>
										Delivered
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="mt-24">
			<h2 class="sr-only">Billing Summary</h2>
			<div
				class="rounded-lg bg-gray-50 py-6 px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8"
			>
				<dl class="grid grid-cols-1 gap-6 text-sm sm:grid-cols-3 md:gap-x-8 lg:col-span-8 lg:pl-8">
					<div>
						<dt class="font-medium text-white">Billing address</dt>
						<dd class="mt-3 text-gray-500">
							<span class="block">Floyd Miles</span>
							<span class="block">7363 Cynthia Pass</span>
							<span class="block">Toronto, ON N3Y 4H8</span>
						</dd>
					</div>
					<div>
						<dt class="font-medium text-white">Shipping address</dt>
						<dd class="mt-3 text-gray-500">
							<span class="block">Floyd Miles</span>
							<span class="block">4351 Main St</span>
							<span class="block">Toronto, ON N3Y 4H8</span>
						</dd>
					</div>
					<div>
						<dt class="font-medium text-white">Payment information</dt>
						<dd class="mt-3 flex">
							<div>
								<svg
									aria-hidden="true"
									class="h-6 w-auto"
									height="24"
									viewBox="0 0 36 24"
									width="36"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect fill="#224DBA" height="24" rx="4" width="36" />
									<path
										d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
										fill="#fff"
									/>
								</svg>
								<p class="sr-only">Visa</p>
							</div>
							<div class="ml-4">
								<p class="text-white">Ending with 4242</p>
								<p class="text-gray-600">Expires 02 / 24</p>
							</div>
						</dd>
					</div>
				</dl>

				<dl class="mt-8 divide-y divide-gray-200 text-sm lg:col-span-4 lg:mt-0 lg:pr-8">
					<div class="flex items-center justify-between pb-4">
						<dt class="text-gray-600">Subtotal</dt>
						<dd class="font-medium text-white">$72</dd>
					</div>
					<div class="flex items-center justify-between py-4">
						<dt class="text-gray-600">Shipping</dt>
						<dd class="font-medium text-white">$5</dd>
					</div>
					<div class="flex items-center justify-between py-4">
						<dt class="text-gray-600">Tax</dt>
						<dd class="font-medium text-white">$6.16</dd>
					</div>
					<div class="flex items-center justify-between pt-4">
						<dt class="font-medium text-white">Order total</dt>
						<dd class="font-medium text-indigo-600">$83.16</dd>
					</div>
				</dl>
			</div>
		</div>
	</TransitionChild>
</Transition>
