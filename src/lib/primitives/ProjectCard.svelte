<script lang="ts">
	export let logo: string;
	export let logoOutline: string;
	export let title: string;
	export let href: string;
	export let timeframe: string;
	export let description: string;
	export let tooltip: string;
</script>

<a class:project-card={true} {href} target="_blank" data-tooltip={tooltip} {...$$restProps}>
	<div class:logo={true}>
		{@html logo}
		{@html logoOutline}
	</div>
	<div class:title={true}>
		<h3>{title}</h3>
		<span>&nbsp;⋅&nbsp;{timeframe}</span>
	</div>
	<div class:description={true}>
		<p>{description}</p>
	</div>
</a>

<style lang="scss">
	.project-card {
		display: flex;
		flex-direction: column;
		padding: var(--spacing-03);
		border: 1px solid var(--color-background-02);
		border-radius: 16px;
		transition-property: border;
		transition-duration: var(--transition-duration-01);
		transition-timing-function: var(--transition-function-01);

		.logo {
			position: relative;
			grid-area: logo;
			margin-bottom: var(--spacing-02);

			:global(svg) {
				height: var(--spacing-06);
				width: var(--spacing-06);
				opacity: 0;
				transition-property: opacity;
				transition-duration: var(--transition-duration-01);
				transition-timing-function: var(--transition-function-01);

				&:nth-of-type(2) {
					position: absolute;
					top: 0;
					left: 0;
					opacity: 1;
					z-index: -1;
					box-sizing: border-box;
					border: 1px solid var(--color-foreground-03);
					border-radius: 8px;

					:global(path),
					:global(rect) {
						stroke: var(--color-foreground-03);
						stroke-width: 1px;
					}
				}
			}
		}

		.title {
			display: flex;
			align-items: center;

			h3 {
				font-weight: 500;
				color: var(--color-foreground-01);
			}

			span {
				display: inline-block;
				color: var(--color-foreground-03);
			}
		}

		.description {
			grid-area: description;

			p {
				color: var(--color-foreground-02);
			}
		}

		&:hover {
			border-color: var(--color-foreground-02);

			.logo {
				:global(svg) {
					opacity: 1;

					&:nth-of-type(2) {
						opacity: 0;
					}
				}
			}
		}
	}
</style>
