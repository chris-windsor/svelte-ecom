<script lang="ts">
	import {
		XCircleIcon,
		ExclamationTriangleIcon,
		CheckBadgeIcon
	} from '@babeard/svelte-heroicons/solid';

	enum AlertTypeOpt {
		'success',
		'warning',
		'error'
	}

	type AlertType = keyof typeof AlertTypeOpt;

	type AlertButton = {
		label: string;
		href?: string;
		fn?: () => any;
	};

	export let type: AlertType;
	export let title: string;
	export let details: string[] = [];
	export let buttons: AlertButton[] = [];

	type AlertPropMapping = {
		icon: ConstructorOfATypedSvelteComponent;
		bg50: string;
		text400: string;
		text700: string;
		text800: string;
		buttonStates: string[];
	};

	const typeMap: Map<AlertType, AlertPropMapping> = new Map([
		[
			'success',
			{
				icon: CheckBadgeIcon,
				bg50: 'bg-green-50',
				text400: 'text-green-400',
				text700: 'text-green-700',
				text800: 'text-green-800',
				buttonStates: ['hover:bg-green-100', 'focus:ring-green-600', 'focus:ring-offset-green-50']
			}
		],
		[
			'warning',
			{
				icon: ExclamationTriangleIcon,
				bg50: 'bg-yellow-50',
				text400: 'text-yellow-400',
				text700: 'text-yellow-700',
				text800: 'text-yellow-800',
				buttonStates: [
					'hover:bg-yellow-100',
					'focus:ring-yellow-600',
					'focus:ring-offset-yellow-50'
				]
			}
		],
		[
			'error',
			{
				icon: XCircleIcon,
				bg50: 'bg-red-50',
				text400: 'text-red-400',
				text700: 'text-red-700',
				text800: 'text-red-800',
				buttonStates: ['hover:bg-red-100', 'focus:ring-red-600', 'focus:ring-offset-red-50']
			}
		]
	]);

	const propMapping: AlertPropMapping = typeMap.get(type)!;
</script>

<div class={['rounded-md p-4', propMapping.bg50].join(' ')}>
	<div class="flex">
		<div class="flex-shrink-0">
			<svelte:component
				this={propMapping.icon}
				class={['h-5 w-5', propMapping.text400].join(' ')}
				aria-hidden="true"
			/>
		</div>
		<div class="ml-3">
			<h3 class={['text-sm font-medium', propMapping.text800].join(' ')}>{title}</h3>
			{#if details.length}
				<div class={['mt-2 text-sm', propMapping.text700].join(' ')}>
					<ul class="list-disc space-y-1 pl-5">
						{#each details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if buttons.length}
				<div class="mt-4">
					<div class="-mx-2 -my-1.5 flex">
						{#each buttons as button}
							{#if button.href?.length}
								<a
									role="button"
									href={button.href}
									class={[
										'rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
										propMapping.text800,
										...propMapping.buttonStates
									].join(' ')}
								>
									{button.label}
								</a>
							{:else if button.fn}
								<button
									on:click={button.fn}
									class={[
										'rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
										propMapping.text800,
										...propMapping.buttonStates
									].join(' ')}
								>
									{button.label}
								</button>
							{:else}
								{' '}
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
