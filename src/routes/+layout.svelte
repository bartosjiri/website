<script>
	import { UmamiAnalytics } from '$util/umami-analytics';
	import { Tooltip } from '$lib/primitives';

	import '../styles/_global.scss';
</script>

<UmamiAnalytics />
<main>
	<slot />
</main>
<Tooltip />

<style lang="scss">
	main {
		width: 90%;
		max-width: 96rem;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		@include fluid(padding-top, 150, 250);
		@include fluid(padding-bottom, 150, 250);
	}
</style>
