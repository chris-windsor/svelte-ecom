<script lang="ts">
	import PaginatedTable from '$lib/components/admin/paginatedTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-row">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900">Product list</h1>
	<a
		class="flex w-fit items-center justify-center rounded-md bg-indigo-600 py-1.5 px-3 text-base font-semibold leading-7 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6 ml-4"
		href="/admin/inventory/products/edit">Create new</a
	>
</div>
<PaginatedTable />
