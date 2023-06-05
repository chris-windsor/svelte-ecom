<script lang="ts">
	import { page } from '$app/stores';
	import Alert from '$lib/components/alert.svelte';
</script>

<Alert type="error" title={$page.status.toString()} details={[$page.error?.message || '']} />
