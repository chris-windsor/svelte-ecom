<script lang="ts">
	import { Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';

	export let open = false;
</script>

<div>
	<Dialog {open} class="fixed inset-0 z-10 overflow-y-auto">
		<DialogOverlay class="fixed inset-0 bg-gray-300/50 flex justify-center items-center">
			<div class="flex flex-row gap-4">
				{#each ['animate-[bounce_1s_infinite_100ms]', 'animate-[bounce_1s_infinite_200ms]', 'animate-[bounce_1s_infinite_300ms]'] as dot}
					<div class={['-translate-y-1', dot].join(' ')}>
						<div class="w-4 h-4 bg-indigo-300 rounded-full absolute" />
						<div class="w-4 h-4 bg-indigo-500 rounded-full relative" />
					</div>
				{/each}
			</div>
		</DialogOverlay>
	</Dialog>
</div>
