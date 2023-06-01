<script lang="ts">
	import { EnvelopeIcon } from '@babeard/svelte-heroicons/solid';
	import type { ActionData } from './$types';
	import Alert from '$lib/components/alert.svelte';

	export let form: ActionData;

	let email = '';
	let pending = false;
</script>

<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Password Reset
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Or
				{' '}
				<a class="font-medium text-indigo-600 hover:text-indigo-500" href="/auth/register"
					>create an account
				</a>
			</p>
		</div>
		{#if form && form.message}
			<Alert type="error" title={form.message} />
		{/if}
		<form class="mt-8 space-y-6" method="POST">
			<input name="remember" type="hidden" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label class="sr-only" for="email-address">Email address</label>
					<input
						id="email-address"
						autocomplete="email"
						class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						name="email"
						placeholder="Email address"
						required={true}
						type="email"
						bind:value={email}
					/>
				</div>
			</div>
			<div>
				<button
					class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					disabled={pending}
				>
					<span class="absolute inset-y-0 left-0 flex items-center pl-3">
						<EnvelopeIcon
							aria-hidden="true"
							class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
						/>
					</span>
					Request
				</button>
			</div>
		</form>
	</div>
</div>
