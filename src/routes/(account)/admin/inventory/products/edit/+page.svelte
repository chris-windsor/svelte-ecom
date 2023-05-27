<script lang="ts">
	import { PhotoIcon } from '@babeard/svelte-heroicons/solid';
	import type { PageData } from './$types';
	import { siteAddress } from '$lib/config.json';

	export let data: PageData;

	let newProduct = {
		name: '',
		price: undefined,
		stock: undefined
	};

	let pending = false;

	const selectFile = () => {};
</script>

<form>
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">New Product</h2>
			<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-4">
					<label for="short-url" class="block text-sm font-medium leading-6 text-gray-900"
						>Product Short URL</label
					>
					<div class="mt-2">
						<div
							class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
						>
							<span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
								>{siteAddress}/product/</span
							>
							<input
								type="text"
								name="short-url"
								id="short-url"
								class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="lime-green-vase"
							/>
						</div>
					</div>
				</div>
				<div class="col-span-full">
					<label for="description" class="block text-sm font-medium leading-6 text-gray-900"
						>Description</label
					>
					<div class="mt-2">
						<textarea
							id="description"
							name="description"
							rows="3"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="A vibrant green vase that brightens any room 10x over"
						/>
					</div>
					<p class="mt-3 text-sm leading-6 text-gray-600">
						Provide the most enriching details about this product...
					</p>
				</div>
				<div class="col-span-full">
					<label for="primary-photo" class="block text-sm font-medium leading-6 text-gray-900"
						>Primary photo</label
					>
					<div
						class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
					>
						<div class="text-center">
							<PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
							<div class="mt-4 flex text-sm leading-6 text-gray-600">
								<label
									for="file-upload"
									class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
								>
									<span>Upload an image</span>
									<input id="file-upload" name="file-upload" type="file" class="sr-only" />
								</label>
								<p class="pl-1">or drag and drop</p>
							</div>
							<p class="text-xs leading-5 text-gray-600">PNG, JPG, WEBP up to 1MB</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				We'll always let you know about important changes, but you pick what else you want to hear
				about.
			</p>
			<div class="mt-10 space-y-10">
				<fieldset>
					<legend class="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
					<div class="mt-6 space-y-6">
						<div class="relative flex gap-x-3">
							<div class="flex h-6 items-center">
								<input
									id="comments"
									name="comments"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
							</div>
							<div class="text-sm leading-6">
								<label for="comments" class="font-medium text-gray-900">Comments</label>
								<p class="text-gray-500">
									Get notified when someones posts a comment on a posting.
								</p>
							</div>
						</div>
						<div class="relative flex gap-x-3">
							<div class="flex h-6 items-center">
								<input
									id="candidates"
									name="candidates"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
							</div>
							<div class="text-sm leading-6">
								<label for="candidates" class="font-medium text-gray-900">Candidates</label>
								<p class="text-gray-500">Get notified when a candidate applies for a job.</p>
							</div>
						</div>
						<div class="relative flex gap-x-3">
							<div class="flex h-6 items-center">
								<input
									id="offers"
									name="offers"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
							</div>
							<div class="text-sm leading-6">
								<label for="offers" class="font-medium text-gray-900">Offers</label>
								<p class="text-gray-500">
									Get notified when a candidate accepts or rejects an offer.
								</p>
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend class="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
					<p class="mt-1 text-sm leading-6 text-gray-600">
						These are delivered via SMS to your mobile phone.
					</p>
					<div class="mt-6 space-y-6">
						<div class="flex items-center gap-x-3">
							<input
								id="push-everything"
								name="push-notifications"
								type="radio"
								class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
							<label for="push-everything" class="block text-sm font-medium leading-6 text-gray-900"
								>Everything</label
							>
						</div>
						<div class="flex items-center gap-x-3">
							<input
								id="push-email"
								name="push-notifications"
								type="radio"
								class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
							<label for="push-email" class="block text-sm font-medium leading-6 text-gray-900"
								>Same as email</label
							>
						</div>
						<div class="flex items-center gap-x-3">
							<input
								id="push-nothing"
								name="push-notifications"
								type="radio"
								class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
							<label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-900"
								>No push notifications</label
							>
						</div>
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
			>Save</button
		>
	</div>
</form>
