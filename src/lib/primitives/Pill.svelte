<script lang="ts">
	export let href: string | undefined = undefined;
</script>

<svelte:element this={href ? 'a' : 'div'} class:pill={true} {href} {...$$restProps}>
	<slot />
</svelte:element>

<style lang="scss">
	.pill {
		display: inline-flex;
		align-items: center;
		padding: var(--spacing-01) var(--spacing-03);
		border: 1px solid var(--color-gray-04);
		border-radius: 9999px;
		transition-property: background, border;
		transition-duration: var(--transition-duration-01);
		transition-timing-function: var(--transition-function-01);
	}

	a.pill {
		&:hover {
			background: var(--color-gray-01);
			border-color: var(--color-gray-05);
		}
	}
</style>
