<script lang="ts">
	import StoreHeader from '$lib/components/navigation/storeHeader.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { productCategories } = data;
	const { categories } = productCategories;
</script>

<StoreHeader {categories} />
<slot />
