<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	import CatalogItem from './CatalogItem.svelte';

	import { handleCatalogKeyboardNavigation } from './catalog.helpers';

	import { catalog as catalogStore, catalogItemMediaIndex } from './catalog.store';

	import type { AfterNavigate } from '@sveltejs/kit';
	import type { CatalogListT } from './catalog.types';

	type CatalogListPropsT = {
		catalog: CatalogListT;
	};

	let { catalog }: CatalogListPropsT = $props();

	const handleBrowserNavigation = (e: AfterNavigate) => {
		const targetItem = catalog.find((item) => item.id === $page.params.catalogId);
		if (!targetItem?.media) return;

		if (['popstate', 'link'].includes(e?.type)) {
			catalogItemMediaIndex.set(0);
			return;
		}
	};

	onMount(() => {
		if (catalog) catalogStore.set(catalog);
		if (typeof window !== 'undefined')
			window.addEventListener('keydown', handleCatalogKeyboardNavigation);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined')
			window.removeEventListener('keydown', handleCatalogKeyboardNavigation);
	});

	afterNavigate(handleBrowserNavigation);
</script>

<ul class:catalog-list={true} class:-highlighted={!$page.params.catalogId}>
	{#each catalog as item}
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
