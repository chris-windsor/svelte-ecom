<script lang="ts">
	export let wrap: boolean;

	const wrapperClass =
		'flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500';
</script>

{#if wrap}
	<div class={wrapperClass}>
		<slot />
	</div>
{:else}
	<slot />
{/if}
