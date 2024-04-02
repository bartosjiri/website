<script lang="ts">
	export let href: string;
</script>

<a class:link={true} {href} {...$$restProps}>
	<slot />
</a>

<style lang="scss">
	.link {
		position: relative;
		display: inline-flex;
		align-items: center;
		color: inherit;
		transition-property: color;
		transition-duration: var(--transition-duration-01);
		transition-timing-function: var(--transition-function-01);

		&:after {
			content: '';
			position: absolute;
			bottom: -2px;
			left: 0;
			width: 100%;
			height: 1px;
			background: var(--color-gray-05);
			opacity: 0;
			transition-property: opacity;
			transition-duration: var(--transition-duration-01);
			transition-timing-function: var(--transition-function-01);
		}

		&:hover {
			color: var(--color-foreground-01);

			&:after {
				opacity: 1;
			}
		}
	}
</style>
