<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { productDefaults, siteAddress } from '$lib/config.json';
	import ImagePicker from '$lib/components/admin/imagePicker.svelte';
	import ImageUploader from '$lib/components/admin/imageUploader.svelte';
	import Alert from '$lib/components/alert.svelte';
	import { enhance } from '$app/forms';
	import type { ProductAttribute, ProductCategory } from '$lib/peach';
	import BlockingLoadingIndicator from '$lib/components/blockingLoadingIndicator.svelte';

	export let data: PageData;
	export let form: ActionData;

	let categories: ProductCategory[] = data.categories;
	let attributes: ProductAttribute[] = data.attributes;

	let publishStateOptions = [
		{
			label: 'List on store immediately',
			value: 'immediate-publish'
		},
		{
			label: 'Publish, but do not include in store results',
			value: 'private-publish'
		},
		{
			label: 'Save as draft, do not publish at all',
			value: 'draft-publish'
		}
	];

	const editProduct = data.editProduct || {};

	let name: string = editProduct.name || '';
	$: shortURL = name
		.split(' ')
		.map((chunk: string) => chunk.trim())
		.filter((chunk: string) => chunk.length)
		.join('-')
		.toLowerCase();
	let description: string = editProduct.description || '';
	let selectedImageId: string = editProduct.img || '';
	let price: number = editProduct.price?.toFixed(2);
	let maxPurchaseQty: number;
	let categoryId: number = editProduct.category || -1;
	let attributeIds: string = editProduct.attributes || '';
	let variationAttributeIds: string[] = editProduct.variationAttributes || '';
	let manageStock = productDefaults.manageStock;
	let stock: number = editProduct.stock;
	let allowBackorders = productDefaults.allowBackorders;
	let restockNotifications = productDefaults.restockNotifications;
	let publishState = publishStateOptions[0].value;

	let productImages = data.images;
	let showUploadDialog = false;

	$: selectedCategory = categories.filter((c) => c.id === categoryId)[0] ?? {};
	$: selectedCategories = categories.reduceRight(
		(acc: ProductCategory[], category: ProductCategory) => {
			const currentIds = acc.map((mapCategory) => mapCategory.parentId);
			if (currentIds.includes(category.id)) {
				acc.push(category);
			}

			return acc;
		},
		[selectedCategory]
	);

	let isProcessing = false;

	function generateCombinations(
		parentIds: string | any[],
		attributes: any[],
		currentCombination: any[],
		index: number
	): string[] {
		if (index === parentIds.length) {
			return [currentCombination.slice() as any];
		}

		const parentId = parentIds[index];
		const parentAttributes = attributes.filter((attr) => parseInt(attr.split(':')[0]) === parentId);

		let combinations: string[] = [];
		for (const attr of parentAttributes) {
			currentCombination.push(attr);
			combinations = combinations.concat(
				generateCombinations(parentIds, attributes, currentCombination, index + 1)
			);
			currentCombination.pop();
		}

		return combinations;
	}

	let combinationList: any = [];

	function generateAllVariations() {
		const parentIds = Array.from(
			new Set(variationAttributeIds.map((attr) => parseInt(attr.split(':')[0])))
		);
		combinationList = generateCombinations(parentIds, variationAttributeIds, [], 0);
	}
</script>

<BlockingLoadingIndicator open={isProcessing} />

<ImageUploader bind:showDialog={showUploadDialog} />

{#if form && form.status === 'success'}
	<Alert
		type="success"
		title="Product successfully added"
		buttons={[{ label: 'View', href: '/product/' + form.data.product.shortUrl }]}
	/>
{/if}

<form
	method="POST"
	action="?/createProduct"
	use:enhance={({ formData }) => {
		isProcessing = true;
		formData.append('primary-image', selectedImageId);
		formData.append('categories', selectedCategories.map((c) => c.id).join());
		formData.append('attributes', attributeIds);
		return async ({ update }) => {
			isProcessing = false;
			await update();
		};
	}}
>
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">
				{editProduct.id ? 'Edit' : 'New'} Product
			</h2>
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
					<div class="mt-2.5">
						<input
							type="text"
							name="name"
							id="name"
							class="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Lime Green Vase"
							bind:value={name}
						/>
					</div>
				</div>
				<div class="sm:col-span-3">
					<label for="short-url" class="block text-sm font-medium leading-6 text-gray-900">
						Short URL
					</label>
					<div class="mt-2">
						<div
							class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
						>
							<span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
								{siteAddress}/product/
							</span>
							<input
								type="text"
								name="short-url"
								id="short-url"
								class="block flex-1 border-0 bg-transparent py-1.5 pl-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 truncate"
								placeholder="lime-green-vase"
								bind:value={shortURL}
							/>
						</div>
					</div>
				</div>
				<div class="sm:col-span-3">
					<label for="description" class="block text-sm font-medium leading-6 text-gray-900">
						Description
					</label>
					<div class="mt-2">
						<textarea
							id="description"
							name="description"
							rows="4"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 min-h-[36px]"
							placeholder="A vibrant green vase that brightens any room 10x over"
							bind:value={description}
						/>
					</div>
				</div>
				<div class="sm:col-span-3">
					<label for="primary-image" class="block text-sm font-semibold leading-6 text-gray-900">
						Primary photo
					</label>
					<div class="mt-2">
						<div class="border border-1 border-dashed border-gray-900 rounded p-2">
							<ImagePicker bind:images={productImages} bind:selectedImage={selectedImageId} />
						</div>
						<a
							class="inline-block mt-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							on:click={() => (showUploadDialog = true)}
							href="#"
						>
							Upload image
						</a>
					</div>
				</div>
				<div class="sm:col-span-1">
					<label for="price" class="block text-sm font-semibold leading-6 text-gray-900">
						Price
					</label>
					<div class="mt-2.5">
						<input
							type="number"
							name="price"
							id="price"
							class="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="12.99"
							min="0"
							step={0.01}
							bind:value={price}
						/>
					</div>
				</div>
				<div class="sm:col-span-1">
					<label for="max-purchase-qty" class="block text-sm font-semibold leading-6 text-gray-900">
						Max Purchase Qty
					</label>
					<div class="mt-2.5">
						<input
							type="number"
							name="max-purchase-qty"
							id="max-purchase-qty"
							class="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="3"
							min="0"
							bind:value={maxPurchaseQty}
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="border-b border-gray-900/10 pb-12">
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-1">
					<label for="category" class="block text-sm font-semibold leading-6 text-gray-900">
						Category
					</label>
					<div class="mt-2.5">
						<select
							id="category"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
							bind:value={categoryId}
						>
							<option value={-1} />
							{#each categories as category}
								<option value={category.id}>{category.label}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="sm:col-span-1">
					<label for="attributes" class="block text-sm font-semibold leading-6 text-gray-900">
						Attributes
					</label>
					<div class="mt-2.5">
						<select
							id="attributes"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
							bind:value={attributeIds}
							multiple
						>
							{#each attributes.filter((attr) => attr.kind === 'static') as attribute}
								<option value={attribute.id}>{attribute.label}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="sm:col-span-1">
					<label
						for="variation-attributes"
						class="block text-sm font-semibold leading-6 text-gray-900"
					>
						Variation Attributes
					</label>
					<div class="mt-2.5">
						<select
							id="variation-attributes"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
							bind:value={variationAttributeIds}
							multiple
						>
							{#each attributes.filter((attr) => attr.kind !== 'static') as attribute}
								<option value={attribute.id} disabled>{attribute.label}</option>
								{#each attribute.options as attr_opt}
									<option value={attribute.id + ':' + attr_opt.id}>– {attr_opt.label}</option>
								{/each}
							{/each}
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="border-b border-gray-900/10 pb-12">
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-6">
					<label
						for="generate-variations"
						class="block text-sm font-semibold leading-6 text-gray-900"
					>
						Variation Editor
					</label>
					{variationAttributeIds}
					<button
						type="button"
						id="generate-variations"
						class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						on:click={generateAllVariations}
					>
						generate all variations
					</button>
				</div>
				{#each combinationList as combination}
					<div class="sm:col-span-6">
						{#each combination as combinationOption}
							{@const comboIds = combinationOption.split(':')}
							{@const comboParent = attributes.find((attr) => attr.id === parseInt(comboIds[0]))}
							{@const comboChild = comboParent?.options.find(
								(opt) => opt.id === parseInt(comboIds[1])
							)}
							{comboParent?.label}.{comboChild?.label}&rarr;
						{/each}
					</div>
					<div class="sm:col-span-1">
						<label
							for={'variation.' + combination + '.sku'}
							class="block text-sm font-semibold leading-6 text-gray-900"
						>
							SKU
						</label>
						<div class="mt-2.5">
							<input
								type="text"
								name={'variation.' + combination + '.sku'}
								id={'variation.' + combination + '.sku'}
								class="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder=""
								min="0"
								step={0.01}
								bind:value={price}
							/>
						</div>
					</div>
					<div class="sm:col-span-1">
						<label
							for={'variation.' + combination + '.price'}
							class="block text-sm font-semibold leading-6 text-gray-900"
						>
							Price
						</label>
						<div class="mt-2.5">
							<input
								type="number"
								name={'variation.' + combination + '.price'}
								id={'variation.' + combination + '.price'}
								class="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="12.99"
								min="0"
								step={0.01}
								bind:value={price}
							/>
						</div>
					</div>
					<div class="sm:col-span-1">
						<label
							for={'variation.' + combination + '.stock'}
							class="block text-sm font-semibold leading-6 text-gray-900"
						>
							Stock
						</label>
						<div class="mt-2.5">
							<input
								type="number"
								name={'variation.' + combination + '.stock'}
								id={'variation.' + combination + '.stock'}
								class="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="100"
								min="0"
								step={1}
								bind:value={price}
							/>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="border-b border-gray-900/10 pb-12">
			<div class="mt-10 space-y-10">
				<fieldset>
					<legend class="text-sm font-semibold leading-6 text-gray-900">
						Inventory management
					</legend>
					<div class="mt-6 space-y-6">
						<div class="relative flex gap-x-3">
							<div class="flex h-6 items-center">
								<input
									id="manage-stock"
									name="manage-stock"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									bind:checked={manageStock}
								/>
							</div>
							<div class="text-sm leading-6">
								<label for="manage-stock" class="font-medium text-gray-900">Manage stock</label>
								<p class="text-gray-500">Control levels of stock for this item.</p>
							</div>
							{#if manageStock}
								<div class="sm:col-span-1">
									<label
										for="stock"
										class="sr-only block text-sm font-semibold leading-6 text-gray-900">Stock</label
									>
									<div class="mt-2.5">
										<input
											type="number"
											name="stock"
											id="stock"
											class="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											placeholder="100"
											bind:value={stock}
										/>
									</div>
								</div>
							{/if}
						</div>
						<div class="relative flex gap-x-3">
							<div class="flex h-6 items-center">
								<input
									id="backorders"
									name="backorders"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									bind:checked={allowBackorders}
								/>
							</div>
							<div class="text-sm leading-6">
								<label for="backorders" class="font-medium text-gray-900">Allow backorders</label>
								<p class="text-gray-500">
									Once the stock level reaches 0, customers will be able to back-order this item.
								</p>
							</div>
						</div>
						<div class="relative flex gap-x-3">
							<div class="flex h-6 items-center">
								<input
									id="restock-notifications"
									name="restock-notifications"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									bind:checked={restockNotifications}
								/>
							</div>
							<div class="text-sm leading-6">
								<label for="restock-notifications" class="font-medium text-gray-900">
									Restock notifications
								</label>
								<p class="text-gray-500">
									Add a section to this item's listing for customers to sign-up for re-stock
									notifications.
								</p>
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend class="text-sm font-semibold leading-6 text-gray-900">Publish state</legend>
					<p class="mt-1 text-sm leading-6 text-gray-600">
						Where do you want this product listing to go?
					</p>
					<div class="mt-6 space-y-6" role="radiogroup">
						{#each publishStateOptions as publishStateOpt}
							<div
								class="flex items-center gap-x-3"
								role="radio"
								aria-checked={publishState === publishStateOpt.value}
							>
								<input
									id={publishStateOpt.value}
									bind:group={publishState}
									name="publish-state"
									type="radio"
									class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
									value={publishStateOpt.value}
								/>
								<label
									for={publishStateOpt.value}
									class="block text-sm font-medium leading-6 text-gray-900"
								>
									{publishStateOpt.label}
								</label>
							</div>
						{/each}
					</div>
				</fieldset>
			</div>
		</div>
	</div>
	<div class="mt-6 flex items-center justify-end gap-x-6">
		<button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
		<button
			type="submit"
			class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>
			Save
		</button>
	</div>
</form>
