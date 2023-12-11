<script lang="ts">
	export let autocomplete: string = '';
	export let constraints: any;
	export let id: string;
	export let multiple: boolean = false;
	export let name: string;
	export let value: string;

	const inputClass =
		'block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-white';
</script>

{#if multiple}
	<select
		{autocomplete}
		{id}
		{name}
		multiple
		class={inputClass}
		{...constraints}
		bind:value
		on:change
	>
		<slot />
	</select>
{:else}
	<select {autocomplete} {id} {name} class={inputClass} {...constraints} bind:value on:change>
		<slot />
	</select>
{/if}
