<script lang="ts">
	import { UmamiAnalytics } from '@/util/umami-analytics';
	import { PageMeta } from '@/util/meta';

	import { Header } from '@/modules/header';
	import { CatalogList } from '@/modules/catalog';

	import '@/styles/_global.scss';

	let { data, children } = $props();
</script>

<UmamiAnalytics />
<PageMeta />

<Header />
<main>
	{@render children()}
	<CatalogList catalog={data?.catalog} />
</main>

<style lang="scss">
	:global(body) {
		display: flex;
		flex-direction: column;
		max-height: 100vh;
		overflow: hidden;

		@include breakpoint($breakpoint-tablet) {
			height: auto;
			max-height: none;
			overflow: auto;
		}

		main {
			height: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: 2rem;
			padding: 2rem;
			overflow: hidden;

			@include breakpoint($breakpoint-tablet) {
				grid-template-columns: 1fr;
				grid-template-rows: auto 1fr;
				row-gap: 2rem;
				overflow: auto;
			}
		}
	}
</style>
