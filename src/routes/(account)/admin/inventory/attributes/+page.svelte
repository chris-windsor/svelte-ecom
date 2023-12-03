<script lang="ts">
	import LabelledInput from '$lib/components/forms/labelledInput.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const editAttribute = data.editAttribute || {};

	let label: string = editAttribute.label || '';
	let kind: string = editAttribute.kind || '';
	let attributeOptions: any[] = editAttribute.options || [
		{
			label: '',
			content: ''
		}
	];
</script>

<form method="POST" action="?/createAttribute">
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-white">
				{editAttribute.id ? 'Edit' : 'New'} Attribute
			</h2>
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-2">
					<LabelledInput id="label" label="Label" name="label" bind:value={label} />
				</div>
				<div class="sm:col-span-1">
					<LabelledInput id="kind" label="Kind" name="kind" type="select" bind:value={kind}>
						<option value="color">Color</option>
						<option value="list">List</option>
						<option value="static">Static</option>
					</LabelledInput>
				</div>
			</div>
		</div>
		{#if kind === 'list' || kind === 'color'}
			<div class="border-b border-gray-900/10 pb-12">
				<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-1">
						<button
							class="border border-1 border-gray-100 rounded text-white p-1"
							type="button"
							on:click={() =>
								(attributeOptions = attributeOptions.concat({ label: '', content: '' }))}
							>add option</button
						>
					</div>
					{#each attributeOptions as option, optionIndex}
						<div class="sm:col-span-1">
							<LabelledInput
								id={`options[${optionIndex}].label`}
								label="Option Label"
								name={`options[${optionIndex}].label`}
								bind:value={option.label}
							/>
						</div>
						<div class="sm:col-span-1">
							<LabelledInput
								id={`options[${optionIndex}].content`}
								label="Option Value"
								name={`options[${optionIndex}].content`}
								bind:value={option.content}
							/>
							{#if kind === 'color'}
								<input
									type="color"
									name={`options[${optionIndex}].content`}
									placeholder={'option content for #' + optionIndex}
									bind:value={option.content}
								/>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div class="mt-6 flex items-center justify-end gap-x-6">
		<button type="button" class="text-sm font-semibold leading-6 text-white">Cancel</button>
		<button
			type="submit"
			class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>
			Save
		</button>
	</div>
</form>
