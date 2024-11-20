<script lang="ts">
	import { CatalogItemDetail } from '@/modules/catalog';

	import type { CatalogItemT } from '@/modules/catalog';

	let { data } = $props();

	const itemIndex = $derived(data?.catalog?.findIndex((item) => item.id === data.catalogId));
	const item = $derived(data?.catalog?.[itemIndex] as CatalogItemT);
</script>

<section class:project-page={true}>
	<a href="/" class:mobile-navigation={true}>{''}</a>
	<CatalogItemDetail catalog={data?.catalog} {item} {itemIndex} />
</section>

<style lang="scss">
	.project-page {
		--top-offset: 5.4rem;

		overflow: auto;

		@include breakpoint($breakpoint-tablet) {
			position: fixed;
			top: var(--top-offset);
			bottom: 0;
			left: 0;
			right: 0;
			height: auto;
			background: var(--color-background-01);
			padding: 2rem;
			border-top: 1px solid var(--color-foreground-02);
		}

		.mobile-navigation {
			display: none;

			@include breakpoint($breakpoint-tablet) {
				position: fixed;
				display: block;
				top: 0;
				height: var(--top-offset);
				bottom: 0;
				left: 0;
				right: 0;
			}
		}
	}
</style>
