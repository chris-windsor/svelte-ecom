<script lang="ts">
	import { XMarkIcon } from '@babeard/svelte-heroicons/outline';
	import {
		Dialog,
		DialogOverlay,
		TabPanel,
		TabPanels,
		TabList,
		TabGroup,
		Tab,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';

	export let show: boolean;
	export let navigation: any;
</script>

<Transition {show}>
	<Dialog as="div" class="relative z-40 lg:hidden" on:close={() => (show = false)}>
		<TransitionChild
			enter="transition-opacity ease-linear duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity ease-linear duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div class="fixed inset-0 bg-black bg-opacity-25" />
		</TransitionChild>
		<div class="fixed inset-0 z-40 flex">
			<TransitionChild
				enter="transition ease-in-out duration-300 transform"
				enterFrom="-translate-x-full"
				enterTo="translate-x-0"
				leave="transition ease-in-out duration-300 transform"
				leaveFrom="translate-x-0"
				leaveTo="-translate-x-full"
			>
				<DialogOverlay
					class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
				>
					<div class="flex px-4 pt-5 pb-2">
						<button
							class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
							type="button"
							on:click={() => (show = false)}
						>
							<span class="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" class="h-6 w-6" />
						</button>
					</div>
					<TabGroup as="div" class="mt-2">
						<div class="border-b border-gray-200">
							<TabList class="-mb-px flex space-x-8 px-4">
								{#each navigation.categories as category}
									<Tab let:selected>
										<button
											class={[
												selected
													? 'text-indigo-600 border-indigo-600'
													: 'text-gray-900 border-transparent',
												'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
											].join(' ')}
										>
											{category.name}
										</button>
									</Tab>
								{/each}
							</TabList>
						</div>
						<TabPanels>
							{#each navigation.categories as category, categoryIdx}
								<TabPanel class="space-y-12 px-4 pt-10 pb-6">
									<div class="grid grid-cols-1 items-start gap-y-10 gap-x-6">
										<div class="grid grid-cols-1 gap-y-10 gap-x-6">
											<div>
												<p
													id={`mobile-featured-heading-${categoryIdx}`}
													class="font-medium text-gray-900"
												>
													Featured
												</p>
												<ul
													aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
													class="mt-6 space-y-6"
												>
													{#each category.featured as item}
														<li class="flex">
															<a href={item.href} class="text-gray-500">{item.label} </a>
														</li>
													{/each}
												</ul>
											</div>
											<div>
												<p id="mobile-categories-heading" class="font-medium text-gray-900">
													Categories
												</p>
												<ul aria-labelledby="mobile-categories-heading" class="mt-6 space-y-6">
													{#each category.categories as item}
														<li class="flex">
															<a href={item.href} class="text-gray-500">{item.name} </a>
														</li>
													{/each}
												</ul>
											</div>
										</div>
										<div class="grid grid-cols-1 gap-y-10 gap-x-6">
											<div>
												<p id="mobile-collection-heading" class="font-medium text-gray-900">
													Collection
												</p>
												<ul aria-labelledby="mobile-collection-heading" class="mt-6 space-y-6">
													{#each category.collection as item}
														<li class="flex">
															<a href={item.href} class="text-gray-500">{item.name} </a>
														</li>
													{/each}
												</ul>
											</div>

											<div>
												<p id="mobile-brand-heading" class="font-medium text-gray-900">Brands</p>
												<ul aria-labelledby="mobile-brand-heading" class="mt-6 space-y-6">
													{#each category.brands as item}
														<li class="flex">
															<a href={item.href} class="text-gray-500">{item.name} </a>
														</li>
													{/each}
												</ul>
											</div>
										</div>
									</div>
								</TabPanel>
							{/each}
						</TabPanels>
					</TabGroup>
					<div class="space-y-6 border-t border-gray-200 py-6 px-4">
						{#each navigation.pages as page}
							<div class="flow-root">
								<a href={page.href} class="-m-2 block p-2 font-medium text-gray-900">{page.name}</a>
							</div>
						{/each}
					</div>
				</DialogOverlay>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
