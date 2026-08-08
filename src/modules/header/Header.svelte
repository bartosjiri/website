<script lang="ts">
	import Logo from '@/lib/primitives/logo/assets/logo.svg?raw';
</script>

<header>
	<a href="/" aria-label="bartosjiri">
		{@html Logo}
	</a>
</header>

<style lang="scss">
	header {
		padding: 2rem;
		padding-bottom: 0;

		a {
			:global(svg) {
				display: block;
				height: 1.4rem;
			}
		}
	}
</style>
