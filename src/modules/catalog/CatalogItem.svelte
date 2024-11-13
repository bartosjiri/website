<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	import { mediaContainerRef, selectedMediaIndex } from './catalog.store';

	import { CATALOG_MEDIA_CONFIG } from './catalog.config';

	import type { CatalogItemT } from './catalog.types';

	let {
		item
	}: {
		item: CatalogItemT;
	} = $props();

	const MEDIA_HEIGHT = (CATALOG_MEDIA_CONFIG.h as number[])[0];

	const handleMediaClick = (index: number) => {
		selectedMediaIndex.set(index);
	};

	const isCurrentItem = $derived($page.params.catalogId === item.id);
</script>

<li class:catalog-item={true} class:-highlighted={isCurrentItem}>
	<a href={isCurrentItem ? '/' : `/${item.id}`}>
		<div class:name={true}>
			<span>
				{item.name}
			</span>
		</div>
		<div class:type={true}>
			<span>
				{item.type}
			</span>
		</div>
		<div class:timeframe={true}>
			<span>
				{String(item.timeframe.start).slice(0, 4)}{#if item.timeframe.end === null}
					{'-now'}
				{:else if item.timeframe.end}
					{'-'}{String(item.timeframe.end).slice(0, 4)}
				{/if}
			</span>
		</div>
	</a>
	{#if isCurrentItem && item.media?.length}
		<div bind:this={$mediaContainerRef} class:media={true}>
			{#each item.media as media, index}
				<button
					onclick={() => handleMediaClick(index)}
					class:-highlighted={$selectedMediaIndex === index}
				>
					<picture class:image={true}>
						<source srcSet={media[MEDIA_HEIGHT].avif} type="image/avif" />
						<source srcSet={media[MEDIA_HEIGHT].webp} type="image/webp" />
						<img src={media[MEDIA_HEIGHT].png} alt="" />
					</picture>
				</button>
			{/each}
		</div>
	{/if}
</li>

<style lang="scss">
	.catalog-item {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid var(--catalog-foreground-color);
		overflow: hidden;

		&.-highlighted {
			a {
				color: var(--color-foreground-01);
				animation: none;
			}
		}

		a {
			width: 100%;
			display: grid;
			grid-template-columns: 2fr 2fr 1fr;
			column-gap: 1rem;
			color: var(--catalog-foreground-color);
			padding: 0.8rem 0;

			@include breakpoint($breakpoint-mobile) {
				grid-template-columns: 1fr auto;
			}

			.type {
				@include breakpoint($breakpoint-mobile) {
					display: none;
				}
			}

			.timeframe {
				text-align: right;
			}

			&:hover {
				color: var(--color-foreground-01);
			}
		}

		.media {
			display: flex;
			column-gap: 1rem;
			padding-bottom: 0.8rem;
			overflow: auto;

			button {
				--button-inline: inset 0 0 0 1px;

				cursor: pointer;

				.image {
					--media-height: 100px;

					position: relative;
					display: block;
					height: var(--media-height);
					width: auto;
					z-index: -1;

					img {
						height: var(--media-height);
					}
				}

				&:hover {
					animation: mediaButtonBlink var(--animation-duration-01) var(--aniamtion-function-01)
						var(--animation-iteration-01);
				}

				&.-highlighted {
					box-shadow: var(--button-inline) var(--color-foreground-01);
					animation: none;
				}

				@keyframes mediaButtonBlink {
					0%,
					100% {
						box-shadow: var(--button-inline) var(--color-foreground-01);
					}
					50% {
						box-shadow: var(--button-inline) transparent;
					}
				}
			}
		}
	}
</style>
