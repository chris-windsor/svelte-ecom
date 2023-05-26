<script>
	import { announcementBanner } from '$lib/config.json';
</script>

{#if announcementBanner.active}
	<div class="bg-gray-900">
		<div class="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<p class="mx-auto flex-1 text-center text-sm font-medium text-white lg:flex-none">
				{announcementBanner.message}
			</p>
		</div>
	</div>
{/if}
