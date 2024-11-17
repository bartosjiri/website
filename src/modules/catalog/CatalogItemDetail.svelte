<script lang="ts">
	import { goto, afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import { centerMediaContainer } from './catalog.helpers';

	import { selectedMediaIndex } from './catalog.store';

	import { CATALOG_MEDIA_CONFIG } from './catalog.config';

	import type { AfterNavigate, BeforeNavigate } from '@sveltejs/kit';
	import type { CatalogListT, CatalogItemT } from './catalog.types';

	let {
		catalog,
		item,
		itemIndex
	}: { catalog: CatalogListT; item: CatalogItemT; itemIndex: number } = $props();

	const MEDIA_HEIGHT = (CATALOG_MEDIA_CONFIG.h as number[])[1];

	const handleCatalogItemNavigation = async (directionModifier: -1 | 1) => {
		const targetItem = catalog[(itemIndex + directionModifier + catalog.length) % catalog.length];
		const targetItemMediaCount = targetItem?.media?.length ?? 0;

		await goto(targetItem.id);
		selectedMediaIndex.set(directionModifier === 1 ? 0 : Math.max(targetItemMediaCount - 1, 0));
	};

	const handleGalleryNavigation = (directionModifier: -1 | 1) => {
		if (!item.media?.length) return;

		if (
			(directionModifier === 1 && $selectedMediaIndex === item.media.length - 1) ||
			(directionModifier === -1 && $selectedMediaIndex === 0)
		) {
			handleCatalogItemNavigation(directionModifier);
			return;
		}

		const targetIdex =
			($selectedMediaIndex + directionModifier + item.media.length) % item.media.length;

		selectedMediaIndex.set(targetIdex);
		centerMediaContainer(targetIdex);
	};

	const handleBrowserNavigation = (e: AfterNavigate) => {
		const targetItem = catalog.find((item) => item.id === $page.params.catalogId);
		if (!targetItem?.media) return;

		if (['popstate', 'link'].includes(e?.type)) {
			selectedMediaIndex.set(0);
			return;
		}
	};

	afterNavigate(handleBrowserNavigation);
</script>

<div class:catalog-item-detail={true}>
	{#if item.media?.length}
		<div class:gallery={true}>
			<button
				class:controls={true}
				class:-prev={true}
				onclick={() => handleGalleryNavigation(-1)}
				aria-label="Previous"
			></button>
			<button
				class:controls={true}
				class:-next={true}
				onclick={() => handleGalleryNavigation(1)}
				aria-label="Next"
			></button>
			<picture class:image={true}>
				<source
					srcSet={item.media?.[$selectedMediaIndex]?.[MEDIA_HEIGHT]?.avif}
					type="image/avif"
				/>
				<source
					srcSet={item.media?.[$selectedMediaIndex]?.[MEDIA_HEIGHT]?.webp}
					type="image/webp"
				/>
				<img src={item.media?.[$selectedMediaIndex]?.[MEDIA_HEIGHT]?.png} alt="" />
			</picture>
		</div>
	{/if}
	<div class:name={true}>
		<h2>{item.name}</h2>
	</div>
	<div class:type={true}>
		<span>{item.type}</span>
	</div>
	<div class:gallery-indicator={true}>
		<span>{$selectedMediaIndex + 1}/{item.media?.length}</span>
	</div>
	<div class:description={true}>
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

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: repeat(auto-fill, auto);
		grid-template-areas: 'gallery gallery gallery' 'name type gallery-indicator' 'description description description' 'links links links';
		gap: 2rem;
		max-width: var(--media-height);

		@include breakpoint($breakpoint-tablet) {
			grid-template-areas: 'gallery gallery gallery' 'name name gallery-indicator' 'type type type' 'description description description' 'links links links';
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
				max-width: var(--media-height);
				max-height: var(--media-height);
				aspect-ratio: 1 / 1;

				img {
					display: block;
					width: 100%;
					object-fit: contain;
				}
			}
		}

		.name {
			grid-area: name;

			h2 {
				text-align: left;
			}
		}

		.type {
			grid-area: type;
		}

		.gallery-indicator {
			grid-area: gallery-indicator;
			text-align: right;
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
