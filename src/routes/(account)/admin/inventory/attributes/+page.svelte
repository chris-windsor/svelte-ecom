<script lang="ts">
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
	<input name="id" type="hidden" value={editAttribute.id || ''} />
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">
				{editAttribute.id ? 'Edit' : 'New'} Attribute
			</h2>
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-2">
					<label for="label" class="block text-sm font-semibold leading-6 text-gray-900"
						>Label</label
					>
					<div class="mt-2.5">
						<input
							type="text"
							name="label"
							id="label"
							class="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder=""
							bind:value={label}
						/>
					</div>
				</div>
				<div class="sm:col-span-1">
					<label for="kind" class="block text-sm font-medium leading-6 text-gray-900">Kind</label>
					<div class="mt-2">
						<select
							id="kind"
							name="kind"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
							bind:value={kind}
						>
							<option value="list">List</option>
							<option value="boolean">Boolean</option>
							<option value="color">Color</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		{#if kind === 'list' || kind === 'color'}
			<div class="border-b border-gray-900/10 pb-12">
				<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div>
						options!
						<button
							class="border border-1 border-gray-100 rounded"
							type="button"
							on:click={() =>
								(attributeOptions = attributeOptions.concat({ label: '', content: '' }))}
							>add option</button
						>
						<ul>
							{#each attributeOptions as option, optionIndex}
								<li>
									<input
										name={`options[${optionIndex}].label`}
										placeholder={'option label for #' + optionIndex}
										bind:value={option.label}
									/>
									<input
										name={`options[${optionIndex}].content`}
										placeholder={'option content for #' + optionIndex}
										bind:value={option.content}
									/>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="mt-6 flex items-center justify-end gap-x-6">
		<button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
		<button
			type="submit"
			class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>Save</button
		>
	</div>
</form>
