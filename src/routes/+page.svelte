<script lang="ts">
	import { onMount } from 'svelte';

	import { About } from '@/modules/about';

	import { catalogItemIndex, catalogItemMediaIndex } from '@/modules/catalog';

	onMount(() => {
		catalogItemIndex.set(null);
		catalogItemMediaIndex.set(0);
	});
</script>

<About />
