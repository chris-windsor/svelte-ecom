<script lang="ts">
	import type { SupportedInputType } from '$lib/appTypes';
	import InputWrapper from './inputWrapper.svelte';

	export let autocomplete: string = '';
	export let checked: boolean = false;
	export let id: string;
	export let group: string = '';
	export let min: number = 0;
	export let name: string;
	export let placeholder: string = '';
	export let prefix: string = '';
	export let rows: number = 4;
	export let step: number = 1;
	export let type: SupportedInputType = 'text';
	export let value: any = '';

	const inputClass = prefix.length
		? 'flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6'
		: 'block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6';
</script>

<InputWrapper wrap={!!prefix.length}>
	{#if prefix.length}
		<span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{prefix}</span>
	{/if}
	{#if type === 'number'}
		<input
			{autocomplete}
			{id}
			{min}
			{name}
			{placeholder}
			{step}
			class={inputClass}
			type="number"
			bind:value
			on:change
		/>
	{:else if type === 'password'}
		<input
			{autocomplete}
			{id}
			{name}
			{placeholder}
			class={inputClass}
			type="password"
			bind:value
			on:change
		/>
	{:else if type === 'textarea'}
		<textarea {id} {name} {placeholder} {rows} class={inputClass} bind:value on:change />
	{:else if type === 'checkbox'}
		<div class="flex h-6 items-center">
			<input
				{id}
				{name}
				type="checkbox"
				class="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
				bind:checked
				on:change
			/>
		</div>
	{:else if type === 'radio'}
		<div class="flex h-6 items-center">
			<input
				{id}
				{name}
				type="radio"
				class="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
				{value}
				bind:group
				on:change
			/>
		</div>
	{:else}
		<input {autocomplete} {id} {name} {placeholder} class={inputClass} type="text" bind:value />
	{/if}
</InputWrapper>
