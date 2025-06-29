<script lang="ts">
	import { handleCatalogItemMediaNavigation } from './catalog.helpers';

	import { catalogItemIndex, catalogItemMediaIndex } from './catalog.store';

	import { CATALOG_MEDIA_CONFIG } from './catalog.config';

	import type { CatalogListT, CatalogItemT } from './catalog.types';

	type CatalogItemDetailPropsT = {
		catalog: CatalogListT;
		item: CatalogItemT;
		itemIndex: number;
	};

	let { item, itemIndex }: CatalogItemDetailPropsT = $props();

	const MEDIA_HEIGHT = (CATALOG_MEDIA_CONFIG.h as number[])[1];

	let initialImageLoaded = $state(false);

	$effect(() => {
		catalogItemIndex.set(itemIndex);
	});
</script>

<div class:catalog-item-detail={true}>
	{#if item.media?.length}
		<div class:gallery={true}>
			<button
				class:controls={true}
				class:-prev={true}
				onclick={() => handleCatalogItemMediaNavigation(-1)}
				aria-label="Previous"
			></button>
			<button
				class:controls={true}
				class:-next={true}
				onclick={() => handleCatalogItemMediaNavigation(1)}
				aria-label="Next"
			></button>
			<picture class:image={true}>
				<source
					srcSet={item.media?.[$catalogItemMediaIndex]?.[MEDIA_HEIGHT]?.avif}
					type="image/avif"
				/>
				<source
					srcSet={item.media?.[$catalogItemMediaIndex]?.[MEDIA_HEIGHT]?.webp}
					type="image/webp"
				/>
				<img
					onload={() => (initialImageLoaded = true)}
					src={item.media?.[$catalogItemMediaIndex]?.[MEDIA_HEIGHT]?.png}
					alt=""
				/>
			</picture>
			{#if item.media?.length && initialImageLoaded}
				<div class:image-preloader={true}>
					{#each item.media as itemMedia}
						<picture>
							<source srcSet={itemMedia?.[MEDIA_HEIGHT]?.avif} type="image/avif" />
							<source srcSet={itemMedia?.[MEDIA_HEIGHT]?.webp} type="image/webp" />
							<img src={itemMedia?.[MEDIA_HEIGHT]?.png} alt="" />
						</picture>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
	<div class:name={true}>
		<h2>{item.name}</h2>
	</div>
	<div class:type={true}>
		<span>{item.type}</span>
	</div>
	<div class:gallery-controls={true} class:-prev={true}>
		<button onclick={() => handleCatalogItemMediaNavigation(-1)}>Prev</button>
	</div>
	<div class:gallery-indicator={true}>
		<span>{$catalogItemMediaIndex + 1}/{item.media?.length}</span>
	</div>
	<div class:gallery-controls={true} class:-next={true}>
		<button onclick={() => handleCatalogItemMediaNavigation(1)}>Next</button>
	</div>
	<div class:description={true}>
		<!-- eslint-disable-next-line svelte/no-at-html-tags-->
		{@html item.description
			?.split(/<br\s*\/?>/)
			.map((p) => `<p>${p}</p>`)
			.join('')}
	</div>
	{#if item.links?.length}
		<div class:links={true}>
			{#each item.links as { url, label }}
				<a href={url} target="_blank">{label}</a>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.catalog-item-detail {
		--media-height: 640px;
		--grid-gap: 2rem;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: repeat(auto-fill, auto);
		grid-template-areas: 'gallery gallery gallery' 'name type gallery-indicator' 'description description description' 'links links links';
		gap: var(--grid-gap);
		max-width: var(--media-height);

		@include breakpoint($breakpoint-tablet) {
			grid-template-areas: 'gallery gallery gallery' 'gallery-controls-prev gallery-indicator gallery-controls-next' 'name name name' 'type type type' 'description description description' 'links links links';
		}

		.gallery {
			grid-area: gallery;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			aspect-ratio: 1 / 1;

			.controls {
				position: absolute;
				top: 0;
				bottom: 0;
				width: 50%;
				--cursor-prev: w-resize;
				--cursor-next: e-resize;

				&.-prev {
					left: 0;
					cursor: var(--cursor-prev);
					animation: controPrevCursorBlink var(--animation-duration-01) var(--aniamtion-function-01)
						var(--animation-iteration-01);
				}

				&.-next {
					right: 0;
					cursor: var(--cursor-next);
					animation: controlNextCursorBlink var(--animation-duration-01)
						var(--aniamtion-function-01) var(--animation-iteration-01);
				}

				@keyframes controPrevCursorBlink {
					0%,
					100% {
						cursor: var(--cursor-prev);
					}
					50% {
						cursor: none;
					}
				}

				@keyframes controlNextCursorBlink {
					0%,
					100% {
						cursor: var(--cursor-next);
					}
					50% {
						cursor: none;
					}
				}
			}

			.image {
				display: flex;
				height: 100%;
				max-width: var(--media-height);
				max-height: var(--media-height);
				aspect-ratio: 1 / 1;

				img {
					display: block;
					width: 100%;
					object-fit: contain;
				}
			}

			.image-preloader {
				position: fixed;
				top: -9999px;
				left: -9999px;
				height: 0;
				width: 0;
				visibility: hidden;
			}
		}

		.name {
			grid-area: name;

			h2 {
				text-align: left;
			}

			@include breakpoint($breakpoint-tablet) {
				margin-top: var(--grid-gap);
			}
		}

		.type {
			grid-area: type;
		}

		.gallery-indicator {
			grid-area: gallery-indicator;
			text-align: right;

			@include breakpoint($breakpoint-tablet) {
				text-align: center;
			}
		}

		.gallery-controls {
			display: none;

			@include breakpoint($breakpoint-tablet) {
				&.-prev,
				&.-next {
					display: flex;
				}

				&.-prev {
					grid-area: gallery-controls-prev;
				}

				&.-next {
					grid-area: gallery-controls-next;
					justify-content: flex-end;
				}
			}
		}

		.description {
			grid-area: description;
			max-width: 48rem;

			:global(p) {
				margin-bottom: 0.8em;

				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}

		.links {
			grid-area: links;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			row-gap: 0.4rem;
		}
	}
</style>
