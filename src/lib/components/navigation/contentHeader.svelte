<script>
	import { UserIcon } from '@babeard/svelte-heroicons/outline';
	import BaseHeader from '$lib/components/navigation/baseHeader.svelte';
</script>

<BaseHeader>
	<div slot="rightButtons" class="flex items-center lg:ml-8">
		<div class="flex space-x-8">
			<div class="flex">
				<a class="-m-2 p-2 text-gray-400 hover:text-gray-500" href="/account">
					<span class="sr-only">Account</span>
					<UserIcon aria-hidden="true" class="h-6 w-6" />
				</a>
			</div>
		</div>
	</div>
</BaseHeader>
