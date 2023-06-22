<script lang="ts">
	import MaskedInput from '$lib/components/inputs/maskedInput.svelte';

	export let value = '';

	const mask = 'xx/xx';
</script>

<MaskedInput
	id="expiration-date"
	autocomplete="cc-exp"
	name="ccExpiry"
	placeholder="MM/YY"
	bind:value
	{mask}
/>
