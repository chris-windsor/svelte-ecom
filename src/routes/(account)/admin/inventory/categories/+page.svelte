<script lang="ts">
	import LabelledInput from '$lib/components/forms/labelledInput.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const { categories } = data;

	const editCategory = data.editCategory || {};

	let label: string = editCategory.label || '';
	let parentId: number = editCategory.parentId || null;
</script>

<form method="POST" action="?/createCategory">
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-white">
				{editCategory.id ? 'Edit' : 'New'} Category
			</h2>
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-2">
					<LabelledInput
						id="label"
						label="Label"
						name="label"
						placeholder="Men's T-Shirts"
						bind:value={label}
					/>
				</div>
				<div class="sm:col-span-1">
					<LabelledInput
						id="parent-id"
						label="Parent"
						name="parent-id"
						type="select"
						bind:value={parentId}
					>
						<option value={-1}>none (root)</option>
						{#each categories as category}
							<option value={category.id}>{category.label}</option>
						{/each}
					</LabelledInput>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-6 flex items-center justify-end gap-x-6">
		<button type="button" class="text-sm font-semibold leading-6 text-white">Cancel</button>
		<button
			type="submit"
			class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>Save</button
		>
	</div>
</form>
