<script lang="ts">
	import MaskedInput from '$lib/components/inputs/maskedInput.svelte';

	export let value = '';

	let mask: string;
	$: mask =
		// Different mask for AMEX vs others
		value.startsWith('34') || value.startsWith('37') ? 'xxxx-xxxxxx-xxxxx' : 'xxxx-xxxx-xxxx-xxxx';
</script>

<MaskedInput id="card-number" autocomplete="cc-number" name="ccNumber" bind:value {mask} />
