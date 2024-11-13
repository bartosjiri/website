<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import { PageMeta } from '$util/meta';

	if (browser && $page.status === 404) {
		location.replace('/');
	}
</script>

<PageMeta noindex nofollow />
<span>Chase your curiosity.</span>
<slot />
