<script lang="ts">
	import type { PageData } from './$types';
	import { siteAddress } from '$lib/config.json';
	import ImageUploader from '$lib/components/admin/imageUploader.svelte';
	import type { ProductAttribute, ProductCategory } from '$lib/appTypes';
	import BlockingLoadingIndicator from '$lib/components/blockingLoadingIndicator.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import LabelledInput from '$lib/components/forms/labelledInput.svelte';

	export let data: PageData;
	const { form, enhance, message } = superForm(data.form, { dataType: 'json' });

	let productImages = data.images;
	let categories: ProductCategory[] = data.categories;
	let attributes: ProductAttribute[] = data.attributes;
	let publishStateOptions = [
		{
			label: 'List on store immediately',
			value: 'immediate-publish'
		},
		{
			label: 'Publish, but do not include in store results',
			subLabel: 'This is kind of a pointless option.',
			value: 'private-publish'
		},
		{
			label: 'Save as draft, do not publish at all',
			value: 'draft-publish'
		}
	];

	// $: shortURL = name
	// 	.split(' ')
	// 	.map((chunk: string) => chunk.trim())
	// 	.filter((chunk: string) => chunk.length)
	// 	.join('-')
	// 	.toLowerCase();

	function generateAllVariations() {
		const variationAttributes = $form.variationAttributes.map(String);

		const getParentId = (attr: string) => parseInt(attr.split('.')[0]);
		const parentIds = Array.from(new Set(variationAttributes.map(getParentId)));

		const combinations: string[][] = [[]];
		/* 
			Thanks ChatGPT for this absurdity
			3 nested loops is always hyper-optimized
		*/
		for (const parentId of parentIds) {
			const parentAttributes = variationAttributes.filter((attr) => getParentId(attr) === parentId);
			const newCombinations = [];

			for (const combination of combinations) {
				for (const attr of parentAttributes) {
					newCombinations.push([...combination, attr]);
				}
			}

			combinations.length = 0;
			combinations.push(...newCombinations);
		}

		let newList = combinations
			.filter((combo) => combo.length)
			.map((combination) => {
				let label = combination
					.map((combo) => {
						const [parentId, childId] = combo.split('.');
						const parent = attributes.find((attr) => attr.id === parseInt(parentId));
						const child = parent?.options.find((attr) => attr.id === parseInt(childId));
						return `${parent?.label}: ${child?.label}`;
					})
					.join(' & ');

				return {
					sku: '',
					price: 0,
					stock: 0,
					label
				};
			});

		form.update(
			($form) => {
				$form.variations = newList;
				return $form;
			},
			{ taint: true }
		);
	}

	let showUploadDialog = false;
	let isProcessing = false;
</script>

<BlockingLoadingIndicator open={isProcessing} />

<ImageUploader bind:showDialog={showUploadDialog} />

<!-- {#if $form}
	<Alert
		type="success"
		title="Product successfully added"
		buttons={[{ label: 'View', href: '/product/' + $form.shortUrl }]}
	/>
{/if} -->

<form method="POST">
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-white">
				{$form.id ? 'Edit' : 'New'} Product
			</h2>
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<LabelledInput
						id="name"
						label="Name"
						name="name"
						placeholder="Lime Green Vase"
						bind:value={$form.name}
					/>
				</div>
				<div class="sm:col-span-3">
					<LabelledInput
						id="short-url"
						label="Short URL"
						name="short-url"
						placeholder="lime-green-vase"
						prefix={`${siteAddress}/product/`}
						bind:value={$form.shortUrl}
					/>
				</div>
				<div class="sm:col-span-3">
					<LabelledInput
						id="description"
						label="Description"
						name="description"
						placeholder="A vibrant green vase that brightens any room 10x over"
						type={'textarea'}
						bind:value={$form.description}
					/>
				</div>
				<div class="sm:col-span-3">
					<label for="primary-image" class="block text-sm font-semibold leading-6 text-white">
						Primary photo
					</label>
					<div class="mt-2">
						<div class="border border-1 border-dashed border-gray-900 rounded p-2">
							<!-- <ImagePicker images={productImages} selectedImage={''} /> -->
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
				{#if !$form.variations.length}
					<div class="sm:col-span-1">
						<LabelledInput
							id="price"
							label="Price"
							min={0}
							name="price"
							placeholder="12.99"
							step={0.01}
							type="number"
							bind:value={$form.price}
						/>
					</div>
				{/if}
				<div class="sm:col-span-1">
					<LabelledInput
						id="max-purchase-qty"
						label="Max Purchase Qty"
						min={0}
						name="max-purchase-qty"
						placeholder="3"
						type="number"
						bind:value={$form.maxPurchaseQty}
					/>
				</div>
				<div class="sm:col-span-1">
					<LabelledInput
						id="sku"
						label="SKU"
						name="sku"
						placeholder="lime-green-vase"
						bind:value={$form.sku}
					/>
				</div>
			</div>
		</div>
		<div class="border-b border-gray-900/10 pb-12">
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-1">
					<LabelledInput
						id="category"
						label="Category"
						name="category"
						type="select"
						bind:value={$form.category}
					>
						<option value={-1}>none</option>
						{#each categories as category}
							<option value={category.id}>{category.label}</option>
						{/each}
					</LabelledInput>
				</div>
				<div class="sm:col-span-1">
					<LabelledInput
						id="attributes"
						label="Attributes"
						multiple={true}
						name="attributes"
						type="select"
						bind:value={$form.attributes}
					>
						{#each attributes.filter((attr) => attr.kind === 'static') as attribute}
							<option value={attribute.id}>{attribute.label}</option>
						{/each}
					</LabelledInput>
				</div>
				<div class="sm:col-span-1">
					<LabelledInput
						id="variation-attributes"
						label="Variation Attributes"
						multiple={true}
						name="variation-attributes"
						type="select"
						bind:value={$form.variationAttributes}
						on:change={generateAllVariations}
					>
						{#each attributes.filter((attr) => attr.kind !== 'static') as attribute}
							<optgroup label={attribute.label}>
								{#each attribute.options as attr_opt}
									<option value={attribute.id + '.' + attr_opt.id}>{attr_opt.label}</option>
								{/each}
							</optgroup>
						{/each}
					</LabelledInput>
				</div>
			</div>
		</div>
		{#if $form.variationAttributes.length}
			<div class="border-b border-gray-900/10 pb-12">
				<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-6">
						<label
							for="generate-variations"
							class="block text-md font-semibold leading-6 text-white"
						>
							Variation Editor
						</label>
					</div>
					{#each $form.variations as _, index}
						<span class="sm:col-span-6 text-gray-400">
							{$form.variations[index]?.label}
						</span>
						<div class="sm:col-span-2">
							<LabelledInput
								id={'variation.' + index + '.sku'}
								label="SKU"
								name={'variation.' + index + '.sku'}
								placeholder="asd"
								prefix={$form.sku}
								bind:value={$form.variations[index].sku}
							/>
						</div>
						<div class="sm:col-span-1">
							<LabelledInput
								id={'variation.' + index + '.price'}
								label="Price"
								min={0}
								name={'variation.' + index + '.price'}
								placeholder="12.99"
								step={0.01}
								type="number"
								bind:value={$form.variations[index].price}
							/>
						</div>
						{#if $form.manageStock}
							<div class="sm:col-span-1">
								<LabelledInput
									id={'variation.' + index + '.stock'}
									label="Current Stock"
									min={0}
									name={'variation.' + index + '.stock'}
									placeholder="100"
									type="number"
									bind:value={$form.variations[index].stock}
								/>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
		<div class="border-b border-gray-900/10 pb-12">
			<div class="mt-10 space-y-10">
				<fieldset>
					<legend class="block text-md font-semibold leading-6 text-white">
						Inventory management
					</legend>
					<div class="mt-6 space-y-6">
						<LabelledInput
							id="manage-stock"
							label="Manage Stock"
							min={0}
							name="manage-stock"
							subLabel="Control levels of stock for this item."
							type="checkbox"
							bind:checked={$form.manageStock}
						/>
						{#if $form.manageStock && !$form.variations.length}
							<div class="ml-7 grid grid-cols-1 sm:grid-cols-6">
								<div class="sm:col-span-1">
									<LabelledInput
										id="stock"
										label="Current Stock"
										min={0}
										name="stock"
										placeholder="100"
										type="number"
										bind:value={$form.stock}
									/>
								</div>
							</div>
						{/if}
						{#if $form.manageStock}
							<LabelledInput
								id="backorders"
								label="Allow Back Orders"
								name="backorders"
								subLabel="Once the stock level reaches 0, customers will be able to back-order this item."
								type="checkbox"
								bind:checked={$form.allowBackOrders}
							/>
							<LabelledInput
								id="restock-notifications"
								label="Restock Notifications"
								name="restock-notifications"
								subLabel="Add a section to this item's listing for customers to sign-up for re-stock
										notifications."
								type="checkbox"
								bind:checked={$form.restockNotifications}
							/>
						{/if}
					</div>
				</fieldset>
				<fieldset>
					<legend class="block text-md font-semibold leading-6 text-white">Publish state</legend>
					<p class="mt-1 text-sm leading-6 text-gray-400">
						Where do you want this product listing to go?
					</p>
					<div class="mt-6 space-y-4" role="radiogroup">
						{#each publishStateOptions as publishStateOpt}
							<div
								class="flex items-center gap-x-3"
								role="radio"
								aria-checked={$form.publishState === publishStateOpt.value}
							>
								<LabelledInput
									id={'publish-state-' + publishStateOpt.value}
									name={'publish-state-' + publishStateOpt.value}
									label={publishStateOpt.label}
									subLabel={publishStateOpt.subLabel}
									type="radio"
									value={publishStateOpt.value}
									bind:group={$form.publishState}
								/>
							</div>
						{/each}
					</div>
				</fieldset>
			</div>
		</div>
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

<SuperDebug data={$form} />
