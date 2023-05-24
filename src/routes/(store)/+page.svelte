<script lang="ts">
	import type { PageData } from './$types';
	import ProductGrid from '../../components/productGrid.svelte';

	export let data: PageData;
</script>

<ProductGrid {data} />
