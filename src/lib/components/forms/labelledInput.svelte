<script lang="ts">
	import type { SupportedInputType } from '$lib/appTypes';
	import Input from './input.svelte';
	import Select from './select.svelte';

	export let autocomplete: string = '';
	export let constraints: any = {};
	export let checked: boolean = false;
	export let id: string;
	export let group: string = '';
	export let label: string;
	export let min: number = 0;
	export let multiple: boolean = false;
	export let name: string;
	export let placeholder: string = '';
	export let prefix: string = '';
	export let rows: number = 4;
	export let step: number = 1;
	export let subLabel: string = '';
	export let type: SupportedInputType = 'text';
	export let value: any = '';
</script>

{#if ['text', 'textarea', 'number', 'password', 'select'].includes(type) && label.length}
	<label for={id} class="block text-sm font-medium leading-6 text-white">{label}</label>
	<div class="mt-2">
		{#if type === 'select'}
			<Select {autocomplete} {constraints} {id} {multiple} {name} bind:value on:change>
				<slot />
			</Select>
		{:else}
			<Input
				{autocomplete}
				{constraints}
				{id}
				{min}
				{name}
				{placeholder}
				{prefix}
				{rows}
				{step}
				{type}
				bind:value
				on:change
			/>
		{/if}
	</div>
{/if}
{#if ['checkbox', 'radio'].includes(type) && (label.length || subLabel.length)}
	<div class="relative flex gap-x-3 mt-2">
		<Input
			{autocomplete}
			{constraints}
			{id}
			{min}
			{name}
			{placeholder}
			{rows}
			{step}
			{type}
			{value}
			bind:checked
			bind:group
			on:change
		/>
		<div class="text-sm leading-6">
			{#if label.length}
				<label for={id} class="font-medium text-white">{label}</label>
			{/if}
			{#if subLabel.length}
				<p class="text-gray-400">{subLabel}</p>
			{/if}
		</div>
	</div>
{/if}
