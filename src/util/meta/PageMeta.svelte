<script lang="ts">
	import * as META from './meta.config';

	let {
		title,
		fullTitle,
		description = META.META_DESCRIPTION,
		keywords = META.META_KEYWORDS,
		author = META.META_AUTHOR,
		ogImageUrl = META.META_OG_IMAGE_URL,
		ogImageWidth = META.META_OG_IMAGE_WIDTH,
		ogImageHeight = META.META_OG_IMAGE_HEIGHT,
		noindex = false,
		nofollow = false
	}: {
		title?: string;
		fullTitle?: string;
		description?: string;
		keywords?: string[];
		author?: string;
		ogImageUrl?: string;
		ogImageWidth?: number;
		ogImageHeight?: number;
		noindex?: boolean;
		nofollow?: boolean;
	} = $props();

	const pageTitle = $derived(
		fullTitle || (title ? `${title} — ${META.META_TITLE}` : META.META_TITLE)
	);
</script>

<svelte:head>
	{#if noindex || nofollow}
		<meta
			name="robots"
			content={[noindex && 'noindex', nofollow && 'nofollow'].filter(Boolean).join(',')}
		/>
	{/if}

	<link
		rel="icon"
		type="image/png"
		href="/meta/favicon-96x96.png?v=${META.META_VERSION}"
		sizes="96x96"
	/>
	<link rel="icon" type="image/svg+xml" href="/meta/favicon.svg?v=${META.META_VERSION}" />
	<link rel="shortcut icon" href="/meta/favicon.ico?v=${META.META_VERSION}" />
	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href="/meta/apple-touch-icon.png?v=${META.META_VERSION}"
	/>
	<link rel="manifest" href="/meta/site.webmanifest?v=${META.META_VERSION}" />

	<meta name="msapplication-TileColor" content={META.META_COLOR_MICROSOFT} />
	<meta name="msapplication-config" content={`/meta/browserconfig.xml?v=${META.META_VERSION}`} />
	<meta name="theme-color" content={META.META_COLOR_THEME} />

	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords.join(', ')} />
	<meta name="author" content={author} />

	<meta property="og:url" content={META.META_OG_URL} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={META.META_TITLE} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:image" content={`${ogImageUrl}?v=${META.META_VERSION}`} />
	<meta property="og:image:width" content={String(ogImageWidth)} />
	<meta property="og:image:height" content={String(ogImageHeight)} />
	<meta property="og:image:alt" content={pageTitle} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={META.META_OG_URL} />
	<meta name="twitter:creator" content={author} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={`${ogImageUrl}?v=${META.META_VERSION}`} />
	<meta name="twitter:image:alt" content={pageTitle} />
</svelte:head>
