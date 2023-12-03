<script lang="ts">
	import { ArrowDownIcon, ArrowUpIcon } from '@babeard/svelte-heroicons/solid';

	export let data: any;

	const stats = [
		{
			name: 'Total Subscribers',
			stat: '71,897',
			previousStat: '70,946',
			change: '12%',
			changeType: 'increase'
		},
		{
			name: 'Avg. Open Rate',
			stat: '58.16%',
			previousStat: '56.14%',
			change: '2.02%',
			changeType: 'increase'
		},
		{
			name: 'Avg. Click Rate',
			stat: '24.57%',
			previousStat: '28.62%',
			change: '4.05%',
			changeType: 'decrease'
		}
	];
</script>

<div class="mx-auto max-w-7xl py-8 sm:py-10 px-6 lg:px-8">
	<div class="mx-auto max-w-2xl lg:text-center">
		<p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
			Howdy {data.name}!
		</p>
		<p class="mt-6 text-lg leading-8 text-gray-300">Look at how good you are doing today!</p>
	</div>
	<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
		<h3 class="text-lg font-medium leading-6 text-gray-300">Last 30 days</h3>
		<dl
			class="mt-5 grid grid-cols-1 divide-y divide-stone-700 overflow-hidden rounded-lg bg-stone-900 shadow md:grid-cols-3 md:divide-y-0 md:divide-x"
		>
			{#each stats as item}
				<div class="px-4 py-5 sm:p-6">
					<dt class="text-base font-normal text-gray-400">{item.name}</dt>
					<dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
						<div class="flex items-baseline text-2xl font-semibold text-indigo-800">
							{item.stat}
							<span class="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
						</div>

						<div
							class={[
								item.changeType === 'increase'
									? 'bg-green-100 text-green-800'
									: 'bg-red-100 text-red-800',
								'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
							].join(' ')}
						>
							{#if item.changeType === 'increase'}
								<ArrowUpIcon
									aria-hidden="true"
									class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
								/>
							{:else}
								<ArrowDownIcon
									aria-hidden="true"
									class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
								/>
							{/if}
							<span class="sr-only">
								{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
							</span>
							{item.change}
						</div>
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</div>
