<script lang="ts">
	import Pagination from '$lib/components/pagination.svelte';

	export let totalRows: number;
	export let rowsPerPage: number = 10;

	$: lastPage = totalRows / rowsPerPage;
	let selectedPage = 1;
</script>

{#if !totalRows || totalRows === 0}
	<div class="border border-1 border-gray-500 border-dashed rounded flex mt-3">
		<p class="text-md font-semibold text-gray-900 my-3 mx-auto">No records found</p>
	</div>
{/if}

<ul class="divide-y divide-gray-100">
	<slot />
</ul>

{#if totalRows > 0}
	<Pagination max={lastPage} bind:current={selectedPage} />
{/if}
