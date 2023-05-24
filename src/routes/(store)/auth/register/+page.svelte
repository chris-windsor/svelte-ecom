<script>
	import { LockClosedIcon } from '@babeard/svelte-heroicons/solid';

	let name = '';
	let emailAddress = '';
	let password = '';
	let pending = false;
</script>

<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Create your account
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Or
				{' '}
				<a class="font-medium text-indigo-600 hover:text-indigo-500" href="/auth/signin"
					>login to your account
				</a>
			</p>
		</div>
		<form class="mt-8 space-y-6" method="POST">
			<input name="remember" type="hidden" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label class="sr-only" for="name">Name</label>
					<input
						id="name"
						autocomplete="name"
						class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						name="name"
						placeholder="Name"
						required={true}
						type="text"
						bind:value={name}
					/>
				</div>
				<div>
					<label class="sr-only" for="email-address">Email</label>
					<input
						id="email-address"
						autocomplete="email"
						class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						name="email"
						placeholder="Email"
						required={true}
						type="email"
						bind:value={emailAddress}
					/>
				</div>
				<div>
					<label class="sr-only" for="password">Password</label>
					<input
						id="password"
						autocomplete="current-password"
						class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						name="password"
						placeholder="Password"
						required={true}
						type="password"
						bind:value={password}
					/>
				</div>
			</div>
			<div class="flex items-center justify-between">
				<div class="text-sm">
					<a
						class="font-medium text-indigo-600 hover:text-indigo-500"
						href="/auth/inquirepasswordreset">Forgot your password?</a
					>
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
					Create account
				</button>
			</div>
		</form>
	</div>
</div>
