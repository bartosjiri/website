<script lang="ts">
	import { page } from '$app/stores';

	import CatalogItem from './CatalogItem.svelte';

	import type { CatalogListT } from './catalog.types';

	let {
		items
	}: {
		items: CatalogListT;
	} = $props();
</script>

<ul class:catalog-list={true} class:-highlighted={!$page.params.catalogId}>
	{#each items as item}
		<CatalogItem {item} />
	{/each}
</ul>

<style lang="scss">
	.catalog-list {
		--catalog-foreground-color: var(--color-foreground-02);

		overflow: auto;

		&.-highlighted {
			--catalog-foreground-color: var(--color-foreground-01);
		}
	}
</style>
