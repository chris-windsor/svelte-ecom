<script lang="ts">
	import type { PageData } from './$types';
	import * as marked from 'marked';

	export let data: PageData;
	const { content } = data;
</script>

{#await marked.marked(content)}
	<div />
{:then htmlContent}
	<main class="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
		<div class="prose">
			{@html htmlContent}
		</div>
	</main>
{/await}
