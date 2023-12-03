<script lang="ts">
	import {
		ArrowUturnLeftIcon,
		ChatBubbleLeftRightIcon,
		CheckBadgeIcon
	} from '@babeard/svelte-heroicons/solid';
	import dayjs from 'dayjs';

	export let data: any;

	const features = [
		{
			name: 'Review one of your purchases',
			description: 'Stoked about one of the items you received? We all want to hear about it!',
			href: '#',
			icon: CheckBadgeIcon,
			action: 'Write about a product'
		},
		{
			name: 'Start a return',
			description: "We're sorry your purchase didn't go as expected. Let's get this sorted asap!",
			href: '#',
			icon: ArrowUturnLeftIcon,
			action: 'Fill out return form'
		},
		{
			name: 'Get product support',
			description:
				"Let's find one of our product specialists that can assist you further in depth.",
			href: '#',
			icon: ChatBubbleLeftRightIcon,
			action: 'Contact a representative'
		}
	];

	const greeting = () => {
		const currentHour = dayjs().hour();
		let timeframe = '';
		if (currentHour < 12) {
			timeframe = 'Morning';
		} else if (currentHour > 12 && currentHour < 18) {
			timeframe = 'Afternoon';
		} else {
			timeframe = 'Evening';
		}
		return `Good ${timeframe}`;
	};
</script>

<div class="mx-auto max-w-7xl py-8 sm:py-10 px-6 lg:px-8">
	<div class="mx-auto max-w-2xl lg:text-center">
		<p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
			{greeting()}
		</p>
		<p class="mt-6 text-lg leading-8 text-gray-600">
			howdy {data.name}... We appreciate you coming back to the shop. Let us know if there's
			anything we can do to help!
		</p>
	</div>
	<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
		<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
			{#each features as feature}
				<div class="flex flex-col">
					<dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
						<svelte:component
							this={feature.icon}
							aria-hidden="true"
							class="h-5 w-5 flex-none text-indigo-600"
						/>
						{feature.name}
					</dt>
					<dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
						<p class="flex-auto">{feature.description}</p>
						<p class="mt-6">
							<a href={feature.href} class="text-base font-semibold leading-7 text-indigo-600"
								>{feature.action}{' '}<span aria-hidden="true">→</span></a
							>
						</p>
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</div>
