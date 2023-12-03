<script lang="ts">
	import { PhotoIcon } from '@babeard/svelte-heroicons/solid';
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle
	} from '@rgossiaux/svelte-headlessui';

	const fileDropDragover = (event: DragEvent) => {
		event.preventDefault();
	};

	const dropFile = (event: DragEvent) => {
		event.preventDefault();

		if (!event.dataTransfer) return;

		for (const item of event.dataTransfer.items) {
			if (item.kind === 'file') {
				const file = item.getAsFile();
				if (!file) return;

				uploadFile(file);
			}
		}
	};

	const selectFile = (event: Event) => {
		if (!event.target) return;

		const elementFiles = (event.target as HTMLInputElement).files;
		if (elementFiles === null) return;

		uploadFile();
		// for (const file of elementFiles) {
		// 	uploadFile(file);
		// }
	};

	const uploadFile = async (file: File) => {
		// const formData = new FormData();
		// formData.append('files[]', file);

		// await fetch('http://127.0.0.1:4567/api/upload_file', {
		// 	method: 'POST',
		// 	body: formData,
		// 	credentials: 'include'
		// });

		document.getElementById('upload-form').submit();
	};

	const allowedImageTypes: string[] = ['jpg', 'png', 'webp'];
	const maxFileSize: string = '1MB';

	export let showDialog: boolean;
</script>

<Dialog
	open={showDialog}
	class="fixed inset-0 z-10 overflow-y-auto"
	on:close={() => (showDialog = false)}
>
	<DialogOverlay class="fixed inset-0 bg-gray-300/50" />
	<span class="inline-block h-screen align-middle" aria-hidden="true">​</span>
	<div
		class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-stone-900 shadow-xl rounded-2xl"
	>
		<DialogTitle>Upload a new file!</DialogTitle>
		<DialogDescription>
			<div class="sm:col-span-3">
				<label for="primary-photo" class="block text-sm font-medium leading-6 text-white">
					Primary photo
				</label>
				<form id="upload-form" action="?/uploadFile" method="POST" enctype="multipart/form-data">
					<div
						class="mt-2 flex justify-center rounded-lg border border-1 border-dashed border-gray-900/25 px-6 py-10"
						on:dragover={fileDropDragover}
						on:drop={dropFile}
					>
						<div class="text-center">
							<PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
							<div class="mt-4 flex text-sm leading-6 text-gray-600">
								<label
									for="file-upload"
									class="relative cursor-pointer rounded-md bg-stone-900 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
								>
									<span>Upload an image</span>
									<input
										id="file-upload"
										name="file-upload[]"
										type="file"
										class="sr-only"
										on:change={selectFile}
									/>
								</label>
								<p class="pl-1">or drag and drop</p>
							</div>
							<p class="text-xs leading-5 text-gray-600">
								{allowedImageTypes.join(', ').toUpperCase()} up to {maxFileSize}
							</p>
						</div>
					</div>
				</form>
			</div>
		</DialogDescription>
	</div>
</Dialog>
