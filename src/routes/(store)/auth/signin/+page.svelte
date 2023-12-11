<script lang="ts">
	import { LockClosedIcon } from '@babeard/svelte-heroicons/solid';
	import type { PageData } from './$types';
	import Alert from '$lib/components/alert.svelte';
	import LabelledInput from '$lib/components/forms/labelledInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';

	export let data: PageData;
	const { form, enhance, message, errors, constraints } = superForm(data.form);

	let pending = false;
</script>

<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">
				Sign in to your account
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Or
				{' '}
				<a class="font-medium text-indigo-600 hover:text-indigo-500" href="/auth/register"
					>create an account
				</a>
			</p>
		</div>
		{#if message && $page.status >= 400}
			<Alert type="error" title={message} />
		{/if}
		<form class="mt-8 space-y-4" method="POST" use:enhance>
			<div class="space-y-2">
				<LabelledInput
					constraints={$constraints.email}
					id="email"
					label="Email Address"
					name="email"
					bind:value={$form.email}
				/>
				<LabelledInput
					constraints={$constraints.password}
					id="password"
					label="Password"
					name="password"
					type="password"
					bind:value={$form.password}
				/>
			</div>
			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<LabelledInput
						id="remember"
						label="Remember me"
						name="remember"
						type="checkbox"
						bind:checked={$form.remember}
					/>
				</div>
				<div class="text-sm">
					<a
						class="font-medium text-indigo-600 hover:text-indigo-500"
						href="/auth/inquirepasswordreset"
					>
						Forgot your password?
					</a>
				</div>
			</div>
			<div>
				<button
					class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					disabled={pending}
				>
					<span class="absolute inset-y-0 left-0 flex items-center pl-3">
						<LockClosedIcon
							aria-hidden="true"
							class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
						/>
					</span>
					Sign in
				</button>
			</div>
		</form>
	</div>
</div>
